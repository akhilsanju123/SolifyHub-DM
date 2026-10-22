
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Compass,
  Lightbulb,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

import {
  navigate,
  services,
  industries,
  posts,
} from "../data/siteData";

import Hero from "../components/shared/Hero";
import Marquee from "../components/shared/Marquee";
import CTA from "../components/shared/CTA";
import { useSEO } from "../hooks/useSEO";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SOLIFYHUB",
  description: "Creative digital marketing agency in Visakhapatnam offering branding, web design, advertising, social media, video production and performance marketing.",
  url: "https://solifyhub.com",
  logo: "https://solifyhub.com/logo_png.png",
  email: "info@solifyhub.com",
  telephone: "+91-86888-29033",
  address: {
    "@type": "PostalAddress",
    streetAddress: "34-31/3, Door No 49, Main Road, Akkayyapalem",
    addressLocality: "Visakhapatnam",
    addressRegion: "Andhra Pradesh",
    postalCode: "530016",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/solifyhub/",
    "https://www.facebook.com/profile.php?id=61593760515445",
    "https://www.linkedin.com/in/solifyhub/",
    "https://www.youtube.com/@SolifyHub",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SOLIFYHUB",
  image: "https://solifyhub.com/logo_png.png",
  telephone: "+91-86888-29033",
  email: "info@solifyhub.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "34-31/3, Door No 49, Main Road, Akkayyapalem",
    addressLocality: "Visakhapatnam",
    addressRegion: "Andhra Pradesh",
    postalCode: "530016",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "17.7231",
    longitude: "83.2946",
  },
  areaServed: "Visakhapatnam, Andhra Pradesh, India",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SOLIFYHUB",
  url: "https://solifyhub.com",
};


// Screenshot-inspired heading style, scoped to the six homepage sections.
// Other website headings and existing components are unchanged.
type HomeSectionIntroProps = {
  eyebrow: string;
  title: string;
  body?: string;
};

function HomeSectionIntro({ eyebrow, title, body }: HomeSectionIntroProps) {
  const [firstLine, ...remainingLines] = title.split("\n");
  const secondLine = remainingLines.join(" ");

  return (
    <div className="w-full min-w-0">
      <p className="eyebrow mb-5 !text-[16px] sm:!text-[18px] !font-extrabold !tracking-[0.08em]">{eyebrow}</p>
      <h2
        className="max-w-full break-words font-['Inter'] text-[clamp(2.25rem,4.3vw,4.75rem)] font-black leading-[1.03] tracking-[-0.055em]"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}
      >
        <span className="block text-[#07194E]">{firstLine}</span>
        {secondLine && (
          <span className="block text-[#2962F0]">{secondLine}</span>
        )}
      </h2>
      {body && (
        <p className="mt-7 max-w-2xl text-base leading-8 text-[#505050] sm:text-lg">
          {body}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  useSEO({
    title: "SOLIFYHUB — Creative Digital Marketing Agency in Visakhapatnam",
    description: "SOLIFYHUB is a creative digital marketing agency in Visakhapatnam offering branding, web design, advertising, social media, video production and performance marketing for ambitious businesses.",
    path: "/",
    keywords: "digital marketing agency Visakhapatnam, creative agency Vizag, branding Visakhapatnam, web design Andhra Pradesh, advertising agency Vizag, social media marketing Visakhapatnam, SEO Visakhapatnam",
    schema: [organizationSchema, localBusinessSchema, websiteSchema],
  });

  const [industry, setIndustry] = useState(0);
  const [faq, setFaq] = useState(0);

  const faqs = [
    {
      question: "How do we get started with SOLIFYHUB?",
      answer: "Getting started is simple. Share your business goals and requirements with our team. We'll discuss your needs, understand your audience, and recommend a tailored strategy, project scope, and next steps.",
    },
    {
      question: "What size businesses do you work with?",
      answer: "We work with startups, small and medium-sized businesses, and established brands. Whether you're building your first digital presence or expanding your marketing efforts, we tailor our creative and digital solutions to your goals and budget.",
    },
    {
      question: "Do you offer one-off projects or monthly partnerships?",
      answer: "Yes, we offer both. You can work with us on a one-time project such as branding, website design, or video production, or choose an ongoing partnership for social media, campaigns, digital marketing, and continuous brand support.",
    },
  ];

  return (
    <>
      <Hero />
      <Marquee />

      <main>
        {/* =====================================
            ABOUT SOLIFYHUB
        ===================================== */}
        <section className="section-pad bg-white">
          <div className="container-wide grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
            <HomeSectionIntro
              eyebrow="About SOLIFYHUB"
              title={"Make your next move\nwith more clarity."}
              body="SOLIFYHUB is a creative company for businesses ready to make a bigger impression. We connect the dots between what you want to say, what your audience needs to hear and the actions that move your business forward."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[28px] bg-[#07194E] p-8 text-white sm:translate-y-10">
                <Compass
                  className="mb-20 text-[#00CFFF]"
                  size={32}
                />

                <p className="font-display text-2xl font-bold">
                  Strategy before noise.
                </p>

                <p className="mt-3 text-sm leading-7 text-white/60">
                  Every strong result begins with a clear
                  point of view. At SOLIFYHUB, we don't just follow trends. We create purposeful digital experiences, build memorable brands, and develop growth-focused strategies that connect businesses with the right audiences.
                </p>
              </div>

              <div className="overflow-hidden rounded-[28px]">
                <img
                  src="https://images.pexels.com/photos/1181738/pexels-photo-1181738.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Team discussing a strategy"
                  className="h-full min-h-[270px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================
            OUR SERVICES
        ===================================== */}
        
{/* =====================================
    WHAT WE DO - ANIMATED GROWTH SECTION
===================================== */}

<section className="section-pad overflow-hidden bg-[#F5F4FF]">
  <div className="container-wide">

    {/* Heading + Animated Growth Flowchart */}
    <div className="mb-16 grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">

      {/* LEFT SIDE - HEADING */}
      <div>
        <HomeSectionIntro
          eyebrow="What we do"
          title={"Eleven capabilities.\nOne growth partner."}
          body="From the first search to the final click, we build connected experiences that give your brand more room to grow."
        />
      </div>

      {/* RIGHT SIDE - ANIMATED GROWTH FLOWCHART */}
      <div className="growth-animation relative mx-auto w-full max-w-[500px]">

        <div className="relative overflow-hidden rounded-[28px] border border-[#D9E2F0] bg-white/70 p-5 shadow-[0_20px_60px_rgba(7,25,78,0.06)] backdrop-blur-sm sm:p-7">

          {/* Background Glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#00CFFF]/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#7A00FF]/10 blur-3xl" />

          {/* Header */}
          <div className="relative mb-6 flex items-center justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]   text-[#1254F4]">
                SOLIFYHUB Growth Engine
              </p>

              <h3 className="mt-2 font-display text-xl font-bold text-[#07194E]">
                Ideas into impact.
              </h3>
            </div>

            <div className="growth-pulse flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf5ff]">
              <BarChart3
                size={21}
                className="text-[#1254F4]"
              />
            </div>
          </div>

          {/* Animated Flowchart */}
          <div className="relative">

            <svg
              viewBox="0 0 440 245"
              className="w-full"
              role="img"
              aria-label="Animated growth process showing strategy, creative, launch and growth"
            >
              <defs>
                <linearGradient
                  id="growthLineGradient"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor="#1254F4"
                  />
                  <stop
                    offset="55%"
                    stopColor="#00CFFF"
                  />
                  <stop
                    offset="100%"
                    stopColor="#7A00FF"
                  />
                </linearGradient>

                <filter
                  id="growthGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur
                    stdDeviation="3"
                    result="blur"
                  />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background Grid */}
              {[45, 85, 125, 165, 205].map((y) => (
                <line
                  key={`grid-${y}`}
                  x1="12"
                  y1={y}
                  x2="428"
                  y2={y}
                  stroke="#D9E2F0"
                  strokeDasharray="4 6"
                />
              ))}

              {/* Connecting Growth Path */}
              <path
                d="M 52 190 C 95 190, 100 155, 150 155 S 225 115, 260 115 S 345 55, 390 45"
                fill="none"
                stroke="#D9E2F0"
                strokeWidth="5"
                strokeLinecap="round"
              />

              <path
                className="growth-draw-line"
                d="M 52 190 C 95 190, 100 155, 150 155 S 225 115, 260 115 S 345 55, 390 45"
                fill="none"
                stroke="url(#growthLineGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#growthGlow)"
                pathLength="100"
              />

              {/* Animated Moving Dot */}
              <circle
                r="6"
                fill="#00CFFF"
                filter="url(#growthGlow)"
              >
                <animateMotion
                  dur="6s"
                  repeatCount="indefinite"
                  path="M 52 190 C 95 190, 100 155, 150 155 S 225 115, 260 115 S 345 55, 390 45"
                />
              </circle>

              {/* STEP 1 - STRATEGY */}
              <g>
                <circle
                  cx="52"
                  cy="190"
                  r="16"
                  fill="#1254F4"
                  className="growth-node"
                />

                <circle
                  cx="52"
                  cy="190"
                  r="5"
                  fill="white"
                />

                <text
                  x="52"
                  y="225"
                  textAnchor="middle"
                  fill="#07194E"
                  fontSize="13"
                  fontWeight="700"
                >
                  Strategy
                </text>
              </g>

              {/* STEP 2 - CREATIVE */}
              <g>
                <circle
                  cx="150"
                  cy="155"
                  r="16"
                  fill="#009fd3"
                  className="growth-node growth-delay-1"
                />

                <circle
                  cx="150"
                  cy="155"
                  r="5"
                  fill="white"
                />

                <text
                  x="150"
                  y="190"
                  textAnchor="middle"
                  fill="#07194E"
                  fontSize="13"
                  fontWeight="700"
                >
                  Creative
                </text>
              </g>

              {/* STEP 3 - LAUNCH */}
              <g>
                <circle
                  cx="260"
                  cy="115"
                  r="16"
                  fill="#2454d7"
                  className="growth-node growth-delay-2"
                />

                <circle
                  cx="260"
                  cy="115"
                  r="5"
                  fill="white"
                />

                <text
                  x="260"
                  y="150"
                  textAnchor="middle"
                  fill="#07194E"
                  fontSize="13"
                  fontWeight="700"
                >
                  Launch
                </text>
              </g>

              {/* STEP 4 - GROWTH */}
              <g>
                <circle
                  cx="390"
                  cy="45"
                  r="21"
                  fill="#7A00FF"
                  className="growth-node growth-delay-3"
                />

                <path
                  d="M380 48 L387 41 L392 46 L401 35"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />

                <text
                  x="390"
                  y="88"
                  textAnchor="middle"
                  fill="#07194E"
                  fontSize="14"
                  fontWeight="800"
                >
                  Growth
                </text>
              </g>

              {/* Decorative Sparkles */}
              <g className="growth-sparkle">
                <path
                  d="M320 25 L323 34 L332 37 L323 40 L320 49 L317 40 L308 37 L317 34 Z"
                  fill="#00CFFF"
                />
              </g>

              <g className="growth-sparkle growth-delay-2">
                <path
                  d="M95 75 L98 82 L105 85 L98 88 L95 95 L92 88 L85 85 L92 82 Z"
                  fill="#7A00FF"
                />
              </g>
            </svg>
          </div>

          {/* Bottom Status */}
          <div className="relative mt-3 flex items-center justify-between rounded-2xl bg-[#f1f6ff] px-4 py-3">

            <div className="flex items-center gap-3">

              <span className="growth-status-dot relative flex h-3 w-3 rounded-full bg-[#00CFFF]" />

              <div>
                <p className="text-xs font-bold text-[#07194E]">
                  Growth in motion
                </p>

                <p className="mt-1 text-[11px] text-[#505050]">
                  Strategy meets execution
                </p>
              </div>
            </div>

            <ArrowRight
              size={19}
              className="growth-arrow text-[#1254F4]"
            />
          </div>

        </div>
      </div>
    </div>

    {/* =====================================
        EXISTING SERVICES CARDS
    ===================================== */}


<div className="grid gap-5 md:grid-cols-2">
  {services.map((service, index) => (
    <button
      key={service.number}
      className={`
        service-card
        card-lift group
        solify-service-hover
        ${index % 2 === 0 ? "solify-service-hover-blue" : "solify-service-hover-purple"}
        rounded-[24px]
        border border-[#dfe6f1]
        bg-white p-7 text-left
        cursor-pointer
        transition-all duration-500 ease-in-out
        hover:shadow-2xl
      `}
      onClick={() => navigate(`/services/${service.slug}`)}
    >
      {/* Card Header */}
      <div className="mb-14 flex items-start justify-between">

        {/* Card Number */}
        <span
          className="
            text-sm font-bold
            text-[#1254F4]
            transition-colors duration-300
            group-hover:!text-white
          "
        >
          {service.number}
        </span>

        {/* Service Icon */}
        <service.icon
          size={28}
          className="
            text-[#1254F4]
            transition-all duration-300
            group-hover:!text-white
            group-hover:rotate-12
          "
        />
      </div>

      {/* Service Title */}
      <h3
        className="
          font-display text-2xl font-bold
          tracking-tight text-[#07194E]
          transition-colors duration-300
          group-hover:!text-white
        "
      >
        {service.title}
      </h3>

      {/* Service Description */}
      <p
        className="
          mt-3 max-w-sm leading-7
          text-[#505050]
          transition-colors duration-300
          group-hover:!text-white
        "
      >
        {service.text}
      </p>

      {/* Service Tags */}
      <div className="mt-6 flex flex-wrap gap-2">
        {service.items.map((item) => (
          <span
            key={item}
            className="
              rounded-full
              bg-[#f1f6ff]
              px-3 py-2
              text-xs font-semibold
              text-[#1254F4]
              transition-all duration-300
              group-hover:!bg-white/15
              group-hover:!text-white
            "
          >
            {item}
          </span>
        ))}
      </div>

      {/* Discover Capability */}
      <div
        className="
          mt-8 flex items-center gap-2
          text-sm font-bold
          text-[#1254F4]
          transition-colors duration-300
          group-hover:!text-white
        "
      >
        Discover capability

        <ArrowRight
          size={16}
          className="
            transition-transform duration-300
            group-hover:translate-x-2
          "
        />
      </div>
    </button>
  ))}
</div>

  </div>

  {/* =====================================
      ANIMATION STYLES
  ===================================== */}

  <style>{`
    /* Alternating service card hover gradients */
    .solify-service-hover {
      position: relative;
      isolation: isolate;
      overflow: hidden;
      background: white;
      transition: border-color .5s ease, box-shadow .5s ease, transform .5s ease;
    }
    .solify-service-hover::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      opacity: 0;
      transition: opacity .5s ease;
      pointer-events: none;
    }
    .solify-service-hover-blue::before {
      background: linear-gradient(135deg, #1239C5 0%, #0B2DA4 48%, #091A61 100%);
    }
    .solify-service-hover-purple::before {
      background: linear-gradient(135deg, #6700FF 0%, #5100BF 45%, #310B80 100%);
    }
    .solify-service-hover:hover::before,
    .solify-service-hover:focus-visible::before { opacity: 1; }
    .solify-service-hover-blue:hover { border-color: #1239C5 !important; }
    .solify-service-hover-purple:hover { border-color: #6700FF !important; }
    .solify-service-hover:hover h3,
    .solify-service-hover:hover p,
    .solify-service-hover:hover span,
    .solify-service-hover:hover svg,
    .solify-service-hover:hover > div:last-child,
    .solify-service-hover:focus-visible h3,
    .solify-service-hover:focus-visible p,
    .solify-service-hover:focus-visible span,
    .solify-service-hover:focus-visible svg,
    .solify-service-hover:focus-visible > div:last-child {
      color: white !important;
    }
    .solify-service-hover:hover .mt-6 span,
    .solify-service-hover:focus-visible .mt-6 span {
      background: rgba(255,255,255,.16) !important;
    }

    .growth-draw-line {
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: drawGrowthLine 6s ease-in-out infinite;
    }

    @keyframes drawGrowthLine {
      0% {
        stroke-dashoffset: 100;
      }

      75%, 100% {
        stroke-dashoffset: 0;
      }
    }

    .growth-node {
      transform-box: fill-box;
      transform-origin: center;
      animation: growthNodePulse 3s ease-in-out infinite;
    }

    .growth-delay-1 {
      animation-delay: .5s;
    }

    .growth-delay-2 {
      animation-delay: 1s;
    }

    .growth-delay-3 {
      animation-delay: 1.5s;
    }

    @keyframes growthNodePulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }

      50% {
        transform: scale(1.12);
        opacity: .85;
      }
    }

    .growth-sparkle {
      transform-box: fill-box;
      transform-origin: center;
      animation: sparkleFloat 3s ease-in-out infinite;
    }

    @keyframes sparkleFloat {
      0%, 100% {
        transform: translateY(0) scale(1);
        opacity: .5;
      }

      50% {
        transform: translateY(-8px) scale(1.2);
        opacity: 1;
      }
    }

    .growth-pulse {
      animation: iconPulse 3s ease-in-out infinite;
    }

    @keyframes iconPulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(0,207,255,0);
      }

      50% {
        box-shadow: 0 0 0 9px rgba(0,207,255,.08);
      }
    }

    .growth-status-dot {
      animation: statusPulse 2s ease-in-out infinite;
    }

    @keyframes statusPulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(0,207,255,.35);
      }

      50% {
        box-shadow: 0 0 0 7px rgba(0,207,255,0);
      }
    }

    .growth-arrow {
      animation: arrowMove 2s ease-in-out infinite;
    }

    @keyframes arrowMove {
      0%, 100% {
        transform: translateX(0);
      }

      50% {
        transform: translateX(5px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .growth-draw-line {
        animation: none;
        stroke-dashoffset: 0;
      }

      .growth-node,
      .growth-sparkle,
      .growth-pulse,
      .growth-status-dot,
      .growth-arrow {
        animation: none;
      }
    }
  `}</style>
</section>


        

        

{/* ==========================================
    HOW WE WORK - STRAIGHT LINE ANIMATION
========================================== */}

<section className="section-pad grid-pattern overflow-hidden bg-[#F5F4FF]">
  <div className="container-wide">

    {/* HEADING AND ANIMATION */}
    <div className="mb-16 grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">

      {/* LEFT - HEADING */}
      <div>
        <HomeSectionIntro
          eyebrow="How we work"
          title={"A better process\ncreates better momentum."}
        />
      </div>

      {/* RIGHT - ANIMATED STRAIGHT WORKFLOW */}
      <div className="mx-auto w-full max-w-[520px]">

        <div className="relative overflow-hidden rounded-[28px] border border-[#D9E2F0] bg-white/90 p-5 shadow-[0_20px_60px_rgba(7,25,78,0.07)] sm:p-7">

          {/* Background Effects */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#00CFFF]/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#7A00FF]/10 blur-3xl" />

          {/* HEADER */}
          <div className="relative mb-8 flex items-center justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#00CFFF]">
                SOLIFYHUB WORKFLOW
              </p>

              <h3 className="mt-2 font-display text-xl font-bold text-[#07194E]">
                From idea to impact.
              </h3>
            </div>

            <div className="workflow-straight-icon flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf5ff]">
              <Compass
                size={23}
                className="text-[#1254F4]"
              />
            </div>
          </div>

          {/* STRAIGHT HORIZONTAL WORKFLOW */}
          <svg
            viewBox="0 0 500 160"
            className="relative w-full overflow-visible"
            role="img"
            aria-label="Animated straight workflow: Discover, Strategize, Create, Launch, Optimize"
          >
            <defs>
              <linearGradient
                id="solifyStraightGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#1254F4" />
                <stop offset="50%" stopColor="#00CFFF" />
                <stop offset="100%" stopColor="#7A00FF" />
              </linearGradient>

              <filter
                id="solifyStraightGlow"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur
                  stdDeviation="4"
                  result="blur"
                />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* BASE LINE */}
            <line
              x1="48"
              y1="70"
              x2="452"
              y2="70"
              stroke="#D9E2F0"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* ANIMATED LINE - LEFT TO RIGHT */}
            <path
              className="solify-straight-line"
              d="M48 70 H452"
              fill="none"
              stroke="url(#solifyStraightGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              pathLength="100"
            />

            {/* MOVING GLOWING PARTICLE */}
            <circle
              r="7"
              fill="#00CFFF"
              filter="url(#solifyStraightGlow)"
              className="solify-moving-particle"
            >
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                path="M48 70 H452"
              />
            </circle>

            {/* WORKFLOW STEPS */}
            {[
              {
                x: 48,
                number: "01",
                title: "Discover",
                color: "#1254F4",
              },
              {
                x: 149,
                number: "02",
                title: "Strategize",
                color: "#009fd3",
              },
              {
                x: 250,
                number: "03",
                title: "Create",
                color: "#2454d7",
              },
              {
                x: 351,
                number: "04",
                title: "Launch",
                color: "#7A00FF",
              },
              {
                x: 452,
                number: "05",
                title: "Optimize",
                color: "#07194E",
              },
            ].map((step, index) => (

              <g key={step.number}>

                {/* OUTER PULSE CIRCLE */}
                <circle
                  cx={step.x}
                  cy="70"
                  r="25"
                  fill={step.color}
                  opacity="0.12"
                  className="solify-step-halo"
                  style={{
                    animationDelay: `${index * 1.2}s`,
                  }}
                />

                {/* MAIN CIRCLE */}
                <circle
                  cx={step.x}
                  cy="70"
                  r="20"
                  fill={step.color}
                  className="solify-step-circle"
                  style={{
                    animationDelay: `${index * 1.2}s`,
                  }}
                />

                {/* STEP NUMBER */}
                <text
                  x={step.x}
                  y="75"
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontWeight="700"
                >
                  {step.number}
                </text>

                {/* STEP LABEL */}
                <text
                  x={step.x}
                  y="118"
                  textAnchor="middle"
                  fill="#07194E"
                  fontSize="13"
                  fontWeight="700"
                >
                  {step.title}
                </text>
              </g>
            ))}
          </svg>

          {/* BOTTOM PROGRESS INDICATOR */}
          <div className="relative mt-4 rounded-2xl bg-[#f1f6ff] p-4">

            <div className="mb-3 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <span className="solify-status-dot h-2.5 w-2.5 rounded-full bg-[#00CFFF]" />

                <span className="text-xs font-bold text-[#07194E]">
                  Process in motion
                </span>
              </div>

              <span className="text-[11px] font-semibold text-[#1254F4]">
                5 connected steps
              </span>
            </div>

            {/* Animated Progress */}
            <div className="h-1.5 overflow-hidden rounded-full bg-[#D9E2F0]">

              <div className="solify-straight-progress h-full rounded-full bg-gradient-to-r from-[#1254F4] via-[#00CFFF] to-[#7A00FF]" />

            </div>
          </div>
        </div>
      </div>
    </div>

    {/* =====================================
        EXISTING FIVE PROCESS CARDS
    ===================================== */}

    <div className="grid gap-4 md:grid-cols-5">

      {[
        {
          title: "Discover",
          description:
            "We understand your business, audience, goals and challenges.",
        },
        {
          title: "Strategize",
          description:
            "We develop a clear roadmap built around your growth objectives.",
        },
        {
          title: "Create",
          description:
            "We turn ideas into compelling designs, content and experiences.",
        },
        {
          title: "Launch",
          description:
            "We bring campaigns and digital experiences to your audience.",
        },
        {
          title: "Optimize",
          description:
            "We measure performance, refine strategies and improve results.",
        },
      ].map((step, i) => (

        <div
          key={step.title}
          className="process-card group relative rounded-2xl border border-[#D9E2F0] bg-white p-6"
        >

          {/* NUMBER */}
          <span className="process-number font-display text-4xl font-extrabold text-[#d8e6ff]">
            0{i + 1}
          </span>

          {/* TITLE */}
          <h3 className="mt-12 font-display text-xl font-bold text-[#07194E]">
            {step.title}
          </h3>

          {/* DESCRIPTION */}
          <p className="mt-2 text-sm leading-6 text-[#505050]">
            {step.description}
          </p>

          {/* CONNECTOR */}
          {i < 4 && (
            <div className="absolute right-[-16px] top-1/2 z-10 hidden h-px w-8 bg-[#00CFFF] md:block" />
          )}
        </div>
      ))}
    </div>
  </div>

  

  {/* =====================================
      ANIMATION CSS
  ===================================== */}

  <style>{`

    /* STRAIGHT LINE DRAW ANIMATION */
    .solify-straight-line {
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: solifyDrawLine 6s linear infinite;
    }

    @keyframes solifyDrawLine {
      0% {
        stroke-dashoffset: 100;
      }

      100% {
        stroke-dashoffset: 0;
      }
    }

    /* STEP CIRCLE ANIMATION */
    .solify-step-circle {
      transform-box: fill-box;
      transform-origin: center;
      animation: solifyStepPulse 6s ease-in-out infinite;
    }

    @keyframes solifyStepPulse {
      0%, 15%, 100% {
        transform: scale(1);
      }

      8% {
        transform: scale(1.18);
      }
    }

    /* HALO GLOW ANIMATION */
    .solify-step-halo {
      transform-box: fill-box;
      transform-origin: center;
      animation: solifyHaloPulse 6s ease-in-out infinite;
    }

    @keyframes solifyHaloPulse {
      0%, 15%, 100% {
        transform: scale(1);
        opacity: 0.1;
      }

      8% {
        transform: scale(1.6);
        opacity: 0.35;
      }
    }

    /* PROGRESS BAR */
    .solify-straight-progress {
      width: 0%;
      animation: solifyProgress 6s linear infinite;
    }

    @keyframes solifyProgress {
      0% {
        width: 0%;
      }

      100% {
        width: 100%;
      }
    }

    /* STATUS DOT */
    .solify-status-dot {
      animation: solifyStatus 2s ease-in-out infinite;
    }

    @keyframes solifyStatus {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(0,207,255,.4);
      }

      50% {
        box-shadow: 0 0 0 7px rgba(0,207,255,0);
      }
    }

    /* HEADER ICON */
    .workflow-straight-icon {
      animation: solifyIconGlow 3s ease-in-out infinite;
    }

    @keyframes solifyIconGlow {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(0,207,255,0);
      }

      50% {
        box-shadow: 0 0 0 10px rgba(0,207,255,.08);
      }
    }

    /* REDUCED MOTION */
    @media (prefers-reduced-motion: reduce) {

      .solify-straight-line {
        animation: none;
        stroke-dashoffset: 0;
      }

      .solify-step-circle,
      .solify-step-halo,
      .solify-status-dot,
      .workflow-straight-icon {
        animation: none;
      }

      .solify-moving-particle {
        display: none;
      }

      .solify-straight-progress {
        animation: none;
        width: 100%;
      }
    }
  `}</style>
</section>



        {/* =====================================
            WHY SOLIFYHUB
        ===================================== */}
        <section className="section-pad bg-white">
          <div className="container-wide">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_.8fr]">
              <div>
                <HomeSectionIntro
                  eyebrow="Why SOLIFYHUB"
                  title={"Good work is nice.\nUseful work is better."}
                  body="We bring the energy of a creative studio and the discipline of a growth team. No vanity metrics. No one-size-fits-all playbooks. Just thoughtful work with a clear job to do."
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      n: "01",
                      t: "Strategy first",
                      Icon: Target,
                    },
                    {
                      n: "02",
                      t: "Creative branding",
                      Icon: Sparkles,
                    },
                    {
                      n: "03",
                      t: "Data-led decisions",
                      Icon: BarChart3,
                    },
                    {
                      n: "04",
                      t: "Business growth",
                      Icon: Zap,
                    },
                  ].map(({ n, t, Icon }) => (
                    <div
                      key={n}
                      className="why-card group rounded-2xl border border-[#F5F7FA] p-5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1254F4]">
                          {n}
                        </span>

                        <Icon
                          size={18}
                          className="text-[#1254F4]"
                        />
                      </div>

                      <p className="mt-8 font-semibold text-[#07194E]">
                        {t}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[28px] bg-[#07194E] p-8 text-white">
                <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-[#7A00FF] opacity-60 blur-3xl" />

                <div className="relative">
                  <Lightbulb
                    className="text-[#00CFFF]"
                    size={34}
                  />

                  <p className="mt-20 font-display text-4xl font-bold leading-tight">
                    The best digital work feels obvious in
                    hindsight.
                  </p>

                  <p className="mt-5 leading-7 text-white/60">
                    We make the complex feel clear so your
                    audience knows exactly why you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

{/* =====================================
            INDUSTRIES
        ===================================== */}
        <section className="section-pad bg-white">
          <div className="container-wide">
           

            <div className="flex flex-wrap items-end justify-between gap-8">
              <HomeSectionIntro
                eyebrow="Built for your world"
                title={"Relevant thinking\nfor real industries."}
              />

              <button
                className="btn-ghost mb-14"
                onClick={() => navigate("/industries")}
              >
                View all industries
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
              {/* Industry Navigation */}
              <div className="flex flex-col">
                {industries.map((item, i) => (
                  <button
                    key={item.name}
                    onClick={() => setIndustry(i)}
                    className={`group flex items-center justify-between border-b border-[#F5F7FA] py-5 text-left ${
                      industry === i
                        ? "text-[#1254F4]"
                        : "text-[#505050]"
                    }`}
                  >
                    <span
                      className={`font-display text-2xl font-bold transition-transform ${
                        industry === i ? "translate-x-3" : ""
                      }`}
                    >
                      {item.name}
                    </span>

                    <ChevronRight
                      size={20}
                      className={
                        industry === i ? "text-[#00CFFF]" : ""
                      }
                    />
                  </button>
                ))}
              </div>

              {/* Selected Industry Preview */}
              <div className="relative min-h-[390px] overflow-hidden rounded-[28px]">
                <img
                  src={industries[industry].image}
                  alt={industries[industry].name}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#07194E]/85 via-transparent to-transparent" />

                <div className="absolute bottom-0 p-8 text-white">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#00CFFF]">
                    SOLIFYHUB for {industries[industry].name}
                  </p>

                  <p className="max-w-lg text-xl font-semibold leading-8">
                    {industries[industry].desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================
            BLOGS & INSIGHTS
        ===================================== */}
        <section className="section-pad bg-[#07194E] text-white">
          <div className="container-wide">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow !text-[#00CFFF] mb-5 !text-[16px] sm:!text-[18px] !font-extrabold !tracking-[0.08em]">
                  Selected perspectives
                </p>

                <h2 className="section-title !text-white">
                  Ideas worth
                  <br />
                  <span className="text-[#00CFFF]">
                    taking with you.
                  </span>
                </h2>
              </div>

              <button
                className="btn-ghost !border-white/20 !bg-transparent !text-white hover:!bg-white/10"
                onClick={() => navigate("/blogs")}
              >
                Explore all insights
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {posts.map((post) => (
                <button
                  key={post.title}
                  className="group text-left"
                  onClick={() => navigate("/blogs/article")}
                >
                  <div className="mb-5 aspect-[1.25] overflow-hidden rounded-2xl">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[.15em] text-[#00CFFF]">
                    {post.category} · {post.date}
                  </p>

                  <h3 className="mt-3 font-display text-xl font-bold leading-7 text-white">
                    {post.title}
                  </h3>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white/70">
                    Read article
                    <ArrowRight size={15} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================
            FREQUENTLY ASKED QUESTIONS
        ===================================== */}
        <section className="section-pad bg-white">
          <div className="container-wide grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <HomeSectionIntro
                eyebrow="Questions, answered"
                title={"A little more\nclarity."}
              />
            </div>

            <div>
              {faqs.map((item, i) => (
                <button
                  key={item.question}
                  onClick={() => setFaq(faq === i ? -1 : i)}
                  className="block w-full border-b border-[#F5F7FA] py-6 text-left"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-lg font-bold text-[#07194E]">
                      {item.question}
                    </span>

                    <ChevronDown
                      size={20}
                      className={`text-[#1254F4] transition-transform ${
                        faq === i ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {faq === i && (
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[#505050]">
                      {item.answer}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================
            FINAL CALL TO ACTION
        ===================================== */}
        <CTA />
      </main>
    </>
  );
}
