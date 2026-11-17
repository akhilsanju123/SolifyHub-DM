
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ArrowRight,
  ChevronDown,
  Moon,
  X,
} from "lucide-react";

import {
  navigate,
  usePath,
  services,
  capabilityServices,
  performanceServices,
} from "../../data/siteData";

import Logo from "./Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] =
    useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const scrollToContactPending = useRef(false);

  const path = usePath();

  // ============================================
  // ORDERED SERVICES - 01 TO 12
  // ============================================

  const orderedServices = useMemo(() => {
    const combinedServices = [
      ...capabilityServices,
      ...performanceServices,
      ...services,
    ];

    const uniqueServices = Array.from(
      new Map(
        combinedServices
          .filter(
            (service) =>
              service.slug !== "app-development"
          )
          .map((service) => [
            service.slug,
            service,
          ])
      ).values()
    );

    const sortedServices = uniqueServices.sort(
      (a, b) => Number(a.number) - Number(b.number)
    );

    const existingServices = sortedServices.slice(0, 11);

    const numberedServices = existingServices.map(
      (service, index) => ({
        ...service,
        number: String(index + 1).padStart(2, "0"),
      })
    );

    return [
      ...numberedServices,
      {
        number: "12",
        slug: "app-development",
        title: "App Development",
        tagline:
          "Build powerful mobile and web applications.",
      },
    ];
  }, []);

  const firstColumn = orderedServices.slice(0, 6);
  const secondColumn = orderedServices.slice(6, 12);

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ============================================
  // MOBILE SCROLL LOCK
  // ============================================

  useEffect(() => {
    if (!open) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("mobile-nav-open");

    return () => {
      document.body.style.overflow =
        previousOverflow;
      document.documentElement.classList.remove("mobile-nav-open");
    };
  }, [open]);

  // ============================================
  // ESCAPE KEY & OUTSIDE CLICK
  // ============================================

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setOpen(false);
        setMobileServicesOpen(false);
      }
    };

    const onClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);

    return () => {
      document.removeEventListener(
        "keydown",
        onKey
      );
      document.removeEventListener(
        "mousedown",
        onClick
      );
    };
  }, []);

  // ============================================
  // CLOSE MENUS
  // ============================================

  const close = () => {
    setOpen(false);
    setMobileServicesOpen(false);
  };

  // ============================================
  // NORMAL PAGE NAVIGATION
  // ============================================

  const goToPage = (url: string) => {
    scrollToContactPending.current = false;

    setServicesOpen(false);
    close();

    navigate(url);
  };

  const goToService = (slug: string) => {
    goToPage(`/services/${slug}`);
  };

  // ============================================
  // SCROLL TO GET IN TOUCH SECTION
  // ============================================

  const scrollToGetInTouch = () => {
    const section = document.getElementById(
      "get-in-touch"
    );

    if (!section) return false;

    const headerOffset = 95;

    const sectionPosition =
      section.getBoundingClientRect().top +
      window.scrollY;

    const scrollPosition =
      sectionPosition - headerOffset;

    window.scrollTo({
      top: Math.max(0, scrollPosition),
      behavior: "smooth",
    });

    return true;
  };

  // ============================================
  // START A PROJECT CLICK
  // ============================================

  const goToStartProject = () => {
    setServicesOpen(false);
    close();

    scrollToContactPending.current = true;

    if (path !== "/contact-us") {
      navigate("/contact-us");
    } else {
      requestAnimationFrame(() => {
        if (scrollToGetInTouch()) {
          scrollToContactPending.current = false;
        }
      });
    }
  };

  // ============================================
  // SCROLL AFTER CONTACT PAGE RENDERS
  // ============================================

  useEffect(() => {
    if (
      path !== "/contact-us" ||
      !scrollToContactPending.current
    ) {
      return;
    }

    let observer: MutationObserver | null = null;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tryScroll = () => {
      if (!scrollToContactPending.current) {
        observer?.disconnect();
        return;
      }

      if (scrollToGetInTouch()) {
        scrollToContactPending.current = false;
        observer?.disconnect();
        clearTimeout(timeoutId);
      }
    };

    const frameId = requestAnimationFrame(
      tryScroll
    );

    observer = new MutationObserver(tryScroll);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    timeoutId = setTimeout(() => {
      tryScroll();
      observer?.disconnect();
    }, 5000);

    return () => {
      cancelAnimationFrame(frameId);
      observer?.disconnect();
      clearTimeout(timeoutId);
    };
  }, [path]);

  // ============================================
  // SERVICE ITEM COMPONENT
  // ============================================

  const renderService = (
    service: (typeof orderedServices)[number]
  ) => (
    <button
      type="button"
      key={service.slug}
      className="mega-item group"
      onClick={() => goToService(service.slug)}
    >
      <span className="mega-number">
        {service.number}
      </span>

      <span className="mega-copy">
        <strong>{service.title}</strong>
        <small>{service.tagline}</small>
      </span>

      <ArrowRight
        size={16}
        className="mega-arrow"
      />
    </button>
  );

  // ============================================
  // HEADER JSX
  // ============================================

  return (
    <header
      className={`navbar ${
        scrolled ? "scrolled" : ""
      } ${open ? "mobile-open" : ""}`}
    >
      <div className="container-wide flex h-[76px] items-center justify-between">
        {/* LOGO */}
        <Logo />

        {/* DESKTOP NAVIGATION */}
        <nav className="desktop-nav flex items-center gap-8">
          {/* HOME */}
          <button
            type="button"
            className={`nav-link ${
              path === "/" ? "active" : ""
            }`}
            onClick={() => goToPage("/")}
          >
            Home
          </button>

          {/* ABOUT US */}
          <button
            type="button"
            className={`nav-link ${
              path === "/about-us" ? "active" : ""
            }`}
            onClick={() => goToPage("/about-us")}
          >
            About Us
          </button>

          {/* SERVICES DROPDOWN */}
          <div
            ref={menuRef}
            className="relative flex items-center gap-1"
            onMouseEnter={() =>
              setServicesOpen(true)
            }
            onMouseLeave={() =>
              setServicesOpen(false)
            }
          >
            <button
              type="button"
              className={`nav-link ${
                path.startsWith("/services")
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                goToPage("/services")
              }
            >
              Services
            </button>

            <button
              type="button"
              aria-label="Open services menu"
              aria-expanded={servicesOpen}
              aria-controls="services-mega-menu"
              className="rounded p-1 text-[#505050]"
              onClick={() =>
                setServicesOpen(!servicesOpen)
              }
            >
              <ChevronDown
                size={15}
                className={`transition-transform duration-300 ${
                  servicesOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {/* MEGA MENU */}
            {servicesOpen && (
              <div
                id="services-mega-menu"
                className="mega-menu absolute right-[-220px] top-12 z-50 w-[min(760px,calc(100vw-48px))] rounded-[24px] border border-[#F5F7FA] bg-white p-5 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between border-b border-[#eef2f7] pb-4">
                  <div>
                    <p className="eyebrow">
                      Our Services
                    </p>

                    <p className="mt-1 text-sm text-[#505050]">
                      Creative solutions. Digital growth.
                      Real results.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn-ghost !min-h-[38px] !px-4 !text-xs"
                    onClick={() =>
                      goToPage("/services")
                    }
                  >
                    View all services
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="mega-columns">
                  <div>
                    <div className="mega-list">
                      {firstColumn.map(
                        renderService
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="mega-list">
                      {secondColumn.map(
                        renderService
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* INDUSTRIES */}
          <button
            type="button"
            className={`nav-link ${
              path === "/industries"
                ? "active"
                : ""
            }`}
            onClick={() =>
              goToPage("/industries")
            }
          >
            Industries
          </button>

          {/* BLOGS */}
          <button
            type="button"
            className={`nav-link ${
              path.startsWith("/blogs")
                ? "active"
                : ""
            }`}
            onClick={() => goToPage("/blogs")}
          >
            Blogs
          </button>

          {/* CAREER */}
          <button
            type="button"
            className={`nav-link ${
              path === "/career" ? "active" : ""
            }`}
            onClick={() =>
              goToPage("/career")
            }
          >
            Career
          </button>

          {/* CONTACT US */}
          <button
            type="button"
            className={`nav-link ${
              path === "/contact-us"
                ? "active"
                : ""
            }`}
            onClick={() =>
              goToPage("/contact-us")
            }
          >
            Contact Us
          </button>

          {/* START A PROJECT - DESKTOP */}
          <button
            type="button"
            className="btn-primary ml-2 !min-h-[44px] !px-5 !text-sm"
            onClick={goToStartProject}
          >
            Start a project
            <ArrowRight size={16} />
          </button>
        </nav>

        {/* MOBILE CONTROLS */}
        <div className="mobile-controls">
          <button
            type="button"
            className="mobile-theme-toggle"
            aria-label="Theme"
          >
            <Moon size={20} />
          </button>
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <span className="hamburger-lines" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* ============================================
          MOBILE NAVIGATION
      ============================================ */}

      <div
        id="mobile-navigation"
        aria-hidden={!open}
        className={`mobile-menu fixed inset-x-0 bottom-0 top-[76px] z-50 overflow-y-auto px-6 py-8 ${open ? "is-open" : "is-closed"}`}
      >
          <div className="mobile-menu-inner">
            <button
              type="button"
              className="mobile-close-button"
              onClick={close}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            <div className="mobile-nav-list">
            {/* HOME */}
            <button
              type="button"
              className="mobile-nav-link rounded-xl px-3 py-4 text-left text-lg font-bold"
              onClick={() => goToPage("/")}
            >
              Home
            </button>

            {/* ABOUT US */}
            <button
              type="button"
              className="mobile-nav-link rounded-xl px-3 py-4 text-left text-lg font-bold"
              onClick={() =>
                goToPage("/about-us")
              }
            >
              About Us
            </button>

            {/* MOBILE SERVICES */}
            <div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="mobile-nav-link rounded-xl px-3 py-4 text-left text-lg font-bold"
                  onClick={() =>
                    goToPage("/services")
                  }
                >
                  Services
                </button>

                <button
                  type="button"
                  className="rounded-xl p-3 text-[#1254F4]"
                  aria-label="Expand services"
                  aria-expanded={
                    mobileServicesOpen
                  }
                  onClick={() =>
                    setMobileServicesOpen(
                      !mobileServicesOpen
                    )
                  }
                >
                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      mobileServicesOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>
              </div>

              {mobileServicesOpen && (
                <div className="ml-4 grid gap-2 border-l-2 border-[#00CFFF] pl-4">
                  {orderedServices.map(
                    (service) => (
                      <button
                        type="button"
                        key={service.slug}
                        className="mega-item mobile-mega-item"
                        onClick={() =>
                          goToService(
                            service.slug
                          )
                        }
                      >
                        <span className="mega-number">
                          {service.number}
                        </span>

                        <span className="mega-copy">
                          <strong>
                            {service.title}
                          </strong>
                          <small>
                            {service.tagline}
                          </small>
                        </span>

                        <ArrowRight
                          size={16}
                          className="mega-arrow"
                        />
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* INDUSTRIES */}
            <button
              type="button"
              className="mobile-nav-link rounded-xl px-3 py-4 text-left text-lg font-bold"
              onClick={() =>
                goToPage("/industries")
              }
            >
              Industries
            </button>

            {/* BLOGS */}
            <button
              type="button"
              className="mobile-nav-link rounded-xl px-3 py-4 text-left text-lg font-bold"
              onClick={() =>
                goToPage("/blogs")
              }
            >
              Blogs
            </button>

            {/* CAREER */}
            <button
              type="button"
              className="mobile-nav-link rounded-xl px-3 py-4 text-left text-lg font-bold"
              onClick={() =>
                goToPage("/career")
              }
            >
              Career
            </button>

            {/* CONTACT US */}
            <button
              type="button"
              className="mobile-nav-link rounded-xl px-3 py-4 text-left text-lg font-bold"
              onClick={() =>
                goToPage("/contact-us")
              }
            >
              Contact Us
            </button>

            {/* START A PROJECT - MOBILE */}
            <button
              type="button"
              className="btn-primary mt-4 flex min-h-[48px] items-center justify-center gap-2"
              onClick={goToStartProject}
            >
              Start a project
              <ArrowRight size={16} />
            </button>
            </div>
          </div>
        </div>
    </header>
  );
}
