
import { useEffect, useState } from "react";

// ==========================================
// SOCIAL MEDIA ICON COMPONENTS
// ==========================================

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="6" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="18" cy="6" r="1"
        fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24"
      fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.99h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24"
      fill="currentColor" aria-hidden="true">
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.79-1.52 2.98 0 3.58 1.96 3.58 4.5v5.27Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24"
      fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.55 3.6 12 3.6 12 3.6s-7.55 0-9.4.48A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.85.48 9.4.48 9.4.48s7.55 0 9.4-.48a3 3 0 0 0 2.1-2.12A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.24 3.6-6.24 3.6Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24"
      fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.45 0 .08 5.36.08 11.96c0 2.11.55 4.18 1.6 6L0 24l6.2-1.63a11.96 11.96 0 0 0 5.85 1.5h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.5-8.43ZM12.06 21.85a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.68.97.98-3.58-.23-.37a9.89 9.89 0 0 1-1.52-5.32c0-5.46 4.44-9.9 9.91-9.9a9.85 9.85 0 0 1 7.01 2.9 9.85 9.85 0 0 1 2.9 7.01c0 5.46-4.44 9.9-9.96 9.88Zm5.43-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

// ==========================================
// SOCIAL MEDIA LINKS
// ==========================================

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/solifyhub/",
    className: "social-instagram",
    Icon: InstagramIcon,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61593760515445",
    className: "social-facebook",
    Icon: FacebookIcon,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/solifyhub/",
    className: "social-linkedin",
    Icon: LinkedInIcon,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@SolifyHub",
    className: "social-youtube",
    Icon: YouTubeIcon,
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/918688829033",
    className: "social-whatsapp",
    Icon: WhatsAppIcon,
  },
];

// ==========================================
// MAIN SOCIAL RAIL COMPONENT
// ==========================================

export default function SocialRail() {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let observedFooter: Element | null = null;

    const observeFooter = () => {
      const footer = document.querySelector("footer");

      if (footer === observedFooter) return;

      observer?.disconnect();
      observedFooter = footer;

      if (!footer) {
        setFooterVisible(false);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          setFooterVisible(entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0,
        }
      );

      observer.observe(footer);
    };

    observeFooter();

    const mutationObserver = new MutationObserver(observeFooter);

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <>
      <aside
        className={`social-rail ${
          footerVisible ? "social-rail-hidden" : ""
        }`}
        aria-label="SOLIFYHUB social media links"
        aria-hidden={footerVisible}
      >
        {socialLinks.map(({ name, url, className, Icon }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            title={name}
            tabIndex={footerVisible ? -1 : 0}
            className={`social-brand ${className}`}
          >
            <Icon />
          </a>
        ))}
      </aside>

      <style>{`

        /* ======================================
           DESKTOP VIEW
        ====================================== */

        .social-rail {
          position: fixed !important;
          top: 50%;
          left: 12px;
          right: auto;
          bottom: auto;

          transform: translateY(-50%);

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          gap: 8px;

          width: max-content !important;
          height: max-content !important;
          min-width: 0 !important;
          min-height: 0 !important;

          padding: 0 !important;
          margin: 0 !important;

          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;

          border: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;

          z-index: 10;

          opacity: 1;
          visibility: visible;

          transition:
            opacity 0.25s ease,
            visibility 0.25s ease;
        }

        /* Hide icons when footer appears */

        .social-rail.social-rail-hidden {
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        /* ======================================
           ICON SIZE - DESKTOP
        ====================================== */

        .social-rail .social-brand {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 38px !important;
          height: 38px !important;
          min-width: 38px !important;
          min-height: 38px !important;
          max-width: 38px !important;
          max-height: 38px !important;

          padding: 0 !important;
          margin: 0 !important;

          flex-shrink: 0;

          border: none !important;
          border-radius: 9px !important;

          color: #ffffff !important;
          text-decoration: none;
          box-shadow: none;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .social-rail .social-brand svg {
          display: block;
          width: 22px !important;
          height: 22px !important;
          flex-shrink: 0;
        }

        /* ======================================
           ORIGINAL BRAND COLORS
        ====================================== */

        .social-rail .social-instagram {
          background: linear-gradient(
            45deg,
            #feda75,
            #fa7e1e,
            #d62976,
            #962fbf,
            #4f5bd5
          ) !important;
        }

        .social-rail .social-facebook {
          background: #1877f2 !important;
        }

        .social-rail .social-linkedin {
          background: #0a66c2 !important;
        }

        .social-rail .social-youtube {
          background: #ff0000 !important;
        }

        .social-rail .social-whatsapp {
          background: #25d366 !important;
        }

        /* ======================================
           HOVER
        ====================================== */

        .social-rail .social-brand:hover {
          transform: translateX(3px) scale(1.05);
          box-shadow: 0 5px 14px rgba(0, 0, 0, 0.15);
        }

        .social-rail .social-brand:focus-visible {
          outline: 2px solid #00cfff;
          outline-offset: 3px;
        }

        /* ======================================
           TABLET VIEW
        ====================================== */

        @media (min-width: 768px) and (max-width: 1024px) {
          .social-rail {
            left: 8px;
            gap: 7px;
          }
        }

        /* ======================================
           MOBILE VIEW
           BOTTOM CENTER HORIZONTAL ICONS
        ====================================== */

        @media (max-width: 767px) {

          .social-rail {
            position: fixed !important;

            top: auto !important;
            left: 50% !important;
            right: auto !important;
            bottom: calc(
              12px + env(safe-area-inset-bottom, 0px)
            ) !important;

            transform: translateX(-50%) !important;

            flex-direction: row !important;
            align-items: center !important;
            justify-content: center !important;

            gap: 8px !important;

            width: max-content !important;
            max-width: calc(100vw - 24px);

            height: auto !important;

            padding: 0 !important;
            margin: 0 !important;

            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;

            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;

            z-index: 10;
          }

          .social-rail .social-brand {
            width: 38px !important;
            height: 38px !important;
            min-width: 38px !important;
            min-height: 38px !important;
            max-width: 38px !important;
            max-height: 38px !important;

            border-radius: 9px !important;
          }

          .social-rail .social-brand svg {
            width: 22px !important;
            height: 22px !important;
          }

          .social-rail .social-brand:hover {
            transform: translateY(-3px);
          }
        }

        /* ======================================
           SMALL MOBILE VIEW
        ====================================== */

        @media (max-width: 360px) {

          .social-rail {
            gap: 6px !important;
          }

          .social-rail .social-brand {
            width: 34px !important;
            height: 34px !important;
            min-width: 34px !important;
            min-height: 34px !important;
            max-width: 34px !important;
            max-height: 34px !important;
          }

          .social-rail .social-brand svg {
            width: 20px !important;
            height: 20px !important;
          }
        }

        /* ======================================
           ACCESSIBILITY
        ====================================== */

        @media (prefers-reduced-motion: reduce) {

          .social-rail,
          .social-rail .social-brand {
            transition: none !important;
          }

          .social-rail .social-brand:hover {
            transform: none;
          }
        }

      `}</style>
    </>
  );
}
