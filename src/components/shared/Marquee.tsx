
import React from "react";

const items = [
  "Strategy",
  "Search",
  "Creative",
  "Performance",
  "Digital Experiences",
  "Growth",
];

export default function Marquee() {
  const repeatedItems = Array(4).fill(items).flat();

  return (
    <>
      <div className="marquee-container">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div
              className="marquee-group"
              key={copy}
              aria-hidden={copy === 1}
            >
              {repeatedItems.map((item, index) => (
                <span
                  key={`${copy}-${index}`}
                  className="marquee-item"
                >
                  {item}
                  <span className="marquee-star">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          border-top: 1px solid #F5F7FA;
          border-bottom: 1px solid #F5F7FA;
          background: white;
          padding: 20px 0;
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 120s linear infinite;
          will-change: transform;
        }

        .marquee-group {
          display: flex;
          flex-shrink: 0;
          align-items: center;
        }

        .marquee-item {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 40px;
          padding-right: 40px;
          white-space: nowrap;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #1254F4;
        }

        .marquee-star {
          color: #00CFFF;
          font-size: 18px;
        }

        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .marquee-item {
            font-size: 12px;
            gap: 24px;
            padding-right: 24px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
