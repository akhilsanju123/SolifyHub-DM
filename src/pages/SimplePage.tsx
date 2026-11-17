import { useEffect } from 'react';
import { images } from '../data/siteData';
import PageHero from '../components/shared/PageHero';
import CTA from '../components/shared/CTA';
import { useSEO } from '../hooks/useSEO';

export default function SimplePage({ title }: { title: string }) {
  const path = `/${title.toLowerCase().trim().replace(/\s+/g, '-')}`;
  const canonicalUrl = `https://solifyhub.com${path}`;

  useSEO({
    title: `${title} | SOLIFYHUB`,
    description: `${title} — SOLIFYHUB is a creative digital marketing agency in Visakhapatnam offering branding, web design, advertising and performance marketing.`,
    path,
  });

  // Keep a single canonical link for this page, including SPA navigation.
  // If useSEO already manages canonical links, prefer removing this effect
  // and handling canonical URLs centrally in that hook.
  useEffect(() => {
    const links = Array.from(document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'));
    const canonical = links[0] ?? document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = canonicalUrl;
    if (!canonical.isConnected) document.head.appendChild(canonical);
    links.slice(1).forEach((link) => link.remove());
  }, [canonicalUrl]);

  return (
    <>
      <PageHero
        label="SOLIFYHUB"
        title={title}
        body="This page is part of the SOLIFYHUB experience. Explore our capabilities or start a conversation with the team."
        image={images.strategy}
      />
      <CTA />
    </>
  );
}
