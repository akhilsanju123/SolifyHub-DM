import { useEffect, useState } from "react";

import { ArrowRight, ArrowUpRight } from "lucide-react";

import {

  navigate,

  industries,

  type Industry,

} from "../data/siteData";

import PageHero from "../components/shared/PageHero";

import CTA from "../components/shared/CTA";

import IndustryModal from "../components/shared/IndustryModal";

import { useSEO } from "../hooks/useSEO";

import "./Industries.css";

export default function Industries() {

  useSEO({

    title: "Industries We Serve in Visakhapatnam | SOLIFYHUB",

    description: "SOLIFYHUB provides industry-specific digital marketing for healthcare, education, real estate, retail, technology and hospitality businesses in Visakhapatnam and across Andhra Pradesh.",

    path: "/industries",

    keywords: "industry marketing Visakhapatnam, healthcare marketing Vizag, education marketing, real estate marketing Andhra Pradesh, retail ecommerce marketing, SaaS marketing, hospitality marketing",

    schema: {

      "@context": "https://schema.org",

      "@type": "CollectionPage",

      name: "Industries SOLIFYHUB Serves",

      description: "Industry-specific digital marketing services for businesses in Visakhapatnam.",

      url: "https://solifyhub.com/industries",

    },

  });

  const [selectedIndustry, setSelectedIndustry] =

    useState<Industry | null>(null);

  // Lock body scroll and close on Escape while the modal is open

  useEffect(() => {

    if (!selectedIndustry) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {

      if (event.key === "Escape") {

        setSelectedIndustry(null);

      }

    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {

      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", closeOnEscape);

    };

  }, [selectedIndustry]);

  // Navigate to the contact page and scroll once the section is mounted.
  const goToGetInTouch = () => {
    navigate("/contact-us");

    let attempts = 0;
    const maxAttempts = 60;

    const scrollWhenReady = () => {
      const section = document.getElementById("get-in-touch");

      if (section && window.location.pathname === "/contact-us") {
        const top = section.getBoundingClientRect().top + window.scrollY - 95;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        return;
      }

      if (++attempts < maxAttempts) {
        window.setTimeout(scrollWhenReady, 100);
      }
    };

    window.requestAnimationFrame(scrollWhenReady);
  };

  const openIndustry = (industry: Industry) => {

    setSelectedIndustry(industry);

  };

  return (

    <>

      {/* HERO SECTION */}

      <PageHero

        label="Industries"

        title={"Built for the way\nyour world moves."}

        body="Every industry has its own challenges, opportunities, and ambitions. We combine creative thinking, digital strategy, and powerful storytelling to help businesses stand out and grow."

        image={industries[0]?.image}

      />

      {/* INDUSTRIES SECTION */}

      <section className="industries-page py-20 md:py-28">

        {/* BACKGROUND DECORATION */}

        <div className="industries-blob-left" />

        <div className="industries-blob-right" />

        <div className="container-wide relative z-10">

          {/* SECTION HEADING */}

          <div className="mb-14 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">

            <div className="max-w-3xl">

              <div className="mb-5 flex items-center gap-3">

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#2563eb]">

                  Who We Work With

                </span>

              </div>

              <h2 className="font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-[#07194E] md:text-5xl lg:text-6xl">

                Different industries.

                <br />

                <span className="text-[#2563eb]">One growth mindset.</span>

              </h2>

            </div>

            <p className="max-w-sm text-base leading-8 text-[#64748b]">

              From ambitious startups to established brands, we create

              meaningful digital experiences that connect businesses with the

              people who matter.

            </p>

          </div>

          {/* INDUSTRY CARDS */}

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-9">

            {industries.map((industry, index) => (

              <article

                key={industry.name}

                role="button"

                tabIndex={0}

                aria-label={`Explore ${industry.name}`}

                className="industry-premium-card group"

                onClick={() => openIndustry(industry)}

                onKeyDown={(event) => {

                  if (event.key === "Enter" || event.key === " ") {

                    event.preventDefault();

                    openIndustry(industry);

                  }

                }}

              >

                {/* IMAGE */}

                <div className="relative aspect-[1.45] overflow-hidden bg-[#eaf0ff]">

                  <img

                    src={industry.image}

                    alt={industry.name}

                    loading="lazy"

                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"

                  />

                  {/* IMAGE GRADIENT */}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#07194E]/45 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                  {/* INDUSTRY NUMBER */}

                  <div className="absolute left-6 top-6 rounded-full border border-white/40 bg-white/90 px-4 py-2 backdrop-blur-md">

                    <span className="text-xs font-bold tracking-widest text-[#07194E]">

                      {String(index + 1).padStart(2, "0")}

                    </span>

                  </div>

                  {/* ARROW ICON */}

                  <div className="absolute right-6 top-6 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-white text-[#07194E] opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">

                    <ArrowUpRight size={22} />

                  </div>

                  {/* IMAGE BOTTOM LABEL */}

                  <div className="absolute bottom-6 left-7">

                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/90">

                      SOLIFYHUB / INDUSTRIES

                    </span>

                  </div>

                </div>

                {/* CARD CONTENT */}

                <div className="relative p-7 md:p-9">

                  <div className="mb-4 flex items-center gap-3">

                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563eb]">

                      SOLIFYHUB FOR

                    </span>

                  </div>

                  <h3 className="font-display text-2xl font-extrabold tracking-tight text-[#07194E] transition-colors duration-300 group-hover:text-[#2563eb] md:text-3xl">

                    {industry.name}

                  </h3>

                  <p className="mt-4 min-h-[84px] text-[15px] leading-7 text-[#64748b]">

                    {industry.desc}

                  </p>

                  {/* CARD FOOTER */}

                  <div className="mt-7 flex items-center justify-between border-t border-[#e9eef7] pt-6">

                    <span className="inline-flex items-center gap-3 text-sm font-bold text-[#07194E] transition-colors duration-300 group-hover:text-[#2563eb]">

                      Explore Industry

                      <ArrowRight

                        size={17}

                        className="transition-transform duration-300 group-hover:translate-x-2"

                      />

                    </span>

                    <button

                      type="button"

                      onClick={(event) => {

                        event.stopPropagation();

                        goToGetInTouch();

                      }}

                      className="rounded-full border border-[#dce5f5] px-5 py-2.5 text-xs font-bold text-[#1254F4] transition-all duration-300 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white"

                    >

                      Talk to Us

                    </button>

                  </div>

                </div>

                {/* BOTTOM ANIMATED LINE */}

                <div className="industry-card-line" />

              </article>

            ))}

          </div>

          {/* BOTTOM MESSAGE */}

          <div className="industries-bottom-bar">

            <div>

              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#2563eb]">

                YOUR INDUSTRY. OUR EXPERTISE.

              </p>

              <h3 className="font-display text-2xl font-extrabold text-[#07194E] md:text-3xl">

                Don't see your industry here?

              </h3>

              <p className="mt-3 text-sm leading-7 text-[#64748b]">

                Great ideas aren't limited to categories. Let's build something

                meaningful together.

              </p>

            </div>

            <button

              type="button"

              onClick={goToGetInTouch}

              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#1254F4] px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#07194E] hover:shadow-[0_12px_30px_rgba(18,84,244,0.25)]"

            >

              Let's Talk

              <ArrowUpRight

                size={18}

                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"

              />

            </button>

          </div>

        </div>

      </section>

      {/* CTA */}

      <CTA />

      {/* INDUSTRY MODAL */}

      {selectedIndustry && (

        <IndustryModal

          industry={selectedIndustry}

          onClose={() => setSelectedIndustry(null)}

        />

      )}

    </>

  );

}
