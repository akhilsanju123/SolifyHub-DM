import { useEffect, useRef, useState, type ReactNode } from "react";

import {

  ArrowRight, ArrowUpRight, Target, Eye, Lightbulb,

  TrendingUp, HeartHandshake, Sparkles, RotateCcw,

} from "lucide-react";

import { images, navigate } from "../data/siteData";

import PageHero from "../components/shared/PageHero";

import CTA from "../components/shared/CTA";

import { useSEO } from "../hooks/useSEO";



// Replace these sample names, roles and portraits with your actual team.

const teamMembers = [

  { name: "Team Member 01", role: "Founder & Creative Director", bio: "Leading creative ideas and building meaningful brand experiences.", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800" },

  { name: "Team Member 02", role: "Digital Marketing Strategist", bio: "Connecting strategy, insight, and performance to help brands grow.", image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=800" },

  { name: "Team Member 03", role: "Graphic Designer", bio: "Creating thoughtful visuals that bring stories and identities to life.", image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800" },

  { name: "Team Member 04", role: "Web Developer", bio: "Building fast, engaging digital experiences that feel effortless.", image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800" },

  { name: "Team Member 05", role: "Social Media Manager", bio: "Creating engaging social campaigns and building online communities.", image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800" },

  { name: "Team Member 06", role: "Video Editor", bio: "Turning ideas into compelling videos and motion-driven stories.", image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800" },

  { name: "Team Member 07", role: "Content Strategist", bio: "Crafting clear messages and content that connects with audiences.", image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800" },

  { name: "Team Member 08", role: "Brand Designer", bio: "Developing distinctive visual identities for ambitious brands.", image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800" },

];



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



type TeamMember = (typeof teamMembers)[number];



function TeamFlipCard({ member, index }: { member: TeamMember; index: number }) {

  const [flipped, setFlipped] = useState(false);

  const [paused, setPaused] = useState(false);

  const [inView, setInView] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const reducedMotion = useRef(false);



  useEffect(() => {

    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const element = ref.current;

    if (!element) return;

    if (!("IntersectionObserver" in window)) {

      setInView(true);

      return;

    }

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });

    observer.observe(element);

    return () => observer.disconnect();

  }, []);



  useEffect(() => {

    if (!inView || paused || reducedMotion.current) return;

    const timer = window.setTimeout(() => setFlipped(current => !current), 3000);

    return () => window.clearTimeout(timer);

  }, [inView, paused, flipped]);



  return (

    <div

      ref={ref}

      className="team-flip-shell h-full"

      onMouseEnter={() => setPaused(true)}

      onMouseLeave={() => setPaused(false)}

      onFocus={() => setPaused(true)}

      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}

    >

      <button

        type="button"

        onClick={() => setFlipped(current => !current)}

        className="team-flip-button block h-full w-full cursor-pointer rounded-[26px] text-left outline-none focus-visible:ring-4 focus-visible:ring-blue-300"

        aria-label={`${member.name}, ${member.role}. ${flipped ? "Show photo" : "Show profile"}`}

        aria-pressed={flipped}

      >

        <div className={`team-flip-inner ${flipped ? "is-flipped" : ""}`}>

          <div className="team-flip-face team-flip-front overflow-hidden rounded-[26px] border border-[#e2eaf5] bg-white shadow-[0_12px_36px_rgba(7,25,78,.08)]">

            <div className="relative aspect-[3/4] overflow-hidden bg-[#eaf0fa]">

              <img src={member.image} alt={`${member.name} portrait`} loading="lazy" className="h-full w-full object-cover object-center" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#07194E]/55 via-transparent to-transparent" />

              <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#07194E]">{String(index + 1).padStart(2, "0")}</span>

              <span className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1254F4]"><RotateCcw size={18} /></span>

            </div>

            <div className="p-6">

              <h3 className="font-display text-xl font-extrabold text-[#07194E]">{member.name}</h3>

              <p className="mt-2 text-sm text-[#64748b]">{member.role}</p>

              <div className="mt-5 h-[2px] w-10 bg-[#2563eb]" />

            </div>

          </div>

          <div className="team-flip-face team-flip-back flex flex-col justify-between overflow-hidden rounded-[26px] bg-gradient-to-br from-[#07194e] via-[#1254F4] to-[#2563eb] p-7 text-white shadow-[0_18px_45px_rgba(7,25,78,.2)]">

            <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[.22em] text-blue-200">SOLIFYHUB TEAM</span><Sparkles size={25} className="text-blue-200" /></div>

            <div>

              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/10"><ArrowUpRight size={27} /></span>

              <h3 className="font-display text-2xl font-extrabold leading-tight">{member.name}</h3>

              <p className="mt-2 text-sm font-semibold text-blue-200">{member.role}</p>

              <div className="my-6 h-px bg-white/20" />

              <p className="text-sm leading-7 text-white/85">{member.bio}</p>

            </div>

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-100"><RotateCcw size={15} /> Tap to see photo</div>

          </div>

        </div>

      </button>

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


  useSEO({

    title: "About SOLIFYHUB — Creative Digital Agency in Visakhapatnam",

    description: "Learn about SOLIFYHUB, a creative digital marketing agency in Visakhapatnam combining strategy, design, technology and performance to help ambitious businesses grow.",

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





      {/* Eight team cards */}

      <section className="relative overflow-hidden bg-[#f8faff] py-24 md:py-28">

        <div className="container-wide">

          <Reveal><div className="mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><div className="mb-5 flex items-center gap-3"><span className="text-xs font-bold uppercase tracking-[.25em] text-[#2563eb]">THE PEOPLE BEHIND THE IDEAS</span></div><h2 className="font-display text-4xl font-extrabold tracking-tight text-[#07194E] md:text-5xl lg:text-6xl">Meet our <span className="text-[#2563eb]">team.</span></h2></div><p className="max-w-md text-base leading-8 text-[#64748b]">Different skills. Shared ambition. A team of creative minds and strategic thinkers working together to bring meaningful ideas to life.</p></div></Reveal>

          <div className="grid grid-cols-1 items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-4">

            {teamMembers.map((member, index) => <Reveal key={member.name} delay={(index % 4) * 100} className="h-full"><TeamFlipCard member={member} index={index} /></Reveal>)}

          </div>

          <p className="mt-7 text-center text-sm text-[#64748b]">Cards flip automatically every 3 seconds. Hover to pause, or tap a card to flip it.</p>

          <Reveal><div className="mt-16 flex flex-col items-center justify-between gap-8 rounded-[28px] border border-[#dfe8f5] bg-white px-8 py-10 md:flex-row md:px-12"><div><p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#2563eb]">BETTER TOGETHER</p><h3 className="font-display text-2xl font-extrabold text-[#07194E] md:text-3xl">Great ideas grow through collaboration.</h3><p className="mt-3 text-sm leading-7 text-[#64748b]">Every project is an opportunity to combine different perspectives, fresh thinking, and meaningful creativity.</p></div><button type="button" onClick={handleWorkWithUs} className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#1254F4] px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#07194E] hover:shadow-lg">Work With Us <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" /></button></div></Reveal>

        </div>

      </section>

      <CTA />

      <style>{`

        .about-feature-card { transition: transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s ease, border-color .5s ease; }

        .about-feature-card:hover { transform: translateY(-8px); border-color: #bfd4fa; box-shadow: 0 22px 55px rgba(7,25,78,.09); }

        .team-flip-shell { perspective: 1300px; }

        .team-flip-inner { position: relative; display: grid; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 900ms cubic-bezier(.2,.75,.25,1); }

        .team-flip-inner.is-flipped { transform: rotateY(180deg); }

        .team-flip-face { grid-area: 1 / 1; width: 100%; min-width: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; }

        .team-flip-front { transform: rotateY(0deg); }

        .team-flip-back { transform: rotateY(180deg); }

        @media (prefers-reduced-motion: reduce) {

          .about-feature-card, .team-flip-inner, .about-feature-card * { transition-duration: .01ms !important; animation-duration: .01ms !important; }

          .about-feature-card:hover { transform: none; }

        }

      `}</style>

    </>

  );

}
