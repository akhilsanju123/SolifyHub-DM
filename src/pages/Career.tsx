import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Check,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { images } from "../data/siteData";
import PageHero from "../components/shared/PageHero";
import CTA from "../components/shared/CTA";
import { useSEO } from "../hooks/useSEO";

const careerStages = [
  { title: "Intern", subtitle: "Learn the foundations", icon: GraduationCap },
  { title: "Executive", subtitle: "Build practical skills", icon: BriefcaseBusiness },
  { title: "Specialist", subtitle: "Own your expertise", icon: BookOpen },
  { title: "Team Lead", subtitle: "Guide and collaborate", icon: Users },
  { title: "Manager", subtitle: "Lead bigger ideas", icon: Award },
];

function CareerGrowthAnimation() {
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setStage((current) => (current + 1) % careerStages.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const ActiveIcon = careerStages[stage].icon;

  return (
    <div
      className="career-growth-scene relative mx-auto w-full max-w-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="pointer-events-none absolute -inset-5 rounded-full bg-[#dbeafe]/60 blur-3xl" />
      <div className="relative overflow-hidden rounded-[30px] border border-[#dce6f5] bg-white p-5 shadow-[0_25px_75px_rgba(7,25,78,0.12)] sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1254F4] text-white">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="font-display text-sm font-extrabold text-[#07194E]">SOLIFYHUB</p>
              <p className="text-xs text-[#64748b]">Your growth journey</p>
            </div>
          </div>
          <span className="rounded-full bg-[#ecfdf5] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#047857]">
            Keep growing
          </span>
        </div>

        <div className="mt-9">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563eb]">Your potential, unlocked</p>
          <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight text-[#07194E] sm:text-3xl">
            Every step builds <span className="text-[#2563eb]">your future.</span>
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#64748b]">
            Explore an illustrative career path built around learning, ownership and leadership.
          </p>
        </div>

        <div className="relative mt-8 rounded-[24px] border border-[#e4ebf7] bg-[#f8faff] p-4 sm:p-6">
          <div className="absolute bottom-8 left-[34px] top-8 w-[3px] rounded-full bg-[#D9E2F0] sm:left-[42px]" />
          <div
            className="absolute left-[34px] top-8 w-[3px] rounded-full bg-gradient-to-b from-[#2563eb] to-[#00CFFF] transition-[height] duration-700 ease-in-out sm:left-[42px]"
            style={{ height: `calc((100% - 4rem) * ${stage / (careerStages.length - 1)})` }}
          />
          <div className="relative space-y-3">
            {careerStages.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === stage;
              const isComplete = index < stage;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setStage(index)}
                  aria-current={isActive ? "step" : undefined}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-all duration-500 sm:gap-5 sm:p-4 ${
                    isActive
                      ? "translate-x-1 border-[#bdd3ff] bg-white shadow-[0_10px_25px_rgba(37,99,235,0.12)]"
                      : "border-transparent bg-transparent hover:bg-white/80"
                  }`}
                >
                  <span
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-500 sm:h-12 sm:w-12 ${
                      isActive
                        ? "bg-[#1254F4] text-white shadow-lg shadow-blue-200"
                        : isComplete
                        ? "bg-[#dbeafe] text-[#1254F4]"
                        : "bg-white text-[#8da3c3]"
                    }`}
                  >
                    {isComplete ? <Check size={19} /> : <Icon size={20} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-sm font-extrabold sm:text-base ${isActive ? "text-[#07194E]" : "text-[#505050]"}`}>
                      {item.title}
                    </span>
                    <span className="mt-1 block text-xs text-[#64748b]">{item.subtitle}</span>
                  </span>
                  {isActive && <ArrowUpRight size={20} className="shrink-0 text-[#2563eb]" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-[#07194E] p-4 text-white sm:p-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <ActiveIcon size={22} />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] text-[#a9c4ff]">Current milestone</p>
              <p className="truncate text-sm font-bold sm:text-base">{careerStages[stage].title}</p>
            </div>
          </div>
          <span className="shrink-0 text-xs font-bold text-[#67e8f9]">0{stage + 1} / 05</span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-[#64748b]">
            <Sparkles size={15} className="text-[#2563eb]" />
            Learn. Create. Lead.
          </div>
          <div className="flex gap-2" aria-label="Career journey progress">
            {careerStages.map((item, index) => (
              <button
                key={item.title}
                type="button"
                aria-label={`Show ${item.title} stage`}
                onClick={() => setStage(index)}
                className={`h-2 rounded-full transition-all duration-500 ${index === stage ? "w-7 bg-[#2563eb]" : "w-2 bg-[#cbd5e1]"}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="career-floating-card pointer-events-none absolute -right-3 top-24 hidden items-center gap-2 rounded-2xl border border-[#dce6f5] bg-white px-4 py-3 shadow-xl sm:flex lg:-right-8">
        <Award size={19} className="text-[#2563eb]" />
        <span className="text-xs font-bold text-[#07194E]">New milestones</span>
      </div>
      <div className="career-floating-card-delayed pointer-events-none absolute -bottom-4 -left-3 hidden items-center gap-2 rounded-2xl border border-[#dce6f5] bg-white px-4 py-3 shadow-xl sm:flex lg:-left-8">
        <BookOpen size={19} className="text-[#2563eb]" />
        <span className="text-xs font-bold text-[#07194E]">Continuous learning</span>
      </div>
    </div>
  );
}

const cultureValues = [
  {
    number: "01",
    title: "Curious by default",
    description: "Ask better questions, explore new ideas, and keep learning every day.",
  },
  {
    number: "02",
    title: "Kind under pressure",
    description: "Collaborate with respect and support each other when challenges arise.",
  },
  {
    number: "03",
    title: "Proud of the details",
    description: "Care about the little decisions that make the final work exceptional.",
  },
];

export default function Career() {
  // Canonical URL for the careers page.
  useEffect(() => {
    const url = "https://solifyhub.com/career";
    const links = document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]');
    let link = links[0];
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;
    links.forEach((item, index) => { if (index > 0) item.remove(); });
  }, []);

  useSEO({
    title: "Careers at SOLIFYHUB — Join Our Creative Team in Visakhapatnam",
    description: "Build your career with SOLIFYHUB, a creative digital marketing agency in Visakhapatnam. We are building a thoughtful, curious team around great questions and generous collaboration.",
    path: "/career",
    keywords: "careers Visakhapatnam, digital marketing jobs Vizag, creative agency jobs Andhra Pradesh, marketing jobs Visakhapatnam",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Careers at SOLIFYHUB",
      description: "Join SOLIFYHUB, a creative digital marketing agency in Visakhapatnam.",
      about: {
        "@type": "Organization",
        name: "SOLIFYHUB",
        sameAs: "https://solifyhub.com",
      },
      spatialCoverage: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Visakhapatnam",
          addressRegion: "Andhra Pradesh",
          addressCountry: "IN",
        },
      },
    },
  });

  return (
    <>
      <PageHero
        label="Careers"
        title={"Build your career\nwith SOLIFYHUB."}
        body="We are building a thoughtful, curious team around great questions, generous collaboration and work that earns attention."
        image={images.team}
      />

      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="container-wide">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1254F4]">Life here</p>
              </div>
              <h2 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-[#07194E] md:text-5xl xl:text-[58px]">
                Bring your<br />perspective.<br />
                <span className="text-[#2563eb]">Make the work<br />better.</span>
              </h2>
              <p className="mt-8 max-w-lg text-lg leading-9 text-[#505050]">
                We care about craft, but we care just as much about how we get there.
                If you like learning, sharing ideas, and leaving things clearer than you found them,
                you’ll fit right in.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                {["Learning", "Collaboration", "Career Growth"].map((item) => (
                  <span key={item} className="rounded-full border border-[#dce6f5] bg-[#f8faff] px-4 py-2 text-xs font-semibold text-[#1254F4]">
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#1254F4]">
                Grow your skills. Shape your future. <ArrowRight size={16} />
              </p>
            </div>
            <div className="relative px-0 py-6 sm:px-5 lg:py-10">
              <CareerGrowthAnimation />
            </div>
          </div>

          <div className="mt-20 overflow-hidden rounded-[28px] bg-[#07194E] p-8 text-white md:mt-24 md:p-12">
            <div className="grid gap-10 md:grid-cols-3">
              {cultureValues.map((item) => (
                <div key={item.number}>
                  <span className="text-lg font-bold text-[#00CFFF]">{item.number}</span>
                  <h3 className="mt-8 font-display text-2xl font-bold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-blue-100/80">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTA />
      <style>{`
        @keyframes careerFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .career-floating-card { animation: careerFloat 4s ease-in-out infinite; }
        .career-floating-card-delayed { animation: careerFloat 5s ease-in-out 1s infinite; }
        @media (prefers-reduced-motion: reduce) {
          .career-floating-card, .career-floating-card-delayed { animation: none; }
        }
      `}</style>
    </>
  );
}
