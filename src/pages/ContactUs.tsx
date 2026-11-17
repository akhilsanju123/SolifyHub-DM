
import { useEffect, useRef, useState, type FormEvent } from "react";

import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Navigation,
  MessageCircle,
  Building2,
} from "lucide-react";

import { services, images } from "../data/siteData";
import { supabase } from "../lib/supabase";
import PageHero from "../components/shared/PageHero";
import { useSEO } from "../hooks/useSEO";

// ======================================
// CONTACT DETAILS
// ======================================

const contact = {
  email: "info@solifyhub.com",
  phone: "+91 86888 29033",
  phoneLink: "+918688829033",
  location: "Akkayyapalem, Visakhapatnam, Andhra Pradesh",
  mapLink: "https://share.google/xQkJVnI3fUZO4XhFb",
  mapEmbed:
    "https://www.google.com/maps?q=Akkayyapalem%2C%20Visakhapatnam%2C%20Andhra%20Pradesh&output=embed",
};

// ======================================
// CONTACT INFO COMPONENT
// ======================================

function ContactInfo({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="group flex items-start gap-4 rounded-2xl border border-[#e4eaf5] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#bcd1fa] hover:shadow-[0_12px_30px_rgba(7,25,78,0.07)]">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eaf1ff] text-[#1254F4] transition-colors duration-300 group-hover:bg-[#1254F4] group-hover:text-white">
        <Icon size={21} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8793a6]">
          {label}
        </p>

        <p className="mt-2 break-words text-sm font-semibold leading-6 text-[#07194E] sm:text-base">
          {value}
        </p>
      </div>

      {href && (
        <ArrowUpRight
          size={18}
          className="shrink-0 text-[#1254F4] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      )}
    </div>
  );

  if (!href) return content;

  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {content}
    </a>
  );
}

// ======================================
// CONTACT US PAGE
// ======================================

export default function ContactUs() {
  // SEO SETTINGS
  useSEO({
    title:
      "Contact SOLIFYHUB — Digital Marketing Agency in Visakhapatnam",
    description:
      "Contact SOLIFYHUB, a creative digital marketing agency in Akkayyapalem, Visakhapatnam. Call +91 86888 29033 or email info@solifyhub.com to start a conversation about your business.",
    path: "/contact-us",
    keywords:
      "contact digital marketing agency Visakhapatnam, SOLIFYHUB contact, marketing agency Vizag contact, advertising agency Andhra Pradesh",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact SOLIFYHUB",
      description:
        "Contact SOLIFYHUB digital marketing agency in Visakhapatnam.",
      url: "https://solifyhub.com/contact-us",
    },
  });

  // Keep a single canonical URL for the Contact Us page.
  // If useSEO already handles canonicals, remove this effect and manage it there.
  useEffect(() => {
    const url = "https://solifyhub.com/contact-us";
    const links = document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]');
    let canonical = links[0];
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
    links.forEach((link, index) => {
      if (index > 0) link.remove();
    });
  }, []);

  // FORM STATUS
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const formRef = useRef<HTMLFormElement>(null);

  // FORM STYLES
  const fieldClass =
    "mt-2 w-full rounded-xl border border-[#D9E2F0] bg-white px-4 py-3.5 text-sm font-normal text-[#07194E] outline-none transition-all duration-300 placeholder:text-[#9ba7b7] focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10";

  const labelClass =
    "block text-sm font-semibold text-[#07194E]";

  // ======================================
  // SUBMIT ENQUIRY TO SUPABASE
  // ======================================

  async function submit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (status === "loading") return;

    setStatus("loading");

    const form = new FormData(event.currentTarget);

    const payload = {
      full_name: String(form.get("name") || "").trim(),
      business_name: String(
        form.get("business") || ""
      ).trim(),
      phone: String(form.get("phone") || "").trim(),
      email: String(form.get("email") || "").trim(),
      service: String(form.get("service") || ""),
      requirements: String(
        form.get("requirements") || ""
      ).trim(),
    };

    try {
      const { error } = await supabase
        .from("enquiries")
        .insert(payload);

      if (error) throw error;

      setStatus("success");
      formRef.current?.reset();
    } catch (error) {
      console.error(
        "Enquiry submission failed:",
        error
      );

      setStatus("error");
    }
  }

  return (
    <>
      {/* ======================================
          HERO SECTION
      ====================================== */}

      <PageHero
        label="Contact SOLIFYHUB"
        title={"Let's talk about\nyour business."}
        body="Have an idea, a challenge, or a vision for growth? Tell us what you're working towards. We'll help you take the next step."
        image={images.meeting}
      />

      {/* ======================================
          GET IN TOUCH SECTION

          IMPORTANT:
          This ID is used by the Header
          Start a project button.
      ====================================== */}

      <section
        id="get-in-touch"
        className="relative scroll-mt-[95px] overflow-hidden bg-white py-20 md:py-28"
        style={{
          scrollMarginTop: "95px",
        }}
      >
        {/* BACKGROUND EFFECTS */}
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-100/30 blur-3xl" />

        <div className="container-wide relative z-10">
          <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">

            {/* ======================================
                LEFT - CONTACT INFORMATION
            ====================================== */}

            <div>
              {/* SECTION LABEL */}
              <div className="mb-6 flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#2563eb]">
                  GET IN TOUCH
                </span>
              </div>

              {/* HEADING */}
              <h2 className="font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-[#07194E] md:text-5xl">
                Good conversations
                <br />
                create
                <span className="text-[#2563eb]">
                  {" "}great work.
                </span>
              </h2>

              {/* DESCRIPTION */}
              <p className="mt-7 max-w-lg text-base leading-8 text-[#64748b]">
                Every great collaboration begins with a
                conversation. Whether you're building a
                brand, launching a website, or growing
                your digital presence, we're here to
                explore the possibilities with you.
              </p>

              {/* CONTACT CARDS */}
              <div className="mt-10 space-y-4">
                <ContactInfo
                  icon={Mail}
                  label="EMAIL US"
                  value={contact.email}
                  href={`mailto:${contact.email}`}
                />

                <ContactInfo
                  icon={Phone}
                  label="CALL US"
                  value={contact.phone}
                  href={`tel:${contact.phoneLink}`}
                />

                <ContactInfo
                  icon={MapPin}
                  label="VISIT OUR OFFICE"
                  value={contact.location}
                  href={contact.mapLink}
                />
              </div>

              {/* QUICK ACTION BUTTONS */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${contact.phoneLink.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#1254F4] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#07194E] hover:shadow-lg"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
                  <ArrowUpRight size={16} />
                </a>

                <a
                  href={contact.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#dce6f5] bg-white px-6 py-3.5 text-sm font-bold text-[#1254F4] transition-all duration-300 hover:border-[#1254F4] hover:bg-[#eff5ff]"
                >
                  <Navigation size={17} />
                  Get Directions
                </a>
              </div>

              {/* BRAND MESSAGE */}
              <div className="mt-10 rounded-[24px] border border-[#dce8fa] bg-[#f5f8ff] p-6">
                <div className="flex items-center gap-3">
                  <Sparkles
                    size={21}
                    className="text-[#2563eb]"
                  />

                  <span className="text-sm font-bold text-[#07194E]">
                    Let's create something meaningful.
                  </span>
                </div>

                <p className="mt-3 text-sm leading-7 text-[#64748b]">
                  Strategy, creativity, and digital
                  experiences — all working together
                  to move your business forward.
                </p>
              </div>
            </div>

            {/* ======================================
                RIGHT - ENQUIRY FORM
            ====================================== */}

            <div className="contact-form-card relative overflow-hidden rounded-[30px] border border-[#e0e8f5] bg-[#f8faff] p-6 shadow-[0_20px_65px_rgba(7,25,78,0.06)] sm:p-9 lg:p-11">

              {/* FORM HEADER */}
              <div className="mb-9 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#2563eb]">
                    START A CONVERSATION
                  </p>

                  <h3 className="font-display text-3xl font-extrabold tracking-tight text-[#07194E]">
                    Tell us about
                    <br />
                    your project.
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-7 text-[#64748b]">
                    Fill in the details below and our
                    team will review your enquiry.
                  </p>
                </div>

                <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#1254F4] sm:flex">
                  <Send size={25} />
                </div>
              </div>

              {/* ENQUIRY FORM */}
              <form
                ref={formRef}
                onSubmit={submit}
              >
                <div className="grid gap-5 sm:grid-cols-2">

                  {/* FULL NAME */}
                  <label className={labelClass}>
                    Full Name
                    <span className="text-red-500">
                      {" "}*
                    </span>

                    <input
                      required
                      name="name"
                      autoComplete="name"
                      className={fieldClass}
                      placeholder="Enter your full name"
                      onChange={() => {
                        if (status !== "idle") {
                          setStatus("idle");
                        }
                      }}
                    />
                  </label>

                  {/* BUSINESS NAME */}
                  <label className={labelClass}>
                    Business Name
                    <span className="text-red-500">
                      {" "}*
                    </span>

                    <input
                      required
                      name="business"
                      autoComplete="organization"
                      className={fieldClass}
                      placeholder="Your business name"
                    />
                  </label>

                  {/* PHONE NUMBER */}
                  <label className={labelClass}>
                    Phone Number
                    <span className="text-red-500">
                      {" "}*
                    </span>

                    <input
                      required
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      className={fieldClass}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </label>

                  {/* EMAIL */}
                  <label className={labelClass}>
                    Email Address
                    <span className="text-red-500">
                      {" "}*
                    </span>

                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      className={fieldClass}
                      placeholder="you@company.com"
                    />
                  </label>

                  {/* SELECT SERVICE */}
                  <label
                    className={`${labelClass} sm:col-span-2`}
                  >
                    Select Service

                    <select
                      name="service"
                      required
                      defaultValue=""
                      className={fieldClass}
                    >
                      <option
                        value=""
                        disabled
                      >
                        Choose a service
                      </option>

                      {services.map((service) => (
                        <option
                          key={service.slug}
                          value={service.title}
                        >
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* REQUIREMENTS */}
                  <label
                    className={`${labelClass} sm:col-span-2`}
                  >
                    Tell Us About Your Requirements
                    <span className="text-red-500">
                      {" "}*
                    </span>

                    <textarea
                      required
                      name="requirements"
                      rows={5}
                      className={`${fieldClass} min-h-[150px] resize-y`}
                      placeholder="Tell us about your business, goals, challenges, or project requirements..."
                    />
                  </label>
                </div>

                {/* SUCCESS MESSAGE */}
                {status === "success" && (
                  <div
                    role="status"
                    className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700"
                  >
                    <CheckCircle2
                      size={20}
                      className="shrink-0"
                    />

                    Thank you! Your enquiry has been
                    submitted successfully.
                  </div>
                )}

                {/* ERROR MESSAGE */}
                {status === "error" && (
                  <div
                    role="alert"
                    className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700"
                  >
                    <AlertCircle
                      size={20}
                      className="shrink-0"
                    />

                    Unable to send your enquiry.
                    Please try again or email us directly.
                  </div>
                )}

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#1254F4] px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#07194E] hover:shadow-[0_12px_30px_rgba(18,84,244,0.25)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Enquiry
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                <p className="mt-5 text-xs leading-6 text-[#94a3b8]">
                  Your information will be used to
                  respond to your enquiry.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================
          GOOGLE MAPS SECTION
      ====================================== */}

      <section className="bg-[#f8faff] py-20 md:py-28">
        <div className="container-wide">

          {/* MAP HEADER */}
          <div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#2563eb]">
                  FIND US
                </span>
              </div>

              <h2 className="font-display text-4xl font-extrabold tracking-tight text-[#07194E] md:text-5xl">
                Visit our
                <span className="text-[#2563eb]">
                  {" "}office.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-[#64748b]">
                We're based in Visakhapatnam,
                Andhra Pradesh. Find our office
                location and plan your visit.
              </p>
            </div>

            <a
              href={contact.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-[#1254F4] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-[#07194E]"
            >
              <Navigation size={18} />
              Open Google Maps
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>

          {/* MAP CONTAINER */}
          <div className="overflow-hidden rounded-[30px] border border-[#e1e8f5] bg-white shadow-[0_20px_60px_rgba(7,25,78,0.08)]">
            <div className="relative h-[340px] w-full bg-[#eaf0fa] sm:h-[440px] lg:h-[520px]">
              <iframe
                title="SOLIFYHUB Office Location - Akkayyapalem, Visakhapatnam"
                src={contact.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>

            {/* MAP BOTTOM INFORMATION */}
            <div className="flex flex-col items-start justify-between gap-6 p-6 sm:p-8 md:flex-row md:items-center">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eaf1ff] text-[#1254F4]">
                  <Building2 size={23} />
                </div>

                <div>
                  <h3 className="font-display text-lg font-extrabold text-[#07194E]">
                    SOLIFYHUB
                  </h3>

                  <p className="mt-1 text-sm leading-7 text-[#64748b]">
                    {contact.location}
                  </p>
                </div>
              </div>

              <a
                href={contact.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#1254F4] transition-colors hover:text-[#2563eb]"
              >
                Get Directions
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================
          FINAL CONTACT STRIP
      ====================================== */}

      <section className="bg-white py-16 md:py-20">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-[30px] bg-[#07194E] p-8 text-white md:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#2563eb]/30 blur-3xl" />

            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#67e8f9]">
                  LET'S BUILD SOMETHING GREAT
                </p>

                <h2 className="font-display text-3xl font-extrabold leading-tight md:text-4xl">
                  Your next big idea
                  <br />
                  starts with a conversation.
                </h2>
              </div>

              <a
                href={`mailto:${contact.email}`}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#07194E] transition-all duration-300 hover:-translate-y-1 hover:bg-[#eaf1ff]"
              >
                <Mail size={18} />
                Email Our Team
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================
          CUSTOM ANIMATIONS
      ====================================== */}

      <style>{`
        .contact-form-card {
          transition:
            box-shadow 0.5s ease,
            border-color 0.5s ease;
        }

        .contact-form-card:hover {
          border-color: #cbdcf8;
          box-shadow:
            0 25px 70px rgba(0, 49, 143, 0.09);
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-form-card {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
