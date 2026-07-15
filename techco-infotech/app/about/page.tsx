"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Target,
  Eye,
  Layers,
  Code2,
  BarChart3,
  Smartphone,
  Cpu,
  ShieldCheck,
  Clock,
  Headphones,
  Star,
  Globe,
  Mail,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
   UTILITIES — scroll reveal, counters, spotlight
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

/* ────────────────────────────────────────────────────────────
   HERO VIDEO — with mobile-safe autoplay + fallback
   ──────────────────────────────────────────────────────────── */

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = () => {
      v.play().catch(() => {
        /* autoplay blocked — will retry on canplay/loadeddata */
      });
    };

    tryPlay();
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);
    v.addEventListener("error", () => setFailed(true));

    return () => {
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
    };
  }, []);

  if (failed) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
    );
  }

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
      src="/aboutv.mp4"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster="/about-hero-poster.jpg"
    />
  );
}

/* ────────────────────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────────────────────── */

const story = [
  {
    year: "2021",
    title: "The Beginning",
    desc: "Founded by Raunak Jashnani and Yash Kakwani with a passion for technology and a vision to help businesses navigate the digital landscape.",
  },
  {
    year: "2022",
    title: "First Milestone",
    desc: "Expanded from website development to full digital campaigns, serving businesses across multiple industries.",
  },
  {
    year: "2023",
    title: "AI Integration",
    desc: "Added AI automation and n8n workflow solutions to our stack, helping clients reduce manual work significantly.",
  },
  {
    year: "2024–25",
    title: "Today & Beyond",
    desc: "Trusted by 100+ clients, 50+ projects delivered. Now a full digital growth partner for brands across India.",
  },
];

const portfolioTypes = [
  {
    icon: Code2,
    title: "Corporate & Business Websites",
    desc: "Professional sites that reflect brand credibility and generate quality business inquiries.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=700&q=80",
    alt: "Corporate business website displayed on a laptop screen",
  },
  {
    icon: Smartphone,
    title: "Automotive Dealership Websites",
    desc: "Dealership-focused websites to showcase vehicles and drive enquiries through seamless lead capture.",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=700&q=80",
    alt: "Car dealership showroom with vehicles on display",
  },
  {
    icon: Layers,
    title: "Service-Based Company Websites",
    desc: "Clean, conversion-focused sites for service businesses with clear messaging and strong CTAs.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=700&q=80",
    alt: "Team designing a website layout together",
  },
  {
    icon: Cpu,
    title: "Custom IT & App Applications",
    desc: "Mobile and web applications built on solid IT infrastructure, tailored to specific business needs and made for performance and scalability.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=700&q=80",
    alt: "Mobile app interface design mockups",
  },
  {
    icon: BarChart3,
    title: "Business Process Automation",
    desc: "IT-driven automation tools that streamline workflows, reduce manual tasks, and improve operational efficiency.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80",
    alt: "Analytics dashboard showing automated workflow data",
  },
  {
    icon: Target,
    title: "Lead Management Systems",
    desc: "Intelligent IT systems that capture, organize, and track leads to improve follow-ups and conversions.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80",
    alt: "CRM dashboard tracking leads and conversions",
  },
];

const qualities = [
  { icon: Star, title: "Great Design", desc: "Clean, modern, user-focused designs that enhance brand identity across all devices." },
  { icon: Clock, title: "Time Saving", desc: "Structured delivery process that helps businesses get faster, efficient digital solutions." },
  { icon: Headphones, title: "Quick Response", desc: "Clear communication and fast support — clients always get timely updates." },
  { icon: ShieldCheck, title: "Best Support", desc: "From planning to post-launch, consistent support for smooth long-term operations." },
];

const team = [
  {
    name: "Raunak Jashnani",
    role: "Co-Founder & Technical Lead",
    initials: "RJ",
    desc: "Leads product architecture, engineering, and AI automation systems across all client projects.",
  },
  {
    name: "Yash Kakwani",
    role: "Co-Founder & Growth Lead",
    initials: "YK",
    desc: "Drives client strategy, digital marketing, and business growth partnerships end to end.",
  },
];

const testimonials = [
  {
    name: "Rahul Mehta",
    role: "Founder, Wpmet",
    quote:
      "Techco Infotech transformed our digital presence with a professionally built website and a smooth lead management system. They delivered exactly what we needed.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Marissa Young",
    role: "Founder, Wpmet",
    quote:
      "Their team puts all the right tools in all the right places. The design was intuitive and the execution was flawless from start to finish.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Whitney Romero",
    role: "Founder, Wpmet",
    quote:
      "The perfect creative environment. Easy to choose a look, personalize content, and the support was outstanding throughout the project.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
];

/* ────────────────────────────────────────────────────────────
   PAGE
   ──────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
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
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }

        .aurora-blob { animation: auroraDrift 9s ease-in-out infinite; }
        .aurora-blob-slow { animation: auroraDrift 13s ease-in-out infinite; }
        .hero-line { opacity: 0; animation: fadeUpLine 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
        .float-badge { animation: floatY 3.5s ease-in-out infinite; }

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

        .img-zoom { overflow: hidden; }
        .img-zoom img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .img-zoom:hover img { transform: scale(1.08); }

        @media (prefers-reduced-motion: reduce) {
          .aurora-blob, .aurora-blob-slow, .hero-line, .float-badge, .img-zoom img {
            animation: none !important;
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 bg-slate-900 overflow-hidden isolate">
        <HeroVideo />
        <div className="absolute inset-0 bg-slate-900/65" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 60px)",
          }}
        />
        <div className="aurora-blob absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl" />
        <div className="aurora-blob-slow absolute bottom-10 right-20 w-48 h-48 bg-indigo-500 rounded-full opacity-10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="hero-line inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium mb-6"
            style={{ animationDelay: "60ms" }}
          >
            IT Company & Digital Marketing Agency
          </span>
          <h1
            className="hero-line font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
            style={{ animationDelay: "160ms" }}
          >
            Strong & Professional
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              IT + Marketing
            </span>{" "}
            Partner
          </h1>
          <p
            className="hero-line text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ animationDelay: "280ms" }}
          >
            Building powerful digital systems and driving real growth for brands
            across industries — combining technology and marketing into one
            seamless strategy.
          </p>
        </div>
      </section>

      {/* ─── ABOUT COMPANY ───────────────────────────────────── */}
      <section className="py-24 bg-white relative z-10 isolate overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/40 to-white" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-200 rounded-full opacity-30 blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal className="relative">
            <div className="img-zoom rounded-3xl overflow-hidden shadow-xl mb-4">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                alt="Techco Infotech team working together"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: 50, s: "+", l: "Projects Delivered", bg: "bg-blue-600" },
                { v: 100, s: "+", l: "Active Clients", bg: "bg-indigo-600" },
                { v: 2, s: "M+", l: "Ad Reach Generated", bg: "bg-violet-600" },
                { v: 4, s: "+", l: "Years Experience", bg: "bg-cyan-600" },
              ].map((s, i) => (
                <div
                  key={s.l}
                  className={`${s.bg} text-white rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 ${
                    i % 2 === 1 ? "translate-y-4" : ""
                  }`}
                >
                  <span className="font-display font-bold text-4xl">
                    <Counter value={s.v} suffix={s.s} />
                  </span>
                  <span className="text-white/70 text-sm mt-2">{s.l}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              About Our Company
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
              More than an agency —
              <br />a growth partner.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              <strong>Techco Infotech</strong> is a full-fledged <strong>IT Company</strong>{" "}
              and digital marketing agency. We help businesses build powerful digital
              systems by combining <strong>IT solutions, digital marketing, and AI-driven
              automation</strong>.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              As an <strong>IT Company</strong> at our core, we provide end-to-end services
              including website and application development, CRM systems, performance
              marketing, and smart workflow automation. Our focus is on building scalable,
              result-oriented solutions that improve efficiency, conversions, and long-term
              growth.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              From AI automations and n8n workflow integrations to lead management systems
              and data-driven marketing campaigns, we design solutions that reduce manual
              work and deliver measurable business impact.
            </p>
            <ul className="space-y-3">
              {[
                "End-to-end digital execution under one roof",
                "Transparent reporting and honest communication",
                "Long-term partnerships over one-off projects",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ─── OUR STORY TIMELINE ──────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden isolate">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Our Journey
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              How We Got Here
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {story.map((s, i) => (
              <Reveal key={s.year} delay={i * 120} className="relative">
                {i < story.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-blue-200 to-transparent z-0" />
                )}
                <SpotlightCard className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative z-10 h-full">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4">
                    {s.year}
                  </span>
                  <h3 className="font-display font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MISSION & VISION ────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden isolate">
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-violet-200 rounded-full opacity-25 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Reveal>
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-3xl p-10 h-full">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <Target size={24} />
                </div>
                <h3 className="font-display font-bold text-2xl mb-4">Our Mission</h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  To build strong digital foundations for businesses and help them grow
                  through the right blend of technology and marketing. Every solution we
                  build is practical, scalable, and performance-driven.
                </p>
                <ul className="space-y-3">
                  {[
                    "Build reliable digital systems, not just designs",
                    "Use technology to improve sales, efficiency & scalability",
                    "Execute marketing with a results-first approach",
                    "Create long-term partnerships, not short-term projects",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-blue-200 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-100 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="bg-slate-900 text-white rounded-3xl p-10 h-full">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <Eye size={24} />
                </div>
                <h3 className="font-display font-bold text-2xl mb-4">Our Vision</h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  To be a global leader in digital solutions, renowned for our commitment to
                  quality, innovation, and customer satisfaction. We envision a world where
                  every business, regardless of size, has access to enterprise-grade digital
                  infrastructure.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[
                    { label: "Innovation", icon: "✦" },
                    { label: "Quality", icon: "◈" },
                    { label: "Partnership", icon: "◉" },
                    { label: "Growth", icon: "▲" },
                  ].map((v) => (
                    <div
                      key={v.label}
                      className="bg-white/5 rounded-xl p-3 flex items-center gap-2 hover:bg-white/10 transition-colors duration-300"
                    >
                      <span className="text-blue-400 text-lg">{v.icon}</span>
                      <span className="text-slate-200 text-sm font-medium">{v.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── WORK PORTFOLIO ──────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden isolate">
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-violet-200 rounded-full opacity-20 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Our Work
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              What We've Delivered
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              As a full-service <strong>IT Company</strong>, we deliver practical IT and
              digital solutions designed to solve real business problems and drive
              measurable growth.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioTypes.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <SpotlightCard className="bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group h-full">
                  {/* NOTE: this wrapper has NO overflow-hidden so the icon
                      badge below (which intentionally hangs half below the
                      image) is never clipped. Only the image itself clips,
                      via its own rounded-t-2xl + overflow-hidden. */}
                  <div className="relative">
                    <div className="img-zoom h-36 w-full overflow-hidden rounded-t-2xl">
                      <img
                        src={p.image}
                        alt={p.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute -bottom-5 left-5 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300 z-10">
                      <p.icon size={18} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="p-6 pt-7">
                    <h3 className="font-display font-semibold text-slate-900 mb-2">{p.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUALITIES ───────────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden isolate">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-cyan-200 rounded-full opacity-25 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Why We're Different
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              What Sets Us Apart
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualities.map((q, i) => (
              <Reveal key={q.title} delay={i * 100}>
                <SpotlightCard className="text-center p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <q.icon size={22} className="text-blue-600" />
                  </div>
                  <h4 className="font-display font-bold text-slate-900 mb-2">{q.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{q.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─────────────────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden isolate">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-200 rounded-full opacity-20 blur-3xl -translate-x-1/2" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Meet The Founders
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              The People Behind Techco
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Two founders, one mission — helping businesses grow through technology
              and marketing that actually works.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 130}>
                <SpotlightCard className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 text-center h-full">
                  <div className="w-20 h-20 mx-auto mb-5 rounded-full shadow-md border-2 border-blue-100 bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <span className="text-white font-display font-bold text-xl">
                      {m.initials}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-lg">{m.name}</h3>
                  <p className="text-blue-600 text-sm font-medium mb-3">{m.role}</p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{m.desc}</p>
                  <div className="flex justify-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
                      <Globe size={15} />
                    </span>
                    <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
                      <Mail size={15} />
                    </span>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden isolate">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-200 rounded-full opacity-20 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              What Our Clients Say
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <SpotlightCard className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3 border-t border-slate-50 pt-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
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

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden isolate">
        <div className="aurora-blob absolute top-10 right-10 w-72 h-72 bg-white rounded-full opacity-5 blur-3xl" />
        <Reveal>
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Let's Build Something Together
            </h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              We don't believe in temporary solutions. We build systems that grow with
              your business. Ready to start?
            </p>
            <Link
              href="/Contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
            >
              Start Your Project <ArrowRight size={18} />
            </Link>
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
//   ArrowRight,
//   CheckCircle2,
//   Target,
//   Eye,
//   Layers,
//   Code2,
//   BarChart3,
//   Smartphone,
//   Cpu,
//   ShieldCheck,
//   Clock,
//   Headphones,
//   Star,
//   Globe,
//   Mail,
// } from "lucide-react";

// /* ────────────────────────────────────────────────────────────
//    UTILITIES — scroll reveal, counters, spotlight
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

// /* ────────────────────────────────────────────────────────────
//    DATA
//    ──────────────────────────────────────────────────────────── */

// const story = [
//   {
//     year: "2021",
//     title: "The Beginning",
//     desc: "Founded by Raunak Jashnani and Yash Kakwani with a passion for technology and a vision to help businesses navigate the digital landscape.",
//   },
//   {
//     year: "2022",
//     title: "First Milestone",
//     desc: "Expanded from website development to full digital campaigns, serving businesses across multiple industries.",
//   },
//   {
//     year: "2023",
//     title: "AI Integration",
//     desc: "Added AI automation and n8n workflow solutions to our stack, helping clients reduce manual work significantly.",
//   },
//   {
//     year: "2024–25",
//     title: "Today & Beyond",
//     desc: "Trusted by 30+ clients, 50+ projects delivered. Now a full digital growth partner for brands across India.",
//   },
// ];

// /* Portfolio work types — now each has a supporting photo */
// const portfolioTypes = [
//   {
//     icon: Code2,
//     title: "Corporate & Business Websites",
//     desc: "Professional sites that reflect brand credibility and generate quality business inquiries.",
//     image:
//       "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=700&q=80",
//     alt: "Corporate business website displayed on a laptop screen",
//   },
//   {
//     icon: Smartphone,
//     title: "Automotive Dealership Websites",
//     desc: "Dealership-focused websites to showcase vehicles and drive enquiries through seamless lead capture.",
//     image:
//       "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=700&q=80",
//     alt: "Car dealership showroom with vehicles on display",
//   },
//   {
//     icon: Layers,
//     title: "Service-Based Company Websites",
//     desc: "Clean, conversion-focused sites for service businesses with clear messaging and strong CTAs.",
//     image:
//       "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=700&q=80",
//     alt: "Team designing a website layout together",
//   },
//   {
//     icon: Cpu,
//     title: "Custom IT & App Applications",
//     desc: "Mobile and web applications built on solid IT infrastructure, tailored to specific business needs and made for performance and scalability.",
//     image:
//       "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=700&q=80",
//     alt: "Mobile app interface design mockups",
//   },
//   {
//     icon: BarChart3,
//     title: "Business Process Automation",
//     desc: "IT-driven automation tools that streamline workflows, reduce manual tasks, and improve operational efficiency.",
//     image:
//       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80",
//     alt: "Analytics dashboard showing automated workflow data",
//   },
//   {
//     icon: Target,
//     title: "Lead Management Systems",
//     desc: "Intelligent IT systems that capture, organize, and track leads to improve follow-ups and conversions.",
//     image:
//       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80",
//     alt: "CRM dashboard tracking leads and conversions",
//   },
// ];

// const qualities = [
//   { icon: Star, title: "Great Design", desc: "Clean, modern, user-focused designs that enhance brand identity across all devices." },
//   { icon: Clock, title: "Time Saving", desc: "Structured delivery process that helps businesses get faster, efficient digital solutions." },
//   { icon: Headphones, title: "Quick Response", desc: "Clear communication and fast support — clients always get timely updates." },
//   { icon: ShieldCheck, title: "Best Support", desc: "From planning to post-launch, consistent support for smooth long-term operations." },
// ];

// /* Team — initials-based avatars (no stock photos) */
// const team = [
//   {
//     name: "Raunak Jashnani",
//     role: "Co-Founder & Technical Lead",
//     initials: "RJ",
//     desc: "Leads product architecture, engineering, and AI automation systems across all client projects.",
//   },
//   {
//     name: "Yash Kakwani",
//     role: "Co-Founder & Growth Lead",
//     initials: "YK",
//     desc: "Drives client strategy, digital marketing, and business growth partnerships end to end.",
//   },
// ];

// const testimonials = [
//   {
//     name: "Rahul Mehta",
//     role: "Founder, Wpmet",
//     quote:
//       "Techco Infotech transformed our digital presence with a professionally built website and a smooth lead management system. They delivered exactly what we needed.",
//     rating: 5,
//     avatar:
//       "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
//   },
//   {
//     name: "Marissa Young",
//     role: "Founder, Wpmet",
//     quote:
//       "Their team puts all the right tools in all the right places. The design was intuitive and the execution was flawless from start to finish.",
//     rating: 5,
//     avatar:
//       "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
//   },
//   {
//     name: "Whitney Romero",
//     role: "Founder, Wpmet",
//     quote:
//       "The perfect creative environment. Easy to choose a look, personalize content, and the support was outstanding throughout the project.",
//     rating: 5,
//     avatar:
//       "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
//   },
// ];

// /* ────────────────────────────────────────────────────────────
//    PAGE
//    ──────────────────────────────────────────────────────────── */

// export default function AboutPage() {
//   return (
//     <>
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
//         @keyframes floatY {
//           0%, 100% { transform: translateY(0px); }
//           50%      { transform: translateY(-8px); }
//         }

//         .aurora-blob { animation: auroraDrift 9s ease-in-out infinite; }
//         .aurora-blob-slow { animation: auroraDrift 13s ease-in-out infinite; }
//         .hero-line { opacity: 0; animation: fadeUpLine 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
//         .float-badge { animation: floatY 3.5s ease-in-out infinite; }

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

//         .img-zoom { overflow: hidden; }
//         .img-zoom img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
//         .img-zoom:hover img { transform: scale(1.08); }

//         @media (prefers-reduced-motion: reduce) {
//           .aurora-blob, .aurora-blob-slow, .hero-line, .float-badge, .img-zoom img {
//             animation: none !important;
//             opacity: 1 !important;
//             filter: none !important;
//             transform: none !important;
//           }
//         }
//       `}</style>

//       {/* ─── HERO ─────────────────────────────────────────────── */}
//       <section className="relative pt-28 pb-20 bg-slate-900 overflow-hidden">
//         <video
//           className="absolute inset-0 w-full h-full object-cover"
//           src="/aboutv.mp4"
//           autoPlay
//           loop
//           muted
//           playsInline
//         />
//         <div className="absolute inset-0 bg-slate-900/65" />
//         <div
//           className="absolute inset-0 opacity-[0.04]"
//           style={{
//             backgroundImage:
//               "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 60px)",
//           }}
//         />
//         <div className="aurora-blob absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl" />
//         <div className="aurora-blob-slow absolute bottom-10 right-20 w-48 h-48 bg-indigo-500 rounded-full opacity-10 blur-3xl" />

//         <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <span
//             className="hero-line inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium mb-6"
//             style={{ animationDelay: "60ms" }}
//           >
//             IT Company & Digital Marketing Agency
//           </span>
//           <h1
//             className="hero-line font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
//             style={{ animationDelay: "160ms" }}
//           >
//             Strong & Professional
//             <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
//               IT + Marketing
//             </span>{" "}
//             Partner
//           </h1>
//           <p
//             className="hero-line text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed"
//             style={{ animationDelay: "280ms" }}
//           >
//             Building powerful digital systems and driving real growth for brands
//             across industries — combining technology and marketing into one
//             seamless strategy.
//           </p>
//         </div>
//       </section>

//       {/* ─── ABOUT COMPANY ───────────────────────────────────── */}
//       <section className="py-24 bg-gradient-to-b from-white via-blue-50/40 to-white relative overflow-hidden">
//         <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2" />
//         <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-200 rounded-full opacity-30 blur-3xl translate-x-1/3 translate-y-1/3" />
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
//           <Reveal className="relative">
//             <div className="img-zoom rounded-3xl overflow-hidden shadow-xl mb-4">
//               <img
//                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
//                 alt="Techco Infotech team working together"
//                 className="w-full h-64 object-cover"
//                 loading="lazy"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 { v: 50, s: "+", l: "Projects Delivered", bg: "bg-blue-600" },
//                 { v: 30, s: "+", l: "Active Clients", bg: "bg-indigo-600" },
//                 { v: 2, s: "M+", l: "Ad Reach Generated", bg: "bg-violet-600" },
//                 { v: 4, s: "+", l: "Years Experience", bg: "bg-cyan-600" },
//               ].map((s, i) => (
//                 <div
//                   key={s.l}
//                   className={`${s.bg} text-white rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 ${
//                     i % 2 === 1 ? "translate-y-4" : ""
//                   }`}
//                 >
//                   <span className="font-display font-bold text-4xl">
//                     <Counter value={s.v} suffix={s.s} />
//                   </span>
//                   <span className="text-white/70 text-sm mt-2">{s.l}</span>
//                 </div>
//               ))}
//             </div>
//           </Reveal>

//           <Reveal delay={150}>
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               About Our Company
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
//               More than an agency —
//               <br />a growth partner.
//             </h2>
//             <p className="text-slate-600 leading-relaxed mb-4">
//               <strong>Techco Infotech</strong> is a full-fledged <strong>IT Company</strong>{" "}
//               and digital marketing agency. We help businesses build powerful digital
//               systems by combining <strong>IT solutions, digital marketing, and AI-driven
//               automation</strong>.
//             </p>
//             <p className="text-slate-500 text-sm leading-relaxed mb-4">
//               As an <strong>IT Company</strong> at our core, we provide end-to-end services
//               including website and application development, CRM systems, performance
//               marketing, and smart workflow automation. Our focus is on building scalable,
//               result-oriented solutions that improve efficiency, conversions, and long-term
//               growth.
//             </p>
//             <p className="text-slate-500 text-sm leading-relaxed mb-6">
//               From AI automations and n8n workflow integrations to lead management systems
//               and data-driven marketing campaigns, we design solutions that reduce manual
//               work and deliver measurable business impact.
//             </p>
//             <ul className="space-y-3">
//               {[
//                 "End-to-end digital execution under one roof",
//                 "Transparent reporting and honest communication",
//                 "Long-term partnerships over one-off projects",
//               ].map((item) => (
//                 <li key={item} className="flex items-start gap-2.5">
//                   <CheckCircle2 size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
//                   <span className="text-slate-600 text-sm">{item}</span>
//                 </li>
//               ))}
//             </ul>
//           </Reveal>
//         </div>
//       </section>

//       {/* ─── OUR STORY TIMELINE ──────────────────────────────── */}
//       <section className="py-24 bg-gradient-to-b from-slate-50 via-indigo-50/40 to-slate-50 relative overflow-hidden">
//         <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl" />
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Our Journey
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
//               How We Got Here
//             </h2>
//           </Reveal>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {story.map((s, i) => (
//               <Reveal key={s.year} delay={i * 120} className="relative">
//                 {i < story.length - 1 && (
//                   <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-blue-200 to-transparent z-0" />
//                 )}
//                 <SpotlightCard className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative z-10 h-full">
//                   <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4">
//                     {s.year}
//                   </span>
//                   <h3 className="font-display font-bold text-slate-900 mb-2">{s.title}</h3>
//                   <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
//                 </SpotlightCard>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── MISSION & VISION ────────────────────────────────── */}
//       <section className="py-24 bg-gradient-to-b from-white to-indigo-50/50 relative overflow-hidden">
//         <div className="absolute top-1/3 -right-20 w-72 h-72 bg-violet-200 rounded-full opacity-25 blur-3xl" />
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-8">
//             <Reveal>
//               <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-3xl p-10 h-full">
//                 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
//                   <Target size={24} />
//                 </div>
//                 <h3 className="font-display font-bold text-2xl mb-4">Our Mission</h3>
//                 <p className="text-blue-100 leading-relaxed mb-6">
//                   To build strong digital foundations for businesses and help them grow
//                   through the right blend of technology and marketing. Every solution we
//                   build is practical, scalable, and performance-driven.
//                 </p>
//                 <ul className="space-y-3">
//                   {[
//                     "Build reliable digital systems, not just designs",
//                     "Use technology to improve sales, efficiency & scalability",
//                     "Execute marketing with a results-first approach",
//                     "Create long-term partnerships, not short-term projects",
//                   ].map((item) => (
//                     <li key={item} className="flex items-start gap-2.5">
//                       <CheckCircle2 size={16} className="text-blue-200 mt-0.5 flex-shrink-0" />
//                       <span className="text-blue-100 text-sm">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </Reveal>

//             <Reveal delay={150}>
//               <div className="bg-slate-900 text-white rounded-3xl p-10 h-full">
//                 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
//                   <Eye size={24} />
//                 </div>
//                 <h3 className="font-display font-bold text-2xl mb-4">Our Vision</h3>
//                 <p className="text-slate-300 leading-relaxed mb-6">
//                   To be a global leader in digital solutions, renowned for our commitment to
//                   quality, innovation, and customer satisfaction. We envision a world where
//                   every business, regardless of size, has access to enterprise-grade digital
//                   infrastructure.
//                 </p>
//                 <div className="grid grid-cols-2 gap-4 mt-6">
//                   {[
//                     { label: "Innovation", icon: "✦" },
//                     { label: "Quality", icon: "◈" },
//                     { label: "Partnership", icon: "◉" },
//                     { label: "Growth", icon: "▲" },
//                   ].map((v) => (
//                     <div
//                       key={v.label}
//                       className="bg-white/5 rounded-xl p-3 flex items-center gap-2 hover:bg-white/10 transition-colors duration-300"
//                     >
//                       <span className="text-blue-400 text-lg">{v.icon}</span>
//                       <span className="text-slate-200 text-sm font-medium">{v.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* ─── WORK PORTFOLIO ──────────────────────────────────── */}
//       <section className="py-24 bg-gradient-to-b from-slate-50 via-violet-50/30 to-slate-50 relative overflow-hidden">
//         <div className="absolute bottom-0 right-0 w-72 h-72 bg-violet-200 rounded-full opacity-20 blur-3xl" />
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Our Work
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
//               What We've Delivered
//             </h2>
//             <p className="text-slate-500 max-w-lg mx-auto">
//               As a full-service <strong>IT Company</strong>, we deliver practical IT and
//               digital solutions designed to solve real business problems and drive
//               measurable growth.
//             </p>
//           </Reveal>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {portfolioTypes.map((p, i) => (
//               <Reveal key={p.title} delay={i * 90}>
//                 <SpotlightCard className="bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group h-full overflow-hidden">
//                   <div className="img-zoom h-36 w-full overflow-hidden relative">
//                     <img
//                       src={p.image}
//                       alt={p.alt}
//                       className="w-full h-full object-cover"
//                       loading="lazy"
//                     />
//                     <div className="absolute -bottom-5 left-5 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300">
//                       <p.icon size={18} className="text-blue-600" />
//                     </div>
//                   </div>
//                   <div className="p-6 pt-7">
//                     <h3 className="font-display font-semibold text-slate-900 mb-2">{p.title}</h3>
//                     <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
//                   </div>
//                 </SpotlightCard>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── QUALITIES ───────────────────────────────────────── */}
//       <section className="py-24 bg-gradient-to-b from-white via-cyan-50/40 to-white relative overflow-hidden">
//         <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-cyan-200 rounded-full opacity-25 blur-3xl" />
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Why We're Different
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
//               What Sets Us Apart
//             </h2>
//           </Reveal>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {qualities.map((q, i) => (
//               <Reveal key={q.title} delay={i * 100}>
//                 <SpotlightCard className="text-center p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
//                   <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
//                     <q.icon size={22} className="text-blue-600" />
//                   </div>
//                   <h4 className="font-display font-bold text-slate-900 mb-2">{q.title}</h4>
//                   <p className="text-slate-500 text-sm leading-relaxed">{q.desc}</p>
//                 </SpotlightCard>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── TEAM ─────────────────────────────────────────────── */}
//       <section className="py-24 bg-gradient-to-b from-slate-50 via-cyan-50/30 to-slate-50 relative overflow-hidden">
//         <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-200 rounded-full opacity-20 blur-3xl -translate-x-1/2" />
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Meet The Founders
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
//               The People Behind Techco
//             </h2>
//             <p className="text-slate-500 max-w-lg mx-auto">
//               Two founders, one mission — helping businesses grow through technology
//               and marketing that actually works.
//             </p>
//           </Reveal>

//           <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
//             {team.map((m, i) => (
//               <Reveal key={m.name} delay={i * 130}>
//                 <SpotlightCard className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 text-center h-full">
//                   <div className="w-20 h-20 mx-auto mb-5 rounded-full shadow-md border-2 border-blue-100 bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
//                     <span className="text-white font-display font-bold text-xl">
//                       {m.initials}
//                     </span>
//                   </div>
//                   <h3 className="font-display font-bold text-slate-900 text-lg">{m.name}</h3>
//                   <p className="text-blue-600 text-sm font-medium mb-3">{m.role}</p>
//                   <p className="text-slate-500 text-sm leading-relaxed mb-5">{m.desc}</p>
//                   <div className="flex justify-center gap-3">
//                     <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
//                       <Globe size={15} />
//                     </span>
//                     <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
//                       <Mail size={15} />
//                     </span>
//                   </div>
//                 </SpotlightCard>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── TESTIMONIALS ────────────────────────────────────── */}
//       <section className="py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
//         <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-200 rounded-full opacity-20 blur-3xl" />
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Testimonials
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
//               What Our Clients Say
//             </h2>
//           </Reveal>

//           <div className="grid md:grid-cols-3 gap-6">
//             {testimonials.map((t, i) => (
//               <Reveal key={t.name} delay={i * 120}>
//                 <SpotlightCard className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
//                   <div className="flex gap-1 mb-4">
//                     {Array.from({ length: t.rating }).map((_, j) => (
//                       <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
//                     ))}
//                   </div>
//                   <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
//                     "{t.quote}"
//                   </p>
//                   <div className="flex items-center gap-3 border-t border-slate-50 pt-4">
//                     <img
//                       src={t.avatar}
//                       alt={t.name}
//                       className="w-9 h-9 rounded-full object-cover border border-slate-200"
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

//       {/* ─── CTA ─────────────────────────────────────────────── */}
//       <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
//         <div className="aurora-blob absolute top-10 right-10 w-72 h-72 bg-white rounded-full opacity-5 blur-3xl" />
//         <Reveal>
//           <div className="relative max-w-3xl mx-auto px-4 text-center">
//             <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
//               Let's Build Something Together
//             </h2>
//             <p className="text-blue-100 mb-8 leading-relaxed">
//               We don't believe in temporary solutions. We build systems that grow with
//               your business. Ready to start?
//             </p>
//             <Link
//               href="/Contact"
//               className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
//             >
//               Start Your Project <ArrowRight size={18} />
//             </Link>
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
//   ArrowRight,
//   CheckCircle2,
//   Target,
//   Eye,
//   Layers,
//   Code2,
//   BarChart3,
//   Smartphone,
//   Cpu,
//   ShieldCheck,
//   Clock,
//   Headphones,
//   Star,
//   Globe,
//   Mail,
// } from "lucide-react";

// /* ────────────────────────────────────────────────────────────
//    UTILITIES — scroll reveal, counters, spotlight
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

// /* ────────────────────────────────────────────────────────────
//    DATA
//    ──────────────────────────────────────────────────────────── */

// const story = [
//   {
//     year: "2021",
//     title: "The Beginning",
//     desc: "Founded by Raunak Jashnani and Yash Kakwani with a passion for technology and a vision to help businesses navigate the digital landscape.",
//   },
//   {
//     year: "2022",
//     title: "First Milestone",
//     desc: "Expanded from website development to full digital campaigns, serving businesses across multiple industries.",
//   },
//   {
//     year: "2023",
//     title: "AI Integration",
//     desc: "Added AI automation and n8n workflow solutions to our stack, helping clients reduce manual work significantly.",
//   },
//   {
//     year: "2024–25",
//     title: "Today & Beyond",
//     desc: "Trusted by 30+ clients, 50+ projects delivered. Now a full digital growth partner for brands across India.",
//   },
// ];

// const portfolioTypes = [
//   { icon: Code2, title: "Corporate & Business Websites", desc: "Professional sites that reflect brand credibility and generate quality business inquiries." },
//   { icon: Smartphone, title: "Automotive Dealership Websites", desc: "Dealership-focused websites to showcase vehicles and drive enquiries through seamless lead capture." },
//   { icon: Layers, title: "Service-Based Company Websites", desc: "Clean, conversion-focused sites for service businesses with clear messaging and strong CTAs." },
//   { icon: Cpu, title: "Custom App Applications", desc: "Mobile and web applications tailored to specific business needs, built for performance and scalability." },
//   { icon: BarChart3, title: "Business Process Automation", desc: "Automation tools that streamline workflows, reduce manual tasks, and improve operational efficiency." },
//   { icon: Target, title: "Lead Management Systems", desc: "Intelligent systems that capture, organize, and track leads to improve follow-ups and conversions." },
// ];

// const qualities = [
//   { icon: Star, title: "Great Design", desc: "Clean, modern, user-focused designs that enhance brand identity across all devices." },
//   { icon: Clock, title: "Time Saving", desc: "Structured delivery process that helps businesses get faster, efficient digital solutions." },
//   { icon: Headphones, title: "Quick Response", desc: "Clear communication and fast support — clients always get timely updates." },
//   { icon: ShieldCheck, title: "Best Support", desc: "From planning to post-launch, consistent support for smooth long-term operations." },
// ];

// const team = [
//   {
//     name: "Raunak Jashnani",
//     role: "Co-Founder & Technical Lead",
//     initials: "RJ",
//     desc: "Leads product architecture, engineering, and AI automation systems across all client projects.",
//   },
//   {
//     name: "Yash Kakwani",
//     role: "Co-Founder & Growth Lead",
//     initials: "YK",
//     desc: "Drives client strategy, digital marketing, and business growth partnerships end to end.",
//   },
// ];

// const testimonials = [
//   {
//     name: "Rahul Mehta",
//     role: "Founder, Wpmet",
//     quote:
//       "Techco Infotech transformed our digital presence with a professionally built website and a smooth lead management system. They delivered exactly what we needed.",
//     rating: 5,
//   },
//   {
//     name: "Marissa Young",
//     role: "Founder, Wpmet",
//     quote:
//       "Their team puts all the right tools in all the right places. The design was intuitive and the execution was flawless from start to finish.",
//     rating: 5,
//   },
//   {
//     name: "Whitney Romero",
//     role: "Founder, Wpmet",
//     quote:
//       "The perfect creative environment. Easy to choose a look, personalize content, and the support was outstanding throughout the project.",
//     rating: 5,
//   },
// ];

// /* ────────────────────────────────────────────────────────────
//    PAGE
//    ──────────────────────────────────────────────────────────── */

// export default function AboutPage() {
//   return (
//     <>
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
//         @keyframes floatY {
//           0%, 100% { transform: translateY(0px); }
//           50%      { transform: translateY(-8px); }
//         }

//         .aurora-blob { animation: auroraDrift 9s ease-in-out infinite; }
//         .aurora-blob-slow { animation: auroraDrift 13s ease-in-out infinite; }
//         .hero-line { opacity: 0; animation: fadeUpLine 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
//         .float-badge { animation: floatY 3.5s ease-in-out infinite; }

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

//         @media (prefers-reduced-motion: reduce) {
//           .aurora-blob, .aurora-blob-slow, .hero-line, .float-badge {
//             animation: none !important;
//             opacity: 1 !important;
//             filter: none !important;
//             transform: none !important;
//           }
//         }
//       `}</style>

//       {/* ─── HERO ─────────────────────────────────────────────── */}
//       <section className="relative pt-28 pb-20 bg-slate-900 overflow-hidden">
//         <video
//           className="absolute inset-0 w-full h-full object-cover"
//           src="/aboutv.mp4"
//           autoPlay
//           loop
//           muted
//           playsInline
//         />
//         <div className="absolute inset-0 bg-slate-900/65" />
//         <div
//           className="absolute inset-0 opacity-[0.04]"
//           style={{
//             backgroundImage:
//               "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 60px)",
//           }}
//         />
//         <div className="aurora-blob absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl" />
//         <div className="aurora-blob-slow absolute bottom-10 right-20 w-48 h-48 bg-indigo-500 rounded-full opacity-10 blur-3xl" />

//         <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <span
//             className="hero-line inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium mb-6"
//             style={{ animationDelay: "60ms" }}
//           >
//             Our Story
//           </span>
//           <h1
//             className="hero-line font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
//             style={{ animationDelay: "160ms" }}
//           >
//             Strong & Professional
//             <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
//               IT + Marketing
//             </span>{" "}
//             Partner
//           </h1>
//           <p
//             className="hero-line text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed"
//             style={{ animationDelay: "280ms" }}
//           >
//             Building powerful digital systems and driving real growth for brands
//             across industries — combining technology and marketing into one
//             seamless strategy.
//           </p>
//         </div>
//       </section>

//       {/* ─── ABOUT COMPANY ───────────────────────────────────── */}
//       <section className="py-24 bg-gradient-to-b from-white via-blue-50/40 to-white relative overflow-hidden">
//         <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2" />
//         <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-200 rounded-full opacity-30 blur-3xl translate-x-1/3 translate-y-1/3" />
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
//           <Reveal className="grid grid-cols-2 gap-4">
//             {[
//               { v: 50, s: "+", l: "Projects Delivered", bg: "bg-blue-600" },
//               { v: 30, s: "+", l: "Active Clients", bg: "bg-indigo-600" },
//               { v: 2, s: "M+", l: "Ad Reach Generated", bg: "bg-violet-600" },
//               { v: 4, s: "+", l: "Years Experience", bg: "bg-cyan-600" },
//             ].map((s, i) => (
//               <div
//                 key={s.l}
//                 className={`${s.bg} text-white rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 ${
//                   i % 2 === 1 ? "translate-y-4" : ""
//                 }`}
//               >
//                 <span className="font-display font-bold text-4xl">
//                   <Counter value={s.v} suffix={s.s} />
//                 </span>
//                 <span className="text-white/70 text-sm mt-2">{s.l}</span>
//               </div>
//             ))}
//           </Reveal>

//           <Reveal delay={150}>
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               About Our Company
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
//               More than an agency —
//               <br />a growth partner.
//             </h2>
//             <p className="text-slate-600 leading-relaxed mb-4">
//               At <strong>Techco Infotech</strong>, we help businesses build powerful digital
//               systems by combining <strong>IT solutions, digital marketing, and AI-driven
//               automation</strong>.
//             </p>
//             <p className="text-slate-500 text-sm leading-relaxed mb-4">
//               We provide end-to-end services including website and application development,
//               CRM systems, performance marketing, and smart workflow automation. Our focus
//               is on building scalable, result-oriented solutions that improve efficiency,
//               conversions, and long-term growth.
//             </p>
//             <p className="text-slate-500 text-sm leading-relaxed mb-6">
//               From AI automations and n8n workflow integrations to lead management systems
//               and data-driven marketing campaigns, we design solutions that reduce manual
//               work and deliver measurable business impact.
//             </p>
//             <ul className="space-y-3">
//               {[
//                 "End-to-end digital execution under one roof",
//                 "Transparent reporting and honest communication",
//                 "Long-term partnerships over one-off projects",
//               ].map((item) => (
//                 <li key={item} className="flex items-start gap-2.5">
//                   <CheckCircle2 size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
//                   <span className="text-slate-600 text-sm">{item}</span>
//                 </li>
//               ))}
//             </ul>
//           </Reveal>
//         </div>
//       </section>

//       {/* ─── OUR STORY TIMELINE ──────────────────────────────── */}
//       <section className="py-24 bg-gradient-to-b from-slate-50 via-indigo-50/40 to-slate-50 relative overflow-hidden">
//         <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl" />
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Our Journey
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
//               How We Got Here
//             </h2>
//           </Reveal>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {story.map((s, i) => (
//               <Reveal key={s.year} delay={i * 120} className="relative">
//                 {i < story.length - 1 && (
//                   <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-blue-200 to-transparent z-0" />
//                 )}
//                 <SpotlightCard className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative z-10 h-full">
//                   <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4">
//                     {s.year}
//                   </span>
//                   <h3 className="font-display font-bold text-slate-900 mb-2">{s.title}</h3>
//                   <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
//                 </SpotlightCard>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── MISSION & VISION ────────────────────────────────── */}
//       <section className="py-24 bg-gradient-to-b from-white to-indigo-50/50 relative overflow-hidden">
//         <div className="absolute top-1/3 -right-20 w-72 h-72 bg-violet-200 rounded-full opacity-25 blur-3xl" />
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-8">
//             <Reveal>
//               <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-3xl p-10 h-full">
//                 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
//                   <Target size={24} />
//                 </div>
//                 <h3 className="font-display font-bold text-2xl mb-4">Our Mission</h3>
//                 <p className="text-blue-100 leading-relaxed mb-6">
//                   To build strong digital foundations for businesses and help them grow
//                   through the right blend of technology and marketing. Every solution we
//                   build is practical, scalable, and performance-driven.
//                 </p>
//                 <ul className="space-y-3">
//                   {[
//                     "Build reliable digital systems, not just designs",
//                     "Use technology to improve sales, efficiency & scalability",
//                     "Execute marketing with a results-first approach",
//                     "Create long-term partnerships, not short-term projects",
//                   ].map((item) => (
//                     <li key={item} className="flex items-start gap-2.5">
//                       <CheckCircle2 size={16} className="text-blue-200 mt-0.5 flex-shrink-0" />
//                       <span className="text-blue-100 text-sm">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </Reveal>

//             <Reveal delay={150}>
//               <div className="bg-slate-900 text-white rounded-3xl p-10 h-full">
//                 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
//                   <Eye size={24} />
//                 </div>
//                 <h3 className="font-display font-bold text-2xl mb-4">Our Vision</h3>
//                 <p className="text-slate-300 leading-relaxed mb-6">
//                   To be a global leader in digital solutions, renowned for our commitment to
//                   quality, innovation, and customer satisfaction. We envision a world where
//                   every business, regardless of size, has access to enterprise-grade digital
//                   infrastructure.
//                 </p>
//                 <div className="grid grid-cols-2 gap-4 mt-6">
//                   {[
//                     { label: "Innovation", icon: "✦" },
//                     { label: "Quality", icon: "◈" },
//                     { label: "Partnership", icon: "◉" },
//                     { label: "Growth", icon: "▲" },
//                   ].map((v) => (
//                     <div
//                       key={v.label}
//                       className="bg-white/5 rounded-xl p-3 flex items-center gap-2 hover:bg-white/10 transition-colors duration-300"
//                     >
//                       <span className="text-blue-400 text-lg">{v.icon}</span>
//                       <span className="text-slate-200 text-sm font-medium">{v.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* ─── WORK PORTFOLIO ──────────────────────────────────── */}
//       <section className="py-24 bg-gradient-to-b from-slate-50 via-violet-50/30 to-slate-50 relative overflow-hidden">
//         <div className="absolute bottom-0 right-0 w-72 h-72 bg-violet-200 rounded-full opacity-20 blur-3xl" />
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Our Work
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
//               What We've Delivered
//             </h2>
//             <p className="text-slate-500 max-w-lg mx-auto">
//               Practical IT and digital solutions designed to solve real business problems
//               and drive measurable growth.
//             </p>
//           </Reveal>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {portfolioTypes.map((p, i) => (
//               <Reveal key={p.title} delay={i * 90}>
//                 <SpotlightCard className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group h-full">
//                   <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
//                     <p.icon size={20} className="text-blue-600" />
//                   </div>
//                   <h3 className="font-display font-semibold text-slate-900 mb-2">{p.title}</h3>
//                   <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
//                 </SpotlightCard>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── QUALITIES ───────────────────────────────────────── */}
//       <section className="py-24 bg-gradient-to-b from-white via-cyan-50/40 to-white relative overflow-hidden">
//         <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-cyan-200 rounded-full opacity-25 blur-3xl" />
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Why We're Different
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
//               What Sets Us Apart
//             </h2>
//           </Reveal>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {qualities.map((q, i) => (
//               <Reveal key={q.title} delay={i * 100}>
//                 <SpotlightCard className="text-center p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
//                   <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
//                     <q.icon size={22} className="text-blue-600" />
//                   </div>
//                   <h4 className="font-display font-bold text-slate-900 mb-2">{q.title}</h4>
//                   <p className="text-slate-500 text-sm leading-relaxed">{q.desc}</p>
//                 </SpotlightCard>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── TEAM ─────────────────────────────────────────────── */}
//       <section className="py-24 bg-gradient-to-b from-slate-50 via-cyan-50/30 to-slate-50 relative overflow-hidden">
//         <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-200 rounded-full opacity-20 blur-3xl -translate-x-1/2" />
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Meet The Founders
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
//               The People Behind Techco
//             </h2>
//             <p className="text-slate-500 max-w-lg mx-auto">
//               Two founders, one mission — helping businesses grow through technology
//               and marketing that actually works.
//             </p>
//           </Reveal>

//           <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
//             {team.map((m, i) => (
//               <Reveal key={m.name} delay={i * 130}>
//                 <SpotlightCard className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 text-center h-full">
//                   <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-display font-bold text-2xl">
//                     {m.initials}
//                   </div>
//                   <h3 className="font-display font-bold text-slate-900 text-lg">{m.name}</h3>
//                   <p className="text-blue-600 text-sm font-medium mb-3">{m.role}</p>
//                   <p className="text-slate-500 text-sm leading-relaxed mb-5">{m.desc}</p>
//                   <div className="flex justify-center gap-3">
//                     <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
//                       <Globe size={15} />
//                     </span>
//                     <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
//                       <Mail size={15} />
//                     </span>
//                   </div>
//                 </SpotlightCard>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── TESTIMONIALS ────────────────────────────────────── */}
//       <section className="py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
//         <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-200 rounded-full opacity-20 blur-3xl" />
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Testimonials
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
//               What Our Clients Say
//             </h2>
//           </Reveal>

//           <div className="grid md:grid-cols-3 gap-6">
//             {testimonials.map((t, i) => (
//               <Reveal key={t.name} delay={i * 120}>
//                 <SpotlightCard className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
//                   <div className="flex gap-1 mb-4">
//                     {Array.from({ length: t.rating }).map((_, j) => (
//                       <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
//                     ))}
//                   </div>
//                   <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
//                     "{t.quote}"
//                   </p>
//                   <div className="flex items-center gap-3 border-t border-slate-50 pt-4">
//                     <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                       {t.name[0]}
//                     </div>
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

//       {/* ─── CTA ─────────────────────────────────────────────── */}
//       <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
//         <div className="aurora-blob absolute top-10 right-10 w-72 h-72 bg-white rounded-full opacity-5 blur-3xl" />
//         <Reveal>
//           <div className="relative max-w-3xl mx-auto px-4 text-center">
//             <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
//               Let's Build Something Together
//             </h2>
//             <p className="text-blue-100 mb-8 leading-relaxed">
//               We don't believe in temporary solutions. We build systems that grow with
//               your business. Ready to start?
//             </p>
//             <Link
//               href="/Contact"
//               className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
//             >
//               Start Your Project <ArrowRight size={18} />
//             </Link>
//           </div>
//         </Reveal>
//       </section>
//     </>
//   );
// }



/// import Link from "next/link";
// import {
//   ArrowRight,
//   CheckCircle2,
//   Target,
//   Eye,
//   Layers,
//   Code2,
//   BarChart3,
//   Smartphone,
//   Cpu,
//   ShieldCheck,
//   Clock,
//   Headphones,
//   Star,
// } from "lucide-react";

// const story = [
//   {
//     year: "2021",
//     title: "The Beginning",
//     desc: "Founded by Raunak Jashnani and Yash Kakwani with a passion for technology and a vision to help businesses navigate the digital landscape.",
//   },
//   {
//     year: "2022",
//     title: "First Milestone",
//     desc: "Expanded from website development to full digital campaigns, serving businesses across multiple industries.",
//   },
//   {
//     year: "2023",
//     title: "AI Integration",
//     desc: "Added AI automation and n8n workflow solutions to our stack, helping clients reduce manual work significantly.",
//   },
//   {
//     year: "2024–25",
//     title: "Today & Beyond",
//     desc: "Trusted by 30+ clients, 50+ projects delivered. Now a full digital growth partner for brands across India.",
//   },
// ];

// const portfolioTypes = [
//   { icon: Code2, title: "Corporate & Business Websites", desc: "Professional sites that reflect brand credibility and generate quality business inquiries." },
//   { icon: Smartphone, title: "Automotive Dealership Websites", desc: "Dealership-focused websites to showcase vehicles and drive enquiries through seamless lead capture." },
//   { icon: Layers, title: "Service-Based Company Websites", desc: "Clean, conversion-focused sites for service businesses with clear messaging and strong CTAs." },
//   { icon: Cpu, title: "Custom App Applications", desc: "Mobile and web applications tailored to specific business needs, built for performance and scalability." },
//   { icon: BarChart3, title: "Business Process Automation", desc: "Automation tools that streamline workflows, reduce manual tasks, and improve operational efficiency." },
//   { icon: Target, title: "Lead Management Systems", desc: "Intelligent systems that capture, organize, and track leads to improve follow-ups and conversions." },
// ];

// const qualities = [
//   { icon: Star, title: "Great Design", desc: "Clean, modern, user-focused designs that enhance brand identity across all devices." },
//   { icon: Clock, title: "Time Saving", desc: "Structured delivery process that helps businesses get faster, efficient digital solutions." },
//   { icon: Headphones, title: "Quick Response", desc: "Clear communication and fast support — clients always get timely updates." },
//   { icon: ShieldCheck, title: "Best Support", desc: "From planning to post-launch, consistent support for smooth long-term operations." },
// ];

// const testimonials = [
//   {
//     name: "Rahul Mehta",
//     role: "Founder, Wpmet",
//     quote:
//       "Techco Infotech transformed our digital presence with a professionally built website and a smooth lead management system. They delivered exactly what we needed.",
//     rating: 5,
//   },
//   {
//     name: "Marissa Young",
//     role: "Founder, Wpmet",
//     quote:
//       "Their team puts all the right tools in all the right places. The design was intuitive and the execution was flawless from start to finish.",
//     rating: 5,
//   },
//   {
//     name: "Whitney Romero",
//     role: "Founder, Wpmet",
//     quote:
//       "The perfect creative environment. Easy to choose a look, personalize content, and the support was outstanding throughout the project.",
//     rating: 5,
//   },
// ];

// export default function AboutPage() {
//   return (
//     <>
//       {/* ─── HERO ─────────────────────────────────────────────── */}
//       <section className="relative pt-28 pb-20 bg-slate-900 overflow-hidden">

//         {/* ── Background Video ── */}
//         <video
//           className="absolute inset-0 w-full h-full object-cover"
//           src="/aboutv.mp4"
//           autoPlay
//           loop
//           muted
//           playsInline
//         />

//         {/* ── Dark overlay ── */}
//         <div className="absolute inset-0 bg-slate-900/65" />

//         {/* ── Grid pattern ── */}
//         <div
//           className="absolute inset-0 opacity-[0.04]"
//           style={{
//             backgroundImage:
//               "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 60px)",
//           }}
//         />

//         {/* ── Glow blobs ── */}
//         <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl" />
//         <div className="absolute bottom-10 right-20 w-48 h-48 bg-indigo-500 rounded-full opacity-10 blur-3xl" />

//         <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium mb-6">
//             Our Story
//           </span>
//           <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
//             Strong & Professional
//             <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
//               IT + Marketing
//             </span>{" "}
//             Partner
//           </h1>
//           <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
//             Building powerful digital systems and driving real growth for brands
//             across industries — combining technology and marketing into one
//             seamless strategy.
//           </p>
//         </div>
//       </section>

//       {/* ─── ABOUT COMPANY ───────────────────────────────────── */}
//       <section className="py-24 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
//           <div className="grid grid-cols-2 gap-4">
//             {[
//               { v: "50+", l: "Projects Delivered", bg: "bg-blue-600" },
//               { v: "30+", l: "Active Clients", bg: "bg-indigo-600" },
//               { v: "2M+", l: "Ad Reach Generated", bg: "bg-violet-600" },
//               { v: "4+", l: "Years Experience", bg: "bg-cyan-600" },
//             ].map((s, i) => (
//               <div
//                 key={s.l}
//                 className={`${s.bg} text-white rounded-2xl p-6 flex flex-col justify-between ${
//                   i % 2 === 1 ? "translate-y-4" : ""
//                 }`}
//               >
//                 <span className="font-display font-bold text-4xl">{s.v}</span>
//                 <span className="text-white/70 text-sm mt-2">{s.l}</span>
//               </div>
//             ))}
//           </div>

//           <div>
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               About Our Company
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
//               More than an agency —
//               <br />a growth partner.
//             </h2>
//             <p className="text-slate-600 leading-relaxed mb-4">
//               At <strong>Techco Infotech</strong>, we help businesses build powerful digital
//               systems by combining <strong>IT solutions, digital marketing, and AI-driven
//               automation</strong>.
//             </p>
//             <p className="text-slate-500 text-sm leading-relaxed mb-6">
//               We provide end-to-end services including website and application development,
//               CRM systems, performance marketing, and smart workflow automation. Our focus
//               is on building scalable, result-oriented solutions that improve efficiency,
//               conversions, and long-term growth.
//             </p>
//             <p className="text-slate-500 text-sm leading-relaxed">
//               From AI automations and n8n workflow integrations to lead management systems
//               and data-driven marketing campaigns, we design solutions that reduce manual
//               work and deliver measurable business impact.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ─── OUR STORY TIMELINE ──────────────────────────────── */}
//       <section className="py-24 bg-slate-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Our Journey
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
//               How We Got Here
//             </h2>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {story.map((s, i) => (
//               <div key={s.year} className="relative">
//                 {i < story.length - 1 && (
//                   <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-blue-200 to-transparent z-0" />
//                 )}
//                 <div className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all relative z-10">
//                   <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4">
//                     {s.year}
//                   </span>
//                   <h3 className="font-display font-bold text-slate-900 mb-2">{s.title}</h3>
//                   <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── MISSION & VISION ────────────────────────────────── */}
//       <section className="py-24 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-8">
//             <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-3xl p-10">
//               <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
//                 <Target size={24} />
//               </div>
//               <h3 className="font-display font-bold text-2xl mb-4">Our Mission</h3>
//               <p className="text-blue-100 leading-relaxed mb-6">
//                 To build strong digital foundations for businesses and help them grow
//                 through the right blend of technology and marketing. Every solution we
//                 build is practical, scalable, and performance-driven.
//               </p>
//               <ul className="space-y-3">
//                 {[
//                   "Build reliable digital systems, not just designs",
//                   "Use technology to improve sales, efficiency & scalability",
//                   "Execute marketing with a results-first approach",
//                   "Create long-term partnerships, not short-term projects",
//                 ].map((item) => (
//                   <li key={item} className="flex items-start gap-2.5">
//                     <CheckCircle2 size={16} className="text-blue-200 mt-0.5 flex-shrink-0" />
//                     <span className="text-blue-100 text-sm">{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="bg-slate-900 text-white rounded-3xl p-10">
//               <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
//                 <Eye size={24} />
//               </div>
//               <h3 className="font-display font-bold text-2xl mb-4">Our Vision</h3>
//               <p className="text-slate-300 leading-relaxed mb-6">
//                 To be a global leader in digital solutions, renowned for our commitment to
//                 quality, innovation, and customer satisfaction. We envision a world where
//                 every business, regardless of size, has access to enterprise-grade digital
//                 infrastructure.
//               </p>
//               <div className="grid grid-cols-2 gap-4 mt-6">
//                 {[
//                   { label: "Innovation", icon: "✦" },
//                   { label: "Quality", icon: "◈" },
//                   { label: "Partnership", icon: "◉" },
//                   { label: "Growth", icon: "▲" },
//                 ].map((v) => (
//                   <div key={v.label} className="bg-white/5 rounded-xl p-3 flex items-center gap-2">
//                     <span className="text-blue-400 text-lg">{v.icon}</span>
//                     <span className="text-slate-200 text-sm font-medium">{v.label}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── WORK PORTFOLIO ──────────────────────────────────── */}
//       <section className="py-24 bg-slate-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Our Work
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
//               What We've Delivered
//             </h2>
//             <p className="text-slate-500 max-w-lg mx-auto">
//               Practical IT and digital solutions designed to solve real business problems
//               and drive measurable growth.
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {portfolioTypes.map((p) => (
//               <div
//                 key={p.title}
//                 className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group"
//               >
//                 <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
//                   <p.icon size={20} className="text-blue-600" />
//                 </div>
//                 <h3 className="font-display font-semibold text-slate-900 mb-2">{p.title}</h3>
//                 <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── QUALITIES ───────────────────────────────────────── */}
//       <section className="py-24 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Why We're Different
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
//               What Sets Us Apart
//             </h2>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {qualities.map((q) => (
//               <div
//                 key={q.title}
//                 className="text-center p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all"
//               >
//                 <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
//                   <q.icon size={22} className="text-blue-600" />
//                 </div>
//                 <h4 className="font-display font-bold text-slate-900 mb-2">{q.title}</h4>
//                 <p className="text-slate-500 text-sm leading-relaxed">{q.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── TESTIMONIALS ────────────────────────────────────── */}
//       <section className="py-24 bg-slate-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Testimonials
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
//               What Our Clients Say
//             </h2>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6">
//             {testimonials.map((t) => (
//               <div
//                 key={t.name}
//                 className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all"
//               >
//                 <div className="flex gap-1 mb-4">
//                   {Array.from({ length: t.rating }).map((_, i) => (
//                     <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
//                   ))}
//                 </div>
//                 <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
//                   "{t.quote}"
//                 </p>
//                 <div className="flex items-center gap-3 border-t border-slate-50 pt-4">
//                   <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                     {t.name[0]}
//                   </div>
//                   <div>
//                     <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
//                     <p className="text-slate-400 text-xs">{t.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── CTA ─────────────────────────────────────────────── */}
//       <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
//         <div className="max-w-3xl mx-auto px-4 text-center">
//           <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
//             Let's Build Something Together
//           </h2>
//           <p className="text-blue-100 mb-8 leading-relaxed">
//             We don't believe in temporary solutions. We build systems that grow with
//             your business. Ready to start?
//           </p>
//           <Link
//             href="/Contact"
//             className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
//           >
//             Start Your Project <ArrowRight size={18} />
//           </Link>
//         </div>
//       </section>
//     </>
//   );
// }