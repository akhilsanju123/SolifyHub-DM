
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  Check,
  Lightbulb,
  Sparkles,
  X,
} from "lucide-react";

import { navigate, type Industry } from "../../data/siteData";
import "./IndustryModal.css";

type IndustryModalProps = {
  industry: Industry;
  onClose: () => void;
};

export default function IndustryModal({
  industry,
  onClose,
}: IndustryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();

  // Always use the latest onClose callback.
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    // Save the original styles before changing anything.
    const previousBodyOverflow = body.style.overflow;
    const previousBodyOverflowX = body.style.overflowX;
    const previousBodyOverflowY = body.style.overflowY;

    const previousHtmlOverflow = html.style.overflow;
    const previousHtmlOverflowX = html.style.overflowX;
    const previousHtmlOverflowY = html.style.overflowY;

    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;

    const previousActiveElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    // Lock only background scrolling.
    // Do not use position: fixed on the body.
    body.style.overflow = "hidden";

    // Ensure older fixed-body locking is not retained.
    // The cleanup below restores the original values.
    body.style.position = "";
    body.style.top = "";
    body.style.width = "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) {
        return;
      }

      const focusableElements =
        modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Focus the close button without moving the page.
    closeButtonRef.current?.focus({
      preventScroll: true,
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      // Restore all original scroll-related styles.
      body.style.overflow = previousBodyOverflow;
      body.style.overflowX = previousBodyOverflowX;
      body.style.overflowY = previousBodyOverflowY;

      html.style.overflow = previousHtmlOverflow;
      html.style.overflowX = previousHtmlOverflowX;
      html.style.overflowY = previousHtmlOverflowY;

      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;

      // Return keyboard focus to the original industry card.
      if (previousActiveElement?.isConnected) {
        previousActiveElement.focus({
          preventScroll: true,
        });
      }
    };
  }, []);

  const handleBackdropMouseDown = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleContactClick = () => {
    onClose();
    navigate("/contact-us");
  };

  const modal = (
    <div
      className="sh-industry-overlay"
      onMouseDown={handleBackdropMouseDown}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="sh-industry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        {/* CLOSE BUTTON */}
        <button
          ref={closeButtonRef}
          type="button"
          className="sh-industry-close"
          onClick={onClose}
          aria-label="Close industry details"
        >
          <X size={20} />
        </button>

        <div className="sh-industry-layout">
          {/* LEFT SIDE IMAGE */}
          <div className="sh-industry-visual">
            <img
              src={industry.image}
              alt={`${industry.name} marketing by SOLIFYHUB`}
              className="sh-industry-photo"
            />

            <div className="sh-industry-image-overlay" />

            <div className="sh-industry-image-content">
              <span className="sh-industry-image-eyebrow">
                SOLIFYHUB / INDUSTRIES
              </span>

              <h3>{industry.name}</h3>

              <p>
                Creative thinking. Digital experiences.
                Meaningful business growth.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="sh-industry-content">
            <div className="sh-industry-eyebrow">
              <span className="sh-industry-eyebrow-line" />
              INDUSTRY EXPERTISE
            </div>

            <h2 id={titleId} className="sh-industry-title">
              {industry.name}
            </h2>

            <p className="sh-industry-headline">
              {industry.headline}
            </p>

            <p className="sh-industry-description">
              {industry.desc}
            </p>

            <div className="sh-industry-divider" />

            <p className="sh-industry-about">
              {industry.whatWeDo}
            </p>

            {/* MARKETING CHALLENGES */}
            <section className="sh-industry-section">
              <div className="sh-industry-section-heading">
                <div className="sh-industry-section-icon cyan">
                  <Lightbulb size={19} />
                </div>

                <h3>Common Marketing Challenges</h3>
              </div>

              <ul className="sh-industry-challenges">
                {industry.challenges.map(
                  (challenge, index) => (
                    <li key={`${challenge}-${index}`}>
                      <span className="sh-industry-bullet" />
                      <span>{challenge}</span>
                    </li>
                  )
                )}
              </ul>
            </section>

            {/* HOW SOLIFYHUB HELPS */}
            <section className="sh-industry-section">
              <div className="sh-industry-section-heading">
                <div className="sh-industry-section-icon blue">
                  <Check size={19} />
                </div>

                <h3>How SOLIFYHUB Helps</h3>
              </div>

              <ul className="sh-industry-benefits">
                <li>
                  <Check size={17} />
                  <span>
                    Strategy and positioning shaped around
                    your audience.
                  </span>
                </li>

                <li>
                  <Check size={17} />
                  <span>
                    Content and campaigns that explain your
                    value clearly.
                  </span>
                </li>

                <li>
                  <Check size={17} />
                  <span>
                    Digital experiences designed to move
                    people to action.
                  </span>
                </li>
              </ul>
            </section>

            {/* RELEVANT SERVICES */}
            <section className="sh-industry-section">
              <div className="sh-industry-section-heading">
                <div className="sh-industry-section-icon purple">
                  <Sparkles size={19} />
                </div>

                <h3>Relevant Services</h3>
              </div>

              <div className="sh-industry-services">
                {industry.services.map((service, index) => (
                  <span
                    key={`${service}-${index}`}
                    className="sh-industry-service-tag"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </section>

            {/* CTA BUTTONS */}
            <div className="sh-industry-actions">
              <button
                type="button"
                className="sh-industry-primary-btn"
                onClick={handleContactClick}
              >
                Talk About Your Business
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="sh-industry-secondary-btn"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render outside animated/transformed page containers.
  return createPortal(modal, document.body);
}
