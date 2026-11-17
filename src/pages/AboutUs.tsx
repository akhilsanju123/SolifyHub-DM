import { useEffect, useRef, useState, type ReactNode } from "react";

import {

  ArrowRight, Target, Eye, Lightbulb,

  TrendingUp, HeartHandshake, Sparkles,

} from "lucide-react";

import { images, navigate } from "../data/siteData";

import PageHero from "../components/shared/PageHero";

import CTA from "../components/shared/CTA";

import { useSEO } from "../hooks/useSEO";



const values = [

  { number: "01", icon: Lightbulb, title: "Creative Thinking", description: "We believe powerful ideas can turn ordinary businesses into memorable brands." },

  { number: "02", icon: Target, title: "Strategy First", description: "Every meaningful result begins with understanding the business, audience, and opportunity." },

  { number: "03", icon: TrendingUp, title: "Growth Focused", description: "We connect creativity with performance to support measurable business growth." },

  { number: "04", icon: HeartHandshake, title: "True Partnerships", description: "We work closely with businesses, building relationships based on clarity, trust, and collaboration." },

];



const purpose = [

  { number: "01", icon: Target, eyebrow: "WHAT WE DO EVERY DAY", title: "Our Mission", body: "Our mission is to make digital marketing easier to understand, execute, and benefit from. We help businesses strengthen their identity, improve their online visibility, and connect with the right audience through creative, strategic, and measurable solutions." },

  { number: "02", icon: Eye, eyebrow: "WHERE WE WANT TO GO", title: "Our Vision", body: "Our vision is to become a trusted digital growth partner for businesses of every size. By bringing together creativity, technology, and strategic thinking, we aim to build meaningful brands and digital experiences that create lasting value." },

];



function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {

  const ref = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);



  useEffect(() => {

    const element = ref.current;

    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {

      setVisible(true);

      return;

    }

    const observer = new IntersectionObserver(([entry]) => {

      if (entry.isIntersecting) {

        setVisible(true);

        observer.unobserve(entry.target);

      }

    }, { threshold: 0.08 });

    observer.observe(element);

    return () => observer.disconnect();

  }, []);



  return (

    <div ref={ref} className={`${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} transition-all duration-700 ease-out ${className}`} style={{ transitionDelay: `${delay}ms` }}>

      {children}

    </div>

  );

}



function CEOProfile() {
  return (
    <div className="ceo-profile mx-auto grid max-w-[1000px] items-center gap-8 md:grid-cols-[340px_1fr] md:gap-14">
      <Reveal>
        <div className="ceo-photo-wrap relative mx-auto h-[280px] w-[280px] sm:h-[320px] sm:w-[320px]">
          <div className="ceo-main-circle absolute inset-3 rounded-full bg-gradient-to-br from-[#00CFFF] via-[#1254F4] to-[#7A00FF]" />
          <span className="ceo-dot-one absolute right-0 top-12 z-20 h-12 w-12 rounded-full bg-gradient-to-br from-[#1254F4] to-[#7A00FF]" />
          <span className="ceo-dot-two absolute bottom-8 right-1 z-20 h-9 w-9 rounded-full bg-[#00CFFF]" />
          <div className="absolute inset-4 z-10 overflow-hidden rounded-full bg-[#eef4ff] ring-[6px] ring-white shadow-[0_18px_40px_rgba(18,84,244,.15)]">
            <img src="/CEO.png" alt="Dakshayani Ravada, Founder and CEO of SOLIFYHUB" loading="lazy" decoding="async" className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105" />
          </div>
        </div>
      </Reveal>
      <Reveal delay={150}>
        <div className="text-center md:text-left">
          <h3 className="font-display text-[30px] font-extrabold tracking-tight text-[#07194E] sm:text-[38px]">Dakshayani Ravada</h3>
          <div className="mt-3 flex items-center justify-center gap-3 md:justify-start">
            <span className="h-[3px] w-10 bg-[#1254F4]" />
            <span className="text-xs font-extrabold uppercase tracking-[.16em] text-[#1254F4] sm:text-sm">Founder &amp; CEO</span>
          </div>
          <p className="mx-auto mt-6 max-w-[520px] text-[15px] leading-8 text-[#64748b] md:mx-0 md:text-[16px]">
            Dakshayani Ravada leads SOLIFYHUB with a vision to empower businesses through creativity, technology, and digital marketing. Focused on building strong brands and driving meaningful business growth.
          </p>
          <div className="mt-7 flex justify-center md:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#dbeafe] bg-[#eff6ff] px-4 py-2 text-xs font-bold text-[#1254F4]">
              <Sparkles size={14} /> Leading with Vision &amp; Creativity
            </span>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default function AboutUs() {
  const handleWorkWithUs = () => {
    navigate("/contact-us");

    let attempts = 0;
    const timer = window.setInterval(() => {
      const section = document.getElementById("get-in-touch");
      if (section) {
        window.clearInterval(timer);
        const top = section.getBoundingClientRect().top + window.scrollY - 95;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      } else if (++attempts >= 50) {
        window.clearInterval(timer);
      }
    }, 100);
  };


  // Canonical URL for the About Us page.
  // If useSEO already manages canonical tags, prefer that centralized implementation.
  useEffect(() => {
    const canonicalUrl = "https://solifyhub.com/about-us";
    const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonical = existing ?? document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", canonicalUrl);
    if (!existing) document.head.appendChild(canonical);
  }, []);

  useSEO({

    title: "About SOLIFYHUB | Digital Marketing Agency in Vizag",

    description: "Learn about SOLIFYHUB, a digital marketing agency in Visakhapatnam offering creative strategy, branding, web design and marketing solutions for businesses.",

    path: "/about-us",

    keywords: "about SOLIFYHUB, digital agency Visakhapatnam, creative company Vizag, marketing team Andhra Pradesh",

    schema: {

      "@context": "https://schema.org",

      "@type": "AboutPage",

      name: "About SOLIFYHUB",

      description: "Creative digital marketing agency in Visakhapatnam combining strategy, design, technology and performance.",

      url: "https://solifyhub.com/about-us",

    },

  });



  return (

    <>

      <PageHero

        label="About SOLIFYHUB"

        title={"We help businesses\ngrow in the digital world."}

        body="A creative company from Visakhapatnam bringing together strategy, design, technology, and digital performance to help ambitious businesses grow."

        image={images.team}

      />



      {/* Our story */}

      <section className="relative overflow-hidden bg-white py-24 md:py-32">

        <div className="container-wide grid items-center gap-14 lg:grid-cols-2 lg:gap-24">

          <Reveal>

            <div className="mb-6 flex items-center gap-3"><span className="text-xs font-bold uppercase tracking-[.25em] text-[#2563eb]">OUR POINT OF VIEW</span></div>

            <h2 className="font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-[#07194E] md:text-5xl lg:text-6xl">The work should<br /><span className="text-[#2563eb]">feel like you.</span></h2>

            <p className="mt-7 max-w-lg text-lg leading-9 text-[#64748b]">Every business has a story worth telling. We help bring that story to life through thoughtful strategy, meaningful design, and powerful digital experiences.</p>

            <div className="mt-9 flex items-center gap-4"><div className="h-px " /><span className="text-sm font-semibold text-[#07194E]">Creativity with a clear purpose.</span></div>

          </Reveal>

          <Reveal delay={150}>

            <div className="relative rounded-[30px] border border-[#F5F7FA] bg-[#f8faff] p-9 md:p-12">

              <Sparkles size={42} className="absolute right-8 top-8 text-[#dbeafe]" />

              <p className="relative text-lg leading-9 text-[#505050]">At SOLIFYHUB, we believe growth doesn't have to come at the expense of personality. The strongest brands are clear about who they are, understand their audience, and communicate with confidence.</p>

              <p className="mt-6 text-lg leading-9 text-[#505050]">We connect strategy, creativity, and technology to help businesses build a stronger presence, reach the right people, and turn opportunities into meaningful progress.</p>

              <div className="mt-9 border-t border-[#dce6f5] pt-7"><p className="font-display text-xl font-bold text-[#07194E]">Think clearly. Create boldly. Grow meaningfully.</p></div>

            </div>

          </Reveal>

        </div>

      </section>



      {/* Mission and vision */}

      <section className="relative overflow-hidden bg-[#f8faff] py-24 md:py-28">

        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl" />

        <div className="container-wide relative z-10">

          <Reveal><div className="mb-14 text-center"><p className="mb-5 text-xs font-bold uppercase tracking-[.25em] text-[#2563eb]">WHAT DRIVES US</p><h2 className="font-display text-4xl font-extrabold tracking-tight text-[#07194E] md:text-5xl">Our purpose. <span className="text-[#2563eb]">Our direction.</span></h2><p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#64748b]">Everything we create is guided by a clear purpose and a vision for meaningful, long-term business growth.</p></div></Reveal>

          <div className="grid gap-8 lg:grid-cols-2">

            {purpose.map((item, index) => {

              const Icon = item.icon;

              return <Reveal key={item.number} delay={(index + 1) * 100} className="h-full"><div className="about-feature-card group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-[#e2eaf5] bg-white p-9 md:p-12"><div className="mb-12 flex items-start justify-between"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#2563eb] transition-all duration-500 group-hover:bg-[#2563eb] group-hover:text-white"><Icon size={30} /></div><span className="font-display text-5xl font-extrabold text-[#e5edfa]">{item.number}</span></div><p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-[#2563eb]">{item.eyebrow}</p><h3 className="font-display text-3xl font-extrabold text-[#07194E] md:text-4xl">{item.title}</h3><p className="mt-6 flex-1 text-base leading-8 text-[#64748b]">{item.body}</p><div className="mt-12 h-[3px] w-14 rounded-full bg-[#2563eb] transition-all duration-500 group-hover:w-full" /></div></Reveal>;

            })}

          </div>

        </div>

      </section>



      {/* Values */}



<section className="bg-white py-24 md:py-28">

  <div className="container-wide">



    {/* HEADING + VALUES ANIMATION */}

    <div className="mb-14 grid items-center gap-8 lg:grid-cols-[1.25fr_.75fr]">



      {/* LEFT SIDE - EXISTING CONTENT */}

      <Reveal>

        <div className="max-w-3xl">

          <p className="mb-5 text-xs font-bold uppercase tracking-[.25em] text-[#2563eb]">

            WHAT WE BELIEVE

          </p>



          <h2 className="font-display text-4xl font-extrabold tracking-tight text-[#07194E] md:text-5xl">

            Good work starts with{" "}

            <span className="text-[#2563eb]">

              strong values.

            </span>

          </h2>



          <p className="mt-6 text-base leading-8 text-[#64748b]">

            Our values influence how we think, how we collaborate,

            and how we create meaningful work for every business.

          </p>

        </div>

      </Reveal>



      {/* RIGHT SIDE - ANIMATED VALUES ORBIT */}

      <Reveal delay={200}>

        <div className="values-orbit relative mx-auto h-[250px] w-full max-w-[360px] sm:h-[280px]">



          {/* SOFT BACKGROUND GLOW */}

          <div className="absolute inset-8 rounded-full bg-[#eff5ff]/60 blur-3xl" />



          {/* ROTATING ORBIT RINGS */}

          <div className="values-ring absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#bfd3ff] sm:h-[235px] sm:w-[235px]" />



          <div className="absolute left-1/2 top-1/2 h-[145px] w-[145px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#dbeafe] sm:h-[160px] sm:w-[160px]" />



          {/* CONNECTING LINES */}

          <svg

            viewBox="0 0 360 280"

            className="absolute inset-0 h-full w-full"

            aria-hidden="true"

          >

            <path

              d="M180 140 L180 35 M180 140 L315 140 M180 140 L180 245 M180 140 L45 140"

              stroke="#bfdbfe"

              strokeWidth="1.5"

              strokeDasharray="5 6"

              fill="none"

            />



            <circle cx="180" cy="35" r="3" fill="#2563eb" />

            <circle cx="315" cy="140" r="3" fill="#2563eb" />

            <circle cx="180" cy="245" r="3" fill="#2563eb" />

            <circle cx="45" cy="140" r="3" fill="#2563eb" />

          </svg>



          {/* CENTER CIRCLE */}

          <div className="values-center absolute left-1/2 top-1/2 z-10 flex h-[115px] w-[115px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[#07194E] to-[#2563eb] text-center shadow-[0_15px_40px_rgba(37,99,235,0.22)]">



            <span className="text-[11px] font-extrabold tracking-[.12em] text-white">

              SOLIFYHUB

            </span>



            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[.2em] text-[#bfdbfe]">

              VALUES

            </span>



            <div className="mt-2 h-[2px] w-7 rounded-full bg-[#00CFFF]" />

          </div>



          {/* FOUR VALUE ICONS */}

          {values.slice(0, 4).map((value, index) => {

            const Icon = value.icon;



            const positions = [

              "left-1/2 top-0 -translate-x-1/2",

              "right-0 top-1/2 -translate-y-1/2",

              "left-1/2 bottom-0 -translate-x-1/2",

              "left-0 top-1/2 -translate-y-1/2",

            ];



            return (

              <div

                key={value.number}

                className={`values-floating absolute z-20 ${positions[index]} flex h-14 w-14 items-center justify-center rounded-2xl border border-[#dbeafe] bg-white text-[#2563eb] shadow-[0_10px_30px_rgba(7,25,78,0.10)]`}

                style={{

                  animationDelay: `${index * 0.5}s`,

                }}

                title={value.title}

              >

                <Icon size={25} />

              </div>

            );

          })}



          {/* SMALL DECORATIVE PARTICLES */}

          <span className="values-particle absolute left-[20%] top-[18%] h-2 w-2 rounded-full bg-[#00CFFF]" />

          <span className="values-particle absolute right-[18%] top-[25%] h-2 w-2 rounded-full bg-[#2563eb]" />

          <span className="values-particle absolute bottom-[17%] left-[25%] h-1.5 w-1.5 rounded-full bg-[#60a5fa]" />



        </div>

      </Reveal>



    </div>



    {/* EXISTING FOUR VALUE CARDS - UNCHANGED */}

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

      {values.map((value, index) => {

        const Icon = value.icon;



        return (

          <Reveal

            key={value.number}

            delay={index * 100}

            className="h-full"

          >

            <div className="about-feature-card group flex h-full flex-col rounded-[26px] border border-[#F5F7FA] bg-white p-8">



              <div className="mb-10 flex items-center justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eff5ff] text-[#2563eb] transition-all duration-300 group-hover:bg-[#2563eb] group-hover:text-white">

                  <Icon size={25} />

                </div>



                <span className="text-xs font-bold text-[#b5c4dc]">

                  {value.number}

                </span>

              </div>



              <h3 className="font-display text-xl font-extrabold text-[#07194E]">

                {value.title}

              </h3>



              <p className="mt-4 flex-1 text-sm leading-7 text-[#64748b]">

                {value.description}

              </p>



              <div className="mt-8 h-[2px] w-8 bg-[#2563eb] transition-all duration-500 group-hover:w-full" />

            </div>

          </Reveal>

        );

      })}

    </div>



  </div>



  {/* ANIMATION CSS */}

  <style>{`

    .values-ring {

      animation: valuesRotate 22s linear infinite;

    }



    @keyframes valuesRotate {

      from {

        transform: translate(-50%, -50%) rotate(0deg);

      }

      to {

        transform: translate(-50%, -50%) rotate(360deg);

      }

    }



    .values-floating {

      animation: valuesFloat 3.5s ease-in-out infinite;

    }



    @keyframes valuesFloat {

      0%, 100% {

        margin-top: 0;

      }

      50% {

        margin-top: -9px;

      }

    }



    .values-center {

      animation: valuesGlow 3s ease-in-out infinite;

    }



    @keyframes valuesGlow {

      0%, 100% {

        box-shadow: 0 15px 40px rgba(37,99,235,0.18);

      }

      50% {

        box-shadow: 0 15px 48px rgba(37,99,235,0.38);

      }

    }



    .values-particle {

      animation: valuesParticle 3s ease-in-out infinite;

    }



    @keyframes valuesParticle {

      0%, 100% {

        opacity: 0.4;

        transform: scale(1);

      }

      50% {

        opacity: 1;

        transform: scale(1.5);

      }

    }



    @media (prefers-reduced-motion: reduce) {

      .values-ring,

      .values-floating,

      .values-center,

      .values-particle {

        animation: none !important;

      }

    }

  `}</style>

</section>





      {/* Meet our team — CEO only */}
      <section className="relative overflow-hidden bg-[#f8faff] py-24 md:py-28">
        <div className="container-wide">
          <Reveal>
            <div className="mb-14 text-center">
              <p className="mb-5 text-xs font-bold uppercase tracking-[.25em] text-[#2563eb]">THE VISION BEHIND SOLIFYHUB</p>
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-[#07194E] md:text-5xl lg:text-6xl">Meet our <span className="text-[#2563eb]">team.</span></h2>
            </div>
          </Reveal>
          <CEOProfile />
          <Reveal>
            <div className="mt-16 flex flex-col items-center justify-between gap-8 rounded-[28px] border border-[#dfe8f5] bg-white px-8 py-10 md:flex-row md:px-12">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#2563eb]">BETTER TOGETHER</p>
                <h3 className="font-display text-2xl font-extrabold text-[#07194E] md:text-3xl">Great ideas grow through collaboration.</h3>
                <p className="mt-3 text-sm leading-7 text-[#64748b]">Every project is an opportunity to combine different perspectives, fresh thinking, and meaningful creativity.</p>
              </div>
              <button type="button" onClick={handleWorkWithUs} className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#1254F4] px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#07194E] hover:shadow-lg">Work With Us <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" /></button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />

      <style>{`

        .about-feature-card { transition: transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s ease, border-color .5s ease; }

        .about-feature-card:hover { transform: translateY(-8px); border-color: #bfd4fa; box-shadow: 0 22px 55px rgba(7,25,78,.09); }

        .ceo-main-circle { animation: ceoPulse 5s ease-in-out infinite; }
        .ceo-dot-one { animation: ceoFloat 4s ease-in-out infinite; }
        .ceo-dot-two { animation: ceoFloat 3.5s ease-in-out infinite reverse; }
        @keyframes ceoFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes ceoPulse { 0%, 100% { filter: brightness(1); transform: scale(1); } 50% { filter: brightness(1.1); transform: scale(1.035); } }
        @media (prefers-reduced-motion: reduce) {

          .about-feature-card, .ceo-main-circle, .ceo-dot-one, .ceo-dot-two, .about-feature-card * { transition-duration: .01ms !important; animation-duration: .01ms !important; }

          .about-feature-card:hover { transform: none; }

        }

      `}</style>

    </>

  );

}
