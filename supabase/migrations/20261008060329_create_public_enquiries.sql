/*
# Create public enquiry inbox

1. New Tables
- `enquiries` stores contact form submissions from prospective clients.
- `id` uniquely identifies each enquiry.
- `full_name`, `business_name`, `phone`, `email`, `service`, and `requirements` store the visitor's message.
- `created_at` records when the enquiry was submitted.

2. Security
- Row Level Security is enabled.
- Anonymous and authenticated visitors may submit an enquiry.
- No public role may read, update, or delete enquiries.
- This keeps private contact details out of the public data API.

3. Notes
- The admin inbox can be connected later to an authenticated operator role without changing the public submission flow.
*/

CREATE TABLE IF NOT EXISTS public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  business_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  requirements text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public cannot read enquiries" ON public.enquiries;
CREATE POLICY "Public cannot read enquiries"
ON public.enquiries FOR SELECT
TO anon, authenticated
USING (false);

DROP POLICY IF EXISTS "Public can submit enquiries" ON public.enquiries;
CREATE POLICY "Public can submit enquiries"
ON public.enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Public cannot update enquiries" ON public.enquiries;
CREATE POLICY "Public cannot update enquiries"
ON public.enquiries FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "Public cannot delete enquiries" ON public.enquiries;
CREATE POLICY "Public cannot delete enquiries"
ON public.enquiries FOR DELETE
TO anon, authenticated
USING (false);

CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON public.enquiries (created_at DESC);
