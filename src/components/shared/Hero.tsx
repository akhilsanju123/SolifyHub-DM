

import { useEffect, useState } from "react";

import {
  ArrowDownRight,
  ArrowRight,
  CircleCheck,
} from "lucide-react";

import {
  slides,
  navigate,
} from "../../data/siteData";

export default function Hero() {
  const [index, setIndex] = useState(0);

  const slide = slides[index];

  // ============================================
  // AUTOMATIC HERO SLIDER - EVERY 3 SECONDS
  // ============================================

  useEffect(() => {
    if (slides.length <= 1) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);

    return () => {
      window.clearInterval(id);
    };
  }, []);

  // ============================================
  // LET'S TALK - SCROLL TO GET IN TOUCH
  // ============================================

  const handleLetsTalk = () => {
    navigate("/contact-us");

    let attempts = 0;
    const maxAttempts = 50;

    const scrollToContact = () => {
      const section = document.getElementById(
        "get-in-touch"
      );

      if (section) {
        const headerOffset = 95;

        const sectionTop =
          section.getBoundingClientRect().top +
          window.scrollY;

        window.scrollTo({
          top: Math.max(
            0,
            sectionTop - headerOffset
          ),
          behavior: "smooth",
        });

        return;
      }

      attempts += 1;

      if (attempts < maxAttempts) {
        window.setTimeout(scrollToContact, 100);
      }
    };

    window.requestAnimationFrame(scrollToContact);
  };

  // ============================================
  // HERO SECTION
  // ============================================

  return (
    <section
      className="hero"
    >
      {/* BACKGROUND GLOW */}
      <div className="hero-glow" />

      <div className="hero-layout container-wide relative grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">

        {/* LEFT SIDE CONTENT */}
        <div key={slide.kicker} className="hero-copy reveal max-w-[570px]">

          {/* KICKER */}
          <div className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-[#1254F4]">
            <span className="h-2 w-2 rounded-full bg-[#00CFFF]" />
            {slide.kicker}
          </div>

          {/* HERO TITLE */}
          <h1 className="font-display whitespace-pre-line text-[clamp(48px,6.8vw,88px)] font-extrabold leading-[.95] tracking-[-.075em] text-[#07194E]">
            {slide.title}
          </h1>

          {/* HERO DESCRIPTION */}
          <p className="mt-7 max-w-lg text-lg leading-8 text-[#505050]">
            {slide.body}
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-9 flex flex-wrap gap-3">

            <button
              type="button"
              className="btn-primary"
              onClick={handleLetsTalk}
            >
              Let's talk
              <ArrowDownRight size={18} />
            </button>

            <button
              type="button"
              className="btn-ghost"
              onClick={() => navigate("/services")}
            >
              Explore capabilities
              <ArrowRight size={18} />
            </button>
          </div>

          {/* SLIDER INDICATORS */}
          <div className="mt-12 flex items-center gap-5">

            <div className="flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.kicker}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`View slide ${i + 1}`}
                  aria-current={
                    i === index ? "true" : undefined
                  }
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-10 gradient-bg"
                      : "w-2 bg-[#cad5e6]"
                  }`}
                />
              ))}
            </div>

            {/* SLIDE COUNTER */}
            <span className="text-xs font-bold text-[#505050]">
              {String(index + 1).padStart(2, "0")}
              {" / "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* RIGHT SIDE HERO IMAGE */}
        <div className="hero-visual relative min-h-[410px] lg:min-h-[600px]">

          {/* MAIN HERO IMAGE */}
          <div className="absolute right-0 top-8 h-[76%] w-[83%] overflow-hidden rounded-[32px] bg-[#d8e6ff] shadow-2xl shadow-[#1254F4]/15">
            <img
              key={slide.image}
              src={slide.image}
              alt={slide.alt}
              className="hero-image h-full w-full object-cover"
            />
          </div>

          {/* FLOATING CARD */}
          <div className="float-card absolute bottom-4 left-0 max-w-[230px] rounded-2xl border border-white/70 bg-white/90 p-5 shadow-xl backdrop-blur">

            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1254F4]">
              <CircleCheck
                size={16}
                className="text-[#00CFFF]"
              />
              Built for momentum
            </div>

            <p className="text-sm font-semibold leading-6 text-[#07194E]">
              Strategy that looks good and works hard.
            </p>
          </div>

          {/* SCROLL LABEL */}
          <div className="absolute right-2 top-0 rounded-full bg-[#07194E] px-4 py-2 text-xs font-bold text-white">
            Scroll to explore ↓
          </div>
        </div>
      </div>
    </section>
  );
}
