import { useEffect } from 'react';
import { images } from '../data/siteData';
import PageHero from '../components/shared/PageHero';
import { useSEO } from '../hooks/useSEO';

export default function LegalPage({ type }: { type: 'privacy' | 'terms' }) {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy policy' : 'Terms and conditions';
  const path = isPrivacy ? '/privacy-policy' : '/terms-and-conditions';
  const canonicalUrl = `https://solifyhub.com${path}`;

  useSEO({
    title: `${title} | SOLIFYHUB`,
    description: `${title} for SOLIFYHUB, a creative digital marketing agency in Visakhapatnam. Clear information about how we communicate, work and protect your trust.`,
    path,
  });

  // Set the correct canonical URL for each legal route without duplicates.
  // If useSEO already manages canonical tags, prefer moving this logic there.
  useEffect(() => {
    const links = document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]');
    let canonical = links[0];

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }

    canonical.href = canonicalUrl;
    links.forEach((link, index) => {
      if (index > 0) link.remove();
    });
  }, [canonicalUrl]);

  return (
    <>
      <PageHero
        label="SOLIFYHUB"
        title={title}
        body="Clear information about how SOLIFYHUB communicates, works and protects your trust."
        image={images.strategy}
      />
      <section className="section-pad bg-white">
        <div className="container-wide max-w-4xl">
          <div className="space-y-10 text-[#505050]">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#07194E]">1. Overview</h2>
              <p className="mt-4 leading-8">SOLIFYHUB is committed to clear, respectful communication. This page explains the general principles that guide our website and client conversations.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-[#07194E]">2. Information and communication</h2>
              <p className="mt-4 leading-8">When you contact us, we use the information you share to understand your enquiry, respond to you and prepare relevant next steps. We do not sell enquiry information.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-[#07194E]">3. Questions</h2>
              <p className="mt-4 leading-8">For questions about this page, email info@solifyhub.com or write to SOLIFYHUB, Akkayyapalem, Visakhapatnam, Andhra Pradesh.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
