"use client";
import { useEffect, useRef } from "react";

const clients = [
  { name: "Honda", logo: "/honda.png" },
  { name: "Collabzy", logo: "/Collabzy.png" },
  { name: "Bidndrive", logo: "/bidndrive.png" },
  { name: "Infograins", logo: "/infograins.png" },
  { name: "Anand Group", logo: "/anand.png" },
//   { name: "NC Design", logo: "/nc-design.png" },
  { name: "Stosa Cucine", logo: "/stosa.png" },
  { name: "Mahindra", logo: "/mahindra.png" },
//   { name: "Volkswagen", logo: "/volkswagen.png" },
//   { name: "Maa Made", logo: "/maamade.png" },
  { name: "Hyco", logo: "/hyco.png" },
];

export default function ClientsMarquee() {
  return (
    <section className="py-20 bg-white border-y border-slate-100">
      {/* Heading — same style as all other sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
        <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
          Trusted By
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
          Our Leading Clients
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          Proud to work with some of the most recognizable brands across industries.
        </p>
      </div>

      {/* Marquee */}
      <div
        className="overflow-hidden relative"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "marqueeScroll 30s linear infinite",
          }}
        >
          {/* Render clients twice for seamless loop */}
          {[...clients, ...clients].map((client, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                padding: "0 48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={client.logo}
                alt={client.name}
                style={{
                  height: "72px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>

        {/* Keyframe animation via style tag */}
        <style>{`
          @keyframes marqueeScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}