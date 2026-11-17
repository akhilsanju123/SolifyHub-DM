
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

import {
  navigate,
  images,
  posts,
} from '../data/siteData';

import PageHero from '../components/shared/PageHero';
import CTA from '../components/shared/CTA';
import { useSEO } from '../hooks/useSEO';

// ==========================================
// BLOG CARDS DATA
// ==========================================

const blogCards = [
  {
    slug: 'local-seo-visakhapatnam',
    title:
      'Local SEO in Visakhapatnam: How to Get Your Business Found on Google',
    category: 'Local SEO',
    image: posts[0]?.image || images.strategy,
  },
  {
    slug: 'social-media-marketing-2026',
    title:
      'Why Social Media Marketing Is Crucial for Businesses to Grow in 2026',
    category: 'Social Media Marketing',
    image: posts[1]?.image || images.strategy,
  },
  {
    slug: 'why-choose-solifyhub',
    title:
      'Why Vizag Businesses Should Choose SOLIFYHUB as Their Digital Growth Partner',
    category: 'Digital Growth',
    image: posts[2]?.image || images.strategy,
  },
];

// ==========================================
// BLOGS PAGE
// ==========================================

export default function Blogs() {
  const canonicalUrl = 'https://solifyhub.com/blogs';

  useSEO({
    title:
      'Digital Marketing Blog & SEO Tips | SOLIFYHUB Vizag',

    description:
      'Explore SEO tips, social media marketing strategies and digital growth insights from SOLIFYHUB, a digital marketing agency in Visakhapatnam.',

    path: '/blogs',

    keywords:
      'digital marketing blog Visakhapatnam, SEO tips Vizag, social media marketing blog',

    schema: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'SOLIFYHUB Journal',
      description:
        'Practical digital marketing insights for businesses in Visakhapatnam.',
      url: canonicalUrl,
    },
  });

  // ==========================================
  // CANONICAL TAG
  // ==========================================

  useEffect(() => {
    const canonicalLinks = document.querySelectorAll(
      'link[rel="canonical"]'
    );

    let canonical = canonicalLinks[0] as HTMLLinkElement | undefined;

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }

    canonical.href = canonicalUrl;

    canonicalLinks.forEach((link, index) => {
      if (index > 0) {
        link.remove();
      }
    });
  }, []);

  return (
    <>
      {/* ======================================
          BLOG PAGE HERO
      ====================================== */}

      <PageHero
        label="Journal"
        title={'Useful ideas for\nyour next move.'}
        body="Practical thinking about visibility, creative work and building a digital presence people trust."
        image={images.strategy}
      />

      {/* ======================================
          THREE BLOG CARDS
      ====================================== */}

      <section className="section-pad bg-white">
        <div className="container-wide">
          <div className="grid gap-8 md:grid-cols-3">
            {blogCards.map((post) => (
              <button
                key={post.slug}
                type="button"
                onClick={() =>
                  navigate(`/blogs/${post.slug}`)
                }
                className="group flex h-full flex-col text-left"
              >
                {/* BLOG IMAGE */}

                <div className="mb-5 aspect-[1.25] w-full overflow-hidden rounded-2xl">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      ease-out
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* BLOG CATEGORY */}

                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[.15em]
                    text-[#1254F4]
                  "
                >
                  {post.category}
                </p>

                {/* BLOG TITLE */}

                <h2
                  className="
                    mt-3
                    font-display
                    text-2xl
                    font-bold
                    leading-8
                    text-[#07194E]
                    transition-colors
                    duration-300
                    group-hover:text-[#0046AD]
                  "
                >
                  {post.title}
                </h2>

                {/* READ ARTICLE */}

                <span
                  className="
                    mt-auto
                    inline-flex
                    items-center
                    gap-2
                    pt-6
                    text-sm
                    font-bold
                    text-[#1254F4]
                    transition-colors
                    duration-300
                    group-hover:text-[#FF6200]
                  "
                >
                  Read article

                  <ArrowRight
                    size={15}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================
          CTA SECTION
      ====================================== */}

      <CTA />
    </>
  );
}
