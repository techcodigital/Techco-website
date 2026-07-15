"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Code2,
  Megaphone,
  Cpu,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Quote,
  TrendingUp,
  Search,
 
  Target,
} from "lucide-react";
import ClientsMarquee from "./Clientsmarquee/page";

/* ────────────────────────────────────────────────────────────
   UTILITIES — scroll reveal, counters, spotlight, magnetic btn
   ──────────────────────────────────────────────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
        inView ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-[2px]"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Counter({
  value,
  suffix = "",
  duration = 1700,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [ref, inView] = useInView(0.5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let raf: number;
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(easeOutQuart(progress) * value));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(value);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/** Card wrapper that adds a soft radial glow following the cursor. */
function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={handleMove} className={`spotlight-card ${className}`}>
      {children}
    </div>
  );
}

/** Anchor that subtly follows the cursor for a "magnetic" feel. */
function MagneticLink({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <Link
      href={href}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`magnetic-btn inline-flex ${className}`}
    >
      {children}
    </Link>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-5">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left gap-4"
      >
        <span className="font-semibold text-slate-900">{q}</span>
        <ChevronDown
          size={20}
          className={`text-blue-600 flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <p className="overflow-hidden text-slate-500 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────────────────────── */

const Services = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Full-funnel marketing strategy — content, campaigns, and analytics working together to amplify your brand's online presence.",
    color: "text-indigo-600",
    border: "border-indigo-100 hover:border-indigo-300",
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=700&q=80",
    alt: "Marketing team planning a digital campaign",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "On-page, technical & local SEO that pushes your website up the rankings and brings in consistent organic traffic.",
    color: "text-emerald-600",
    border: "border-emerald-100 hover:border-emerald-300",
    image:
      "https://images.unsplash.com/photo-1571677246347-5040036b95cc?auto=format&fit=crop&w=700&q=80",
    alt: "SEO search ranking analytics on a screen",
  },
  {
    icon: Target,
    title: "Paid Ads (Google & Meta)",
    description:
      "Performance-driven Google, Meta & Instagram ad campaigns built around real targeting data — not guesswork.",
    color: "text-orange-600",
    border: "border-orange-100 hover:border-orange-300",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80",
    alt: "Ad campaign performance dashboard with graphs",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description:
      "Innovative mobile and hybrid apps that enhance customer engagement across multiple platforms.",
    color: "text-cyan-600",
    border: "border-cyan-100 hover:border-cyan-300",
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=700&q=80",
    alt: "Person using a mobile app on a smartphone",
  },
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Tailored websites, scalable e-commerce platforms, and robust software that streamlines your operations.",
    color: "text-blue-600",
    border: "border-blue-100 hover:border-blue-300",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=700&q=80",
    alt: "Developer writing code on a laptop",
  },
  {
    icon: Cpu,
    title: "Generative AI",
    description:
      "ML models, AI automation tools, and smart workflows that deliver real value to modern businesses.",
    color: "text-violet-600",
    border: "border-violet-100 hover:border-violet-300",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=700&q=80",
    alt: "Abstract visualization representing AI and automation",
  },
];

const whyUs = [
  "Skilled professionals in web development, digital marketing & AI",
  "Client-centric approach aligned with your business goals",
  "Strong portfolio of successful projects and happy clients",
  "Dedicated post-launch support and maintenance",
];

const process = [
  { n: "01", title: "Discover", desc: "We dig into your business, audience, and goals to define what success actually looks like." },
  { n: "02", title: "Design & Strategy", desc: "A clear roadmap and visual direction — every decision tied back to measurable outcomes." },
  { n: "03", title: "Build & Develop", desc: "Our team ships clean, scalable code and campaigns, with regular check-ins along the way." },
  { n: "04", title: "Launch & Grow", desc: "We monitor, optimise, and support post-launch so your results keep improving over time." },
];

const techStack = [
"HTML","CSS","JAVASCRIPT"  ,"Next.js", "React", "Tailwind CSS", "TypeScript","Node JS" ,"Express.js","ReactNative", "Flutter", "Firebase",
  "WordPress", "WooCommerce", "n8n", "Google Ads", "Meta Ads", "GPT / LLM APIs",
];

/* Premier offerings — now each entry carries a real image */
const offerings = [
  {
    title: "Digital Marketing",
    desc: "Reach your audience with precision. Our data-driven strategies maximize your online presence and generate quality leads.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    alt: "Marketing analytics dashboard on a laptop screen",
  },
  {
    title: "App Development",
    desc: "Custom Android and iOS apps designed for performance, scalability, and great user experience.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    alt: "Mobile app interface design mockups",
  },
  {
    title: "Web Development",
    desc: "Responsive, fast, and user-friendly websites built for performance. We deliver robust online experiences on every device.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    alt: "Developer writing code on a laptop",
  },
];

/* Portfolio / recent work — new section content */
const portfolio = [
  {
    title: "E-Commerce Revamp",
    tag: "Web Development",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
    alt: "E-commerce website displayed on a desktop monitor",
  },
  {
    title: "Lead-Gen Ad Campaign",
    tag: "Digital Marketing",
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=900&q=80",
    alt: "Team reviewing marketing campaign performance charts",
  },
  {
    title: "On-Demand Mobility App",
    tag: "App Development",
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=900&q=80",
    alt: "Person using a mobile app on a smartphone",
  },
];

const testimonials = [
  {
    quote:
      "Techco rebuilt our entire booking flow and our conversion rate jumped within weeks. They actually understood our business, not just our brief.",
    name: "Client Testimonial",
    role: "E-Commerce Client",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "Our lead cost dropped significantly after they took over our ad accounts. Reporting is transparent and the team is responsive.",
    name: "Client Testimonial",
    role: "Automotive Dealership",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "The app launch was smooth from design to App Store approval. They handled everything we didn't have in-house.",
    name: "Client Testimonial",
    role: "Mobility Startup",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
];

const faqs = [
  {
    q: "What industries do you work with?",
    a: "We've delivered projects across automotive, e-commerce, SaaS, healthcare, real estate, and several other sectors. Our process adapts to your industry's specific needs.",
  },
  {
    q: "How long does a typical project take?",
    a: "A marketing website usually takes 2–4 weeks, a custom web app 6–10 weeks, and mobile apps 8–14 weeks depending on scope. We'll give you a concrete timeline after the discovery call.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Yes — every project includes a support window after launch, and we offer ongoing maintenance retainers for clients who want continuous updates and monitoring.",
  },
  {
    q: "Can you work with our existing team or systems?",
    a: "Absolutely. We regularly plug into existing codebases, design systems, and marketing stacks rather than starting from scratch.",
  },
];

/* ────────────────────────────────────────────────────────────
   PAGE
   ──────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* Global styles for premium motion — keyframes + effect classes */}
      <style>{`
        @keyframes auroraDrift {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(30px, -20px) scale(1.15); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes fadeUpLine {
          from { opacity: 0; transform: translateY(24px); filter: blur(4px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes barGrow {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 480; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes pingSlow {
          0%   { transform: scale(1); opacity: 0.9; }
          75%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes shine {
          from { transform: translateX(-120%) skewX(-20deg); }
          to   { transform: translateX(220%) skewX(-20deg); }
        }

        .aurora-blob { animation: auroraDrift 9s ease-in-out infinite; }
        .aurora-blob-slow { animation: auroraDrift 13s ease-in-out infinite; }

        .hero-line { opacity: 0; animation: fadeUpLine 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }

        .bar-grow { animation: barGrow 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .draw-line { stroke-dasharray: 480; animation: drawLine 1.6s cubic-bezier(0.16,1,0.3,1) forwards; animation-delay: 0.4s; }
        .pulse-dot { animation: pingSlow 2s ease-out infinite; transform-origin: center; }

        .float-badge { animation: floatY 3.5s ease-in-out infinite; }
        .ping-slow { animation: pingSlow 1.8s ease-out infinite; }

        .marquee-track { animation: marqueeScroll 22s linear infinite; }
        .marquee-wrap:hover .marquee-track { animation-play-state: paused; }

        .spotlight-card { position: relative; isolation: isolate; }
        .spotlight-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(59,130,246,0.14), transparent 70%);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
          z-index: 0;
        }
        .spotlight-card:hover::before { opacity: 1; }
        .spotlight-card > * { position: relative; z-index: 1; }

        .magnetic-btn { transition: transform 0.25s cubic-bezier(0.16,1,0.3,1); }

        .btn-shine { position: relative; overflow: hidden; }
        .btn-shine::after {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 40%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: translateX(-120%) skewX(-20deg);
        }
        .btn-shine:hover::after { animation: shine 0.9s ease forwards; }

        .img-zoom { overflow: hidden; }
        .img-zoom img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .img-zoom:hover img { transform: scale(1.08); }

        @media (prefers-reduced-motion: reduce) {
          .aurora-blob, .aurora-blob-slow, .hero-line, .bar-grow, .draw-line,
          .pulse-dot, .float-badge, .ping-slow, .marquee-track, .magnetic-btn, .btn-shine::after,
          .img-zoom img {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-slate-900 pt-16 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/homevid.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-slate-900/70" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 60px)",
          }}
        />
        <div className="aurora-blob absolute top-1/4 -left-20 w-96 h-96 bg-blue-500 rounded-full opacity-[0.14] blur-3xl" />
        <div className="aurora-blob-slow absolute bottom-1/4 right-10 w-72 h-72 bg-indigo-500 rounded-full opacity-[0.14] blur-3xl" />
        <div className="aurora-blob-slow absolute top-10 right-1/3 w-56 h-56 bg-cyan-400 rounded-full opacity-[0.10] blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span
              className="hero-line inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium mb-6"
              style={{ animationDelay: "60ms" }}
            >
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              Your Digital Growth Partner
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              <span className="hero-line block" style={{ animationDelay: "160ms" }}>
                Software That
              </span>
              <span
                className="hero-line block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
                style={{ animationDelay: "300ms" }}
              >
                Grows With You
              </span>
            </h1>

            <p
              className="hero-line text-slate-300 text-lg leading-relaxed mb-8 max-w-lg"
              style={{ animationDelay: "440ms" }}
            >
              From web development and digital marketing to AI automation —
              Techco Infotech builds systems that drive real, measurable growth
              for your business.
            </p>

            <div className="hero-line flex flex-wrap gap-4" style={{ animationDelay: "560ms" }}>
              <MagneticLink
                href="/Contact"
                className="btn-shine items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-900/30 hover:shadow-blue-500/40"
              >
                Start Your Project
                <ArrowRight size={18} />
              </MagneticLink>
              <MagneticLink
                href="/about"
                className="items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/10"
              >
                Who We Are
                <ChevronRight size={18} />
              </MagneticLink>
            </div>

            <div
              className="hero-line flex gap-8 mt-12 border-t border-white/10 pt-8"
              style={{ animationDelay: "680ms" }}
            >
              {[
                { val: 50, suffix: "+", lbl: "Projects" },
                { val: 100, suffix: "+", lbl: "Clients" },
                { val: 2, suffix: "M+", lbl: "Ad Reach" },
              ].map((s) => (
                <div key={s.lbl}>
                  <p className="font-display font-bold text-2xl text-white">
                    <Counter value={s.val} suffix={s.suffix} />
                  </p>
                  <p className="text-slate-400 text-sm">{s.lbl}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SIGNATURE ELEMENT — animated growth snapshot */}
          <div className="hero-line relative hidden lg:block" style={{ animationDelay: "300ms" }}>
            <div className="relative bg-white/[0.06] border border-white/10 rounded-3xl p-7 backdrop-blur-sm">
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">
                Client Growth Snapshot
              </p>
              <div className="flex items-end justify-between mb-3">
                <p className="font-display font-bold text-4xl text-white">
                  <Counter value={187} suffix="%" />
                </p>
                <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                  <TrendingUp size={13} /> Avg. Growth
                </span>
              </div>

              <svg viewBox="0 0 400 200" className="w-full h-44">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                {[
                  { x: 20, h: 55 },
                  { x: 78, h: 85 },
                  { x: 136, h: 65 },
                  { x: 194, h: 118 },
                  { x: 252, h: 95 },
                  { x: 310, h: 145 },
                ].map((b, i) => (
                  <rect
                    key={i}
                    x={b.x}
                    y={200 - b.h}
                    width="28"
                    height={b.h}
                    rx="5"
                    fill="url(#lineGrad)"
                    opacity="0.16"
                    className="bar-grow"
                    style={{ transformOrigin: "bottom", animationDelay: `${i * 90}ms` }}
                  />
                ))}
                <path
                  d="M20,148 L78,108 L136,128 L194,58 L252,88 L310,18"
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="draw-line"
                />
                <circle cx="310" cy="18" r="6" fill="#22d3ee" />
                <circle cx="310" cy="18" r="6" fill="#22d3ee" className="pulse-dot" />
              </svg>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                {[
                  { v: 50, s: "+", l: "Projects" },
                  { v: 100, s: "+", l: "Clients" },
                  { v: 4, s: "+", l: "Years" },
                ].map((x) => (
                  <div key={x.l}>
                    <p className="font-display font-bold text-white text-lg">
                      <Counter value={x.v} suffix={x.s} />
                    </p>
                    <p className="text-slate-400 text-[11px]">{x.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="float-badge absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-800 text-xs font-semibold">Live Growth Tracking</span>
            </div>
          </div>
        </div>

        {/* wave divider into next section */}
        <svg
          className="absolute bottom-0 left-0 w-full text-slate-50 hidden sm:block"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          style={{ height: "50px" }}
        >
          <path
            d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,24 L1440,60 L0,60 Z"
            fill="currentColor"
          />
        </svg>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              What We Do
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Our Services
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Tailored digital solutions that transform how your business operates and grows online.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <SpotlightCard
                  className={`relative bg-white rounded-2xl border overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-default h-full ${s.border}`}
                >
                  {/* Image + icon badge are now separate layers: the image
                      keeps its own overflow-hidden (for the zoom effect),
                      while the icon badge sits in the outer card so its
                      -bottom-5 offset is never clipped. */}
                  <div className="relative">
                    <div className="img-zoom h-36 w-full overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
                    </div>
                    <div
                      className={`absolute -bottom-5 left-5 w-11 h-11 rounded-xl ${s.color} bg-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 z-10`}
                    >
                      <s.icon size={20} />
                    </div>
                  </div>
                  <div className="p-6 pt-8">
                    <h3 className="font-display font-semibold text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
                    <div className="mt-4 flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight size={14} className="ml-1" />
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR PROCESS ──────────────────────────────────────── */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="aurora-blob absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl" />
        <div className="aurora-blob-slow absolute bottom-0 left-0 w-72 h-72 bg-indigo-500 rounded-full opacity-10 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
              How We Work
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Our Process
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              A clear, repeatable process that keeps every project on time, on budget, and on target.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <Reveal key={step.n} delay={i * 120}>
                <SpotlightCard className="relative bg-white/5 border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 transition-colors duration-300">
                  <h3 className="font-display font-semibold text-white text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ───────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal className="relative">
            <div className="img-zoom w-full aspect-square max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden relative shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                alt="Techco Infotech team collaborating in the office"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="font-display font-bold text-4xl mb-1">4+</p>
                <p className="text-blue-200 text-sm mb-4">Years of Expertise</p>
                <div className="grid grid-cols-2 gap-3 text-left">
                  {[
                    { v: 50, s: "+", l: "Projects" },
                    { v: 100, s: "+", l: "Clients" },
                    { v: 2, s: "M+", l: "Ad Reach" },
                    { v: 100, s: "%", l: "Dedicated" },
                  ].map((x) => (
                    <div key={x.l} className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                      <p className="font-display font-bold text-xl">
                        <Counter value={x.v} suffix={x.s} />
                      </p>
                      <p className="text-blue-200 text-[11px]">{x.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="float-badge absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-blue-50">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-800">Trusted Partner</p>
                <p className="text-xs text-slate-500">Indore, India</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              About Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
              Founded on passion,
              <br />
              driven by results.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Founded by <strong>Raunak Jashnani</strong> and <strong>Yash Kakwani</strong>,
              Techco Infotech started with a vision to help businesses navigate the digital landscape.
              Today, we're a trusted partner delivering end-to-end solutions.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8 text-sm">
              We combine IT development, digital marketing, and AI automation into one seamless
              approach — building scalable digital systems that improve efficiency, conversions,
              and long-term growth.
            </p>

            <ul className="space-y-3 mb-8">
              {whyUs.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <MagneticLink
              href="/about"
              className="btn-shine items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"
            >
              Know More About Us
              <ArrowRight size={18} />
            </MagneticLink>
          </Reveal>
        </div>
      </section>

      {/* ─── PREMIER OFFERINGS ───────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Premier Offerings
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              What We Specialize In
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {offerings.map((o, i) => (
              <Reveal key={o.title} delay={i * 120}>
                <SpotlightCard className="bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:border-blue-100 hover:-translate-y-1.5 transition-all duration-300 group h-full overflow-hidden">
                  <div className="img-zoom h-44 w-full overflow-hidden">
                    <img
                      src={o.image}
                      alt={o.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="font-display font-bold text-slate-900 text-xl mb-3">{o.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{o.desc}</p>
                    <div className="mt-6">
                      <Link
                        href="/Services"
                        className="text-blue-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                      >
                        Learn More <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR WORK / PORTFOLIO ─────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Recent Work
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Projects We're Proud Of
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              A glimpse at the websites, campaigns, and apps we've shipped for our clients.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
                <SpotlightCard className="relative rounded-2xl overflow-hidden group h-72 shadow-md">
                  <div className="img-zoom h-full w-full">
                    <img
                      src={p.image}
                      alt={p.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-blue-300 bg-blue-500/20 px-2.5 py-1 rounded-full mb-2">
                      {p.tag}
                    </span>
                    <h3 className="font-display font-semibold text-white text-lg">{p.title}</h3>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECH STACK — infinite marquee ────────────────────── */}
      <section className="py-16 bg-slate-50 border-y border-slate-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Our Toolkit
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Technologies We Work With
            </h2>
          </Reveal>
        </div>

        <div className="marquee-wrap relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10" />
          <div className="marquee-track flex gap-3 w-max">
            {[...techStack, ...techStack].map((t, i) => (
              <span
                key={t + i}
                className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-slate-700 text-sm font-medium whitespace-nowrap hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLIENTS MARQUEE ─────────────────────────────────── */}
      <ClientsMarquee />

      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Client Voices
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Real feedback from the businesses we've partnered with.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name + i} delay={i * 120}>
                <SpotlightCard className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <Quote size={28} className="text-blue-200 mb-4" />
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                    "{t.quote}"
                  </p>
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                      <p className="text-slate-400 text-xs">{t.role}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ───────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="aurora-blob absolute top-10 right-10 w-72 h-72 bg-white rounded-full opacity-5 blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="text-blue-200 text-sm font-semibold uppercase tracking-widest">
                Why Techco
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-6">
                Why Businesses Choose Us
              </h2>
              <p className="text-blue-100 leading-relaxed mb-8">
                We don't just build websites or run ads — we build digital systems
                that create real business impact. Every solution is practical,
                scalable, and result-driven.
              </p>
              <MagneticLink
                href="/Contact"
                className="btn-shine items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50"
              >
                Let's Talk <ArrowRight size={18} />
              </MagneticLink>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Unmatched Expertise", desc: "Skilled professionals across web, marketing & AI", icon: "⚡" },
                { title: "Client-First Approach", desc: "Your goals guide every decision we make", icon: "🤝" },
                { title: "Proven Success", desc: "Portfolio of successful projects and happy clients", icon: "🏆" },
                { title: "Dedicated Support", desc: "Ongoing care to keep your digital assets effective", icon: "🛡️" },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 100}>
                  <SpotlightCard className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/10 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 h-full">
                    <span className="text-2xl">{item.icon}</span>
                    <h4 className="font-display font-semibold mt-3 mb-1">{item.title}</h4>
                    <p className="text-blue-200 text-sm">{item.desc}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              FAQ
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Frequently Asked Questions
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div>
              {faqs.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <Reveal>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Ready to Build Your Digital Future?
            </h2>
            <p className="text-slate-500 mb-8">
              Tell us about your project. We'll respond within 24 hours with a plan tailored to your goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticLink
                href="/Contact"
                className="btn-shine px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"
              >
                Get in Touch
              </MagneticLink>
              <MagneticLink
                href="/Services"
                className="px-8 py-3.5 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600"
              >
                Explore Services
              </MagneticLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}


// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import {
//   Code2,
//   Megaphone,
//   Cpu,
//   Smartphone,
//   ArrowRight,
//   CheckCircle2,
//   ChevronRight,
//   ChevronDown,
//   Quote,
//   TrendingUp,
//   Search,
 
//   Target,
// } from "lucide-react";
// import ClientsMarquee from "./Clientsmarquee/page";

// /* ────────────────────────────────────────────────────────────
//    UTILITIES — scroll reveal, counters, spotlight, magnetic btn
//    ──────────────────────────────────────────────────────────── */

// function useInView(threshold = 0.15) {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const [inView, setInView] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setInView(true);
//           obs.disconnect();
//         }
//       },
//       { threshold }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [threshold]);

//   return [ref, inView] as const;
// }

// function Reveal({
//   children,
//   className = "",
//   delay = 0,
// }: {
//   children: React.ReactNode;
//   className?: string;
//   delay?: number;
// }) {
//   const [ref, inView] = useInView();
//   return (
//     <div
//       ref={ref}
//       className={`transition-all duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
//         inView ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-[2px]"
//       } ${className}`}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       {children}
//     </div>
//   );
// }

// function Counter({
//   value,
//   suffix = "",
//   duration = 1700,
// }: {
//   value: number;
//   suffix?: string;
//   duration?: number;
// }) {
//   const [ref, inView] = useInView(0.5);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!inView) return;
//     let start: number | null = null;
//     let raf: number;
//     const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
//     const step = (ts: number) => {
//       if (start === null) start = ts;
//       const progress = Math.min((ts - start) / duration, 1);
//       setCount(Math.floor(easeOutQuart(progress) * value));
//       if (progress < 1) raf = requestAnimationFrame(step);
//       else setCount(value);
//     };
//     raf = requestAnimationFrame(step);
//     return () => cancelAnimationFrame(raf);
//   }, [inView, value, duration]);

//   return (
//     <span ref={ref}>
//       {count}
//       {suffix}
//     </span>
//   );
// }

// /** Card wrapper that adds a soft radial glow following the cursor. */
// function SpotlightCard({
//   children,
//   className = "",
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) {
//   const ref = useRef<HTMLDivElement | null>(null);

//   const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const el = ref.current;
//     if (!el) return;
//     const rect = el.getBoundingClientRect();
//     el.style.setProperty("--x", `${e.clientX - rect.left}px`);
//     el.style.setProperty("--y", `${e.clientY - rect.top}px`);
//   };

//   return (
//     <div ref={ref} onMouseMove={handleMove} className={`spotlight-card ${className}`}>
//       {children}
//     </div>
//   );
// }

// /** Anchor that subtly follows the cursor for a "magnetic" feel. */
// function MagneticLink({
//   href,
//   className = "",
//   children,
// }: {
//   href: string;
//   className?: string;
//   children: React.ReactNode;
// }) {
//   const ref = useRef<HTMLAnchorElement | null>(null);

//   const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     const el = ref.current;
//     if (!el) return;
//     const rect = el.getBoundingClientRect();
//     const x = e.clientX - rect.left - rect.width / 2;
//     const y = e.clientY - rect.top - rect.height / 2;
//     el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
//   };

//   const reset = () => {
//     if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
//   };

//   return (
//     <Link
//       href={href}
//       ref={ref}
//       onMouseMove={handleMove}
//       onMouseLeave={reset}
//       className={`magnetic-btn inline-flex ${className}`}
//     >
//       {children}
//     </Link>
//   );
// }

// function FAQItem({ q, a }: { q: string; a: string }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="border-b border-slate-200 py-5">
//       <button
//         type="button"
//         onClick={() => setOpen(!open)}
//         className="w-full flex justify-between items-center text-left gap-4"
//       >
//         <span className="font-semibold text-slate-900">{q}</span>
//         <ChevronDown
//           size={20}
//           className={`text-blue-600 flex-shrink-0 transition-transform duration-300 ${
//             open ? "rotate-180" : ""
//           }`}
//         />
//       </button>
//       <div
//         className={`grid transition-all duration-300 ease-out ${
//           open ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
//         }`}
//       >
//         <p className="overflow-hidden text-slate-500 text-sm leading-relaxed">{a}</p>
//       </div>
//     </div>
//   );
// }

// /* ────────────────────────────────────────────────────────────
//    DATA
//    ──────────────────────────────────────────────────────────── */

// const Services = [
//   {
//     icon: Megaphone,
//     title: "Digital Marketing",
//     description:
//       "Full-funnel marketing strategy — content, campaigns, and analytics working together to amplify your brand's online presence.",
//     color: "text-indigo-600",
//     border: "border-indigo-100 hover:border-indigo-300",
//     image:
//       "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=700&q=80",
//     alt: "Marketing team planning a digital campaign",
//   },
//   // {
//   //   icon: Instagram,
//   //   title: "Social Media & Instagram",
//   //   description:
//   //     "Scroll-stopping Instagram & Facebook content, reels, and posting calendars that build an engaged community around your brand.",
//   //   color: "text-pink-600",
//   //   border: "border-pink-100 hover:border-pink-300",
//   //   image:
//   //     "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=700&q=80",
//   //   alt: "Phone showing an Instagram feed and social media posts",
//   // },
//   {
//     icon: Search,
//     title: "SEO Optimization",
//     description:
//       "On-page, technical & local SEO that pushes your website up the rankings and brings in consistent organic traffic.",
//     color: "text-emerald-600",
//     border: "border-emerald-100 hover:border-emerald-300",
//     image:
//       "https://images.unsplash.com/photo-1571677246347-5040036b95cc?auto=format&fit=crop&w=700&q=80",
//     alt: "SEO search ranking analytics on a screen",
//   },
//   {
//     icon: Target,
//     title: "Paid Ads (Google & Meta)",
//     description:
//       "Performance-driven Google, Meta & Instagram ad campaigns built around real targeting data — not guesswork.",
//     color: "text-orange-600",
//     border: "border-orange-100 hover:border-orange-300",
//     image:
//       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80",
//     alt: "Ad campaign performance dashboard with graphs",
//   },
//   {
//     icon: Smartphone,
//     title: "App Development",
//     description:
//       "Innovative mobile and hybrid apps that enhance customer engagement across multiple platforms.",
//     color: "text-cyan-600",
//     border: "border-cyan-100 hover:border-cyan-300",
//     image:
//       "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=700&q=80",
//     alt: "Person using a mobile app on a smartphone",
//   },
//   {
//     icon: Code2,
//     title: "Web Development",
//     description:
//       "Tailored websites, scalable e-commerce platforms, and robust software that streamlines your operations.",
//     color: "text-blue-600",
//     border: "border-blue-100 hover:border-blue-300",
//     image:
//       "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=700&q=80",
//     alt: "Developer writing code on a laptop",
//   },
//   {
//     icon: Cpu,
//     title: "Generative AI",
//     description:
//       "ML models, AI automation tools, and smart workflows that deliver real value to modern businesses.",
//     color: "text-violet-600",
//     border: "border-violet-100 hover:border-violet-300",
//     image:
//       "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=700&q=80",
//     alt: "Abstract visualization representing AI and automation",
//   },
// ];

// const whyUs = [
//   "Skilled professionals in web development, digital marketing & AI",
//   "Client-centric approach aligned with your business goals",
//   "Strong portfolio of successful projects and happy clients",
//   "Dedicated post-launch support and maintenance",
// ];

// const process = [
//   { n: "01", title: "Discover", desc: "We dig into your business, audience, and goals to define what success actually looks like." },
//   { n: "02", title: "Design & Strategy", desc: "A clear roadmap and visual direction — every decision tied back to measurable outcomes." },
//   { n: "03", title: "Build & Develop", desc: "Our team ships clean, scalable code and campaigns, with regular check-ins along the way." },
//   { n: "04", title: "Launch & Grow", desc: "We monitor, optimise, and support post-launch so your results keep improving over time." },
// ];

// const techStack = [
// "HTML","CSS","JAVASCRIPT"  ,"Next.js", "React", "Tailwind CSS", "TypeScript","Node JS" ,"Express.js","ReactNative", "Flutter", "Firebase",
//   "WordPress", "WooCommerce", "n8n", "Google Ads", "Meta Ads", "GPT / LLM APIs",
// ];

// /* Premier offerings — now each entry carries a real image */
// const offerings = [
//   {
//     title: "Digital Marketing",
//     desc: "Reach your audience with precision. Our data-driven strategies maximize your online presence and generate quality leads.",
//     image:
//       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
//     alt: "Marketing analytics dashboard on a laptop screen",
//   },
//   {
//     title: "App Development",
//     desc: "Custom Android and iOS apps designed for performance, scalability, and great user experience.",
//     image:
//       "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
//     alt: "Mobile app interface design mockups",
//   },
//   {
//     title: "Web Development",
//     desc: "Responsive, fast, and user-friendly websites built for performance. We deliver robust online experiences on every device.",
//     image:
//       "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
//     alt: "Developer writing code on a laptop",
//   },
// ];

// /* Portfolio / recent work — new section content */
// const portfolio = [
//   {
//     title: "E-Commerce Revamp",
//     tag: "Web Development",
//     image:
//       "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
//     alt: "E-commerce website displayed on a desktop monitor",
//   },
//   {
//     title: "Lead-Gen Ad Campaign",
//     tag: "Digital Marketing",
//     image:
//       "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=900&q=80",
//     alt: "Team reviewing marketing campaign performance charts",
//   },
//   {
//     title: "On-Demand Mobility App",
//     tag: "App Development",
//     image:
//       "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=900&q=80",
//     alt: "Person using a mobile app on a smartphone",
//   },
// ];

// const testimonials = [
//   {
//     quote:
//       "Techco rebuilt our entire booking flow and our conversion rate jumped within weeks. They actually understood our business, not just our brief.",
//     name: "Client Testimonial",
//     role: "E-Commerce Client",
//     avatar:
//       "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
//   },
//   {
//     quote:
//       "Our lead cost dropped significantly after they took over our ad accounts. Reporting is transparent and the team is responsive.",
//     name: "Client Testimonial",
//     role: "Automotive Dealership",
//     avatar:
//       "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
//   },
//   {
//     quote:
//       "The app launch was smooth from design to App Store approval. They handled everything we didn't have in-house.",
//     name: "Client Testimonial",
//     role: "Mobility Startup",
//     avatar:
//       "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
//   },
// ];

// const faqs = [
//   {
//     q: "What industries do you work with?",
//     a: "We've delivered projects across automotive, e-commerce, SaaS, healthcare, real estate, and several other sectors. Our process adapts to your industry's specific needs.",
//   },
//   {
//     q: "How long does a typical project take?",
//     a: "A marketing website usually takes 2–4 weeks, a custom web app 6–10 weeks, and mobile apps 8–14 weeks depending on scope. We'll give you a concrete timeline after the discovery call.",
//   },
//   {
//     q: "Do you offer post-launch support?",
//     a: "Yes — every project includes a support window after launch, and we offer ongoing maintenance retainers for clients who want continuous updates and monitoring.",
//   },
//   {
//     q: "Can you work with our existing team or systems?",
//     a: "Absolutely. We regularly plug into existing codebases, design systems, and marketing stacks rather than starting from scratch.",
//   },
// ];

// /* ────────────────────────────────────────────────────────────
//    PAGE
//    ──────────────────────────────────────────────────────────── */

// export default function HomePage() {
//   return (
//     <>
//       {/* Global styles for premium motion — keyframes + effect classes */}
//       <style>{`
//         @keyframes auroraDrift {
//           0%   { transform: translate(0, 0) scale(1); }
//           50%  { transform: translate(30px, -20px) scale(1.15); }
//           100% { transform: translate(0, 0) scale(1); }
//         }
//         @keyframes fadeUpLine {
//           from { opacity: 0; transform: translateY(24px); filter: blur(4px); }
//           to   { opacity: 1; transform: translateY(0); filter: blur(0); }
//         }
//         @keyframes barGrow {
//           from { transform: scaleY(0); }
//           to   { transform: scaleY(1); }
//         }
//         @keyframes drawLine {
//           from { stroke-dashoffset: 480; }
//           to   { stroke-dashoffset: 0; }
//         }
//         @keyframes floatY {
//           0%, 100% { transform: translateY(0px); }
//           50%      { transform: translateY(-8px); }
//         }
//         @keyframes pingSlow {
//           0%   { transform: scale(1); opacity: 0.9; }
//           75%  { transform: scale(2.2); opacity: 0; }
//           100% { transform: scale(2.2); opacity: 0; }
//         }
//         @keyframes marqueeScroll {
//           from { transform: translateX(0); }
//           to   { transform: translateX(-50%); }
//         }
//         @keyframes shine {
//           from { transform: translateX(-120%) skewX(-20deg); }
//           to   { transform: translateX(220%) skewX(-20deg); }
//         }

//         .aurora-blob { animation: auroraDrift 9s ease-in-out infinite; }
//         .aurora-blob-slow { animation: auroraDrift 13s ease-in-out infinite; }

//         .hero-line { opacity: 0; animation: fadeUpLine 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }

//         .bar-grow { animation: barGrow 0.8s cubic-bezier(0.16,1,0.3,1) both; }
//         .draw-line { stroke-dasharray: 480; animation: drawLine 1.6s cubic-bezier(0.16,1,0.3,1) forwards; animation-delay: 0.4s; }
//         .pulse-dot { animation: pingSlow 2s ease-out infinite; transform-origin: center; }

//         .float-badge { animation: floatY 3.5s ease-in-out infinite; }
//         .ping-slow { animation: pingSlow 1.8s ease-out infinite; }

//         .marquee-track { animation: marqueeScroll 22s linear infinite; }
//         .marquee-wrap:hover .marquee-track { animation-play-state: paused; }

//         .spotlight-card { position: relative; isolation: isolate; }
//         .spotlight-card::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           border-radius: inherit;
//           background: radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(59,130,246,0.14), transparent 70%);
//           opacity: 0;
//           transition: opacity 0.35s ease;
//           pointer-events: none;
//           z-index: 0;
//         }
//         .spotlight-card:hover::before { opacity: 1; }
//         .spotlight-card > * { position: relative; z-index: 1; }

//         .magnetic-btn { transition: transform 0.25s cubic-bezier(0.16,1,0.3,1); }

//         .btn-shine { position: relative; overflow: hidden; }
//         .btn-shine::after {
//           content: "";
//           position: absolute;
//           top: 0; left: 0;
//           width: 40%; height: 100%;
//           background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
//           transform: translateX(-120%) skewX(-20deg);
//         }
//         .btn-shine:hover::after { animation: shine 0.9s ease forwards; }

//         .img-zoom { overflow: hidden; }
//         .img-zoom img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
//         .img-zoom:hover img { transform: scale(1.08); }

//         @media (prefers-reduced-motion: reduce) {
//           .aurora-blob, .aurora-blob-slow, .hero-line, .bar-grow, .draw-line,
//           .pulse-dot, .float-badge, .ping-slow, .marquee-track, .magnetic-btn, .btn-shine::after,
//           .img-zoom img {
//             animation: none !important;
//             transition: none !important;
//             opacity: 1 !important;
//             filter: none !important;
//             transform: none !important;
//           }
//         }
//       `}</style>

//       {/* ─── HERO ─────────────────────────────────────────────── */}
//       <section className="relative min-h-screen flex items-center bg-slate-900 pt-16 overflow-hidden">
//         <video
//           className="absolute inset-0 w-full h-full object-cover"
//           src="/homevid.mp4"
//           autoPlay
//           loop
//           muted
//           playsInline
//         />
//         <div className="absolute inset-0 bg-slate-900/70" />
//         <div
//           className="absolute inset-0 opacity-[0.04]"
//           style={{
//             backgroundImage:
//               "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 60px)",
//           }}
//         />
//         <div className="aurora-blob absolute top-1/4 -left-20 w-96 h-96 bg-blue-500 rounded-full opacity-[0.14] blur-3xl" />
//         <div className="aurora-blob-slow absolute bottom-1/4 right-10 w-72 h-72 bg-indigo-500 rounded-full opacity-[0.14] blur-3xl" />
//         <div className="aurora-blob-slow absolute top-10 right-1/3 w-56 h-56 bg-cyan-400 rounded-full opacity-[0.10] blur-3xl" />

//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
//           <div>
//             <span
//               className="hero-line inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium mb-6"
//               style={{ animationDelay: "60ms" }}
//             >
//               <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
//               Your Digital Growth Partner
//             </span>

//             <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
//               <span className="hero-line block" style={{ animationDelay: "160ms" }}>
//                 Software That
//               </span>
//               <span
//                 className="hero-line block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
//                 style={{ animationDelay: "300ms" }}
//               >
//                 Grows With You
//               </span>
//             </h1>

//             <p
//               className="hero-line text-slate-300 text-lg leading-relaxed mb-8 max-w-lg"
//               style={{ animationDelay: "440ms" }}
//             >
//               From web development and digital marketing to AI automation —
//               Techco Infotech builds systems that drive real, measurable growth
//               for your business.
//             </p>

//             <div className="hero-line flex flex-wrap gap-4" style={{ animationDelay: "560ms" }}>
//               <MagneticLink
//                 href="/Contact"
//                 className="btn-shine items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-900/30 hover:shadow-blue-500/40"
//               >
//                 Start Your Project
//                 <ArrowRight size={18} />
//               </MagneticLink>
//               <MagneticLink
//                 href="/about"
//                 className="items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/10"
//               >
//                 Who We Are
//                 <ChevronRight size={18} />
//               </MagneticLink>
//             </div>

//             <div
//               className="hero-line flex gap-8 mt-12 border-t border-white/10 pt-8"
//               style={{ animationDelay: "680ms" }}
//             >
//               {[
//                 { val: 50, suffix: "+", lbl: "Projects" },
//                 { val: 100, suffix: "+", lbl: "Clients" },
//                 { val: 2, suffix: "M+", lbl: "Ad Reach" },
//               ].map((s) => (
//                 <div key={s.lbl}>
//                   <p className="font-display font-bold text-2xl text-white">
//                     <Counter value={s.val} suffix={s.suffix} />
//                   </p>
//                   <p className="text-slate-400 text-sm">{s.lbl}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* SIGNATURE ELEMENT — animated growth snapshot */}
//           <div className="hero-line relative hidden lg:block" style={{ animationDelay: "300ms" }}>
//             <div className="relative bg-white/[0.06] border border-white/10 rounded-3xl p-7 backdrop-blur-sm">
//               <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">
//                 Client Growth Snapshot
//               </p>
//               <div className="flex items-end justify-between mb-3">
//                 <p className="font-display font-bold text-4xl text-white">
//                   <Counter value={187} suffix="%" />
//                 </p>
//                 <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1 bg-emerald-400/10 px-2.5 py-1 rounded-full">
//                   <TrendingUp size={13} /> Avg. Growth
//                 </span>
//               </div>

//               <svg viewBox="0 0 400 200" className="w-full h-44">
//                 <defs>
//                   <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
//                     <stop offset="0%" stopColor="#60a5fa" />
//                     <stop offset="100%" stopColor="#22d3ee" />
//                   </linearGradient>
//                 </defs>
//                 {[
//                   { x: 20, h: 55 },
//                   { x: 78, h: 85 },
//                   { x: 136, h: 65 },
//                   { x: 194, h: 118 },
//                   { x: 252, h: 95 },
//                   { x: 310, h: 145 },
//                 ].map((b, i) => (
//                   <rect
//                     key={i}
//                     x={b.x}
//                     y={200 - b.h}
//                     width="28"
//                     height={b.h}
//                     rx="5"
//                     fill="url(#lineGrad)"
//                     opacity="0.16"
//                     className="bar-grow"
//                     style={{ transformOrigin: "bottom", animationDelay: `${i * 90}ms` }}
//                   />
//                 ))}
//                 <path
//                   d="M20,148 L78,108 L136,128 L194,58 L252,88 L310,18"
//                   fill="none"
//                   stroke="url(#lineGrad)"
//                   strokeWidth="3.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="draw-line"
//                 />
//                 <circle cx="310" cy="18" r="6" fill="#22d3ee" />
//                 <circle cx="310" cy="18" r="6" fill="#22d3ee" className="pulse-dot" />
//               </svg>

//               <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
//                 {[
//                   { v: 50, s: "+", l: "Projects" },
//                   { v: 100, s: "+", l: "Clients" },
//                   { v: 4, s: "+", l: "Years" },
//                 ].map((x) => (
//                   <div key={x.l}>
//                     <p className="font-display font-bold text-white text-lg">
//                       <Counter value={x.v} suffix={x.s} />
//                     </p>
//                     <p className="text-slate-400 text-[11px]">{x.l}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="float-badge absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2">
//               <span className="relative flex h-2 w-2">
//                 <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
//               </span>
//               <span className="text-slate-800 text-xs font-semibold">Live Growth Tracking</span>
//             </div>
//           </div>
//         </div>

//         {/* wave divider into next section */}
//         <svg
//           className="absolute bottom-0 left-0 w-full text-slate-50 hidden sm:block"
//           viewBox="0 0 1440 60"
//           preserveAspectRatio="none"
//           style={{ height: "50px" }}
//         >
//           <path
//             d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,24 L1440,60 L0,60 Z"
//             fill="currentColor"
//           />
//         </svg>
//       </section>

//       {/* ─── SERVICES ─────────────────────────────────────────── */}
//       <section className="py-24 bg-slate-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               What We Do
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
//               Our Services
//             </h2>
//             <p className="text-slate-500 max-w-xl mx-auto">
//               Tailored digital solutions that transform how your business operates and grows online.
//             </p>
//           </Reveal>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {Services.map((s, i) => (
//               <Reveal key={s.title} delay={i * 80}>
//                 <SpotlightCard
//                   className={`relative bg-white rounded-2xl border overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-default h-full ${s.border}`}
//                 >
//                   <div className="img-zoom h-36 w-full overflow-hidden relative">
//                     <img
//                       src={s.image}
//                       alt={s.alt}
//                       className="w-full h-full object-cover"
//                       loading="lazy"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
//                     <div
//                       className={`absolute -bottom-5 left-5 w-11 h-11 rounded-xl ${s.color} bg-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
//                     >
//                       <s.icon size={20} />
//                     </div>
//                   </div>
//                   <div className="p-6 pt-8">
//                     <h3 className="font-display font-semibold text-slate-900 mb-2">{s.title}</h3>
//                     <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
//                     <div className="mt-4 flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
//                       Learn more <ArrowRight size={14} className="ml-1" />
//                     </div>
//                   </div>
//                 </SpotlightCard>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── OUR PROCESS ──────────────────────────────────────── */}
//       <section className="py-24 bg-slate-900 relative overflow-hidden">
//         <div className="aurora-blob absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl" />
//         <div className="aurora-blob-slow absolute bottom-0 left-0 w-72 h-72 bg-indigo-500 rounded-full opacity-10 blur-3xl" />

//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
//               How We Work
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
//               Our Process
//             </h2>
//             <p className="text-slate-400 max-w-xl mx-auto">
//               A clear, repeatable process that keeps every project on time, on budget, and on target.
//             </p>
//           </Reveal>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {process.map((step, i) => (
//               <Reveal key={step.n} delay={i * 120}>
//                 <SpotlightCard className="relative bg-white/5 border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 transition-colors duration-300">
//                   <h3 className="font-display font-semibold text-white text-lg mb-2">
//                     {step.title}
//                   </h3>
//                   <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
//                 </SpotlightCard>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── ABOUT ───────────────────────────────────────────── */}
//       <section className="py-24 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
//           <Reveal className="relative">
//             <div className="img-zoom w-full aspect-square max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden relative shadow-xl">
//               <img
//                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
//                 alt="Techco Infotech team collaborating in the office"
//                 className="w-full h-full object-cover"
//                 loading="lazy"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
//               <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                 <p className="font-display font-bold text-4xl mb-1">4+</p>
//                 <p className="text-blue-200 text-sm mb-4">Years of Expertise</p>
//                 <div className="grid grid-cols-2 gap-3 text-left">
//                   {[
//                     { v: 50, s: "+", l: "Projects" },
//                     { v: 100, s: "+", l: "Clients" },
//                     { v: 2, s: "M+", l: "Ad Reach" },
//                     { v: 100, s: "%", l: "Dedicated" },
//                   ].map((x) => (
//                     <div key={x.l} className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
//                       <p className="font-display font-bold text-xl">
//                         <Counter value={x.v} suffix={x.s} />
//                       </p>
//                       <p className="text-blue-200 text-[11px]">{x.l}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="float-badge absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-blue-50">
//               <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
//                 <CheckCircle2 size={20} className="text-green-600" />
//               </div>
//               <div>
//                 <p className="font-semibold text-sm text-slate-800">Trusted Partner</p>
//                 <p className="text-xs text-slate-500">Indore, India</p>
//               </div>
//             </div>
//           </Reveal>

//           <Reveal delay={150}>
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               About Us
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
//               Founded on passion,
//               <br />
//               driven by results.
//             </h2>
//             <p className="text-slate-600 leading-relaxed mb-4">
//               Founded by <strong>Raunak Jashnani</strong> and <strong>Yash Kakwani</strong>,
//               Techco Infotech started with a vision to help businesses navigate the digital landscape.
//               Today, we're a trusted partner delivering end-to-end solutions.
//             </p>
//             <p className="text-slate-500 leading-relaxed mb-8 text-sm">
//               We combine IT development, digital marketing, and AI automation into one seamless
//               approach — building scalable digital systems that improve efficiency, conversions,
//               and long-term growth.
//             </p>

//             <ul className="space-y-3 mb-8">
//               {whyUs.map((item) => (
//                 <li key={item} className="flex items-start gap-3">
//                   <CheckCircle2 size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
//                   <span className="text-slate-600 text-sm">{item}</span>
//                 </li>
//               ))}
//             </ul>

//             <MagneticLink
//               href="/about"
//               className="btn-shine items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"
//             >
//               Know More About Us
//               <ArrowRight size={18} />
//             </MagneticLink>
//           </Reveal>
//         </div>
//       </section>

//       {/* ─── PREMIER OFFERINGS ───────────────────────────────── */}
//       <section className="py-24 bg-slate-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Premier Offerings
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
//               What We Specialize In
//             </h2>
//           </Reveal>

//           <div className="grid md:grid-cols-3 gap-8 items-start">
//             {offerings.map((o, i) => (
//               <Reveal key={o.title} delay={i * 120}>
//                 <SpotlightCard className="bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:border-blue-100 hover:-translate-y-1.5 transition-all duration-300 group h-full overflow-hidden">
//                   <div className="img-zoom h-44 w-full overflow-hidden">
//                     <img
//                       src={o.image}
//                       alt={o.alt}
//                       className="w-full h-full object-cover"
//                       loading="lazy"
//                     />
//                   </div>
//                   <div className="p-7">
//                     <h3 className="font-display font-bold text-slate-900 text-xl mb-3">{o.title}</h3>
//                     <p className="text-slate-500 text-sm leading-relaxed">{o.desc}</p>
//                     <div className="mt-6">
//                       <Link
//                         href="/Services"
//                         className="text-blue-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
//                       >
//                         Learn More <ArrowRight size={14} />
//                       </Link>
//                     </div>
//                   </div>
//                 </SpotlightCard>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── OUR WORK / PORTFOLIO ─────────────────────────────── */}
//       <section className="py-24 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Recent Work
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
//               Projects We're Proud Of
//             </h2>
//             <p className="text-slate-500 max-w-xl mx-auto">
//               A glimpse at the websites, campaigns, and apps we've shipped for our clients.
//             </p>
//           </Reveal>

//           <div className="grid md:grid-cols-3 gap-6">
//             {portfolio.map((p, i) => (
//               <Reveal key={p.title} delay={i * 120}>
//                 <SpotlightCard className="relative rounded-2xl overflow-hidden group h-72 shadow-md">
//                   <div className="img-zoom h-full w-full">
//                     <img
//                       src={p.image}
//                       alt={p.alt}
//                       className="w-full h-full object-cover"
//                       loading="lazy"
//                     />
//                   </div>
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/10 to-transparent" />
//                   <div className="absolute bottom-0 left-0 right-0 p-5">
//                     <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-blue-300 bg-blue-500/20 px-2.5 py-1 rounded-full mb-2">
//                       {p.tag}
//                     </span>
//                     <h3 className="font-display font-semibold text-white text-lg">{p.title}</h3>
//                   </div>
//                 </SpotlightCard>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── TECH STACK — infinite marquee ────────────────────── */}
//       <section className="py-16 bg-slate-50 border-y border-slate-100 overflow-hidden">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-10">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Our Toolkit
//             </span>
//             <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
//               Technologies We Work With
//             </h2>
//           </Reveal>
//         </div>

//         <div className="marquee-wrap relative">
//           <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
//           <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10" />
//           <div className="marquee-track flex gap-3 w-max">
//             {[...techStack, ...techStack].map((t, i) => (
//               <span
//                 key={t + i}
//                 className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-slate-700 text-sm font-medium whitespace-nowrap hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
//               >
//                 {t}
//               </span>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── CLIENTS MARQUEE ─────────────────────────────────── */}
//       <ClientsMarquee />

//       {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
//       <section className="py-24 bg-slate-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Client Voices
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
//               What Our Clients Say
//             </h2>
//             <p className="text-slate-500 max-w-xl mx-auto">
//               Real feedback from the businesses we've partnered with.
//             </p>
//           </Reveal>

//           <div className="grid md:grid-cols-3 gap-6">
//             {testimonials.map((t, i) => (
//               <Reveal key={t.name + i} delay={i * 120}>
//                 <SpotlightCard className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
//                   <Quote size={28} className="text-blue-200 mb-4" />
//                   <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
//                     "{t.quote}"
//                   </p>
//                   <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
//                     <img
//                       src={t.avatar}
//                       alt={t.name}
//                       className="w-10 h-10 rounded-full object-cover border border-slate-200"
//                       loading="lazy"
//                     />
//                     <div>
//                       <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
//                       <p className="text-slate-400 text-xs">{t.role}</p>
//                     </div>
//                   </div>
//                 </SpotlightCard>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── WHY CHOOSE US ───────────────────────────────────── */}
//       <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
//         <div className="aurora-blob absolute top-10 right-10 w-72 h-72 bg-white rounded-full opacity-5 blur-3xl" />
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <Reveal>
//               <span className="text-blue-200 text-sm font-semibold uppercase tracking-widest">
//                 Why Techco
//               </span>
//               <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-6">
//                 Why Businesses Choose Us
//               </h2>
//               <p className="text-blue-100 leading-relaxed mb-8">
//                 We don't just build websites or run ads — we build digital systems
//                 that create real business impact. Every solution is practical,
//                 scalable, and result-driven.
//               </p>
//               <MagneticLink
//                 href="/Contact"
//                 className="btn-shine items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50"
//               >
//                 Let's Talk <ArrowRight size={18} />
//               </MagneticLink>
//             </Reveal>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {[
//                 { title: "Unmatched Expertise", desc: "Skilled professionals across web, marketing & AI", icon: "⚡" },
//                 { title: "Client-First Approach", desc: "Your goals guide every decision we make", icon: "🤝" },
//                 { title: "Proven Success", desc: "Portfolio of successful projects and happy clients", icon: "🏆" },
//                 { title: "Dedicated Support", desc: "Ongoing care to keep your digital assets effective", icon: "🛡️" },
//               ].map((item, i) => (
//                 <Reveal key={item.title} delay={i * 100}>
//                   <SpotlightCard className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/10 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 h-full">
//                     <span className="text-2xl">{item.icon}</span>
//                     <h4 className="font-display font-semibold mt-3 mb-1">{item.title}</h4>
//                     <p className="text-blue-200 text-sm">{item.desc}</p>
//                   </SpotlightCard>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── FAQ ──────────────────────────────────────────────── */}
//       <section className="py-24 bg-white">
//         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-12">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               FAQ
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
//               Frequently Asked Questions
//             </h2>
//           </Reveal>
//           <Reveal delay={100}>
//             <div>
//               {faqs.map((f) => (
//                 <FAQItem key={f.q} q={f.q} a={f.a} />
//               ))}
//             </div>
//           </Reveal>
//         </div>
//       </section>

//       {/* ─── CTA ─────────────────────────────────────────────── */}
//       <section className="py-20 bg-slate-50">
//         <Reveal>
//           <div className="max-w-3xl mx-auto px-4 text-center">
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
//               Ready to Build Your Digital Future?
//             </h2>
//             <p className="text-slate-500 mb-8">
//               Tell us about your project. We'll respond within 24 hours with a plan tailored to your goals.
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <MagneticLink
//                 href="/Contact"
//                 className="btn-shine px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"
//               >
//                 Get in Touch
//               </MagneticLink>
//               <MagneticLink
//                 href="/Services"
//                 className="px-8 py-3.5 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600"
//               >
//                 Explore Services
//               </MagneticLink>
//             </div>
//           </div>
//         </Reveal>
//       </section>
//     </>
//   );
// }


// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import {
//   Code2,
//   Megaphone,
//   Cpu,
//   Smartphone,
//   ArrowRight,
//   CheckCircle2,
//   ChevronRight,
//   ChevronDown,
//   Quote,
//   TrendingUp,
// } from "lucide-react";
// import ClientsMarquee from "./Clientsmarquee/page";

// /* ────────────────────────────────────────────────────────────
//    UTILITIES — scroll reveal, counters, spotlight, magnetic btn
//    ──────────────────────────────────────────────────────────── */

// function useInView(threshold = 0.15) {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const [inView, setInView] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setInView(true);
//           obs.disconnect();
//         }
//       },
//       { threshold }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [threshold]);

//   return [ref, inView] as const;
// }

// function Reveal({
//   children,
//   className = "",
//   delay = 0,
// }: {
//   children: React.ReactNode;
//   className?: string;
//   delay?: number;
// }) {
//   const [ref, inView] = useInView();
//   return (
//     <div
//       ref={ref}
//       className={`transition-all duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
//         inView ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-[2px]"
//       } ${className}`}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       {children}
//     </div>
//   );
// }

// function Counter({
//   value,
//   suffix = "",
//   duration = 1700,
// }: {
//   value: number;
//   suffix?: string;
//   duration?: number;
// }) {
//   const [ref, inView] = useInView(0.5);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!inView) return;
//     let start: number | null = null;
//     let raf: number;
//     const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
//     const step = (ts: number) => {
//       if (start === null) start = ts;
//       const progress = Math.min((ts - start) / duration, 1);
//       setCount(Math.floor(easeOutQuart(progress) * value));
//       if (progress < 1) raf = requestAnimationFrame(step);
//       else setCount(value);
//     };
//     raf = requestAnimationFrame(step);
//     return () => cancelAnimationFrame(raf);
//   }, [inView, value, duration]);

//   return (
//     <span ref={ref}>
//       {count}
//       {suffix}
//     </span>
//   );
// }

// /** Card wrapper that adds a soft radial glow following the cursor. */
// function SpotlightCard({
//   children,
//   className = "",
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) {
//   const ref = useRef<HTMLDivElement | null>(null);

//   const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const el = ref.current;
//     if (!el) return;
//     const rect = el.getBoundingClientRect();
//     el.style.setProperty("--x", `${e.clientX - rect.left}px`);
//     el.style.setProperty("--y", `${e.clientY - rect.top}px`);
//   };

//   return (
//     <div ref={ref} onMouseMove={handleMove} className={`spotlight-card ${className}`}>
//       {children}
//     </div>
//   );
// }

// /** Anchor that subtly follows the cursor for a "magnetic" feel. */
// function MagneticLink({
//   href,
//   className = "",
//   children,
// }: {
//   href: string;
//   className?: string;
//   children: React.ReactNode;
// }) {
//   const ref = useRef<HTMLAnchorElement | null>(null);

//   const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     const el = ref.current;
//     if (!el) return;
//     const rect = el.getBoundingClientRect();
//     const x = e.clientX - rect.left - rect.width / 2;
//     const y = e.clientY - rect.top - rect.height / 2;
//     el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
//   };

//   const reset = () => {
//     if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
//   };

//   return (
//     <Link
//       href={href}
//       ref={ref}
//       onMouseMove={handleMove}
//       onMouseLeave={reset}
//       className={`magnetic-btn inline-flex ${className}`}
//     >
//       {children}
//     </Link>
//   );
// }

// function FAQItem({ q, a }: { q: string; a: string }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="border-b border-slate-200 py-5">
//       <button
//         type="button"
//         onClick={() => setOpen(!open)}
//         className="w-full flex justify-between items-center text-left gap-4"
//       >
//         <span className="font-semibold text-slate-900">{q}</span>
//         <ChevronDown
//           size={20}
//           className={`text-blue-600 flex-shrink-0 transition-transform duration-300 ${
//             open ? "rotate-180" : ""
//           }`}
//         />
//       </button>
//       <div
//         className={`grid transition-all duration-300 ease-out ${
//           open ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
//         }`}
//       >
//         <p className="overflow-hidden text-slate-500 text-sm leading-relaxed">{a}</p>
//       </div>
//     </div>
//   );
// }

// /* ────────────────────────────────────────────────────────────
//    DATA
//    ──────────────────────────────────────────────────────────── */

// const Services = [
//   {
//     icon: Smartphone,
//     title: "App Development",
//     description:
//       "Innovative mobile and hybrid apps that enhance customer engagement across multiple platforms.",
//     color: "bg-cyan-50 text-cyan-600",
//     border: "border-cyan-100 hover:border-cyan-300",
//   },
//   {
//     icon: Megaphone,
//     title: "Digital Marketing",
//     description:
//       "Social media, content marketing, and performance campaigns to amplify your brand's online presence.",
//     color: "bg-indigo-50 text-indigo-600",
//     border: "border-indigo-100 hover:border-indigo-300",
//   },
//   {
//     icon: Code2,
//     title: "Web Development",
//     description:
//       "Tailored websites, scalable e-commerce platforms, and robust software that streamlines your operations.",
//     color: "bg-blue-50 text-blue-600",
//     border: "border-blue-100 hover:border-blue-300",
//   },
//   {
//     icon: Cpu,
//     title: "Generative AI",
//     description:
//       "ML models, AI automation tools, and smart workflows that deliver real value to modern businesses.",
//     color: "bg-violet-50 text-violet-600",
//     border: "border-violet-100 hover:border-violet-300",
//   },
// ];

// const whyUs = [
//   "Skilled professionals in web development, digital marketing & AI",
//   "Client-centric approach aligned with your business goals",
//   "Strong portfolio of successful projects and happy clients",
//   "Dedicated post-launch support and maintenance",
// ];

// const process = [
//   { n: "01", title: "Discover", desc: "We dig into your business, audience, and goals to define what success actually looks like." },
//   { n: "02", title: "Design & Strategy", desc: "A clear roadmap and visual direction — every decision tied back to measurable outcomes." },
//   { n: "03", title: "Build & Develop", desc: "Our team ships clean, scalable code and campaigns, with regular check-ins along the way." },
//   { n: "04", title: "Launch & Grow", desc: "We monitor, optimise, and support post-launch so your results keep improving over time." },
// ];

// const techStack = [
// "HTML","CSS","JAVASCRIPT"  ,"Next.js", "React", "Tailwind CSS", "TypeScript","Node JS" ,"Express.js","ReactNative", "Flutter", "Firebase",
//   "WordPress", "WooCommerce", "n8n", "Google Ads", "Meta Ads", "GPT / LLM APIs",
// ];

// const testimonials = [
//   {
//     quote:
//       "Techco rebuilt our entire booking flow and our conversion rate jumped within weeks. They actually understood our business, not just our brief.",
//     name: "Client Testimonial",
//     role: "E-Commerce Client",
//   },
//   {
//     quote:
//       "Our lead cost dropped significantly after they took over our ad accounts. Reporting is transparent and the team is responsive.",
//     name: "Client Testimonial",
//     role: "Automotive Dealership",
//   },
//   {
//     quote:
//       "The app launch was smooth from design to App Store approval. They handled everything we didn't have in-house.",
//     name: "Client Testimonial",
//     role: "Mobility Startup",
//   },
// ];

// const faqs = [
//   {
//     q: "What industries do you work with?",
//     a: "We've delivered projects across automotive, e-commerce, SaaS, healthcare, real estate, and several other sectors. Our process adapts to your industry's specific needs.",
//   },
//   {
//     q: "How long does a typical project take?",
//     a: "A marketing website usually takes 2–4 weeks, a custom web app 6–10 weeks, and mobile apps 8–14 weeks depending on scope. We'll give you a concrete timeline after the discovery call.",
//   },
//   {
//     q: "Do you offer post-launch support?",
//     a: "Yes — every project includes a support window after launch, and we offer ongoing maintenance retainers for clients who want continuous updates and monitoring.",
//   },
//   {
//     q: "Can you work with our existing team or systems?",
//     a: "Absolutely. We regularly plug into existing codebases, design systems, and marketing stacks rather than starting from scratch.",
//   },
// ];

// /* ────────────────────────────────────────────────────────────
//    PAGE
//    ──────────────────────────────────────────────────────────── */

// export default function HomePage() {
//   return (
//     <>
//       {/* Global styles for premium motion — keyframes + effect classes */}
//       <style>{`
//         @keyframes auroraDrift {
//           0%   { transform: translate(0, 0) scale(1); }
//           50%  { transform: translate(30px, -20px) scale(1.15); }
//           100% { transform: translate(0, 0) scale(1); }
//         }
//         @keyframes fadeUpLine {
//           from { opacity: 0; transform: translateY(24px); filter: blur(4px); }
//           to   { opacity: 1; transform: translateY(0); filter: blur(0); }
//         }
//         @keyframes barGrow {
//           from { transform: scaleY(0); }
//           to   { transform: scaleY(1); }
//         }
//         @keyframes drawLine {
//           from { stroke-dashoffset: 480; }
//           to   { stroke-dashoffset: 0; }
//         }
//         @keyframes floatY {
//           0%, 100% { transform: translateY(0px); }
//           50%      { transform: translateY(-8px); }
//         }
//         @keyframes pingSlow {
//           0%   { transform: scale(1); opacity: 0.9; }
//           75%  { transform: scale(2.2); opacity: 0; }
//           100% { transform: scale(2.2); opacity: 0; }
//         }
//         @keyframes marqueeScroll {
//           from { transform: translateX(0); }
//           to   { transform: translateX(-50%); }
//         }
//         @keyframes shine {
//           from { transform: translateX(-120%) skewX(-20deg); }
//           to   { transform: translateX(220%) skewX(-20deg); }
//         }

//         .aurora-blob { animation: auroraDrift 9s ease-in-out infinite; }
//         .aurora-blob-slow { animation: auroraDrift 13s ease-in-out infinite; }

//         .hero-line { opacity: 0; animation: fadeUpLine 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }

//         .bar-grow { animation: barGrow 0.8s cubic-bezier(0.16,1,0.3,1) both; }
//         .draw-line { stroke-dasharray: 480; animation: drawLine 1.6s cubic-bezier(0.16,1,0.3,1) forwards; animation-delay: 0.4s; }
//         .pulse-dot { animation: pingSlow 2s ease-out infinite; transform-origin: center; }

//         .float-badge { animation: floatY 3.5s ease-in-out infinite; }
//         .ping-slow { animation: pingSlow 1.8s ease-out infinite; }

//         .marquee-track { animation: marqueeScroll 22s linear infinite; }
//         .marquee-wrap:hover .marquee-track { animation-play-state: paused; }

//         .spotlight-card { position: relative; isolation: isolate; }
//         .spotlight-card::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           border-radius: inherit;
//           background: radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(59,130,246,0.14), transparent 70%);
//           opacity: 0;
//           transition: opacity 0.35s ease;
//           pointer-events: none;
//           z-index: 0;
//         }
//         .spotlight-card:hover::before { opacity: 1; }
//         .spotlight-card > * { position: relative; z-index: 1; }

//         .magnetic-btn { transition: transform 0.25s cubic-bezier(0.16,1,0.3,1); }

//         .btn-shine { position: relative; overflow: hidden; }
//         .btn-shine::after {
//           content: "";
//           position: absolute;
//           top: 0; left: 0;
//           width: 40%; height: 100%;
//           background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
//           transform: translateX(-120%) skewX(-20deg);
//         }
//         .btn-shine:hover::after { animation: shine 0.9s ease forwards; }

//         @media (prefers-reduced-motion: reduce) {
//           .aurora-blob, .aurora-blob-slow, .hero-line, .bar-grow, .draw-line,
//           .pulse-dot, .float-badge, .ping-slow, .marquee-track, .magnetic-btn, .btn-shine::after {
//             animation: none !important;
//             transition: none !important;
//             opacity: 1 !important;
//             filter: none !important;
//             transform: none !important;
//           }
//         }
//       `}</style>

//       {/* ─── HERO ─────────────────────────────────────────────── */}
//       <section className="relative min-h-screen flex items-center bg-slate-900 pt-16 overflow-hidden">
//         <video
//           className="absolute inset-0 w-full h-full object-cover"
//           src="/homevid.mp4"
//           autoPlay
//           loop
//           muted
//           playsInline
//         />
//         <div className="absolute inset-0 bg-slate-900/70" />
//         <div
//           className="absolute inset-0 opacity-[0.04]"
//           style={{
//             backgroundImage:
//               "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 60px)",
//           }}
//         />
//         <div className="aurora-blob absolute top-1/4 -left-20 w-96 h-96 bg-blue-500 rounded-full opacity-[0.14] blur-3xl" />
//         <div className="aurora-blob-slow absolute bottom-1/4 right-10 w-72 h-72 bg-indigo-500 rounded-full opacity-[0.14] blur-3xl" />
//         <div className="aurora-blob-slow absolute top-10 right-1/3 w-56 h-56 bg-cyan-400 rounded-full opacity-[0.10] blur-3xl" />

//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
//           <div>
//             <span
//               className="hero-line inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium mb-6"
//               style={{ animationDelay: "60ms" }}
//             >
//               <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
//               Your Digital Growth Partner
//             </span>

//             <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
//               <span className="hero-line block" style={{ animationDelay: "160ms" }}>
//                 Software That
//               </span>
//               <span
//                 className="hero-line block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
//                 style={{ animationDelay: "300ms" }}
//               >
//                 Grows With You
//               </span>
//             </h1>

//             <p
//               className="hero-line text-slate-300 text-lg leading-relaxed mb-8 max-w-lg"
//               style={{ animationDelay: "440ms" }}
//             >
//               From web development and digital marketing to AI automation —
//               Techco Infotech builds systems that drive real, measurable growth
//               for your business.
//             </p>

//             <div className="hero-line flex flex-wrap gap-4" style={{ animationDelay: "560ms" }}>
//               <MagneticLink
//                 href="/Contact"
//                 className="btn-shine items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-900/30 hover:shadow-blue-500/40"
//               >
//                 Start Your Project
//                 <ArrowRight size={18} />
//               </MagneticLink>
//               <MagneticLink
//                 href="/about"
//                 className="items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/10"
//               >
//                 Who We Are
//                 <ChevronRight size={18} />
//               </MagneticLink>
//             </div>

//             <div
//               className="hero-line flex gap-8 mt-12 border-t border-white/10 pt-8"
//               style={{ animationDelay: "680ms" }}
//             >
//               {[
//                 { val: 50, suffix: "+", lbl: "Projects" },
//                 { val: 100, suffix: "+", lbl: "Clients" },
//                 { val: 2, suffix: "M+", lbl: "Ad Reach" },
//               ].map((s) => (
//                 <div key={s.lbl}>
//                   <p className="font-display font-bold text-2xl text-white">
//                     <Counter value={s.val} suffix={s.suffix} />
//                   </p>
//                   <p className="text-slate-400 text-sm">{s.lbl}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* SIGNATURE ELEMENT — animated growth snapshot */}
//           <div className="hero-line relative hidden lg:block" style={{ animationDelay: "300ms" }}>
//             <div className="relative bg-white/[0.06] border border-white/10 rounded-3xl p-7 backdrop-blur-sm">
//               <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">
//                 Client Growth Snapshot
//               </p>
//               <div className="flex items-end justify-between mb-3">
//                 <p className="font-display font-bold text-4xl text-white">
//                   <Counter value={187} suffix="%" />
//                 </p>
//                 <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1 bg-emerald-400/10 px-2.5 py-1 rounded-full">
//                   <TrendingUp size={13} /> Avg. Growth
//                 </span>
//               </div>

//               <svg viewBox="0 0 400 200" className="w-full h-44">
//                 <defs>
//                   <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
//                     <stop offset="0%" stopColor="#60a5fa" />
//                     <stop offset="100%" stopColor="#22d3ee" />
//                   </linearGradient>
//                 </defs>
//                 {[
//                   { x: 20, h: 55 },
//                   { x: 78, h: 85 },
//                   { x: 136, h: 65 },
//                   { x: 194, h: 118 },
//                   { x: 252, h: 95 },
//                   { x: 310, h: 145 },
//                 ].map((b, i) => (
//                   <rect
//                     key={i}
//                     x={b.x}
//                     y={200 - b.h}
//                     width="28"
//                     height={b.h}
//                     rx="5"
//                     fill="url(#lineGrad)"
//                     opacity="0.16"
//                     className="bar-grow"
//                     style={{ transformOrigin: "bottom", animationDelay: `${i * 90}ms` }}
//                   />
//                 ))}
//                 <path
//                   d="M20,148 L78,108 L136,128 L194,58 L252,88 L310,18"
//                   fill="none"
//                   stroke="url(#lineGrad)"
//                   strokeWidth="3.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="draw-line"
//                 />
//                 <circle cx="310" cy="18" r="6" fill="#22d3ee" />
//                 <circle cx="310" cy="18" r="6" fill="#22d3ee" className="pulse-dot" />
//               </svg>

//               <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
//                 {[
//                   { v: 50, s: "+", l: "Projects" },
//                   { v: 100, s: "+", l: "Clients" },
//                   { v: 4, s: "+", l: "Years" },
//                 ].map((x) => (
//                   <div key={x.l}>
//                     <p className="font-display font-bold text-white text-lg">
//                       <Counter value={x.v} suffix={x.s} />
//                     </p>
//                     <p className="text-slate-400 text-[11px]">{x.l}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="float-badge absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2">
//               <span className="relative flex h-2 w-2">
//                 <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
//               </span>
//               <span className="text-slate-800 text-xs font-semibold">Live Growth Tracking</span>
//             </div>
//           </div>
//         </div>

//         {/* wave divider into next section */}
//         {/* <svg
//           className="absolute bottom-0 left-0 w-full text-slate-50"
//           viewBox="0 0 1440 60"
//           preserveAspectRatio="none"
//           style={{ height: "50px" }}
//         >
//           <path
//             d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,24 L1440,60 L0,60 Z"
//             fill="currentColor"
//           /> */}
//         {/* </svg> */}
//         {/* wave divider into next section */}
// <svg
//   className="absolute bottom-0 left-0 w-full text-slate-50 hidden sm:block"
//   viewBox="0 0 1440 60"
//   preserveAspectRatio="none"
//   style={{ height: "50px" }}
// >
//   <path
//     d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,24 L1440,60 L0,60 Z"
//     fill="currentColor"
//   />
// </svg>
//       </section>

//       {/* ─── SERVICES ─────────────────────────────────────────── */}
//       <section className="py-24 bg-slate-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               What We Do
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
//               Our Services
//             </h2>
//             <p className="text-slate-500 max-w-xl mx-auto">
//               Tailored digital solutions that transform how your business operates and grows online.
//             </p>
//           </Reveal>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {Services.map((s, i) => (
//               <Reveal key={s.title} delay={i * 100}>
//                 <SpotlightCard
//                   className={`bg-white rounded-2xl border p-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-default h-full ${s.border}`}
//                 >
//                   <div
//                     className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
//                   >
//                     <s.icon size={22} />
//                   </div>
//                   <h3 className="font-display font-semibold text-slate-900 mb-2">{s.title}</h3>
//                   <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
//                   <div className="mt-4 flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
//                     Learn more <ArrowRight size={14} className="ml-1" />
//                   </div>
//                 </SpotlightCard>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── OUR PROCESS ──────────────────────────────────────── */}
//       <section className="py-24 bg-slate-900 relative overflow-hidden">
//         <div className="aurora-blob absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl" />
//         <div className="aurora-blob-slow absolute bottom-0 left-0 w-72 h-72 bg-indigo-500 rounded-full opacity-10 blur-3xl" />

//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
//               How We Work
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
//               Our Process
//             </h2>
//             <p className="text-slate-400 max-w-xl mx-auto">
//               A clear, repeatable process that keeps every project on time, on budget, and on target.
//             </p>
//           </Reveal>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {process.map((step, i) => (
//               <Reveal key={step.n} delay={i * 120}>
//                 <SpotlightCard className="relative bg-white/5 border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 transition-colors duration-300">
//                   {/* <span className="font-display text-5xl font-bold text-white/10 absolute top-4 right-5">
//                     {step.n}
//                   </span> */}
//                   <h3 className="font-display font-semibold text-white text-lg mb-2">
//                     {step.title}
//                   </h3>
//                   <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
//                 </SpotlightCard>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── ABOUT ───────────────────────────────────────────── */}
//       <section className="py-24 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
//           <Reveal className="relative">
//             <div className="w-full aspect-square max-w-md mx-auto lg:mx-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl overflow-hidden flex items-center justify-center relative">
//               <div
//                 className="absolute inset-0 opacity-10"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 20px)",
//                 }}
//               />
//               <div className="text-center text-white relative z-10 p-8">
//                 <p className="font-display font-bold text-6xl mb-2">4+</p>
//                 <p className="text-blue-200 text-lg">Years of Expertise</p>
//                 <div className="mt-6 grid grid-cols-2 gap-4 text-left">
//                   {[
//                     { v: 50, s: "+", l: "Projects" },
//                     { v: 100, s: "+", l: "Clients" },
//                     { v: 2, s: "M+", l: "Ad Reach" },
//                     { v: 100, s: "%", l: "Dedicated" },
//                   ].map((x) => (
//                     <div key={x.l} className="bg-white/10 rounded-xl p-3">
//                       <p className="font-display font-bold text-2xl">
//                         <Counter value={x.v} suffix={x.s} />
//                       </p>
//                       <p className="text-blue-200 text-xs">{x.l}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="float-badge absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-blue-50">
//               <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
//                 <CheckCircle2 size={20} className="text-green-600" />
//               </div>
//               <div>
//                 <p className="font-semibold text-sm text-slate-800">Trusted Partner</p>
//                 <p className="text-xs text-slate-500">Indore, India</p>
//               </div>
//             </div>
//           </Reveal>

//           <Reveal delay={150}>
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               About Us
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
//               Founded on passion,
//               <br />
//               driven by results.
//             </h2>
//             <p className="text-slate-600 leading-relaxed mb-4">
//               Founded by <strong>Raunak Jashnani</strong> and <strong>Yash Kakwani</strong>,
//               Techco Infotech started with a vision to help businesses navigate the digital landscape.
//               Today, we're a trusted partner delivering end-to-end solutions.
//             </p>
//             <p className="text-slate-500 leading-relaxed mb-8 text-sm">
//               We combine IT development, digital marketing, and AI automation into one seamless
//               approach — building scalable digital systems that improve efficiency, conversions,
//               and long-term growth.
//             </p>

//             <ul className="space-y-3 mb-8">
//               {whyUs.map((item) => (
//                 <li key={item} className="flex items-start gap-3">
//                   <CheckCircle2 size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
//                   <span className="text-slate-600 text-sm">{item}</span>
//                 </li>
//               ))}
//             </ul>

//             <MagneticLink
//               href="/about"
//               className="btn-shine items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"
//             >
//               Know More About Us
//               <ArrowRight size={18} />
//             </MagneticLink>
//           </Reveal>
//         </div>
//       </section>

//       {/* ─── PREMIER OFFERINGS ───────────────────────────────── */}
//       <section className="py-24 bg-slate-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Premier Offerings
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
//               What We Specialize In
//             </h2>
//           </Reveal>

//           <div className="grid md:grid-cols-3 gap-8 items-start">
//             {[
//               { title: "Digital Marketing", desc: "Reach your audience with precision. Our data-driven strategies maximize your online presence and generate quality leads.", icon: "📈" },
//               { title: "App Development", desc: "Custom Android and iOS apps designed for performance, scalability, and great user experience.", icon: "📱" },
//               { title: "Web Development", desc: "Responsive, fast, and user-friendly websites built for performance. We deliver robust online experiences on every device.", icon: "💻" },
//             ].map((o, i) => (
//               <Reveal key={o.title} delay={i * 120}>
//                 <SpotlightCard className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:border-blue-100 hover:-translate-y-1.5 transition-all duration-300 group h-full">
//                   <span className="text-3xl mb-4 block">{o.icon}</span>
//                   <h3 className="font-display font-bold text-slate-900 text-xl mb-3">{o.title}</h3>
//                   <p className="text-slate-500 text-sm leading-relaxed">{o.desc}</p>
//                   <div className="mt-6">
//                     <Link
//                       href="/Services"
//                       className="text-blue-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
//                     >
//                       Learn More <ArrowRight size={14} />
//                     </Link>
//                   </div>
//                 </SpotlightCard>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── TECH STACK — infinite marquee ────────────────────── */}
//       <section className="py-16 bg-white border-y border-slate-100 overflow-hidden">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-10">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Our Toolkit
//             </span>
//             <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
//               Technologies We Work With
//             </h2>
//           </Reveal>
//         </div>

//         <div className="marquee-wrap relative">
//           <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
//           <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
//           <div className="marquee-track flex gap-3 w-max">
//             {[...techStack, ...techStack].map((t, i) => (
//               <span
//                 key={t + i}
//                 className="px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-slate-700 text-sm font-medium whitespace-nowrap hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
//               >
//                 {t}
//               </span>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── CLIENTS MARQUEE ─────────────────────────────────── */}
//       <ClientsMarquee />

//       {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
//       <section className="py-24 bg-slate-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Client Voices
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
//               What Our Clients Say
//             </h2>
//             <p className="text-slate-500 max-w-xl mx-auto">
//               Real feedback from the businesses we've partnered with.
//             </p>
//           </Reveal>

//           <div className="grid md:grid-cols-3 gap-6">
//             {testimonials.map((t, i) => (
//               <Reveal key={t.name + i} delay={i * 120}>
//                 <SpotlightCard className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
//                   <Quote size={28} className="text-blue-200 mb-4" />
//                   <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
//                     "{t.quote}"
//                   </p>
//                   <div className="pt-4 border-t border-slate-100">
//                     <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
//                     <p className="text-slate-400 text-xs">{t.role}</p>
//                   </div>
//                 </SpotlightCard>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── WHY CHOOSE US ───────────────────────────────────── */}
//       <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
//         <div className="aurora-blob absolute top-10 right-10 w-72 h-72 bg-white rounded-full opacity-5 blur-3xl" />
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <Reveal>
//               <span className="text-blue-200 text-sm font-semibold uppercase tracking-widest">
//                 Why Techco
//               </span>
//               <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-6">
//                 Why Businesses Choose Us
//               </h2>
//               <p className="text-blue-100 leading-relaxed mb-8">
//                 We don't just build websites or run ads — we build digital systems
//                 that create real business impact. Every solution is practical,
//                 scalable, and result-driven.
//               </p>
//               <MagneticLink
//                 href="/Contact"
//                 className="btn-shine items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50"
//               >
//                 Let's Talk <ArrowRight size={18} />
//               </MagneticLink>
//             </Reveal>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {[
//                 { title: "Unmatched Expertise", desc: "Skilled professionals across web, marketing & AI", icon: "⚡" },
//                 { title: "Client-First Approach", desc: "Your goals guide every decision we make", icon: "🤝" },
//                 { title: "Proven Success", desc: "Portfolio of successful projects and happy clients", icon: "🏆" },
//                 { title: "Dedicated Support", desc: "Ongoing care to keep your digital assets effective", icon: "🛡️" },
//               ].map((item, i) => (
//                 <Reveal key={item.title} delay={i * 100}>
//                   <SpotlightCard className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/10 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 h-full">
//                     <span className="text-2xl">{item.icon}</span>
//                     <h4 className="font-display font-semibold mt-3 mb-1">{item.title}</h4>
//                     <p className="text-blue-200 text-sm">{item.desc}</p>
//                   </SpotlightCard>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── FAQ ──────────────────────────────────────────────── */}
//       <section className="py-24 bg-white">
//         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-12">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               FAQ
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
//               Frequently Asked Questions
//             </h2>
//           </Reveal>
//           <Reveal delay={100}>
//             <div>
//               {faqs.map((f) => (
//                 <FAQItem key={f.q} q={f.q} a={f.a} />
//               ))}
//             </div>
//           </Reveal>
//         </div>
//       </section>

//       {/* ─── CTA ─────────────────────────────────────────────── */}
//       <section className="py-20 bg-slate-50">
//         <Reveal>
//           <div className="max-w-3xl mx-auto px-4 text-center">
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
//               Ready to Build Your Digital Future?
//             </h2>
//             <p className="text-slate-500 mb-8">
//               Tell us about your project. We'll respond within 24 hours with a plan tailored to your goals.
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <MagneticLink
//                 href="/Contact"
//                 className="btn-shine px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"
//               >
//                 Get in Touch
//               </MagneticLink>
//               <MagneticLink
//                 href="/Services"
//                 className="px-8 py-3.5 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600"
//               >
//                 Explore Services
//               </MagneticLink>
//             </div>
//           </div>
//         </Reveal>
//       </section>
//     </>
//   );
// }



// import Link from "next/link";
// import {
//   Code2,
//   Megaphone,
//   Cpu,
//   Smartphone,
//   ArrowRight,
//   CheckCircle2,
//   ChevronRight,
// } from "lucide-react";
// import ClientsMarquee from "./Clientsmarquee/page";

// const Services = [

//     {
//     icon: Smartphone,
//     title: "App Development",
//     description:
//       "Innovative mobile and hybrid apps that enhance customer engagement across multiple platforms.",
//     color: "bg-cyan-50 text-cyan-600",
//     border: "border-cyan-100 hover:border-cyan-300",
//   },


//   {
//     icon: Megaphone,
//     title: "Digital Marketing",
//     description:
//       "Social media, content marketing, and performance campaigns to amplify your brand's online presence.",
//     color: "bg-indigo-50 text-indigo-600",
//     border: "border-indigo-100 hover:border-indigo-300",
//   },

//   {
//     icon: Code2,
//     title: "Web Development",
//     description:
//       "Tailored websites, scalable e-commerce platforms, and robust software that streamlines your operations.",
//     color: "bg-blue-50 text-blue-600",
//     border: "border-blue-100 hover:border-blue-300",
//   },

//   {
//     icon: Cpu,
//     title: "Generative AI",
//     description:
//       "ML models, AI automation tools, and smart workflows that deliver real value to modern businesses.",
//     color: "bg-violet-50 text-violet-600",
//     border: "border-violet-100 hover:border-violet-300",
//   },

// ];

// const whyUs = [
//   "Skilled professionals in web development, digital marketing & AI",
//   "Client-centric approach aligned with your business goals",
//   "Strong portfolio of successful projects and happy clients",
//   "Dedicated post-launch support and maintenance",
// ];

// export default function HomePage() {
//   return (
//     <>
//       {/* ─── HERO ─────────────────────────────────────────────── */}
//       <section className="relative min-h-screen flex items-center bg-slate-900 pt-16">

//         {/* ── Background Video ── */}
//         <video
//           className="absolute inset-0 w-full h-full object-cover"
//           src="/homevid.mp4"
//           autoPlay
//           loop
//           muted
//           playsInline
//         />

//         {/* ── Dark overlay so text stays readable ── */}
//         <div className="absolute inset-0 bg-slate-900/65" />

//         {/* ── Subtle grid pattern on top of overlay ── */}
//         <div
//           className="absolute inset-0 opacity-[0.04]"
//           style={{
//             backgroundImage:
//               "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 60px)",
//           }}
//         />

//         {/* ── Glow blobs ── */}
//         <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl" />
//         <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-indigo-500 rounded-full opacity-10 blur-3xl" />

//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
//           <div>
//             <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium mb-6">
//               <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
//               Your Digital Growth Partner
//             </span>

//             <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
//               Software That
//               <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
//                 Grows With You
//               </span>
//             </h1>

//             <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg">
//               From web development and digital marketing to AI automation —
//               Techco Infotech builds systems that drive real, measurable growth
//               for your business.
//             </p>

//             <div className="flex flex-wrap gap-4">
//               <Link
//                 href="/Contact"
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-900/30"
//               >
//                 Start Your Project
//                 <ArrowRight size={18} />
//               </Link>
//               <Link
//                 href="/about"
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/10 transition-colors"
//               >
//                 Who We Are
//                 <ChevronRight size={18} />
//               </Link>
//             </div>

//             <div className="flex gap-8 mt-12 border-t border-white/10 pt-8">
//               {[
//                 { val: "50+", lbl: "Projects" },
//                 { val: "100+", lbl: "Clients" },
//                 { val: "2M+", lbl: "Ad Reach" },
//               ].map((s) => (
//                 <div key={s.lbl}>
//                   <p className="font-display font-bold text-2xl text-white">{s.val}</p>
//                   <p className="text-slate-400 text-sm">{s.lbl}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="hidden lg:grid grid-cols-2 gap-4 pb-6">
//             {[
//               { icon: Code2, title: "Web Dev", sub: "React • Next.js ", color: "blue" },
//               { icon: Megaphone, title: "Marketing", sub: "SEO • PPC • Social", color: "indigo" },
//               { icon: Cpu, title: "AI & Automation", sub: "n8n • GPT • ML", color: "violet" },
//               { icon: Smartphone, title: "Mobile Apps", sub: "iOS • Android • Flutter  • React Native ", color: "cyan" },
//             ].map((card, i) => (
//               <div
//                 key={card.title}
//                 className={`p-5 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-default ${
//                   i === 1 || i === 3 ? "translate-y-6" : ""
//                 }`}
//               >
//                 <div className={`w-10 h-10 rounded-xl bg-${card.color}-500/20 flex items-center justify-center mb-3`}>
//                   <card.icon size={20} className={`text-${card.color}-400`} />
//                 </div>
//                 <p className="text-white font-semibold font-display text-sm">{card.title}</p>
//                 <p className="text-slate-400 text-xs mt-1">{card.sub}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── SERVICES ─────────────────────────────────────────── */}
//       <section className="py-24 bg-slate-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               What We Do
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
//               Our Services
//             </h2>
//             <p className="text-slate-500 max-w-xl mx-auto">
//               Tailored digital solutions that transform how your business operates and grows online.
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {Services.map((s) => (
//               <div
//                 key={s.title}
//                 className={`bg-white rounded-2xl border p-6 hover:shadow-lg transition-all group cursor-default ${s.border}`}
//               >
//                 <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-4`}>
//                   <s.icon size={22} />
//                 </div>
//                 <h3 className="font-display font-semibold text-slate-900 mb-2">{s.title}</h3>
//                 <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
//                 <div className="mt-4 flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
//                   Learn more <ArrowRight size={14} className="ml-1" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── ABOUT ───────────────────────────────────────────── */}
//       <section className="py-24 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
//           <div className="relative">
//             <div className="w-full aspect-square max-w-md mx-auto lg:mx-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl overflow-hidden flex items-center justify-center relative">
//               <div
//                 className="absolute inset-0 opacity-10"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 20px)",
//                 }}
//               />
//               <div className="text-center text-white relative z-10 p-8">
//                 <p className="font-display font-bold text-6xl mb-2">4+</p>
//                 <p className="text-blue-200 text-lg">Years of Expertise</p>
//                 <div className="mt-6 grid grid-cols-2 gap-4 text-left">
//                   {[
//                     { v: "50+", l: "Projects" },
//                     { v: "100+", l: "Clients" },
//                     { v: "2M+", l: "Ad Reach" },
//                     { v: "100%", l: "Dedicated" },
//                   ].map((x) => (
//                     <div key={x.l} className="bg-white/10 rounded-xl p-3">
//                       <p className="font-display font-bold text-2xl">{x.v}</p>
//                       <p className="text-blue-200 text-xs">{x.l}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-blue-50">
//               <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
//                 <CheckCircle2 size={20} className="text-green-600" />
//               </div>
//               <div>
//                 <p className="font-semibold text-sm text-slate-800">Trusted Partner</p>
//                 <p className="text-xs text-slate-500">Indore, India</p>
//               </div>
//             </div>
//           </div>

//           <div>
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               About Us
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
//               Founded on passion,
//               <br />
//               driven by results.
//             </h2>
//             <p className="text-slate-600 leading-relaxed mb-4">
//               Founded by <strong>Raunak Jashnani</strong> and <strong>Yash Kakwani</strong>,
//               Techco Infotech started with a vision to help businesses navigate the digital landscape.
//               Today, we're a trusted partner delivering end-to-end solutions.
//             </p>
//             <p className="text-slate-500 leading-relaxed mb-8 text-sm">
//               We combine IT development, digital marketing, and AI automation into one seamless
//               approach — building scalable digital systems that improve efficiency, conversions,
//               and long-term growth.
//             </p>

//             <ul className="space-y-3 mb-8">
//               {whyUs.map((item) => (
//                 <li key={item} className="flex items-start gap-3">
//                   <CheckCircle2 size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
//                   <span className="text-slate-600 text-sm">{item}</span>
//                 </li>
//               ))}
//             </ul>

//             <Link
//               href="/about"
//               className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
//             >
//               Know More About Us
//               <ArrowRight size={18} />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ─── PREMIER OFFERINGS ───────────────────────────────── */}
//       <section className="py-24 bg-slate-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Premier Offerings
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
//               What We Specialize In
//             </h2>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 items-start">
//             {[
//               // {
//               //   title: "Consulting Services",
//               //   desc: "Expert guidance tailored to your business. We help you navigate challenges effectively and build a roadmap for digital success.",
//               //   icon: "🎯",
//               // },

//                 {
//                 title: "Digital Marketing",
//                 desc: "Reach your audience with precision. Our data-driven strategies maximize your online presence and generate quality leads.",
//                 icon: "📈",
//               },

//               {
//   title: "App Development",
//   desc: "Custom Android and iOS apps designed for performance, scalability, and great user experience.",
//   icon: "📱",
// },

            
//               {
//                 title: "Web Development",
//                 desc: "Responsive, fast, and user-friendly websites built for performance. We deliver robust online experiences on every device.",
//                 icon: "💻",
//               },
//             ].map((o) => (
//               <div
//                 key={o.title}
//                 className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all group"
//               >
//                 <span className="text-3xl mb-4 block">{o.icon}</span>
//                 <h3 className="font-display font-bold text-slate-900 text-xl mb-3">{o.title}</h3>
//                 <p className="text-slate-500 text-sm leading-relaxed">{o.desc}</p>
//                 <div className="mt-6">
//                   <Link
//                     href="/Services"
//                     className="text-blue-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
//                   >
//                     Learn More <ArrowRight size={14} />
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── CLIENTS MARQUEE ─────────────────────────────────── */}
//       <ClientsMarquee />

//       {/* ─── WHY CHOOSE US ───────────────────────────────────── */}
//       <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <div>
//               <span className="text-blue-200 text-sm font-semibold uppercase tracking-widest">
//                 Why Techco
//               </span>
//               <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-6">
//                 Why Businesses Choose Us
//               </h2>
//               <p className="text-blue-100 leading-relaxed mb-8">
//                 We don't just build websites or run ads — we build digital systems
//                 that create real business impact. Every solution is practical,
//                 scalable, and result-driven.
//               </p>
//               <Link
//                 href="/Contact"
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
//               >
//                 Let's Talk <ArrowRight size={18} />
//               </Link>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {[
//                 { title: "Unmatched Expertise", desc: "Skilled professionals across web, marketing & AI", icon: "⚡" },
//                 { title: "Client-First Approach", desc: "Your goals guide every decision we make", icon: "🤝" },
//                 { title: "Proven Success", desc: "Portfolio of successful projects and happy clients", icon: "🏆" },
//                 { title: "Dedicated Support", desc: "Ongoing care to keep your digital assets effective", icon: "🛡️" },
//               ].map((item) => (
//                 <div
//                   key={item.title}
//                   className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors"
//                 >
//                   <span className="text-2xl">{item.icon}</span>
//                   <h4 className="font-display font-semibold mt-3 mb-1">{item.title}</h4>
//                   <p className="text-blue-200 text-sm">{item.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── CTA ─────────────────────────────────────────────── */}
//       <section className="py-20 bg-white">
//         <div className="max-w-3xl mx-auto px-4 text-center">
//           <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
//             Ready to Build Your Digital Future?
//           </h2>
//           <p className="text-slate-500 mb-8">
//             Tell us about your project. We'll respond within 24 hours with a plan tailored to your goals.
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <Link
//               href="/Contact"
//               className="px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
//             >
//               Get in Touch
//             </Link>
//             <Link
//               href="/Services"
//               className="px-8 py-3.5 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 transition-colors"
//             >
//               Explore Services
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }