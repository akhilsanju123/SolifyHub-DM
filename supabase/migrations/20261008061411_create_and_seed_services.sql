/*
# Create and seed the SOLIFYHUB service catalog

1. New Tables
- `services` stores editable service page content for the public site and future CMS.
- `title`, `slug`, and `tagline` store the approved navigation label and messaging.
- `display_number` and `display_order` preserve the approved 01–11 order.
- `description`, `hero_image`, `seo_title`, and `seo_description` store page content and metadata.
- `publish_status` controls whether a service is publicly visible.
- `created_at` and `updated_at` record content history timestamps.

2. Seed Content
- Inserts or updates exactly the 11 approved SOLIFYHUB services by unique slug.
- Existing rows are preserved unless they share one of the approved slugs, in which case approved navigation fields are refreshed.
- No legacy service rows are deleted.

3. Security
- Row Level Security is enabled.
- Public roles can read published services only.
- Public roles cannot insert, update, or delete service content.
- Future authenticated admin policies can be added without changing public URLs.
*/

CREATE TABLE IF NOT EXISTS public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  tagline text NOT NULL,
  display_number text NOT NULL,
  display_order integer NOT NULL,
  description text NOT NULL,
  hero_image text NOT NULL,
  publish_status text NOT NULL DEFAULT 'published',
  seo_title text NOT NULL,
  seo_description text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read published services" ON public.services;
CREATE POLICY "Public can read published services"
ON public.services FOR SELECT
TO anon, authenticated
USING (publish_status = 'published');

DROP POLICY IF EXISTS "Public cannot insert services" ON public.services;
CREATE POLICY "Public cannot insert services"
ON public.services FOR INSERT
TO anon, authenticated
WITH CHECK (false);

DROP POLICY IF EXISTS "Public cannot update services" ON public.services;
CREATE POLICY "Public cannot update services"
ON public.services FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "Public cannot delete services" ON public.services;
CREATE POLICY "Public cannot delete services"
ON public.services FOR DELETE
TO anon, authenticated
USING (false);

CREATE INDEX IF NOT EXISTS services_display_order_idx ON public.services (display_order);
CREATE INDEX IF NOT EXISTS services_published_idx ON public.services (publish_status, display_order);

INSERT INTO public.services (title, slug, tagline, display_number, display_order, description, hero_image, publish_status, seo_title, seo_description)
VALUES
('Branding','branding','Make your brand impossible to ignore.','01',1,'Build a distinctive identity that gives every customer touchpoint a clear point of view.','https://images.pexels.com/photos/7661590/pexels-photo-7661590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','published','Branding agency in Visakhapatnam | SOLIFYHUB','Distinctive brand strategy and identity systems for ambitious businesses in Visakhapatnam.'),
('Graphic Design','graphic-design','Turn every touchpoint into a statement.','02',2,'Create clear, considered visual communication across print, digital and every space in between.','https://images.pexels.com/photos/6663/desk-white-black-header.jpg?auto=compress&cs=tinysrgb&h=650&w=940','published','Graphic design studio in Visakhapatnam | SOLIFYHUB','Graphic design that makes brands clearer, more memorable and more useful.'),
('Advertising','advertising','Campaigns people choose to remember.','03',3,'Turn a strong idea into advertising that earns attention and gives your audience a reason to act.','https://images.pexels.com/photos/13120127/pexels-photo-13120127.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','published','Advertising agency in Visakhapatnam | SOLIFYHUB','Creative advertising campaigns built to be noticed and remembered.'),
('Video Production','video-production','Move hearts. Move markets.','04',4,'From a first frame to the final cut, we make video that gives your message momentum.','https://images.pexels.com/photos/34598087/pexels-photo-34598087.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','published','Video production company in Visakhapatnam | SOLIFYHUB','Video production for brands that want to move people and markets.'),
('Social Media Creatives','social-media-creatives','Stop the scroll with something worth stopping for.','05',5,'Make social feeds feel less like a content calendar and more like a living brand.','https://images.pexels.com/photos/7481984/pexels-photo-7481984.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','published','Social media creative agency | SOLIFYHUB','Social media creative systems that help brands earn attention consistently.'),
('Content Creation','content-creation','Say the thing in a way only you can.','06',6,'Find your voice, sharpen your message and create content your audience is glad to spend time with.','https://images.pexels.com/photos/9052143/pexels-photo-9052143.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','published','Content creation agency in Visakhapatnam | SOLIFYHUB','Content strategy and creation for brands with something worth saying.'),
('Web Design','web-design','Digital spaces with a pulse.','07',7,'Design and build websites that feel unmistakably yours and make the next step easy.','https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','published','Web design company in Visakhapatnam | SOLIFYHUB','Web design with clarity, character and conversion in mind.'),
('Motion Graphics','motion-graphics','Give your ideas a little more gravity.','08',8,'Add rhythm, movement and visual energy to ideas that deserve more than a still frame.','https://images.pexels.com/photos/31949770/pexels-photo-31949770.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','published','Motion graphics studio in Visakhapatnam | SOLIFYHUB','Motion graphics that make complex ideas feel immediate and alive.'),
('Campaigns','campaigns','One idea. Everywhere it matters.','09',9,'Connect the message across channels so every part of the campaign feels like the same conversation.','https://images.pexels.com/photos/19387231/pexels-photo-19387231.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','published','Campaign agency in Visakhapatnam | SOLIFYHUB','Integrated campaigns that carry one powerful idea across every channel.'),
('Creative Strategy','creative-strategy','Make the right idea inevitable.','10',10,'Turn a business challenge into a sharp creative direction the whole team can believe in.','https://images.pexels.com/photos/17724746/pexels-photo-17724746.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','published','Creative strategy agency | SOLIFYHUB','Creative strategy that turns business challenges into focused ideas.'),
('Digital Marketing','digital-marketing','Turn attention into action.','11',11,'Build a connected digital presence that brings the right people closer to your business.','https://images.pexels.com/photos/8062289/pexels-photo-8062289.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','published','Digital marketing agency in Visakhapatnam | SOLIFYHUB','Digital marketing strategy, creative and performance for sustainable growth.')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  display_number = EXCLUDED.display_number,
  display_order = EXCLUDED.display_order,
  description = EXCLUDED.description,
  hero_image = EXCLUDED.hero_image,
  publish_status = EXCLUDED.publish_status,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  updated_at = now();
