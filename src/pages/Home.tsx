
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

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
  Search,
  PenTool,
  Rocket,
  TrendingUp,
  CheckCircle2,
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

/* ============================================
   SEO STRUCTURED DATA
============================================ */

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SOLIFYHUB",
  description:
    "Creative digital marketing agency in Visakhapatnam offering branding, web design, advertising, social media, video production and performance marketing.",
  url: "https://solifyhub.com",
  logo: "https://solifyhub.com/logo_png.png",
  email: "info@solifyhub.com",
  telephone: "+91-86888-29033",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "34-31/3, Door No 49, Main Road, Akkayyapalem",
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
  url: "https://solifyhub.com",
  telephone: "+91-86888-29033",
  email: "info@solifyhub.com",
  address: organizationSchema.address,
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.7231,
    longitude: 83.2946,
  },
  areaServed: {
    "@type": "Place",
    name: "Visakhapatnam, Andhra Pradesh, India",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SOLIFYHUB",
  url: "https://solifyhub.com",
};

/* ============================================
   SCROLL REVEAL COMPONENT
============================================ */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      element.classList.add("sh-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("sh-visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`sh-reveal ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ============================================
   INTERACTIVE 3D CARD
============================================ */

function TiltCard({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    if (
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width;
    const y =
      (event.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - y) * 6;
    const rotateY = (x - 0.5) * 6;

    element.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

    element.style.setProperty(
      "--mouse-x",
      `${x * 100}%`
    );
    element.style.setProperty(
      "--mouse-y",
      `${y * 100}%`
    );
  };

  const reset = () => {
    if (ref.current) {
      ref.current.style.transform = "";
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      className={`sh-tilt ${className}`}
    >
      {children}
    </button>
  );
}

/* ============================================
   SECTION HEADING
============================================ */

function SectionIntro({
  eyebrow,
  title,
  body,
  light = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  light?: boolean;
}) {
  const lines = title.split("\n");

  return (
    <div className="w-full min-w-0">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-[2px] w-8 bg-[#1254F4]" />

        <span
          className={`text-sm font-extrabold uppercase tracking-[0.12em] ${
            light
              ? "text-[#00CFFF]"
              : "text-[#1254F4]"
          }`}
        >
          {eyebrow}
        </span>
      </div>

      <h2
        className="max-w-full break-words text-[clamp(2.2rem,4.5vw,4.7rem)] font-black leading-[1.06] tracking-[-0.055em]"
        style={{
          fontFamily: "Inter, sans-serif",
        }}
      >
        {lines.map((line, index) => (
          <span
            key={index}
            className={`block ${
              index === 0
                ? light
                  ? "text-white"
                  : "text-[#07194E]"
                : light
                ? "text-[#00CFFF]"
                : "sh-gradient-text"
            }`}
          >
            {line}
          </span>
        ))}
      </h2>

      {body && (
        <p
          className={`mt-7 max-w-2xl text-base leading-8 sm:text-lg ${
            light
              ? "text-white/65"
              : "text-[#58647A]"
          }`}
        >
          {body}
        </p>
      )}
    </div>
  );
}

/* ============================================
   ANIMATED GROWTH ENGINE
============================================ */

const growthSteps = [
  {
    x: 50,
    y: 190,
    label: "Strategy",
    color: "#1254F4",
  },
  {
    x: 150,
    y: 155,
    label: "Creative",
    color: "#00A9E8",
  },
  {
    x: 260,
    y: 115,
    label: "Launch",
    color: "#2454D7",
  },
  {
    x: 390,
    y: 45,
    label: "Growth",
    color: "#7A00FF",
  },
];

function GrowthVisual() {
  const path =
    "M50 190 C95 190 100 155 150 155 S225 115 260 115 S345 55 390 45";

  return (
    <div className="sh-visual relative mx-auto w-full max-w-[530px]">
      <div className="sh-glass relative overflow-hidden rounded-[30px] border border-[#DCE6F5] p-6 sm:p-8">
        <div className="sh-orb absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#00CFFF]/15 blur-3xl" />

        <div className="relative mb-7 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#1254F4]">
              SOLIFYHUB Growth Engine
            </p>

            <h3 className="mt-2 text-xl font-extrabold text-[#07194E]">
              Ideas into impact.
            </h3>
          </div>

          <div className="sh-icon-pulse flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF2FF]">
            <TrendingUp
              size={24}
              className="text-[#1254F4]"
            />
          </div>
        </div>

        <svg
          viewBox="0 0 440 245"
          className="relative w-full"
          role="img"
          aria-label="Strategy, Creative, Launch and Growth"
        >
          <defs>
            <linearGradient
              id="shGrowthGradient"
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

            <filter id="shGlow">
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

          {[45, 85, 125, 165, 205].map(
            (y) => (
              <line
                key={y}
                x1="12"
                y1={y}
                x2="428"
                y2={y}
                stroke="#DCE6F5"
                strokeDasharray="4 7"
              />
            )
          )}

          <path
            d={path}
            fill="none"
            stroke="#DCE6F5"
            strokeWidth="6"
            strokeLinecap="round"
          />

          <path
            d={path}
            fill="none"
            stroke="url(#shGrowthGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            pathLength="100"
            className="sh-growth-line"
          />

          <circle
            r="6"
            fill="#00CFFF"
            filter="url(#shGlow)"
            className="sh-moving-dot"
          >
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path={path}
            />
          </circle>

          {growthSteps.map((step, index) => (
            <g key={step.label}>
              <circle
                cx={step.x}
                cy={step.y}
                r={index === 3 ? 22 : 17}
                fill={step.color}
                className="sh-growth-node"
                style={{
                  animationDelay: `${index * 0.5}s`,
                }}
              />

              <circle
                cx={step.x}
                cy={step.y}
                r="5"
                fill="white"
              />

              <text
                x={step.x}
                y={step.y + 39}
                textAnchor="middle"
                fill="#07194E"
                fontSize="13"
                fontWeight="700"
              >
                {step.label}
              </text>
            </g>
          ))}
        </svg>

        <div className="relative mt-4 flex items-center justify-between rounded-2xl bg-[#F0F5FF] p-4">
          <div className="flex items-center gap-3">
            <span className="sh-status-dot h-3 w-3 rounded-full bg-[#00CFFF]" />

            <div>
              <p className="text-xs font-extrabold text-[#07194E]">
                Growth in motion
              </p>

              <p className="mt-1 text-xs text-[#58647A]">
                Strategy meets execution
              </p>
            </div>
          </div>

          <ArrowRight
            size={20}
            className="sh-arrow text-[#1254F4]"
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================
   ANIMATED WORKFLOW
============================================ */

const workflow = [
  {
    title: "Discover",
    description:
      "We understand your business, audience, goals and challenges.",
    icon: Search,
    color: "#1254F4",
  },
  {
    title: "Strategize",
    description:
      "We develop a clear roadmap built around your growth objectives.",
    icon: Target,
    color: "#00A9E8",
  },
  {
    title: "Create",
    description:
      "We turn ideas into compelling designs, content and experiences.",
    icon: PenTool,
    color: "#2454D7",
  },
  {
    title: "Launch",
    description:
      "We bring campaigns and digital experiences to your audience.",
    icon: Rocket,
    color: "#7A00FF",
  },
  {
    title: "Optimize",
    description:
      "We measure performance, refine strategies and improve results.",
    icon: TrendingUp,
    color: "#07194E",
  },
];

function WorkflowVisual() {
  return (
    <div className="sh-visual mx-auto w-full max-w-[550px]">
      <div className="sh-glass relative overflow-hidden rounded-[30px] border border-[#DCE6F5] p-5 sm:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#1254F4]">
              SOLIFYHUB Workflow
            </p>

            <h3 className="mt-2 text-xl font-extrabold text-[#07194E]">
              From idea to impact.
            </h3>
          </div>

          <div className="sh-icon-pulse flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF2FF]">
            <Compass
              size={24}
              className="text-[#1254F4]"
            />
          </div>
        </div>

        <svg
          viewBox="0 0 500 160"
          className="w-full"
          role="img"
          aria-label="Five-step workflow from Discover to Optimize"
        >
          <defs>
            <linearGradient
              id="shWorkflowGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor="#1254F4"
              />
              <stop
                offset="50%"
                stopColor="#00CFFF"
              />
              <stop
                offset="100%"
                stopColor="#7A00FF"
              />
            </linearGradient>
          </defs>

          <line
            x1="48"
            y1="70"
            x2="452"
            y2="70"
            stroke="#DCE6F5"
            strokeWidth="6"
            strokeLinecap="round"
          />

          <path
            d="M48 70 H452"
            stroke="url(#shWorkflowGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            pathLength="100"
            className="sh-workflow-line"
          />

          <circle
            r="6"
            fill="#00CFFF"
            className="sh-moving-dot"
          >
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path="M48 70 H452"
            />
          </circle>

          {workflow.map((step, index) => {
            const x = 48 + index * 101;

            return (
              <g key={step.title}>
                <circle
                  cx={x}
                  cy="70"
                  r="26"
                  fill={step.color}
                  opacity="0.12"
                  className="sh-workflow-halo"
                  style={{
                    animationDelay: `${index * 1.2}s`,
                  }}
                />

                <circle
                  cx={x}
                  cy="70"
                  r="20"
                  fill={step.color}
                  className="sh-workflow-node"
                  style={{
                    animationDelay: `${index * 1.2}s`,
                  }}
                />

                <text
                  x={x}
                  y="75"
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontWeight="700"
                >
                  0{index + 1}
                </text>

                <text
                  x={x}
                  y="120"
                  textAnchor="middle"
                  fill="#07194E"
                  fontSize="13"
                  fontWeight="700"
                >
                  {step.title}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="mt-5 rounded-2xl bg-[#F0F5FF] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="sh-status-dot h-2.5 w-2.5 rounded-full bg-[#00CFFF]" />

              <span className="text-xs font-extrabold text-[#07194E]">
                Process in motion
              </span>
            </div>

            <span className="text-xs font-bold text-[#1254F4]">
              5 connected steps
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-[#DCE6F5]">
            <div className="sh-progress h-full rounded-full bg-gradient-to-r from-[#1254F4] via-[#00CFFF] to-[#7A00FF]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   FAQ DATA
============================================ */

const faqs = [
  {
    question:
      "How do we get started with SOLIFYHUB?",
    answer:
      "Getting started is simple. Share your business goals and requirements with our team. We'll discuss your needs, understand your audience, and recommend a tailored strategy, project scope, and next steps.",
  },
  {
    question:
      "What size businesses do you work with?",
    answer:
      "We work with startups, small and medium-sized businesses, and established brands. Whether you're building your first digital presence or expanding your marketing efforts, we tailor our creative and digital solutions to your goals and budget.",
  },
  {
    question:
      "Do you offer one-off projects or monthly partnerships?",
    answer:
      "Yes, we offer both. You can work with us on a one-time project such as branding, website design, or video production, or choose an ongoing partnership for social media, campaigns, digital marketing, and continuous brand support.",
  },
];

/* ============================================
   MAIN HOME PAGE
============================================ */

export default function Home() {
  useSEO({
    title:
      "Digital Marketing Agency in Visakhapatnam | SOLIFYHUB",
    description:
      "SOLIFYHUB is a digital marketing agency in Visakhapatnam offering SEO, branding, web design, social media marketing and advertising to grow your business.",
    path: "/",
    keywords:
      "digital marketing agency Visakhapatnam, creative agency Vizag, branding Visakhapatnam, web design Andhra Pradesh, advertising agency Vizag, social media marketing Visakhapatnam, SEO Visakhapatnam",
    schema: [
      organizationSchema,
      localBusinessSchema,
      websiteSchema,
    ],
  });

  const [industry, setIndustry] = useState(0);
  const [faq, setFaq] = useState<number | null>(0);

  const activeIndustry = industries[industry];

  useEffect(() => {
    const canonicalUrl = "https://solifyhub.com/";

    const links = Array.from(
      document.querySelectorAll<HTMLLinkElement>(
        'link[rel="canonical"]'
      )
    );

    const canonical =
      links[0] ?? document.createElement("link");

    canonical.rel = "canonical";
    canonical.href = canonicalUrl;

    if (!canonical.isConnected) {
      document.head.appendChild(canonical);
    }

    links.slice(1).forEach((link) => link.remove());
  }, []);

  return (
    <>
      {/* =====================================
          EXISTING HERO & MARQUEE
      ===================================== */}

      <Hero />
      <Marquee />

      <main className="sh-home overflow-hidden">

        {/* =====================================
            ABOUT SOLIFYHUB
        ===================================== */}

        <section className="section-pad relative bg-white">
          <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-[#1254F4]/5 blur-[90px]" />

          <div className="container-wide relative grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">

            <Reveal>
              <SectionIntro
                eyebrow="About SOLIFYHUB"
                title={
                  "Make your next move\nwith more clarity."
                }
                body="SOLIFYHUB is a creative company for businesses ready to make a bigger impression. We connect the dots between what you want to say, what your audience needs to hear and the actions that move your business forward."
              />

              <button
                type="button"
                onClick={() => navigate("/about-us")}
                className="sh-primary-btn mt-9 inline-flex items-center gap-3 rounded-full bg-[#1254F4] px-7 py-4 text-sm font-bold text-white"
              >
                Discover SOLIFYHUB
                <ArrowRight size={18} />
              </button>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2">
              <Reveal delay={100}>
                <div className="sh-dark-card group relative h-full min-h-[360px] overflow-hidden rounded-[28px] bg-[#07194E] p-8 text-white sm:translate-y-8">
                  <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#1254F4]/40 blur-3xl" />

                  <div className="relative flex h-full flex-col">
                    <Compass
                      size={36}
                      className="sh-icon-float text-[#00CFFF]"
                    />

                    <div className="mt-auto pt-20">
                      <p className="text-2xl font-extrabold">
                        Strategy before noise.
                      </p>

                      <p className="mt-4 text-sm leading-7 text-white/65">
                        Every strong result begins with
                        a clear point of view. We create
                        purposeful digital experiences,
                        memorable brands, and growth-focused
                        strategies that connect businesses
                        with the right audiences.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="sh-image-card relative h-full min-h-[360px] overflow-hidden rounded-[28px]">
                  <img
                    src="https://images.pexels.com/photos/1181738/pexels-photo-1181738.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Creative team discussing digital strategy"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#07194E]/65 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 flex items-center gap-2 text-sm font-bold text-white">
                    <Sparkles
                      size={18}
                      className="text-[#00CFFF]"
                    />
                    Creativity meets strategy
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* =====================================
            OUR SERVICES
        ===================================== */}

        <section className="section-pad relative bg-[#F5F7FF]">
          <div className="container-wide">

            <div className="mb-16 grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
              <Reveal>
                <SectionIntro
                  eyebrow="What we do"
                  title={
                    "Eleven capabilities.\nOne growth partner."
                  }
                  body="From the first search to the final click, we build connected experiences that give your brand more room to grow."
                />

                <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#DCE6F5] bg-white px-5 py-3 text-xs font-bold text-[#1254F4]">
                  <Sparkles size={16} />
                  Creative + Strategy + Performance
                </div>
              </Reveal>

              <Reveal delay={150}>
                <GrowthVisual />
              </Reveal>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {services.map((service, index) => (
                <Reveal
                  key={service.number}
                  delay={(index % 2) * 100}
                  className="h-full"
                >
                  <TiltCard
                    onClick={() =>
                      navigate(
                        `/services/${service.slug}`
                      )
                    }
                    className={`sh-service-card group relative flex h-full w-full flex-col overflow-hidden rounded-[26px] border border-[#DFE7F4] bg-white p-7 text-left sm:p-9 ${
                      index % 2 === 0
                        ? "sh-service-blue"
                        : "sh-service-purple"
                    }`}
                  >
                    <div className="relative z-10 mb-14 flex items-start justify-between">
                      <span className="sh-service-color text-sm font-extrabold text-[#1254F4]">
                        {service.number}
                      </span>

                      <div className="sh-service-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#1254F4]">
                        <service.icon size={25} />
                      </div>
                    </div>

                    <h3 className="sh-service-color relative z-10 text-2xl font-extrabold tracking-tight text-[#07194E]">
                      {service.title}
                    </h3>

                    <p className="sh-service-muted relative z-10 mt-4 max-w-lg text-sm leading-7 text-[#58647A] sm:text-base">
                      {service.text}
                    </p>

                    <div className="relative z-10 mt-7 flex flex-wrap gap-2">
                      {service.items.map((item) => (
                        <span
                          key={item}
                          className="sh-service-tag rounded-full bg-[#F0F5FF] px-3 py-2 text-xs font-semibold text-[#1254F4]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="sh-service-color relative z-10 mt-auto flex items-center gap-2 pt-9 text-sm font-extrabold text-[#1254F4]">
                      Discover capability

                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-2"
                      />
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================
            HOW WE WORK
        ===================================== */}

        <section className="section-pad sh-dots relative bg-[#F8FAFF]">
          <div className="container-wide">

            <div className="mb-16 grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
              <Reveal>
                <SectionIntro
                  eyebrow="How we work"
                  title={
                    "A better process\ncreates better momentum."
                  }
                  body="A collaborative, transparent process that takes your business from discovery to continuous improvement."
                />
              </Reveal>

              <Reveal delay={150}>
                <WorkflowVisual />
              </Reveal>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {workflow.map((step, index) => {
                const Icon = step.icon;

                return (
                  <Reveal
                    key={step.title}
                    delay={index * 70}
                    className="h-full"
                  >
                    <div className="sh-process-card group relative h-full overflow-hidden rounded-[24px] border border-[#DCE6F5] bg-white p-6">
                      <div className="flex items-center justify-between">
                        <span className="text-4xl font-black text-[#D8E6FF]">
                          0{index + 1}
                        </span>

                        <Icon
                          size={23}
                          className="text-[#1254F4] transition-transform duration-300 group-hover:rotate-12"
                        />
                      </div>

                      <h3 className="mt-12 text-xl font-extrabold text-[#07194E]">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-[#58647A]">
                        {step.description}
                      </p>

                      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#1254F4] to-[#00CFFF] transition-all duration-500 group-hover:w-full" />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================
            WHY SOLIFYHUB
        ===================================== */}

        <section className="section-pad bg-white">
          <div className="container-wide grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">

            <Reveal>
              <SectionIntro
                eyebrow="Why SOLIFYHUB"
                title={
                  "Good work is nice.\nUseful work is better."
                }
                body="We bring the energy of a creative studio and the discipline of a growth team. No vanity metrics. No one-size-fits-all playbooks. Just thoughtful work with a clear job to do."
              />

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    n: "01",
                    title: "Strategy first",
                    Icon: Target,
                  },
                  {
                    n: "02",
                    title: "Creative branding",
                    Icon: Sparkles,
                  },
                  {
                    n: "03",
                    title: "Data-led decisions",
                    Icon: BarChart3,
                  },
                  {
                    n: "04",
                    title: "Business growth",
                    Icon: Zap,
                  },
                ].map(({ n, title, Icon }) => (
                  <div
                    key={n}
                    className="sh-why-card group relative overflow-hidden rounded-2xl border border-[#E3EAF5] bg-white p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1254F4]">
                        {n}
                      </span>

                      <Icon
                        size={21}
                        className="text-[#1254F4] transition-transform duration-300 group-hover:scale-125"
                      />
                    </div>

                    <p className="mt-9 font-bold text-[#07194E]">
                      {title}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="sh-dark-card relative min-h-[460px] overflow-hidden rounded-[30px] bg-[#07194E] p-8 text-white sm:p-11">
                <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[#7A00FF]/60 blur-[85px]" />

                <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#1254F4]/50 blur-[85px]" />

                <div className="relative">
                  <Lightbulb
                    size={40}
                    className="sh-icon-float text-[#00CFFF]"
                  />

                  <p className="mt-24 text-[clamp(2rem,3vw,3.1rem)] font-extrabold leading-tight tracking-tight">
                    The best digital work feels obvious
                    in hindsight.
                  </p>

                  <p className="mt-6 max-w-md leading-8 text-white/70">
                    We make the complex feel clear
                    so your audience knows exactly
                    why you.
                  </p>

                  <div className="mt-9 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00CFFF]">
                    <CheckCircle2 size={17} />
                    Built for meaningful impact
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =====================================
            INDUSTRIES
        ===================================== */}

        {activeIndustry && (
          <section className="section-pad bg-[#F8FAFF]">
            <div className="container-wide">

              <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
                <Reveal>
                  <SectionIntro
                    eyebrow="Built for your world"
                    title={
                      "Relevant thinking\nfor real industries."
                    }
                  />
                </Reveal>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/industries")
                  }
                  className="sh-outline-btn inline-flex items-center gap-2 rounded-full border border-[#C9D9F4] px-6 py-3 text-sm font-bold text-[#1254F4]"
                >
                  View all industries
                  <ArrowRight size={17} />
                </button>
              </div>

              <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">

                <div className="flex flex-col">
                  {industries.map((item, index) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() =>
                        setIndustry(index)
                      }
                      aria-pressed={
                        industry === index
                      }
                      className={`group flex items-center justify-between gap-3 border-b border-[#DFE6F1] py-5 text-left transition-all duration-300 ${
                        industry === index
                          ? "text-[#1254F4]"
                          : "text-[#58647A] hover:text-[#1254F4]"
                      }`}
                    >
                      <span
                        className={`text-xl font-extrabold transition-transform duration-300 sm:text-2xl ${
                          industry === index
                            ? "translate-x-2"
                            : "group-hover:translate-x-2"
                        }`}
                      >
                        {item.name}
                      </span>

                      <ChevronRight
                        size={20}
                        className={
                          industry === index
                            ? "text-[#1254F4]"
                            : ""
                        }
                      />
                    </button>
                  ))}
                </div>

                <div className="sh-industry relative min-h-[390px] overflow-hidden rounded-[30px] bg-[#07194E] sm:min-h-[460px]">
                  <img
                    key={activeIndustry.image}
                    src={activeIndustry.image}
                    alt={activeIndustry.name}
                    loading="lazy"
                    decoding="async"
                    className="sh-industry-image absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#07194E]/95 via-[#07194E]/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white sm:p-10">
                    <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#00CFFF]">
                      SOLIFYHUB for{" "}
                      {activeIndustry.name}
                    </p>

                    <p className="max-w-xl text-xl font-semibold leading-8 sm:text-2xl">
                      {activeIndustry.desc}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        navigate("/industries")
                      }
                      className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#00CFFF] transition-all hover:gap-4"
                    >
                      Explore industries
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================
            BLOGS & INSIGHTS
        ===================================== */}

        <section className="section-pad relative overflow-hidden bg-[#07194E] text-white">
          <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#1254F4]/20 blur-[100px]" />

          <div className="container-wide relative">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <Reveal>
                <SectionIntro
                  eyebrow="Selected perspectives"
                  title={
                    "Ideas worth\ntaking with you."
                  }
                  light
                />
              </Reveal>

              <button
                type="button"
                onClick={() =>
                  navigate("/blogs")
                }
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-white/10"
              >
                Explore all insights
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="mt-14 grid gap-7 md:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal
                  key={`${post.title}-${index}`}
                  delay={index * 90}
                  className="h-full"
                >
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/blogs/article")
                    }
                    className="sh-blog group block h-full w-full text-left"
                  >
                    <div className="relative mb-5 aspect-[1.25] overflow-hidden rounded-[22px] bg-white/10">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        className="sh-blog-image h-full w-full object-cover"
                      />

                      <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1254F4] opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <ArrowRight size={19} />
                      </div>
                    </div>

                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#00CFFF]">
                      {post.category} · {post.date}
                    </p>

                    <h3 className="mt-3 text-xl font-extrabold leading-8 text-white transition-colors duration-300 group-hover:text-[#00CFFF]">
                      {post.title}
                    </h3>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white/70">
                      Read article
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-2"
                      />
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================
            FREQUENTLY ASKED QUESTIONS
        ===================================== */}

        <section className="section-pad bg-white">
          <div className="container-wide grid gap-12 lg:grid-cols-[.8fr_1.2fr]">

            <Reveal>
              <SectionIntro
                eyebrow="Questions, answered"
                title={
                  "A little more\nclarity."
                }
                body="Everything you need to know before we start building something great together."
              />
            </Reveal>

            <Reveal delay={100}>
              <div className="divide-y divide-[#E2E9F3]">
                {faqs.map((item, index) => {
                  const isOpen = faq === index;

                  return (
                    <div
                      key={item.question}
                      className="py-2"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setFaq(
                            isOpen ? null : index
                          )
                        }
                        aria-expanded={isOpen}
                        aria-controls={`sh-faq-${index}`}
                        className="flex w-full items-center justify-between gap-5 py-5 text-left"
                      >
                        <span className="text-base font-extrabold text-[#07194E] sm:text-lg">
                          {item.question}
                        </span>

                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                            isOpen
                              ? "bg-[#1254F4] text-white"
                              : "bg-[#EEF4FF] text-[#1254F4]"
                          }`}
                        >
                          <ChevronDown
                            size={19}
                            className={`transition-transform duration-300 ${
                              isOpen
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </span>
                      </button>

                      <div
                        id={`sh-faq-${index}`}
                        hidden={!isOpen}
                      >
                        {isOpen && (
                          <p className="sh-faq-answer max-w-2xl pb-6 pr-8 text-sm leading-8 text-[#58647A] sm:text-base">
                            {item.answer}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* =====================================
            EXISTING CTA
        ===================================== */}

        <CTA />
      </main>

      {/* =====================================
          COMPLETE ANIMATION STYLES
      ===================================== */}

      <style>{`
        .sh-home {
          --sh-blue: #1254F4;
          --sh-navy: #07194E;
          --sh-cyan: #00CFFF;
          --sh-purple: #7A00FF;
        }

        .sh-gradient-text {
          background: linear-gradient(
            110deg,
            #1254F4 0%,
            #2962F0 45%,
            #7A00FF 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* SCROLL REVEAL */

        .sh-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity .75s cubic-bezier(.22,1,.36,1),
            transform .75s cubic-bezier(.22,1,.36,1);
        }

        .sh-reveal.sh-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* 3D TILT */

        .sh-tilt {
          transform-style: preserve-3d;
          transition:
            transform .25s ease-out,
            box-shadow .4s ease;
          will-change: transform;
        }

        .sh-tilt:focus-visible {
          outline: 3px solid #00CFFF;
          outline-offset: 3px;
        }

        /* PRIMARY BUTTON */

        .sh-primary-btn {
          position: relative;
          overflow: hidden;
          transition:
            transform .35s ease,
            box-shadow .35s ease,
            background .35s ease;
        }

        .sh-primary-btn:hover {
          transform: translateY(-4px);
          background: #0B2DA4;
          box-shadow:
            0 16px 35px rgba(18,84,244,.25);
        }

        .sh-primary-btn svg {
          transition: transform .3s ease;
        }

        .sh-primary-btn:hover svg {
          transform: translateX(5px);
        }

        .sh-outline-btn {
          transition:
            background .3s ease,
            transform .3s ease;
        }

        .sh-outline-btn:hover {
          background: #EAF2FF;
          transform: translateY(-3px);
        }

        /* GLASS VISUAL */

        .sh-glass {
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.98),
              rgba(244,248,255,.9)
            );
          box-shadow:
            0 25px 70px rgba(7,25,78,.08),
            inset 0 1px 0 rgba(255,255,255,.9);
          backdrop-filter: blur(14px);
        }

        .sh-visual {
          animation: shVisualFloat 7s ease-in-out infinite;
        }

        @keyframes shVisualFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-7px);
          }
        }

        .sh-orb {
          animation: shOrbFloat 8s ease-in-out infinite;
        }

        @keyframes shOrbFloat {
          0%, 100% {
            transform: translate(0,0);
          }
          50% {
            transform: translate(-25px,20px);
          }
        }

        /* GROWTH ENGINE */

        .sh-growth-line {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: shDrawGrowth 6s ease-in-out infinite;
        }

        @keyframes shDrawGrowth {
          0% {
            stroke-dashoffset: 100;
          }
          75%, 100% {
            stroke-dashoffset: 0;
          }
        }

        .sh-growth-node {
          transform-box: fill-box;
          transform-origin: center;
          animation: shNodePulse 3s ease-in-out infinite;
        }

        @keyframes shNodePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.12);
          }
        }

        /* WORKFLOW */

        .sh-workflow-line {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: shDrawWorkflow 6s linear infinite;
        }

        @keyframes shDrawWorkflow {
          from {
            stroke-dashoffset: 100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .sh-workflow-node {
          transform-box: fill-box;
          transform-origin: center;
          animation: shWorkflowPulse 6s ease-in-out infinite;
        }

        @keyframes shWorkflowPulse {
          0%, 15%, 100% {
            transform: scale(1);
          }
          8% {
            transform: scale(1.17);
          }
        }

        .sh-workflow-halo {
          transform-box: fill-box;
          transform-origin: center;
          animation: shHalo 6s ease-in-out infinite;
        }

        @keyframes shHalo {
          0%, 15%, 100% {
            transform: scale(1);
            opacity: .1;
          }
          8% {
            transform: scale(1.6);
            opacity: .35;
          }
        }

        .sh-progress {
          width: 0;
          animation: shProgress 6s linear infinite;
        }

        @keyframes shProgress {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        /* STATUS ANIMATIONS */

        .sh-status-dot {
          animation: shStatus 2s ease-in-out infinite;
        }

        @keyframes shStatus {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(0,207,255,.35);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(0,207,255,0);
          }
        }

        .sh-icon-pulse {
          animation: shIconPulse 3s ease-in-out infinite;
        }

        @keyframes shIconPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(0,207,255,0);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(0,207,255,.08);
          }
        }

        .sh-icon-float {
          animation: shIconFloat 4s ease-in-out infinite;
        }

        @keyframes shIconFloat {
          0%, 100% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-8px) rotate(5deg);
          }
        }

        .sh-arrow {
          animation: shArrowMove 2s ease-in-out infinite;
        }

        @keyframes shArrowMove {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(6px);
          }
        }

        /* SERVICES CARD */

        .sh-service-card {
          isolation: isolate;
          transition:
            border-color .45s ease,
            box-shadow .45s ease,
            transform .3s ease;
        }

        .sh-service-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: 0;
          transition: opacity .45s ease;
        }

        .sh-service-blue::before {
          background: linear-gradient(
            135deg,
            #1254F4 0%,
            #0B2DA4 55%,
            #07194E 100%
          );
        }

        .sh-service-purple::before {
          background: linear-gradient(
            135deg,
            #7A00FF 0%,
            #5100BF 55%,
            #310B80 100%
          );
        }

        .sh-service-card::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background: radial-gradient(
            350px circle at var(--mouse-x,50%) var(--mouse-y,50%),
            rgba(255,255,255,.13),
            transparent 70%
          );
          opacity: 0;
          transition: opacity .35s ease;
        }

        .sh-service-card:hover::before,
        .sh-service-card:focus-visible::before,
        .sh-service-card:hover::after {
          opacity: 1;
        }

        .sh-service-card:hover {
          box-shadow:
            0 25px 55px rgba(7,25,78,.2);
        }

        .sh-service-card:hover .sh-service-color,
        .sh-service-card:hover .sh-service-muted,
        .sh-service-card:focus-visible .sh-service-color,
        .sh-service-card:focus-visible .sh-service-muted {
          color: white !important;
        }

        .sh-service-icon {
          transition:
            transform .4s ease,
            background .4s ease,
            color .4s ease;
        }

        .sh-service-card:hover .sh-service-icon {
          transform: rotate(10deg) scale(1.08);
          background: rgba(255,255,255,.16);
          color: white;
        }

        .sh-service-tag {
          transition:
            background .35s ease,
            color .35s ease;
        }

        .sh-service-card:hover .sh-service-tag {
          background: rgba(255,255,255,.15);
          color: white;
        }

        /* PROCESS CARDS */

        .sh-process-card {
          transition:
            transform .4s cubic-bezier(.22,1,.36,1),
            box-shadow .4s ease,
            border-color .4s ease;
        }

        .sh-process-card:hover {
          transform: translateY(-9px);
          border-color: #B5CFFF;
          box-shadow:
            0 20px 45px rgba(7,25,78,.1);
        }

        /* WHY CARDS */

        .sh-why-card {
          transition:
            transform .35s ease,
            border-color .35s ease,
            box-shadow .35s ease;
        }

        .sh-why-card:hover {
          transform: translateY(-6px);
          border-color: #A8C6FF;
          box-shadow:
            0 15px 35px rgba(18,84,244,.09);
        }

        /* DARK CARD */

        .sh-dark-card {
          transition: box-shadow .4s ease;
        }

        .sh-dark-card:hover {
          box-shadow:
            0 30px 65px rgba(7,25,78,.2);
        }

        /* IMAGE CARD */

        .sh-image-card img {
          transition:
            transform .8s cubic-bezier(.22,1,.36,1);
        }

        .sh-image-card:hover img {
          transform: scale(1.08);
        }

        /* INDUSTRY IMAGE */

        .sh-industry-image {
          animation: shIndustryEnter .65s ease both;
          transition: transform .8s ease;
        }

        .sh-industry:hover .sh-industry-image {
          transform: scale(1.06);
        }

        @keyframes shIndustryEnter {
          from {
            opacity: .3;
            filter: blur(8px);
          }
          to {
            opacity: 1;
            filter: blur(0);
          }
        }

        /* BLOG CARDS */

        .sh-blog-image {
          transition:
            transform .7s cubic-bezier(.22,1,.36,1),
            filter .5s ease;
        }

        .sh-blog:hover .sh-blog-image {
          transform: scale(1.08);
          filter: brightness(.85);
        }

        /* FAQ */

        .sh-faq-answer {
          animation: shFaqOpen .3s ease both;
        }

        @keyframes shFaqOpen {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* DOT GRID */

        .sh-dots {
          background-image:
            radial-gradient(
              rgba(18,84,244,.07) 1px,
              transparent 1px
            );
          background-size: 24px 24px;
        }

        /* MOBILE OPTIMIZATION */

        @media (max-width: 640px) {
          .sh-visual {
            animation-duration: 9s;
          }

          .sh-service-card {
            transform: none !important;
          }

          .sh-reveal {
            transform: translateY(20px);
          }

          .sh-reveal.sh-visible {
            transform: translateY(0);
          }
        }

        /* ACCESSIBILITY */

        @media (prefers-reduced-motion: reduce) {
          .sh-reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .sh-visual,
          .sh-orb,
          .sh-growth-node,
          .sh-workflow-node,
          .sh-workflow-halo,
          .sh-status-dot,
          .sh-icon-pulse,
          .sh-icon-float,
          .sh-arrow {
            animation: none !important;
          }

          .sh-growth-line,
          .sh-workflow-line {
            animation: none !important;
            stroke-dashoffset: 0 !important;
          }

          .sh-progress {
            animation: none !important;
            width: 100% !important;
          }

          .sh-moving-dot {
            display: none;
          }

          .sh-tilt,
          .sh-service-card,
          .sh-process-card,
          .sh-why-card,
          .sh-image-card img,
          .sh-blog-image {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}
