
import { ArrowRight } from "lucide-react";
import { navigate } from "../../data/siteData";

export default function CTA() {

  // ============================================
  // START A CONVERSATION
  // NAVIGATE AND SCROLL TO GET IN TOUCH
  // ============================================

  const handleStartConversation = () => {
    // If already on Contact Us page, scroll directly
    if (window.location.pathname === "/contact-us") {
      scrollToGetInTouch();
      return;
    }

    // Navigate to Contact Us page
    navigate("/contact-us");

    // Wait until the Contact Us section is rendered
    let attempts = 0;
    const maxAttempts = 50;

    const checkForSection = () => {
      const section = document.getElementById(
        "get-in-touch"
      );

      if (section) {
        scrollToGetInTouch();
        return;
      }

      attempts++;

      if (attempts < maxAttempts) {
        window.setTimeout(checkForSection, 100);
      }
    };

    window.requestAnimationFrame(checkForSection);
  };

  // ============================================
  // SMOOTH SCROLL FUNCTION
  // ============================================

  const scrollToGetInTouch = () => {
    const section = document.getElementById(
      "get-in-touch"
    );

    if (!section) return;

    const headerOffset = 95;

    const sectionTop =
      section.getBoundingClientRect().top +
      window.scrollY;

    window.scrollTo({
      top: Math.max(0, sectionTop - headerOffset),
      behavior: "smooth",
    });
  };

  // ============================================
  // CTA SECTION
  // ============================================

  return (
    <section className="relative overflow-hidden bg-[#F5F4FF] py-24">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#00CFFF]/20 blur-3xl" />

      {/* CONTENT CONTAINER */}
      <div className="container-wide relative text-center">

        {/* EYEBROW TEXT */}
        <p className="eyebrow mb-5">
          Your next chapter starts here
        </p>

        {/* HEADING */}
        <h2 className="section-title mx-auto max-w-4xl">
          Ready to make a
          <br />
          <span className="text-gradient">
            bigger impression?
          </span>
        </h2>

        {/* DESCRIPTION */}
        <p className="body-copy mx-auto mt-6 max-w-xl">
          Tell us what you are building, where you
          are stuck or where you want to go next.
          We will bring the right questions.
        </p>

        {/* START A CONVERSATION BUTTON */}
        <button
          type="button"
          className="btn-primary mt-8"
          onClick={handleStartConversation}
        >
          Start a conversation
          <ArrowRight size={18} />
        </button>

      </div>
    </section>
  );
}
