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
  Globe,
  ShoppingCart,
  BarChart3,
  Search,
  Share2,
  Mail,
  Bot,
  Workflow,
  Layers,
  Target,
  Zap,
  Monitor,
  Plus,
  Minus,
  Users,
  Award,
  Clock3,
  TrendingUp,
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

const services = [
  {
    id: "web-dev",
    icon: Code2,
    title: "Web Development",
    tagline: "Build for performance, designed for growth.",
    description:
      "We craft scalable, high-performance websites and web applications tailored to your business objectives. From corporate sites to complex web platforms, every project is built with clean code and modern architecture.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80",
    alt: "Developer writing code on a laptop screen",
    subServices: [
      { icon: Globe, label: "Corporate & Landing Pages" },
      { icon: ShoppingCart, label: "E-Commerce Platforms" },
      { icon: Layers, label: "CMS & WordPress" },
      { icon: Monitor, label: "Web Applications" },
    ],
    features: [
      "Responsive across all devices",
      "SEO-optimized structure",
      "Fast load times (Core Web Vitals)",
      "Secure & scalable architecture",
      "CRM & third-party integrations",
      "Post-launch maintenance support",
    ],
    color: "blue",
    gradient: "from-blue-600 to-blue-700",
    lightBg: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    blobColor: "bg-blue-200",
  },
  {
    id: "digital-marketing",
    icon: Megaphone,
    title: "Digital Marketing",
    tagline: "Reach the right people. Drive real results.",
    description:
      "Our data-driven digital marketing strategies amplify your brand's online presence, generate quality leads, and deliver measurable ROI through performance-first campaigns.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    alt: "Marketing analytics dashboard on a screen",
    subServices: [
      { icon: Search, label: "SEO Optimization" },
      { icon: Share2, label: "Social Media Marketing" },
      { icon: BarChart3, label: "PPC & Paid Ads" },
      { icon: Mail, label: "Email Campaigns" },
    ],
    features: [
      "Google & Meta ads management",
      "Content marketing strategy",
      "SEO audit & implementation",
      "Social media management",
      "Monthly performance reports",
      "Lead generation funnels",
    ],
    color: "indigo",
    gradient: "from-indigo-600 to-indigo-700",
    lightBg: "bg-indigo-50",
    textColor: "text-indigo-600",
    borderColor: "border-indigo-200",
    blobColor: "bg-indigo-200",
  },
  {
    id: "generative-ai",
    icon: Cpu,
    title: "Generative AI & Automation",
    tagline: "Work smarter with intelligent systems.",
    description:
      "We build AI-powered solutions and smart automation workflows that reduce manual work, streamline operations, and deliver intelligent digital experiences for modern businesses.",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=900&q=80",
    alt: "Abstract visualization of AI automation network",
    subServices: [
      { icon: Bot, label: "AI Chatbots & Assistants" },
      { icon: Workflow, label: "n8n Workflow Automation" },
      { icon: Target, label: "Lead Management Systems" },
      { icon: Zap, label: "Process Automation Tools" },
    ],
    features: [
      "Custom AI model integration",
      "n8n & Zapier automation flows",
      "Chatbot development",
      "CRM & lead automation",
      "Business process automation",
      "Data pipeline & reporting",
    ],
    color: "violet",
    gradient: "from-violet-600 to-violet-700",
    lightBg: "bg-violet-50",
    textColor: "text-violet-600",
    borderColor: "border-violet-200",
    blobColor: "bg-violet-200",
  },
  {
    id: "app-development",
    icon: Smartphone,
    title: "App Development",
    tagline: "Mobile-first, built for every platform.",
    description:
      "We develop innovative mobile and hybrid applications that enhance customer engagement, align with your business objectives, and ensure compatibility across iOS and Android.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
    alt: "Mobile app interface design mockups",
    subServices: [
      { icon: Smartphone, label: "iOS & Android Apps" },
      { icon: Layers, label: "Hybrid / Flutter Apps" },
      { icon: Globe, label: "Progressive Web Apps" },
      { icon: Monitor, label: "Cross-Platform Solutions" },
    ],
    features: [
      "Native iOS & Android development",
      "Flutter & React Native",
      "App Store & Play Store publishing",
      "Push notifications & analytics",
      "Payment gateway integration",
      "Ongoing updates & support",
    ],
    color: "cyan",
    gradient: "from-cyan-600 to-cyan-700",
    lightBg: "bg-cyan-50",
    textColor: "text-cyan-600",
    borderColor: "border-cyan-200",
    blobColor: "bg-cyan-200",
  },
];

const process = [
  { step: "01", title: "Discovery", desc: "We understand your goals, audience, and technical requirements before anything else." },
  { step: "02", title: "Strategy", desc: "A clear roadmap with timelines, tech stack decisions, and measurable success metrics." },
  { step: "03", title: "Build", desc: "Our team develops your solution iteratively, with regular updates and check-ins." },
  { step: "04", title: "Launch", desc: "Thorough testing, deployment, and handover with documentation and training." },
  { step: "05", title: "Grow", desc: "Ongoing support, optimization, and scaling as your business evolves." },
];

const stats = [
  { icon: Award, v: 50, s: "+", l: "Projects Delivered" },
  { icon: Users, v: 100, s: "+", l: "Happy Clients" },
  { icon: Clock3, v: 4, s: "+", l: "Years of Experience" },
  { icon: TrendingUp, v: 2, s: "M+", l: "Ad Reach Generated" },
];

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Timelines depend on scope, but most websites take 2–4 weeks, apps take 6–10 weeks, and automation projects usually take 1–3 weeks depending on complexity.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. Every project includes a post-launch support window, and we offer monthly maintenance and optimization plans for long-term partnerships.",
  },
  {
    q: "Can you work with our existing brand and systems?",
    a: "Absolutely. We regularly integrate with existing CRMs, brand guidelines, and third-party tools so your new solution fits seamlessly into what you already have.",
  },
  {
    q: "What industries do you typically work with?",
    a: "We've delivered projects across automotive dealerships, service-based businesses, e-commerce, and corporate brands — our process adapts to your industry's specific needs.",
  },
];

/* ────────────────────────────────────────────────────────────
   FAQ ITEM
   ──────────────────────────────────────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <SpotlightCard className="bg-white rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors duration-300 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <span className="font-display font-semibold text-slate-900">{q}</span>
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-slate-500 text-sm leading-relaxed px-6 pb-6">{a}</p>
        </div>
      </div>
    </SpotlightCard>
  );
}

/* ────────────────────────────────────────────────────────────
   PAGE
   ──────────────────────────────────────────────────────────── */

export default function ServicesPage() {
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
      <section className="relative pt-28 pb-20 bg-slate-900 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/service.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-slate-900/65" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 60px)",
          }}
        />
        <div className="aurora-blob absolute top-20 right-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl" />
        <div className="aurora-blob-slow absolute bottom-10 left-10 w-48 h-48 bg-violet-500 rounded-full opacity-10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="hero-line inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium mb-6"
            style={{ animationDelay: "60ms" }}
          >
            What We Offer
          </span>
          <h1
            className="hero-line font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
            style={{ animationDelay: "160ms" }}
          >
            Services Built for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Real Business Growth
            </span>
          </h1>
          <p
            className="hero-line text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ animationDelay: "280ms" }}
          >
            We don't sell packages — we build solutions. Every service we offer
            is tailored to your goals, your audience, and your growth stage.
          </p>
        </div>
      </section>

      {/* ─── STATS STRIP ──────────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <Reveal key={s.l} delay={i * 100} dir={i % 2 === 0 ? "left" : "right"}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <s.icon size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-2xl text-slate-900">
                      <Counter value={s.v} suffix={s.s} />
                    </p>
                    <p className="text-slate-500 text-xs">{s.l}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────────── */}
      <section className="py-4 bg-white">
        {services.map((s, idx) => {
          const imageFromLeft = idx % 2 === 0; // image side alternates each section

          return (
            <div
              key={s.id}
              id={s.id}
              className={`py-20 ${idx % 2 === 1 ? "bg-slate-50" : "bg-white"} relative overflow-hidden`}
            >
              <div className={`absolute ${idx % 2 === 1 ? "top-0 right-0" : "bottom-0 left-0"} w-72 h-72 ${s.blobColor} rounded-full opacity-20 blur-3xl`} />
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                  {/* Image box — alternates left/right, slides in from that side */}
                  <Reveal
                    dir={imageFromLeft ? "left" : "right"}
                    className={imageFromLeft ? "lg:order-1" : "lg:order-2"}
                  >
                    <div className={`${s.lightBg} rounded-3xl p-4 border ${s.borderColor}`}>
                      <div className="img-zoom rounded-2xl overflow-hidden shadow-lg">
                        <img
                          src={s.image}
                          alt={s.alt}
                          className="w-full h-[28rem] object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </Reveal>

                  {/* Content beside the image — slides in from the opposite side */}
                  <Reveal
                    dir={imageFromLeft ? "right" : "left"}
                    delay={120}
                    className={imageFromLeft ? "lg:order-2" : "lg:order-1"}
                  >
                    <div className={`inline-flex items-center gap-2 ${s.lightBg} ${s.textColor} px-3 py-1.5 rounded-full text-xs font-semibold mb-4`}>
                      <s.icon size={14} />
                      {s.title}
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                      {s.title}
                    </h2>
                    <p className={`${s.textColor} font-medium mb-4`}>{s.tagline}</p>
                    <p className="text-slate-500 leading-relaxed mb-6">{s.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {s.subServices.map((sub) => (
                        <div
                          key={sub.label}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border ${s.borderColor} ${s.lightBg} hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300`}
                        >
                          <sub.icon size={16} className={s.textColor} />
                          <span className="text-slate-700 text-sm font-medium">{sub.label}</span>
                        </div>
                      ))}
                    </div>

                    <ul className="space-y-2.5 mb-7">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-3">
                          <CheckCircle2 size={16} className={`${s.textColor} flex-shrink-0`} />
                          <span className="text-slate-600 text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-4 mb-7">
                      <div className={`${s.lightBg} rounded-xl px-4 py-3`}>
                        <p className={`font-display font-bold text-xl ${s.textColor}`}>50+</p>
                        <p className="text-slate-500 text-xs mt-0.5">Projects done</p>
                      </div>
                      <div className={`${s.lightBg} rounded-xl px-4 py-3`}>
                        <p className={`font-display font-bold text-xl ${s.textColor}`}>100%</p>
                        <p className="text-slate-500 text-xs mt-0.5">Client satisfaction</p>
                      </div>
                    </div>

                    <Link
                      href="/Contact"
                      className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${s.gradient} text-white font-semibold rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300`}
                    >
                      Get a Quote <ArrowRight size={18} />
                    </Link>
                  </Reveal>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ─── PROCESS ──────────────────────────────────────────── */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="aurora-blob absolute top-10 left-1/4 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Reveal className="text-center mb-16">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
              How We Work
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">
              Our Process
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {process.map((p, i) => (
              <Reveal
                key={p.step}
                delay={i * 110}
                dir={i % 2 === 0 ? "left" : "right"}
                className="relative text-center"
              >
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-blue-600/40 to-transparent" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                    <span className="font-display font-bold text-blue-400 text-lg">{p.step}</span>
                  </div>
                  <h4 className="font-display font-bold text-white mb-2">{p.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
     

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="aurora-blob absolute top-10 right-10 w-72 h-72 bg-white rounded-full opacity-5 blur-3xl" />
        <Reveal>
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Tell us about your business and we'll recommend the right solution.
              No pressure, just a conversation.
            </p>
            <Link
              href="/Contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-300"
            >
              Talk to Us <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}



// import Link from "next/link";
// import {
//   Code2,
//   Megaphone,
//   Cpu,
//   Smartphone,
//   ArrowRight,
//   CheckCircle2,
//   Globe,
//   ShoppingCart,
//   BarChart3,
//   Search,
//   Share2,
//   Mail,
//   Bot,
//   Workflow,
//   Layers,
//   Target,
//   Zap,
//   Monitor,
// } from "lucide-react";

// const services = [
//   {
//     id: "web-dev",
//     icon: Code2,
//     title: "Web Development",
//     tagline: "Build for performance, designed for growth.",
//     description:
//       "We craft scalable, high-performance websites and web applications tailored to your business objectives. From corporate sites to complex web platforms, every project is built with clean code and modern architecture.",
//     subServices: [
//       { icon: Globe, label: "Corporate & Landing Pages" },
//       { icon: ShoppingCart, label: "E-Commerce Platforms" },
//       { icon: Layers, label: "CMS & WordPress" },
//       { icon: Monitor, label: "Web Applications" },
//     ],
//     features: [
//       "Responsive across all devices",
//       "SEO-optimized structure",
//       "Fast load times (Core Web Vitals)",
//       "Secure & scalable architecture",
//       "CRM & third-party integrations",
//       "Post-launch maintenance support",
//     ],
//     color: "blue",
//     gradient: "from-blue-600 to-blue-700",
//     lightBg: "bg-blue-50",
//     textColor: "text-blue-600",
//     borderColor: "border-blue-200",
//   },
//   {
//     id: "digital-marketing",
//     icon: Megaphone,
//     title: "Digital Marketing",
//     tagline: "Reach the right people. Drive real results.",
//     description:
//       "Our data-driven digital marketing strategies amplify your brand's online presence, generate quality leads, and deliver measurable ROI through performance-first campaigns.",
//     subServices: [
//       { icon: Search, label: "SEO Optimization" },
//       { icon: Share2, label: "Social Media Marketing" },
//       { icon: BarChart3, label: "PPC & Paid Ads" },
//       { icon: Mail, label: "Email Campaigns" },
//     ],
//     features: [
//       "Google & Meta ads management",
//       "Content marketing strategy",
//       "SEO audit & implementation",
//       "Social media management",
//       "Monthly performance reports",
//       "Lead generation funnels",
//     ],
//     color: "indigo",
//     gradient: "from-indigo-600 to-indigo-700",
//     lightBg: "bg-indigo-50",
//     textColor: "text-indigo-600",
//     borderColor: "border-indigo-200",
//   },
//   {
//     id: "generative-ai",
//     icon: Cpu,
//     title: "Generative AI & Automation",
//     tagline: "Work smarter with intelligent systems.",
//     description:
//       "We build AI-powered solutions and smart automation workflows that reduce manual work, streamline operations, and deliver intelligent digital experiences for modern businesses.",
//     subServices: [
//       { icon: Bot, label: "AI Chatbots & Assistants" },
//       { icon: Workflow, label: "n8n Workflow Automation" },
//       { icon: Target, label: "Lead Management Systems" },
//       { icon: Zap, label: "Process Automation Tools" },
//     ],
//     features: [
//       "Custom AI model integration",
//       "n8n & Zapier automation flows",
//       "Chatbot development",
//       "CRM & lead automation",
//       "Business process automation",
//       "Data pipeline & reporting",
//     ],
//     color: "violet",
//     gradient: "from-violet-600 to-violet-700",
//     lightBg: "bg-violet-50",
//     textColor: "text-violet-600",
//     borderColor: "border-violet-200",
//   },
//   {
//     id: "app-development",
//     icon: Smartphone,
//     title: "App Development",
//     tagline: "Mobile-first, built for every platform.",
//     description:
//       "We develop innovative mobile and hybrid applications that enhance customer engagement, align with your business objectives, and ensure compatibility across iOS and Android.",
//     subServices: [
//       { icon: Smartphone, label: "iOS & Android Apps" },
//       { icon: Layers, label: "Hybrid / Flutter Apps" },
//       { icon: Globe, label: "Progressive Web Apps" },
//       { icon: Monitor, label: "Cross-Platform Solutions" },
//     ],
//     features: [
//       "Native iOS & Android development",
//       "Flutter & React Native",
//       "App Store & Play Store publishing",
//       "Push notifications & analytics",
//       "Payment gateway integration",
//       "Ongoing updates & support",
//     ],
//     color: "cyan",
//     gradient: "from-cyan-600 to-cyan-700",
//     lightBg: "bg-cyan-50",
//     textColor: "text-cyan-600",
//     borderColor: "border-cyan-200",
//   },
// ];

// const process = [
//   { step: "01", title: "Discovery", desc: "We understand your goals, audience, and technical requirements before anything else." },
//   { step: "02", title: "Strategy", desc: "A clear roadmap with timelines, tech stack decisions, and measurable success metrics." },
//   { step: "03", title: "Build", desc: "Our team develops your solution iteratively, with regular updates and check-ins." },
//   { step: "04", title: "Launch", desc: "Thorough testing, deployment, and handover with documentation and training." },
//   { step: "05", title: "Grow", desc: "Ongoing support, optimization, and scaling as your business evolves." },
// ];

// export default function ServicesPage() {
//   return (
//     <>
//       {/* ─── HERO ─────────────────────────────────────────────── */}
//       <section className="relative pt-28 pb-20 bg-slate-900 overflow-hidden">

//         {/* ── Background Video ── */}
//         <video
//           className="absolute inset-0 w-full h-full object-cover"
//           src="/service.mp4"
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
//         <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl" />
//         <div className="absolute bottom-10 left-10 w-48 h-48 bg-violet-500 rounded-full opacity-10 blur-3xl" />

//         <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium mb-6">
//             What We Offer
//           </span>
//           <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
//             Services Built for
//             <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
//               Real Business Growth
//             </span>
//           </h1>
//           <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
//             We don't sell packages — we build solutions. Every service we offer
//             is tailored to your goals, your audience, and your growth stage.
//           </p>
//         </div>
//       </section>

//       {/* ─── SERVICES ─────────────────────────────────────────── */}
//       <section className="py-4 bg-white">
//         {services.map((s, idx) => (
//           <div
//             key={s.id}
//             id={s.id}
//             className={`py-20 ${idx % 2 === 1 ? "bg-slate-50" : "bg-white"}`}
//           >
//             <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div
//                 className={`grid lg:grid-cols-2 gap-16 items-center ${
//                   idx % 2 === 1 ? "lg:grid-flow-dense" : ""
//                 }`}
//               >
//                 {/* Text */}
//                 <div className={idx % 2 === 1 ? "lg:col-start-2" : ""}>
//                   <div className={`inline-flex items-center gap-2 ${s.lightBg} ${s.textColor} px-3 py-1.5 rounded-full text-xs font-semibold mb-4`}>
//                     <s.icon size={14} />
//                     {s.title}
//                   </div>
//                   <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
//                     {s.title}
//                   </h2>
//                   <p className={`${s.textColor} font-medium mb-4`}>{s.tagline}</p>
//                   <p className="text-slate-500 leading-relaxed mb-8">{s.description}</p>

//                   <div className="grid grid-cols-2 gap-3 mb-8">
//                     {s.subServices.map((sub) => (
//                       <div
//                         key={sub.label}
//                         className={`flex items-center gap-2.5 p-3 rounded-xl border ${s.borderColor} ${s.lightBg}`}
//                       >
//                         <sub.icon size={16} className={s.textColor} />
//                         <span className="text-slate-700 text-sm font-medium">{sub.label}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <Link
//                     href="/Contact"
//                     className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${s.gradient} text-white font-semibold rounded-xl hover:opacity-90 transition-opacity`}
//                   >
//                     Get a Quote <ArrowRight size={18} />
//                   </Link>
//                 </div>

//                 {/* Features card */}
//                 <div className={idx % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
//                   <div className={`bg-gradient-to-br ${s.gradient} rounded-3xl p-8 text-white`}>
//                     <h4 className="font-display font-bold text-lg mb-6 text-white/90">
//                       What's Included
//                     </h4>
//                     <ul className="space-y-3">
//                       {s.features.map((f) => (
//                         <li key={f} className="flex items-center gap-3">
//                           <CheckCircle2 size={17} className="text-white/60 flex-shrink-0" />
//                           <span className="text-white/90 text-sm">{f}</span>
//                         </li>
//                       ))}
//                     </ul>

//                     <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-2 gap-4">
//                       <div className="bg-white/10 rounded-xl p-4">
//                         <p className="font-display font-bold text-2xl">50+</p>
//                         <p className="text-white/60 text-xs mt-1">Projects done</p>
//                       </div>
//                       <div className="bg-white/10 rounded-xl p-4">
//                         <p className="font-display font-bold text-2xl">100%</p>
//                         <p className="text-white/60 text-xs mt-1">Client satisfaction</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* ─── PROCESS ──────────────────────────────────────────── */}
//       <section className="py-24 bg-slate-900 text-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
//               How We Work
//             </span>
//             <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">
//               Our Process
//             </h2>
//           </div>

//           <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-6">
//             {process.map((p, i) => (
//               <div key={p.step} className="relative text-center">
//                 {i < process.length - 1 && (
//                   <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-blue-600/40 to-transparent" />
//                 )}
//                 <div className="relative z-10">
//                   <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <span className="font-display font-bold text-blue-400 text-lg">{p.step}</span>
//                   </div>
//                   <h4 className="font-display font-bold text-white mb-2">{p.title}</h4>
//                   <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── CTA ─────────────────────────────────────────────── */}
//       <section className="py-20 bg-white">
//         <div className="max-w-3xl mx-auto px-4 text-center">
//           <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
//             Not Sure Which Service You Need?
//           </h2>
//           <p className="text-slate-500 mb-8">
//             Tell us about your business and we'll recommend the right solution.
//             No pressure, just a conversation.
//           </p>
//           <Link
//             href="/Contact"
//             className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
//           >
//             Talk to Us <ArrowRight size={18} />
//           </Link>
//         </div>
//       </section>
//     </>
//   );
// }