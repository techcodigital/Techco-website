"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Globe, Smartphone, Cpu, Megaphone, CheckCircle2 } from "lucide-react";

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
  dir = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  dir?: "up" | "left" | "right";
}) {
  const [ref, inView] = useInView();

  const hiddenTransform =
    dir === "left"
      ? "-translate-x-16 translate-y-0"
      : dir === "right"
      ? "translate-x-16 translate-y-0"
      : "translate-x-0 translate-y-12";

  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
        inView ? "opacity-100 translate-x-0 translate-y-0 blur-0" : `opacity-0 ${hiddenTransform} blur-[2px]`
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
   DATA
   ──────────────────────────────────────────────────────────── */

const projects = [
  // ── WEB DEVELOPMENT ──────────────────────────────────────────────
  {
    title: "Collabzy – SaaS Web App",
    client: "Collabzy",
    category: "Web App",
    icon: Globe,
    color: "blue",
    tags: ["Next.js", "Tailwind", "SaaS", "Dashboard"],
    desc: "Full-featured SaaS web application for Collabzy — a collaboration platform with real-time dashboards, user management, and seamless onboarding flows.",
    results: ["Scalable SaaS architecture", "Real-time dashboard", "Clean onboarding UX"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    alt: "SaaS dashboard interface on a screen",
  },
  {
    title: "ND Global ",
    client: "ND Global",
    category: "Web Development",
    icon: Globe,
    color: "blue",
    tags: ["WooCommerce", "Payment Gateway", "Inventory"],
    desc: "Full-stack e-commerce platform for ND Global with product catalog, multi-payment gateway integration, inventory management, and order tracking.",
    results: ["Multi-currency support", "98% uptime", "UPI & Card payments"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    alt: "E-commerce website on a laptop screen",
  },
  {
    title: "Infograins Corporate Website",
    client: "Infograins",
    category: "Web Development",
    icon: Globe,
    color: "blue",
    tags: ["WordPress", "Custom Theme", "SEO"],
    desc: "Modern corporate website redesign with custom WordPress theme, optimized for performance and search engine visibility.",
    results: ["PageSpeed 95+", "Bounce rate -35%", "Organic traffic +80%"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80",
    alt: "Corporate website displayed on a laptop",
  },
  {
    title: "HyCo India –  E-Commerce",
    client: "HyCo India",
    category: "E-Commerce",
    icon: Smartphone,
    color: "cyan",
    tags: ["Flutter", "Firebase", "REST API"],
    desc: "Cross-platform mobile application for HyCo India — featuring product browsing, real-time order tracking, push notifications, and integrated payment flow.",
    results: ["iOS & Android", "Smooth checkout flow", "Real-time order tracking"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    alt: "Mobile e-commerce app interface",
  },

  // ── APP DEVELOPMENT ───────────────────────────────────────────────
  {
    title: "BidnDrive – Car Auction App",
    client: "BidnDrive",
    category: "App Development",
    icon: Smartphone,
    color: "cyan",
    tags: ["Flutter", "Firebase", "Live Bidding"],
    desc: "Live car auction mobile app for BidnDrive — real-time bidding engine, vehicle inspection reports, secure payments, and buyer-seller dashboards.",
    results: ["Live bidding engine", "Secure escrow payments", "4.8★ app rating"],
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80",
    alt: "Car auction showroom with vehicles",
  },
  {
    title: "Collabzy Mobile App",
    client: "Collabzy",
    category: "App Development",
    icon: Smartphone,
    color: "cyan",
    tags: ["Flutter", "Real-time Sync", "Push Notifications"],
    desc: "Companion mobile app for the Collabzy platform — real-time collaboration, task management, team chat, and cross-device sync.",
    results: ["iOS & Android", "Offline-first support", "Instant push alerts"],
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
    alt: "Team collaboration app on phone screen",
  },

  // ── AI & AUTOMATION ───────────────────────────────────────────────
  {
    title: "n8n Lead Automation System",
    client: "Multiple Clients",
    category: "AI & Automation",
    icon: Cpu,
    color: "violet",
    tags: ["n8n", "CRM", "WhatsApp API"],
    desc: "Automated lead management workflow — capturing leads from multiple sources, auto-assigning to sales reps, and sending WhatsApp follow-ups instantly.",
    results: ["80% manual work saved", "Response time: 2 min", "Zero lead drop"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80",
    alt: "Abstract visualization of automation workflow network",
  },

  // ── DIGITAL MARKETING ─────────────────────────────────────────────
  {
    title: "Honda – Lead Generation Campaign",
    client: "Honda Dealership",
    category: "Digital Marketing",
    icon: Megaphone,
    color: "indigo",
    tags: ["Meta Ads", "Google Ads", "Lead Gen"],
    desc: "Performance marketing campaign for Honda dealership — driving qualified test-drive enquiries through targeted Meta & Google Ads with creative A/B testing.",
    results: ["5x ROAS", "1,200+ leads/month", "30% lower CPL"],
    image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80",
    alt: "Honda car at a dealership showroom",
  },
  {
    title: "HyCo India – Brand & Growth",
    client: "HyCo India",
    category: "Digital Marketing",
    icon: Megaphone,
    color: "indigo",
    tags: ["SEO", "Content Strategy", "Social Media"],
    desc: "End-to-end digital marketing for HyCo India — brand positioning, SEO, social media management, and performance campaigns to build awareness and drive sales.",
    results: ["Top 5 Google rankings", "3x social reach", "Brand recall uplift"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    alt: "Marketing analytics dashboard",
  },
  {
    title: "BidnDrive – App Launch Campaign",
    client: "BidnDrive",
    category: "Digital Marketing",
    icon: Megaphone,
    color: "indigo",
    tags: ["App Store Optimization", "Meta Ads", "Influencer"],
    desc: "Go-to-market campaign for the BidnDrive app launch — ASO, paid social, influencer partnerships, and PR to drive installs and first-auction users.",
    results: ["10K+ installs in 30 days", "4.8★ store rating", "Featured in auto media"],
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80",
    alt: "Mobile app launch on smartphone screen",
  },
  {
    title: "Anand Group – Digital Presence",
    client: "Anand Group",
    category: "Digital Marketing",
    icon: Megaphone,
    color: "indigo",
    tags: ["Google Ads", "SEO", "Reputation Mgmt"],
    desc: "Comprehensive digital marketing strategy for Anand Group — Google Ads, local SEO, reputation management, and content to dominate local search.",
    results: ["#1 local search ranking", "60% more enquiries", "4.9★ Google rating"],
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
    alt: "Team reviewing marketing strategy",
  },
  {
    title: "Collabzy – SaaS Growth Marketing",
    client: "Collabzy",
    category: "Digital Marketing",
    icon: Megaphone,
    color: "indigo",
    tags: ["Product-led SEO", "LinkedIn Ads", "Email"],
    desc: "SaaS growth marketing for Collabzy — product-led SEO, LinkedIn outreach, email drip campaigns, and conversion rate optimisation to drive signups.",
    results: ["3x trial signups", "40% email open rate", "CAC reduced 35%"],
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=800&q=80",
    alt: "Growth marketing charts on a laptop",
  },
  {
    title: "Mahindra – Lead Gen Campaign",
    client: "Mahindra",
    category: "Digital Marketing",
    icon: Megaphone,
    color: "indigo",
    tags: ["Meta Ads", "Video Creative", "CRM"],
    desc: "High-volume lead generation for Mahindra dealership — video creatives, carousel ads, and CRM-integrated landing pages for vehicle enquiries.",
    results: ["2M+ ad reach", "800+ leads/month", "CRM auto-sync"],
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    alt: "Mahindra SUV vehicle",
  },
];

const stats = [
  { val: 50, suffix: "+", label: "Projects Delivered" },
  { val: 100, suffix: "+", label: "Happy Clients" },
  { val: 4, suffix: "+", label: "Years Experience" },
  { val: 2, suffix: "M+", label: "Ad Reach Generated" },
];

const colorMap: Record<string, { bg: string; text: string; tag: string; border: string; dot: string }> = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    tag: "bg-blue-100 text-blue-700",
    border: "hover:border-blue-200",
    dot: "bg-blue-500",
  },
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    tag: "bg-indigo-100 text-indigo-700",
    border: "hover:border-indigo-200",
    dot: "bg-indigo-500",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-600",
    tag: "bg-violet-100 text-violet-700",
    border: "hover:border-violet-200",
    dot: "bg-violet-500",
  },
  cyan: {
    bg: "bg-cyan-50",
    text: "text-cyan-600",
    tag: "bg-cyan-100 text-cyan-700",
    border: "hover:border-cyan-200",
    dot: "bg-cyan-500",
  },
};

const categories = ["All", "Web Development", "Web App", "App Development", "Digital Marketing", "AI & Automation"];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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

        .aurora-blob { animation: auroraDrift 9s ease-in-out infinite; }
        .aurora-blob-slow { animation: auroraDrift 13s ease-in-out infinite; }
        .hero-line { opacity: 0; animation: fadeUpLine 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }

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
          .aurora-blob, .aurora-blob-slow, .hero-line, .img-zoom img {
            animation: none !important;
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 60px)",
          }}
        />
        <div className="aurora-blob absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl" />
        <div className="aurora-blob-slow absolute bottom-10 right-20 w-48 h-48 bg-violet-500 rounded-full opacity-10 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center pb-16">
            <div className="text-center lg:text-left">
              <span
                className="hero-line inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium mb-6"
                style={{ animationDelay: "60ms" }}
              >
                Our Work
              </span>
              <h1
                className="hero-line font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
                style={{ animationDelay: "160ms" }}
              >
                Projects That
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Drive Real Results
                </span>
              </h1>
              <p
                className="hero-line text-slate-300 text-lg max-w-xl leading-relaxed mb-8"
                style={{ animationDelay: "280ms" }}
              >
                From dealership websites to AI automation systems and live auction apps —
                here's a look at what we've built and the impact it created for our clients.
              </p>
              <div
                className="hero-line flex flex-wrap gap-3 justify-center lg:justify-start"
                style={{ animationDelay: "380ms" }}
              >
                <Link
                  href="/Contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl transition-colors hover:-translate-y-0.5 duration-300"
                >
                  Start Your Project <ArrowRight size={16} />
                </Link>
                <Link
                  href="/Services"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors hover:-translate-y-0.5 duration-300"
                >
                  View Services <ExternalLink size={16} />
                </Link>
              </div>
            </div>

            <Reveal dir="right" delay={200} className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10 img-zoom">
                <Image
                  src="/portfolio.jpg"
                  alt="Our portfolio work"
                  width={600}
                  height={420}
                  className="object-cover w-full h-full"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
                <CheckCircle2 size={22} className="text-green-500 flex-shrink-0" />
                <div>
                  <p className="text-slate-900 font-bold text-sm">50+ Projects</p>
                  <p className="text-slate-500 text-xs">Successfully Delivered</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100} dir={i % 2 === 0 ? "left" : "right"}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                  <p className="font-display font-bold text-3xl text-white">
                    <Counter value={s.val} suffix={s.suffix} />
                  </p>
                  <p className="text-slate-400 text-xs mt-1">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT / COMPANY BLURB ────────────────────────────── */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal dir="left">
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
                Who We Are
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4 leading-tight">
                A Digital Studio Built for Growth
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                We're a full-service digital agency specialising in web development, mobile apps,
                AI automation, and performance marketing. Over the past 4+ years we've partnered
                with automotive giants, fast-growing SaaS companies, and ambitious local
                businesses — turning ideas into products and clicks into customers.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Every project starts with one question: <span className="text-slate-900 font-semibold">"What does success look like for you?"</span> Then
                we build backwards — strategy, design, development, and marketing — until that
                success is measurable in your dashboard.
              </p>
            </Reveal>

            <Reveal dir="right" delay={120} className="grid grid-cols-2 gap-4">
              {[
                { icon: Globe, label: "Web Development", desc: "Blazing-fast, conversion-optimised websites and web apps" },
                { icon: Smartphone, label: "App Development", desc: "Cross-platform iOS & Android apps with Flutter + Firebase" },
                { icon: Cpu, label: "AI & Automation", desc: "n8n workflows, GPT integrations, zero manual overhead" },
                { icon: Megaphone, label: "Digital Marketing", desc: "Meta, Google, SEO — measurable ROAS, not vanity metrics" },
              ].map((item) => (
                <SpotlightCard
                  key={item.label}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                    <item.icon size={18} className="text-blue-600" />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm mb-1">{item.label}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </SpotlightCard>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS GRID ────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Reveal className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Case Studies
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              What We've Built
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Every project is built with a clear goal — measurable growth, better
              efficiency, or stronger digital presence.
            </p>
          </Reveal>

          {/* Category pills — clickable filter */}
          <Reveal delay={100} className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                  cat === activeCategory
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p, i) => {
              const c = colorMap[p.color];
              return (
                <Reveal key={p.title} delay={(i % 6) * 80} dir={i % 2 === 0 ? "left" : "right"}>
                  <SpotlightCard
                    className={`bg-white rounded-2xl border border-slate-100 ${c.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full overflow-hidden`}
                  >
                    {/* Image wrapper split into two layers: the clipped zoom layer for
                        the photo + category tag, and an unclipped layer for the icon
                        badge so it no longer gets cut off at the image boundary. */}
                    <div className="relative">
                      <div className="img-zoom h-40 w-full overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.alt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${c.tag}`}>
                          {p.category}
                        </span>
                      </div>
                      <div className="absolute -bottom-5 left-5 z-10 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300">
                        <p.icon size={18} className={c.text} />
                      </div>
                    </div>

                    <div className="p-6 pt-8 flex flex-col flex-1">
                      <h3 className="font-display font-bold text-slate-900 text-lg leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-slate-500 text-xs mt-1 mb-4">Client: {p.client}</p>

                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{p.desc}</p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-4 border-t border-slate-100">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                          Key Results
                        </p>
                        <ul className="space-y-1.5">
                          {p.results.map((r) => (
                            <li key={r} className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0`} />
                              <span className="text-slate-700 text-xs font-medium">{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ───────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Industries
            </span>
            <h2 className="font-display text-3xl font-bold text-slate-900 mt-2">
              Sectors We've Served
            </h2>
          </Reveal>
          <Reveal delay={100} className="flex flex-wrap justify-center gap-3">
            {[
              "Automotive",
              "E-Commerce",
              "IT & Software",
              "SaaS",
              "Healthcare",
              "Real Estate",
              "Education",
              "Consulting",
              "Manufacturing",
              "Retail",
              "Hospitality",
              "Auctions & Marketplaces",
            ].map((ind) => (
              <span
                key={ind}
                className="px-5 py-2.5 bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:-translate-y-0.5 text-slate-700 text-sm font-medium rounded-full transition-all duration-300 cursor-default"
              >
                {ind}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="aurora-blob absolute top-10 right-10 w-72 h-72 bg-white rounded-full opacity-5 blur-3xl" />
        <Reveal>
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Want Results Like These?
            </h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Let's discuss your project and build something that actually moves
              the needle for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/Contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-300"
              >
                Start Your Project <ArrowRight size={18} />
              </Link>
              <Link
                href="/Services"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                View Services <ExternalLink size={16} />
              </Link>
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
// import Image from "next/image";
// import { ArrowRight, ExternalLink, Globe, Smartphone, Cpu, Megaphone, CheckCircle2 } from "lucide-react";

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
//   dir = "up",
// }: {
//   children: React.ReactNode;
//   className?: string;
//   delay?: number;
//   dir?: "up" | "left" | "right";
// }) {
//   const [ref, inView] = useInView();

//   const hiddenTransform =
//     dir === "left"
//       ? "-translate-x-16 translate-y-0"
//       : dir === "right"
//       ? "translate-x-16 translate-y-0"
//       : "translate-x-0 translate-y-12";

//   return (
//     <div
//       ref={ref}
//       className={`transition-all duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
//         inView ? "opacity-100 translate-x-0 translate-y-0 blur-0" : `opacity-0 ${hiddenTransform} blur-[2px]`
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

// const projects = [
//   // ── WEB DEVELOPMENT ──────────────────────────────────────────────
//   {
//     title: "Collabzy – SaaS Web App",
//     client: "Collabzy",
//     category: "Web App",
//     icon: Globe,
//     color: "blue",
//     tags: ["Next.js", "Tailwind", "SaaS", "Dashboard"],
//     desc: "Full-featured SaaS web application for Collabzy — a collaboration platform with real-time dashboards, user management, and seamless onboarding flows.",
//     results: ["Scalable SaaS architecture", "Real-time dashboard", "Clean onboarding UX"],
//     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
//     alt: "SaaS dashboard interface on a screen",
//   },
//   {
//     title: "ND Global ",
//     client: "ND Global",
//     category: "Web Development",
//     icon: Globe,
//     color: "blue",
//     tags: ["WooCommerce", "Payment Gateway", "Inventory"],
//     desc: "Full-stack e-commerce platform for ND Global with product catalog, multi-payment gateway integration, inventory management, and order tracking.",
//     results: ["Multi-currency support", "98% uptime", "UPI & Card payments"],
//     image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
//     alt: "E-commerce website on a laptop screen",
//   },
//   {
//     title: "Infograins Corporate Website",
//     client: "Infograins",
//     category: "Web Development",
//     icon: Globe,
//     color: "blue",
//     tags: ["WordPress", "Custom Theme", "SEO"],
//     desc: "Modern corporate website redesign with custom WordPress theme, optimized for performance and search engine visibility.",
//     results: ["PageSpeed 95+", "Bounce rate -35%", "Organic traffic +80%"],
//     image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80",
//     alt: "Corporate website displayed on a laptop",
//   },
//   {
//     title: "HyCo India –  E-Commerce",
//     client: "HyCo India",
//     category: "E-Commerce",
//     icon: Smartphone,
//     color: "cyan",
//     tags: ["Flutter", "Firebase", "REST API"],
//     desc: "Cross-platform mobile application for HyCo India — featuring product browsing, real-time order tracking, push notifications, and integrated payment flow.",
//     results: ["iOS & Android", "Smooth checkout flow", "Real-time order tracking"],
//     image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
//     alt: "Mobile e-commerce app interface",
//   },

//   // ── APP DEVELOPMENT ───────────────────────────────────────────────
//   {
//     title: "BidnDrive – Car Auction App",
//     client: "BidnDrive",
//     category: "App Development",
//     icon: Smartphone,
//     color: "cyan",
//     tags: ["Flutter", "Firebase", "Live Bidding"],
//     desc: "Live car auction mobile app for BidnDrive — real-time bidding engine, vehicle inspection reports, secure payments, and buyer-seller dashboards.",
//     results: ["Live bidding engine", "Secure escrow payments", "4.8★ app rating"],
//     image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80",
//     alt: "Car auction showroom with vehicles",
//   },
//   {
//     title: "Collabzy Mobile App",
//     client: "Collabzy",
//     category: "App Development",
//     icon: Smartphone,
//     color: "cyan",
//     tags: ["Flutter", "Real-time Sync", "Push Notifications"],
//     desc: "Companion mobile app for the Collabzy platform — real-time collaboration, task management, team chat, and cross-device sync.",
//     results: ["iOS & Android", "Offline-first support", "Instant push alerts"],
//     image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
//     alt: "Team collaboration app on phone screen",
//   },

//   // ── AI & AUTOMATION ───────────────────────────────────────────────
//   {
//     title: "n8n Lead Automation System",
//     client: "Multiple Clients",
//     category: "AI & Automation",
//     icon: Cpu,
//     color: "violet",
//     tags: ["n8n", "CRM", "WhatsApp API"],
//     desc: "Automated lead management workflow — capturing leads from multiple sources, auto-assigning to sales reps, and sending WhatsApp follow-ups instantly.",
//     results: ["80% manual work saved", "Response time: 2 min", "Zero lead drop"],
//     image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80",
//     alt: "Abstract visualization of automation workflow network",
//   },

//   // ── DIGITAL MARKETING ─────────────────────────────────────────────
//   {
//     title: "Honda – Lead Generation Campaign",
//     client: "Honda Dealership",
//     category: "Digital Marketing",
//     icon: Megaphone,
//     color: "indigo",
//     tags: ["Meta Ads", "Google Ads", "Lead Gen"],
//     desc: "Performance marketing campaign for Honda dealership — driving qualified test-drive enquiries through targeted Meta & Google Ads with creative A/B testing.",
//     results: ["5x ROAS", "1,200+ leads/month", "30% lower CPL"],
//     image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
//     alt: "Car dealership showroom",
//   },
//   {
//     title: "HyCo India – Brand & Growth",
//     client: "HyCo India",
//     category: "Digital Marketing",
//     icon: Megaphone,
//     color: "indigo",
//     tags: ["SEO", "Content Strategy", "Social Media"],
//     desc: "End-to-end digital marketing for HyCo India — brand positioning, SEO, social media management, and performance campaigns to build awareness and drive sales.",
//     results: ["Top 5 Google rankings", "3x social reach", "Brand recall uplift"],
//     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
//     alt: "Marketing analytics dashboard",
//   },
//   {
//     title: "BidnDrive – App Launch Campaign",
//     client: "BidnDrive",
//     category: "Digital Marketing",
//     icon: Megaphone,
//     color: "indigo",
//     tags: ["App Store Optimization", "Meta Ads", "Influencer"],
//     desc: "Go-to-market campaign for the BidnDrive app launch — ASO, paid social, influencer partnerships, and PR to drive installs and first-auction users.",
//     results: ["10K+ installs in 30 days", "4.8★ store rating", "Featured in auto media"],
//     image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80",
//     alt: "Mobile app launch on smartphone screen",
//   },
//   {
//     title: "Anand Group – Digital Presence",
//     client: "Anand Group",
//     category: "Digital Marketing",
//     icon: Megaphone,
//     color: "indigo",
//     tags: ["Google Ads", "SEO", "Reputation Mgmt"],
//     desc: "Comprehensive digital marketing strategy for Anand Group — Google Ads, local SEO, reputation management, and content to dominate local search.",
//     results: ["#1 local search ranking", "60% more enquiries", "4.9★ Google rating"],
//     image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
//     alt: "Team reviewing marketing strategy",
//   },
//   {
//     title: "Collabzy – SaaS Growth Marketing",
//     client: "Collabzy",
//     category: "Digital Marketing",
//     icon: Megaphone,
//     color: "indigo",
//     tags: ["Product-led SEO", "LinkedIn Ads", "Email"],
//     desc: "SaaS growth marketing for Collabzy — product-led SEO, LinkedIn outreach, email drip campaigns, and conversion rate optimisation to drive signups.",
//     results: ["3x trial signups", "40% email open rate", "CAC reduced 35%"],
//     image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=800&q=80",
//     alt: "Growth marketing charts on a laptop",
//   },
//   {
//     title: "Mahindra – Lead Gen Campaign",
//     client: "Mahindra",
//     category: "Digital Marketing",
//     icon: Megaphone,
//     color: "indigo",
//     tags: ["Meta Ads", "Video Creative", "CRM"],
//     desc: "High-volume lead generation for Mahindra dealership — video creatives, carousel ads, and CRM-integrated landing pages for vehicle enquiries.",
//     results: ["2M+ ad reach", "800+ leads/month", "CRM auto-sync"],
//     image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80",
//     alt: "SUV vehicle at a dealership",
//   },
// ];

// const stats = [
//   { val: 50, suffix: "+", label: "Projects Delivered" },
//   { val: 100, suffix: "+", label: "Happy Clients" },
//   { val: 4, suffix: "+", label: "Years Experience" },
//   { val: 2, suffix: "M+", label: "Ad Reach Generated" },
// ];

// const colorMap: Record<string, { bg: string; text: string; tag: string; border: string; dot: string }> = {
//   blue: {
//     bg: "bg-blue-50",
//     text: "text-blue-600",
//     tag: "bg-blue-100 text-blue-700",
//     border: "hover:border-blue-200",
//     dot: "bg-blue-500",
//   },
//   indigo: {
//     bg: "bg-indigo-50",
//     text: "text-indigo-600",
//     tag: "bg-indigo-100 text-indigo-700",
//     border: "hover:border-indigo-200",
//     dot: "bg-indigo-500",
//   },
//   violet: {
//     bg: "bg-violet-50",
//     text: "text-violet-600",
//     tag: "bg-violet-100 text-violet-700",
//     border: "hover:border-violet-200",
//     dot: "bg-violet-500",
//   },
//   cyan: {
//     bg: "bg-cyan-50",
//     text: "text-cyan-600",
//     tag: "bg-cyan-100 text-cyan-700",
//     border: "hover:border-cyan-200",
//     dot: "bg-cyan-500",
//   },
// };

// const categories = ["All", "Web Development", "Web App", "App Development", "Digital Marketing", "AI & Automation"];

// export default function PortfolioPage() {
//   const [activeCategory, setActiveCategory] = useState("All");

//   const filteredProjects =
//     activeCategory === "All"
//       ? projects
//       : projects.filter((p) => p.category === activeCategory);

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

//         .aurora-blob { animation: auroraDrift 9s ease-in-out infinite; }
//         .aurora-blob-slow { animation: auroraDrift 13s ease-in-out infinite; }
//         .hero-line { opacity: 0; animation: fadeUpLine 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }

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
//           .aurora-blob, .aurora-blob-slow, .hero-line, .img-zoom img {
//             animation: none !important;
//             opacity: 1 !important;
//             filter: none !important;
//             transform: none !important;
//           }
//         }
//       `}</style>

//       {/* ─── HERO ─────────────────────────────────────────────── */}
//       <section className="relative pt-28 pb-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
//         <div
//           className="absolute inset-0 opacity-[0.04]"
//           style={{
//             backgroundImage:
//               "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 60px)",
//           }}
//         />
//         <div className="aurora-blob absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl" />
//         <div className="aurora-blob-slow absolute bottom-10 right-20 w-48 h-48 bg-violet-500 rounded-full opacity-10 blur-3xl" />

//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-center pb-16">
//             <div className="text-center lg:text-left">
//               <span
//                 className="hero-line inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium mb-6"
//                 style={{ animationDelay: "60ms" }}
//               >
//                 Our Work
//               </span>
//               <h1
//                 className="hero-line font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
//                 style={{ animationDelay: "160ms" }}
//               >
//                 Projects That
//                 <br />
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
//                   Drive Real Results
//                 </span>
//               </h1>
//               <p
//                 className="hero-line text-slate-300 text-lg max-w-xl leading-relaxed mb-8"
//                 style={{ animationDelay: "280ms" }}
//               >
//                 From dealership websites to AI automation systems and live auction apps —
//                 here's a look at what we've built and the impact it created for our clients.
//               </p>
//               <div
//                 className="hero-line flex flex-wrap gap-3 justify-center lg:justify-start"
//                 style={{ animationDelay: "380ms" }}
//               >
//                 <Link
//                   href="/Contact"
//                   className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl transition-colors hover:-translate-y-0.5 duration-300"
//                 >
//                   Start Your Project <ArrowRight size={16} />
//                 </Link>
//                 <Link
//                   href="/Services"
//                   className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors hover:-translate-y-0.5 duration-300"
//                 >
//                   View Services <ExternalLink size={16} />
//                 </Link>
//               </div>
//             </div>

//             <Reveal dir="right" delay={200} className="relative flex justify-center lg:justify-end">
//               <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10 img-zoom">
//                 <Image
//                   src="/portfolio.jpg"
//                   alt="Our portfolio work"
//                   width={600}
//                   height={420}
//                   className="object-cover w-full h-full"
//                   priority
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
//               </div>
//               <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
//                 <CheckCircle2 size={22} className="text-green-500 flex-shrink-0" />
//                 <div>
//                   <p className="text-slate-900 font-bold text-sm">50+ Projects</p>
//                   <p className="text-slate-500 text-xs">Successfully Delivered</p>
//                 </div>
//               </div>
//             </Reveal>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-8">
//             {stats.map((s, i) => (
//               <Reveal key={s.label} delay={i * 100} dir={i % 2 === 0 ? "left" : "right"}>
//                 <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
//                   <p className="font-display font-bold text-3xl text-white">
//                     <Counter value={s.val} suffix={s.suffix} />
//                   </p>
//                   <p className="text-slate-400 text-xs mt-1">{s.label}</p>
//                 </div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── ABOUT / COMPANY BLURB ────────────────────────────── */}
//       <section className="py-16 bg-white border-b border-slate-100">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <Reveal dir="left">
//               <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//                 Who We Are
//               </span>
//               <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4 leading-tight">
//                 A Digital Studio Built for Growth
//               </h2>
//               <p className="text-slate-600 leading-relaxed mb-5">
//                 We're a full-service digital agency specialising in web development, mobile apps,
//                 AI automation, and performance marketing. Over the past 4+ years we've partnered
//                 with automotive giants, fast-growing SaaS companies, and ambitious local
//                 businesses — turning ideas into products and clicks into customers.
//               </p>
//               <p className="text-slate-600 leading-relaxed">
//                 Every project starts with one question: <span className="text-slate-900 font-semibold">"What does success look like for you?"</span> Then
//                 we build backwards — strategy, design, development, and marketing — until that
//                 success is measurable in your dashboard.
//               </p>
//             </Reveal>

//             <Reveal dir="right" delay={120} className="grid grid-cols-2 gap-4">
//               {[
//                 { icon: Globe, label: "Web Development", desc: "Blazing-fast, conversion-optimised websites and web apps" },
//                 { icon: Smartphone, label: "App Development", desc: "Cross-platform iOS & Android apps with Flutter + Firebase" },
//                 { icon: Cpu, label: "AI & Automation", desc: "n8n workflows, GPT integrations, zero manual overhead" },
//                 { icon: Megaphone, label: "Digital Marketing", desc: "Meta, Google, SEO — measurable ROAS, not vanity metrics" },
//               ].map((item) => (
//                 <SpotlightCard
//                   key={item.label}
//                   className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 hover:-translate-y-1 transition-all duration-300"
//                 >
//                   <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
//                     <item.icon size={18} className="text-blue-600" />
//                   </div>
//                   <p className="font-semibold text-slate-900 text-sm mb-1">{item.label}</p>
//                   <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
//                 </SpotlightCard>
//               ))}
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* ─── PROJECTS GRID ────────────────────────────────────── */}
//       <section className="py-24 bg-slate-50 relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl" />
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <Reveal className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Case Studies
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
//               What We've Built
//             </h2>
//             <p className="text-slate-500 max-w-lg mx-auto">
//               Every project is built with a clear goal — measurable growth, better
//               efficiency, or stronger digital presence.
//             </p>
//           </Reveal>

//           {/* Category pills — clickable filter */}
//           <Reveal delay={100} className="flex flex-wrap justify-center gap-2 mb-10">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 type="button"
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 ${
//                   cat === activeCategory
//                     ? "bg-blue-600 text-white border-blue-600"
//                     : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </Reveal>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProjects.map((p, i) => {
//               const c = colorMap[p.color];
//               return (
//                 <Reveal key={p.title} delay={(i % 6) * 80} dir={i % 2 === 0 ? "left" : "right"}>
//                   <SpotlightCard
//                     className={`bg-white rounded-2xl border border-slate-100 ${c.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full overflow-hidden`}
//                   >
//                     <div className="img-zoom h-40 w-full overflow-hidden relative">
//                       <img
//                         src={p.image}
//                         alt={p.alt}
//                         className="w-full h-full object-cover"
//                         loading="lazy"
//                       />
//                       <div className="absolute -bottom-5 left-5 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300">
//                         <p.icon size={18} className={c.text} />
//                       </div>
//                       <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${c.tag}`}>
//                         {p.category}
//                       </span>
//                     </div>

//                     <div className="p-6 pt-8 flex flex-col flex-1">
//                       <h3 className="font-display font-bold text-slate-900 text-lg leading-snug">
//                         {p.title}
//                       </h3>
//                       <p className="text-slate-500 text-xs mt-1 mb-4">Client: {p.client}</p>

//                       <p className="text-slate-600 text-sm leading-relaxed mb-4">{p.desc}</p>

//                       <div className="flex flex-wrap gap-2 mb-5">
//                         {p.tags.map((tag) => (
//                           <span
//                             key={tag}
//                             className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>

//                       <div className="mt-auto pt-4 border-t border-slate-100">
//                         <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
//                           Key Results
//                         </p>
//                         <ul className="space-y-1.5">
//                           {p.results.map((r) => (
//                             <li key={r} className="flex items-center gap-2">
//                               <span className={`w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0`} />
//                               <span className="text-slate-700 text-xs font-medium">{r}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </SpotlightCard>
//                 </Reveal>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ─── INDUSTRIES ───────────────────────────────────────── */}
//       <section className="py-20 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Reveal className="text-center mb-12">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Industries
//             </span>
//             <h2 className="font-display text-3xl font-bold text-slate-900 mt-2">
//               Sectors We've Served
//             </h2>
//           </Reveal>
//           <Reveal delay={100} className="flex flex-wrap justify-center gap-3">
//             {[
//               "Automotive",
//               "E-Commerce",
//               "IT & Software",
//               "SaaS",
//               "Healthcare",
//               "Real Estate",
//               "Education",
//               "Consulting",
//               "Manufacturing",
//               "Retail",
//               "Hospitality",
//               "Auctions & Marketplaces",
//             ].map((ind) => (
//               <span
//                 key={ind}
//                 className="px-5 py-2.5 bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:-translate-y-0.5 text-slate-700 text-sm font-medium rounded-full transition-all duration-300 cursor-default"
//               >
//                 {ind}
//               </span>
//             ))}
//           </Reveal>
//         </div>
//       </section>

//       {/* ─── CTA ─────────────────────────────────────────────── */}
//       <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
//         <div className="aurora-blob absolute top-10 right-10 w-72 h-72 bg-white rounded-full opacity-5 blur-3xl" />
//         <Reveal>
//           <div className="relative max-w-3xl mx-auto px-4 text-center">
//             <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
//               Want Results Like These?
//             </h2>
//             <p className="text-blue-100 mb-8 leading-relaxed">
//               Let's discuss your project and build something that actually moves
//               the needle for your business.
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <Link
//                 href="/Contact"
//                 className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-300"
//               >
//                 Start Your Project <ArrowRight size={18} />
//               </Link>
//               <Link
//                 href="/Services"
//                 className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300"
//               >
//                 View Services <ExternalLink size={16} />
//               </Link>
//             </div>
//           </div>
//         </Reveal>
//       </section>
//     </>
//   );
// }


// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { ArrowRight, ExternalLink, Globe, Smartphone, Cpu, Megaphone, CheckCircle2 } from "lucide-react";

// const projects = [
//   // ── WEB DEVELOPMENT ──────────────────────────────────────────────
//   {
//     title: "Collabzy – SaaS Web App",
//     client: "Collabzy",
//     category: "Web App",
//     icon: Globe,
//     color: "blue",
//     tags: ["Next.js", "Tailwind", "SaaS", "Dashboard"],
//     desc: "Full-featured SaaS web application for Collabzy — a collaboration platform with real-time dashboards, user management, and seamless onboarding flows.",
//     results: ["Scalable SaaS architecture", "Real-time dashboard", "Clean onboarding UX"],
//   },
//   {
//     title: "ND Global ",
//     client: "ND Global",
//     category: "Web Development",
//     icon: Globe,
//     color: "blue",
//     tags: ["WooCommerce", "Payment Gateway", "Inventory"],
//     desc: "Full-stack e-commerce platform for ND Global with product catalog, multi-payment gateway integration, inventory management, and order tracking.",
//     results: ["Multi-currency support", "98% uptime", "UPI & Card payments"],
//   },
//   {
//     title: "Infograins Corporate Website",
//     client: "Infograins",
//     category: "Web Development",
//     icon: Globe,
//     color: "blue",
//     tags: ["WordPress", "Custom Theme", "SEO"],
//     desc: "Modern corporate website redesign with custom WordPress theme, optimized for performance and search engine visibility.",
//     results: ["PageSpeed 95+", "Bounce rate -35%", "Organic traffic +80%"],
//   },
//   {
//     title: "HyCo India –  E-Commerce",
//     client: "HyCo India",
//     category: "E-Commerce",
//     icon: Smartphone,
//     color: "cyan",
//     tags: ["Flutter", "Firebase", "REST API"],
//     desc: "Cross-platform mobile application for HyCo India — featuring product browsing, real-time order tracking, push notifications, and integrated payment flow.",
//     results: ["iOS & Android", "Smooth checkout flow", "Real-time order tracking"],
//   },

//   // ── APP DEVELOPMENT ───────────────────────────────────────────────
//   {
//     title: "BidnDrive – Car Auction App",
//     client: "BidnDrive",
//     category: "App Development",
//     icon: Smartphone,
//     color: "cyan",
//     tags: ["Flutter", "Firebase", "Live Bidding"],
//     desc: "Live car auction mobile app for BidnDrive — real-time bidding engine, vehicle inspection reports, secure payments, and buyer-seller dashboards.",
//     results: ["Live bidding engine", "Secure escrow payments", "4.8★ app rating"],
//   },
//   {
//     title: "Collabzy Mobile App",
//     client: "Collabzy",
//     category: "App Development",
//     icon: Smartphone,
//     color: "cyan",
//     tags: ["Flutter", "Real-time Sync", "Push Notifications"],
//     desc: "Companion mobile app for the Collabzy platform — real-time collaboration, task management, team chat, and cross-device sync.",
//     results: ["iOS & Android", "Offline-first support", "Instant push alerts"],
//   },

//   // ── AI & AUTOMATION ───────────────────────────────────────────────
//   {
//     title: "n8n Lead Automation System",
//     client: "Multiple Clients",
//     category: "AI & Automation",
//     icon: Cpu,
//     color: "violet",
//     tags: ["n8n", "CRM", "WhatsApp API"],
//     desc: "Automated lead management workflow — capturing leads from multiple sources, auto-assigning to sales reps, and sending WhatsApp follow-ups instantly.",
//     results: ["80% manual work saved", "Response time: 2 min", "Zero lead drop"],
//   },

//   // ── DIGITAL MARKETING ─────────────────────────────────────────────
//   {
//     title: "Honda – Lead Generation Campaign",
//     client: "Honda Dealership",
//     category: "Digital Marketing",
//     icon: Megaphone,
//     color: "indigo",
//     tags: ["Meta Ads", "Google Ads", "Lead Gen"],
//     desc: "Performance marketing campaign for Honda dealership — driving qualified test-drive enquiries through targeted Meta & Google Ads with creative A/B testing.",
//     results: ["5x ROAS", "1,200+ leads/month", "30% lower CPL"],
//   },
//   {
//     title: "HyCo India – Brand & Growth",
//     client: "HyCo India",
//     category: "Digital Marketing",
//     icon: Megaphone,
//     color: "indigo",
//     tags: ["SEO", "Content Strategy", "Social Media"],
//     desc: "End-to-end digital marketing for HyCo India — brand positioning, SEO, social media management, and performance campaigns to build awareness and drive sales.",
//     results: ["Top 5 Google rankings", "3x social reach", "Brand recall uplift"],
//   },
//   {
//     title: "BidnDrive – App Launch Campaign",
//     client: "BidnDrive",
//     category: "Digital Marketing",
//     icon: Megaphone,
//     color: "indigo",
//     tags: ["App Store Optimization", "Meta Ads", "Influencer"],
//     desc: "Go-to-market campaign for the BidnDrive app launch — ASO, paid social, influencer partnerships, and PR to drive installs and first-auction users.",
//     results: ["10K+ installs in 30 days", "4.8★ store rating", "Featured in auto media"],
//   },
//   {
//     title: "Anand Group – Digital Presence",
//     client: "Anand Group",
//     category: "Digital Marketing",
//     icon: Megaphone,
//     color: "indigo",
//     tags: ["Google Ads", "SEO", "Reputation Mgmt"],
//     desc: "Comprehensive digital marketing strategy for Anand Group — Google Ads, local SEO, reputation management, and content to dominate local search.",
//     results: ["#1 local search ranking", "60% more enquiries", "4.9★ Google rating"],
//   },
//   {
//     title: "Collabzy – SaaS Growth Marketing",
//     client: "Collabzy",
//     category: "Digital Marketing",
//     icon: Megaphone,
//     color: "indigo",
//     tags: ["Product-led SEO", "LinkedIn Ads", "Email"],
//     desc: "SaaS growth marketing for Collabzy — product-led SEO, LinkedIn outreach, email drip campaigns, and conversion rate optimisation to drive signups.",
//     results: ["3x trial signups", "40% email open rate", "CAC reduced 35%"],
//   },
//   {
//     title: "Mahindra – Lead Gen Campaign",
//     client: "Mahindra",
//     category: "Digital Marketing",
//     icon: Megaphone,
//     color: "indigo",
//     tags: ["Meta Ads", "Video Creative", "CRM"],
//     desc: "High-volume lead generation for Mahindra dealership — video creatives, carousel ads, and CRM-integrated landing pages for vehicle enquiries.",
//     results: ["2M+ ad reach", "800+ leads/month", "CRM auto-sync"],
//   },
// ];

// const stats = [
//   { val: "50+", label: "Projects Delivered" },
//   { val: "100+", label: "Happy Clients" },
//   { val: "4+", label: "Years Experience" },
//   { val: "2M+", label: "Ad Reach Generated" },
// ];

// const colorMap: Record<string, { bg: string; text: string; tag: string; border: string; dot: string }> = {
//   blue: {
//     bg: "bg-blue-50",
//     text: "text-blue-600",
//     tag: "bg-blue-100 text-blue-700",
//     border: "hover:border-blue-200",
//     dot: "bg-blue-500",
//   },
//   indigo: {
//     bg: "bg-indigo-50",
//     text: "text-indigo-600",
//     tag: "bg-indigo-100 text-indigo-700",
//     border: "hover:border-indigo-200",
//     dot: "bg-indigo-500",
//   },
//   violet: {
//     bg: "bg-violet-50",
//     text: "text-violet-600",
//     tag: "bg-violet-100 text-violet-700",
//     border: "hover:border-violet-200",
//     dot: "bg-violet-500",
//   },
//   cyan: {
//     bg: "bg-cyan-50",
//     text: "text-cyan-600",
//     tag: "bg-cyan-100 text-cyan-700",
//     border: "hover:border-cyan-200",
//     dot: "bg-cyan-500",
//   },
// };

// const categories = ["All", "Web Development", "Web App", "App Development", "Digital Marketing", "AI & Automation"];

// export default function PortfolioPage() {
//   const [activeCategory, setActiveCategory] = useState("All");

//   const filteredProjects =
//     activeCategory === "All"
//       ? projects
//       : projects.filter((p) => p.category === activeCategory);

//   return (
//     <>
//       {/* ─── HERO ─────────────────────────────────────────────── */}
//       <section className="relative pt-28 pb-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
//         <div
//           className="absolute inset-0 opacity-[0.04]"
//           style={{
//             backgroundImage:
//               "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 60px)",
//           }}
//         />
//         <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl" />
//         <div className="absolute bottom-10 right-20 w-48 h-48 bg-violet-500 rounded-full opacity-10 blur-3xl" />

//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-center pb-16">
//             <div className="text-center lg:text-left">
//               <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium mb-6">
//                 Our Work
//               </span>
//               <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
//                 Projects That
//                 <br />
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
//                   Drive Real Results
//                 </span>
//               </h1>
//               <p className="text-slate-300 text-lg max-w-xl leading-relaxed mb-8">
//                 From dealership websites to AI automation systems and live auction apps —
//                 here's a look at what we've built and the impact it created for our clients.
//               </p>
//               <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
//                 <Link
//                   href="/Contact"
//                   className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl transition-colors"
//                 >
//                   Start Your Project <ArrowRight size={16} />
//                 </Link>
//                 <Link
//                   href="/Services"
//                   className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
//                 >
//                   View Services <ExternalLink size={16} />
//                 </Link>
//               </div>
//             </div>

//             <div className="relative flex justify-center lg:justify-end">
//               <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10">
//                 <Image
//                   src="/portfolio.jpg"
//                   alt="Our portfolio work"
//                   width={600}
//                   height={420}
//                   className="object-cover w-full h-full"
//                   priority
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
//               </div>
//               <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
//                 <CheckCircle2 size={22} className="text-green-500 flex-shrink-0" />
//                 <div>
//                   <p className="text-slate-900 font-bold text-sm">50+ Projects</p>
//                   <p className="text-slate-500 text-xs">Successfully Delivered</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-8">
//             {stats.map((s) => (
//               <div
//                 key={s.label}
//                 className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-sm"
//               >
//                 <p className="font-display font-bold text-3xl text-white">{s.val}</p>
//                 <p className="text-slate-400 text-xs mt-1">{s.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── ABOUT / COMPANY BLURB ────────────────────────────── */}
//       <section className="py-16 bg-white border-b border-slate-100">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//                 Who We Are
//               </span>
//               <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4 leading-tight">
//                 A Digital Studio Built for Growth
//               </h2>
//               <p className="text-slate-600 leading-relaxed mb-5">
//                 We're a full-service digital agency specialising in web development, mobile apps,
//                 AI automation, and performance marketing. Over the past 4+ years we've partnered
//                 with automotive giants, fast-growing SaaS companies, and ambitious local
//                 businesses — turning ideas into products and clicks into customers.
//               </p>
//               <p className="text-slate-600 leading-relaxed">
//                 Every project starts with one question: <span className="text-slate-900 font-semibold">"What does success look like for you?"</span> Then
//                 we build backwards — strategy, design, development, and marketing — until that
//                 success is measurable in your dashboard.
//               </p>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 { icon: Globe, label: "Web Development", desc: "Blazing-fast, conversion-optimised websites and web apps" },
//                 { icon: Smartphone, label: "App Development", desc: "Cross-platform iOS & Android apps with Flutter + Firebase" },
//                 { icon: Cpu, label: "AI & Automation", desc: "n8n workflows, GPT integrations, zero manual overhead" },
//                 { icon: Megaphone, label: "Digital Marketing", desc: "Meta, Google, SEO — measurable ROAS, not vanity metrics" },
//               ].map((item) => (
//                 <div
//                   key={item.label}
//                   className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all"
//                 >
//                   <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
//                     <item.icon size={18} className="text-blue-600" />
//                   </div>
//                   <p className="font-semibold text-slate-900 text-sm mb-1">{item.label}</p>
//                   <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── PROJECTS GRID ────────────────────────────────────── */}
//       <section className="py-24 bg-slate-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Case Studies
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
//               What We've Built
//             </h2>
//             <p className="text-slate-500 max-w-lg mx-auto">
//               Every project is built with a clear goal — measurable growth, better
//               efficiency, or stronger digital presence.
//             </p>
//           </div>

//           {/* Category pills — clickable filter */}
//           <div className="flex flex-wrap justify-center gap-2 mb-10">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 type="button"
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
//                   cat === activeCategory
//                     ? "bg-blue-600 text-white border-blue-600"
//                     : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProjects.map((p) => {
//               const c = colorMap[p.color];
//               return (
//                 <div
//                   key={p.title}
//                   className={`bg-white rounded-2xl border border-slate-100 ${c.border} hover:shadow-lg transition-all group flex flex-col`}
//                 >
//                   <div className={`${c.bg} rounded-t-2xl p-6`}>
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
//                         <p.icon size={20} className={c.text} />
//                       </div>
//                       <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.tag}`}>
//                         {p.category}
//                       </span>
//                     </div>
//                     <h3 className="font-display font-bold text-slate-900 text-lg leading-snug">
//                       {p.title}
//                     </h3>
//                     <p className="text-slate-500 text-xs mt-1">Client: {p.client}</p>
//                   </div>

//                   <div className="p-6 flex flex-col flex-1">
//                     <p className="text-slate-600 text-sm leading-relaxed mb-4">{p.desc}</p>

//                     <div className="flex flex-wrap gap-2 mb-5">
//                       {p.tags.map((tag) => (
//                         <span
//                           key={tag}
//                           className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>

//                     <div className="mt-auto pt-4 border-t border-slate-100">
//                       <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
//                         Key Results
//                       </p>
//                       <ul className="space-y-1.5">
//                         {p.results.map((r) => (
//                           <li key={r} className="flex items-center gap-2">
//                             <span className={`w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0`} />
//                             <span className="text-slate-700 text-xs font-medium">{r}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ─── INDUSTRIES ───────────────────────────────────────── */}
//       <section className="py-20 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               Industries
//             </span>
//             <h2 className="font-display text-3xl font-bold text-slate-900 mt-2">
//               Sectors We've Served
//             </h2>
//           </div>
//           <div className="flex flex-wrap justify-center gap-3">
//             {[
//               "Automotive",
//               "E-Commerce",
//               "IT & Software",
//               "SaaS",
//               "Healthcare",
//               "Real Estate",
//               "Education",
//               "Consulting",
//               "Manufacturing",
//               "Retail",
//               "Hospitality",
//               "Auctions & Marketplaces",
//             ].map((ind) => (
//               <span
//                 key={ind}
//                 className="px-5 py-2.5 bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-sm font-medium rounded-full transition-all cursor-default"
//               >
//                 {ind}
//               </span>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── CTA ─────────────────────────────────────────────── */}
//       <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
//         <div className="max-w-3xl mx-auto px-4 text-center">
//           <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
//             Want Results Like These?
//           </h2>
//           <p className="text-blue-100 mb-8 leading-relaxed">
//             Let's discuss your project and build something that actually moves
//             the needle for your business.
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <Link
//               href="/Contact"
//               className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
//             >
//               Start Your Project <ArrowRight size={18} />
//             </Link>
//             <Link
//               href="/Services"
//               className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
//             >
//               View Services <ExternalLink size={16} />
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }