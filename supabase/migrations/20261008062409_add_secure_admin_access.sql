/*
# Add secure admin access rules

1. New Tables
- `admin_members` stores which authenticated accounts may access the SOLIFYHUB management area.
- `user_id` references the built-in Supabase account and is the primary key.
- `role` supports `admin` and `editor` roles.
- `created_at` records when access was granted.

2. Security
- Row Level Security is enabled on `admin_members`.
- An authenticated account can read only its own membership row.
- Membership records cannot be created, changed, or deleted from the browser.
- Existing `services` content can be managed only by an admin member.
- Existing `enquiries` can be read, updated, or deleted only by an admin member.
- Public enquiry submission and published service reading remain available.

3. Important Notes
- No existing rows are deleted or changed by this migration.
- Admin membership provisioning remains separate from the public website and must be performed by a trusted project owner.
*/

CREATE TABLE IF NOT EXISTS public.admin_members (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Members can read their own admin access" ON public.admin_members;
CREATE POLICY "Members can read their own admin access"
ON public.admin_members FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Members cannot insert admin access" ON public.admin_members;
CREATE POLICY "Members cannot insert admin access"
ON public.admin_members FOR INSERT
TO authenticated
WITH CHECK (false);

DROP POLICY IF EXISTS "Members cannot update admin access" ON public.admin_members;
CREATE POLICY "Members cannot update admin access"
ON public.admin_members FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "Members cannot delete admin access" ON public.admin_members;
CREATE POLICY "Members cannot delete admin access"
ON public.admin_members FOR DELETE
TO authenticated
USING (false);

DROP POLICY IF EXISTS "Admins can read all services" ON public.services;
CREATE POLICY "Admins can read all services"
ON public.services FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can insert services" ON public.services;
CREATE POLICY "Admins can insert services"
ON public.services FOR INSERT
TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can update services" ON public.services;
CREATE POLICY "Admins can update services"
ON public.services FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can delete services" ON public.services;
CREATE POLICY "Admins can delete services"
ON public.services FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can read enquiries" ON public.enquiries;
CREATE POLICY "Admins can read enquiries"
ON public.enquiries FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can update enquiries" ON public.enquiries;
CREATE POLICY "Admins can update enquiries"
ON public.enquiries FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can delete enquiries" ON public.enquiries;
CREATE POLICY "Admins can delete enquiries"
ON public.enquiries FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid()));
