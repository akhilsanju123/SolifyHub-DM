
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { navigate } from "../../data/siteData";

// ============================================
// FOOTER NAVIGATION LINKS
// ============================================

const exploreLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about-us" },
  { label: "Services", path: "/services" },
  { label: "Careers", path: "/career" },
  { label: "Contact Us", path: "/contact-us" },
];

const serviceLinks = [
  { label: "Web Design", path: "/services/web-design" },
  { label: "App Development", path: "/services/app-development" },
  { label: "Branding", path: "/services/branding" },
  { label: "Digital Marketing", path: "/services/digital-marketing" },
  { label: "Campaigns", path: "/services/campaigns" },
  { label: "Content Creation", path: "/services/content-creation" },
];

const performanceLinks = [
  { label: "Creative Strategy", path: "/services/creative-strategy" },
  { label: "Advertising", path: "/services/advertising" },
  { label: "Graphic Design", path: "/services/graphic-design" },
  {
    label: "Social Media Creatives",
    path: "/services/social-media-creatives",
  },
  { label: "Video Production", path: "/services/video-production" },
  { label: "Motion Graphics", path: "/services/motion-graphics" },
];

// ============================================
// REUSABLE STYLES
// ============================================

const headingStyle =
  "mb-5 text-[13px] font-bold uppercase tracking-[0.16em] text-[#00CFFF]";

const linkStyle =
  "block w-fit text-left text-[14px] leading-6 text-white/75 transition-all duration-300 hover:translate-x-1 hover:text-[#00CFFF]";

const contactIconStyle =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-[#00CFFF] transition-all duration-300 group-hover:border-[#087BFA] group-hover:bg-[#0046AD] group-hover:text-white";

// Medium-sized social media buttons
const socialStyle =
  "flex h-[46px] w-[46px] sm:h-[50px] sm:w-[50px] shrink-0 items-center justify-center rounded-xl text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00CFFF]";

// Responsive SVG sizing
const socialIconStyle = "h-[25px] w-[25px] sm:h-[28px] sm:w-[28px]";

// ============================================
// SOCIAL MEDIA SVG ICONS
// ============================================

export function InstagramIcon() {
  return (
    <svg
      className={socialIconStyle}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="6" />
      <circle cx="12" cy="12" r="4.5" />
      <circle
        cx="18"
        cy="6"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function FacebookIcon() {
  return (
    <svg
      className={socialIconStyle}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.99h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

export function LinkedInIcon() {
  return (
    <svg
      className={socialIconStyle}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.79-1.52 2.98 0 3.58 1.96 3.58 4.5v5.27Z" />
    </svg>
  );
}

export function YouTubeIcon() {
  return (
    <svg
      className={socialIconStyle}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.55 3.6 12 3.6 12 3.6s-7.55 0-9.4.48A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.85.48 9.4.48 9.4.48s7.55 0 9.4-.48a3 3 0 0 0 2.1-2.12A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.24 3.6-6.24 3.6Z" />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg
      className={socialIconStyle}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.45 0 .08 5.36.08 11.96c0 2.11.55 4.18 1.6 6L0 24l6.2-1.63a11.96 11.96 0 0 0 5.85 1.5h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.5-8.43ZM12.06 21.85a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.68.97.98-3.58-.23-.37a9.89 9.89 0 0 1-1.52-5.32c0-5.46 4.44-9.9 9.91-9.9a9.85 9.85 0 0 1 7.01 2.9 9.85 9.85 0 0 1 2.9 7.01c0 5.46-4.44 9.9-9.96 9.88Zm5.43-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

// ============================================
// FOOTER COMPONENT
// ============================================

export default function Footer() {
  return (
    <footer className="relative z-50 overflow-hidden bg-[#07194E] text-white">

      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-[#1254F4]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[#00CFFF]/10 blur-3xl" />

      {/* MAIN FOOTER CONTAINER */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16 xl:px-12">

        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-x-7
            gap-y-10
            sm:grid-cols-2
            lg:grid-cols-4
            xl:grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1.55fr)]
            xl:gap-x-9
          "
        >

          {/* COLUMN 1 - BRAND */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-2 xl:col-span-1">

            <button
              type="button"
              onClick={() => navigate("/")}
              aria-label="Go to SOLIFYHUB homepage"
              className="mb-5 block w-[250px] max-w-full text-left transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src="/Fotterlogo.png"
                alt="SOLIFYHUB Digital Marketing Agency"
                className="block h-auto w-full object-contain object-left"
              />
            </button>

            <p className="max-w-[350px] text-[14px] leading-[1.9] text-white/75">
              SOLIFYHUB is a creative and digital marketing
              company helping ambitious businesses build
              stronger brands, connect with their audiences,
              and achieve meaningful digital growth through
              strategy, creativity, and technology.
            </p>

          </div>

          {/* COLUMN 2 - EXPLORE */}
          <div className="min-w-0">

            <h3 className={headingStyle}>
              Explore
            </h3>

            <nav
              aria-label="Explore links"
              className="flex flex-col items-start gap-3"
            >
              {exploreLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => navigate(link.path)}
                  className={linkStyle}
                >
                  {link.label}
                </button>
              ))}
            </nav>

          </div>

          {/* COLUMN 3 - SERVICES */}
          <div className="min-w-0">

            <h3 className={headingStyle}>
              Services
            </h3>

            <nav
              aria-label="Services links"
              className="flex flex-col items-start gap-3"
            >
              {serviceLinks.map((service) => (
                <button
                  key={service.label}
                  type="button"
                  onClick={() => navigate(service.path)}
                  className={linkStyle}
                >
                  {service.label}
                </button>
              ))}
            </nav>

          </div>

          {/* COLUMN 4 - MORE SERVICES */}
          <div className="min-w-0">

            <h3 className={headingStyle}>
              More Services
            </h3>

            <nav
              aria-label="More services links"
              className="flex flex-col items-start gap-3"
            >
              {performanceLinks.map((service) => (
                <button
                  key={service.label}
                  type="button"
                  onClick={() => navigate(service.path)}
                  className={linkStyle}
                >
                  {service.label}
                </button>
              ))}
            </nav>

          </div>

          {/* COLUMN 5 - FIND US */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-2 xl:col-span-1">

            <h3 className={headingStyle}>
              Find Us
            </h3>

            <div className="flex flex-col gap-6">

              {/* PHONE */}
              <a
                href="tel:+918688829033"
                className="group flex items-start gap-3"
              >
                <span className={contactIconStyle}>
                  <Phone size={18} />
                </span>

                <span className="min-w-0 pt-0.5">
                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-white/50">
                    Call Us
                  </span>

                  <span className="block text-[14px] leading-6 text-white/80 transition-colors group-hover:text-[#00CFFF]">
                    +91 86888 29033
                  </span>
                </span>
              </a>

              {/* EMAIL */}
              <a
                href="mailto:info@solifyhub.com"
                className="group flex items-start gap-3"
              >
                <span className={contactIconStyle}>
                  <Mail size={18} />
                </span>

                <span className="min-w-0 pt-0.5">
                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-white/50">
                    Email Us
                  </span>

                  <span className="block break-words text-[14px] leading-6 text-white/80 transition-colors group-hover:text-[#00CFFF]">
                    info@solifyhub.com
                  </span>
                </span>
              </a>

              {/* OFFICE ADDRESS */}
              <div className="group flex items-start gap-3">

                <span className={contactIconStyle}>
                  <MapPin size={19} />
                </span>

                <div className="min-w-0 pt-0.5">

                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-white/50">
                    Visit Our Office
                  </span>

                  <address className="not-italic text-[14px] leading-[1.85] text-white/75">
                    34-31/3, Door No. 49,
                    Main Road, Beside Masjid-E-Taj Bagh,
                    Akkayyapalem, Visakhapatnam,
                    Andhra Pradesh - 530016
                  </address>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=SOLIFYHUB%20Akkayyapalem%20Visakhapatnam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#00CFFF] transition-all duration-300 hover:gap-2.5 hover:text-[#FF8800]"
                  >
                    Get Directions
                    <ArrowUpRight size={15} />
                  </a>

                </div>
              </div>

              {/* SOCIAL MEDIA ICONS - MEDIUM SIZE */}
              <div className="pt-1">

                <div
                  className="flex flex-wrap items-center gap-2.5 sm:gap-3"
                  aria-label="Social media links"
                >

                  {/* INSTAGRAM */}
                  <a
                    href="https://www.instagram.com/solifyhub/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Instagram"
                    className={`${socialStyle} bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45] hover:shadow-pink-500/30`}
                  >
                    <InstagramIcon />
                  </a>

                  {/* FACEBOOK */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61593760515445"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    title="Facebook"
                    className={`${socialStyle} bg-[#1877F2] hover:shadow-blue-500/30`}
                  >
                    <FacebookIcon />
                  </a>

                  {/* LINKEDIN */}
                  <a
                    href="https://www.linkedin.com/in/solifyhub/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className={`${socialStyle} bg-[#0A66C2] hover:shadow-blue-500/30`}
                  >
                    <LinkedInIcon />
                  </a>

                  {/* YOUTUBE */}
                  <a
                    href="https://www.youtube.com/@SolifyHub"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    title="YouTube"
                    className={`${socialStyle} bg-[#FF0000] hover:shadow-red-500/30`}
                  >
                    <YouTubeIcon />
                  </a>

                  {/* WHATSAPP */}
                  <a
                    href="https://wa.me/918688829033"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    title="WhatsApp"
                    className={`${socialStyle} bg-[#25D366] hover:shadow-green-500/30`}
                  >
                    <WhatsAppIcon />
                  </a>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* COPYRIGHT SECTION */}
      <div className="relative z-10 border-t border-white/10">

        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-3 px-5 py-5 text-center text-[12px] text-white/55 sm:flex-row sm:px-8 sm:text-left lg:px-10 xl:px-12">

          <span>
            © {new Date().getFullYear()} SOLIFYHUB.
            All Rights Reserved.
          </span>

          <span>
            A Creative &amp; Digital Marketing Company
          </span>

        </div>
      </div>

    </footer>
  );
}
