"use client";

import { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Send,
  CheckCircle2,
  Clock,
  MessageSquare,
} from "lucide-react";

import { FaFacebook, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

const services = [
  "Web Development",
  "Digital Marketing",
  "Generative AI & Automation",
  "App Development",
  "Consulting",
  "Other",
];

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most websites take 2–4 weeks. Complex web apps or mobile apps can take 6–12 weeks depending on scope.",
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "Absolutely. We work with businesses of all sizes — from early-stage startups to established enterprises.",
  },
  {
    q: "What information should I share when contacting you?",
    a: "A brief about your business, what you're looking to build, your timeline, and any budget range you have in mind.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes. We offer ongoing maintenance, updates, and support packages for all our solutions.",
  },
];

/* WhatsApp number the contact form should message on submit */
const WHATSAPP_NUMBER = "918770752740"; // +91 877 075 2740 (country code, no + or spaces)

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build a formatted WhatsApp message from the form fields
    const lines = [
      "New enquiry from website contact form:",
      "",
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.phone ? `Phone: ${formData.phone}` : null,
      formData.service ? `Service: ${formData.service}` : null,
      "",
      `Message: ${formData.message}`,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    // Open WhatsApp with the pre-filled message
    window.open(whatsappUrl, "_blank");

    setSubmitted(true);
  };

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 bg-slate-900 overflow-hidden">

        {/* ── Background Image ── */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/contact.jpg')" }}
        />

        {/* ── Dark overlay ── */}
        <div className="absolute inset-0 bg-slate-900/65" />

        {/* ── Grid pattern ── */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 60px)",
          }}
        />

        {/* ── Glow blob ── */}
        <div className="absolute top-16 right-16 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium mb-6">
            <MessageSquare size={12} />
            Get in Touch
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Let's Build Something
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Great Together
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto leading-relaxed">
            Tell us about your project. We'll respond within 24 hours with a
            tailored plan — no jargon, no pressure.
          </p>
        </div>
      </section>

      {/* ─── CONTACT MAIN ─────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-12">
          {/* Left – Info (shows AFTER the form on mobile, first on desktop) */}
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-display font-bold text-slate-900 text-lg mb-5">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5 font-medium">Office</p>
                    <p className="text-slate-700 text-sm">
                      408A, 4th Floor, Shri Verdhan Complex,
                      <br />
                      RNT Marg, Indore, MP – 452001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5 font-medium">Email</p>
                    <a
                      href="mailto:TechcoInfotech@gmail.com"
                      className="text-slate-700 text-sm hover:text-blue-600 transition-colors"
                    >
                      TechcoInfotech@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5 font-medium">Phone</p>
                    <a
                      href="tel:+918770752740"
                      className="text-slate-700 text-sm hover:text-blue-600 transition-colors"
                    >
                      +91 877 075 2740
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5 font-medium">WhatsApp</p>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 text-sm hover:text-green-600 transition-colors"
                    >
                      +91 877 075 2740
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-xs text-slate-400 font-medium mb-3">Follow Us</p>
                <div className="flex gap-2">
                  {[
                    {
                      icon: FaFacebook,
                      href: "https://www.facebook.com/profile.php?id=61569684563878",
                      label: "Facebook",
                    },
                    {
                      icon: FaLinkedin,
                      href: "https://www.linkedin.com/company/techcoinfotech/",
                      label: "LinkedIn",
                    },
                    {
                      icon: FaInstagram,
                      href: "https://www.instagram.com/techcoinfotech/",
                      label: "Instagram",
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-9 h-9 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-500 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <s.icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
                  <Clock size={16} />
                </div>
                <h4 className="font-display font-bold">Quick Response</h4>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                We respond to every inquiry within <strong className="text-white">24 hours</strong>.
                For urgent requirements, mention it in your message and we'll
                prioritize accordingly.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <iframe
                title="Techco Infotech Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.063!2d75.8684!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQzJzEwLjYiTiA3NcKwNTInMDYuMiJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-4">
                <p className="text-slate-700 text-sm font-medium">Shri Verdhan Complex</p>
                <p className="text-slate-400 text-xs">RNT Marg, Indore, Madhya Pradesh</p>
              </div>
            </div>
          </div>

          {/* Right – Form (shows FIRST on mobile) */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              {!submitted ? (
                <>
                  <h3 className="font-display font-bold text-slate-900 text-xl mb-2">
                    Send Us a Message
                  </h3>
                  <p className="text-slate-500 text-sm mb-8">
                    Fill in the details below — it'll open WhatsApp with your message
                    ready to send to our team.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Name"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Service Interested In
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                        >
                          <option value="">Select a service</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Tell Us About Your Project <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your project, goals, and any specific requirements you have in mind..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
                    >
                      Send via WhatsApp <FaWhatsapp size={18} />
                    </button>

                    <p className="text-slate-400 text-xs text-center">
                      This will open WhatsApp with your message pre-filled to send to our team.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-2xl mb-3">
                    Almost Done!
                  </h3>
                  <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                    We've opened WhatsApp with your message ready to go — just hit
                    send there and our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
                    }}
                    className="mt-6 text-blue-600 text-sm font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              FAQ
            </span>
            <h2 className="font-display text-3xl font-bold text-slate-900 mt-2">
              Common Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-medium text-slate-800 text-sm pr-4">{faq.q}</span>
                  <ArrowRight
                    size={16}
                    className={`text-slate-400 flex-shrink-0 transition-transform ${
                      openFaq === i ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 border-t border-slate-100">
                    <p className="text-slate-500 text-sm leading-relaxed pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ───────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-xl mb-1">
              Prefer to reach us directly?
            </h3>
            <p className="text-blue-100 text-sm">
              Message us on WhatsApp and we'll reply within 24 hours.
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
          >
            <FaWhatsapp size={17} />
            +91 877 075 2740
          </a>
        </div>
      </section>
    </>
  );
}


// "use client";

// import { useState } from "react";
// import {
//   MapPin,
//   Mail,
//   Phone,
//   ArrowRight,
//   Send,
//   CheckCircle2,
//   Clock,
//   MessageSquare,
// } from "lucide-react";

// import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

// const services = [
//   "Web Development",
//   "Digital Marketing",
//   "Generative AI & Automation",
//   "App Development",
//   "Consulting",
//   "Other",
// ];

// const faqs = [
//   {
//     q: "How long does a typical project take?",
//     a: "Most websites take 2–4 weeks. Complex web apps or mobile apps can take 6–12 weeks depending on scope.",
//   },
//   {
//     q: "Do you work with startups and small businesses?",
//     a: "Absolutely. We work with businesses of all sizes — from early-stage startups to established enterprises.",
//   },
//   {
//     q: "What information should I share when contacting you?",
//     a: "A brief about your business, what you're looking to build, your timeline, and any budget range you have in mind.",
//   },
//   {
//     q: "Do you provide post-launch support?",
//     a: "Yes. We offer ongoing maintenance, updates, and support packages for all our solutions.",
//   },
// ];

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     service: "",
//     message: "",
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [openFaq, setOpenFaq] = useState<number | null>(null);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   return (
//     <>
//       {/* ─── HERO ─────────────────────────────────────────────── */}
//       <section className="relative pt-28 pb-20 bg-slate-900 overflow-hidden">

//         {/* ── Background Image ── */}
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{ backgroundImage: "url('/contact.jpg')" }}
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

//         {/* ── Glow blob ── */}
//         <div className="absolute top-16 right-16 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl" />

//         <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium mb-6">
//             <MessageSquare size={12} />
//             Get in Touch
//           </span>
//           <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
//             Let's Build Something
//             <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
//               Great Together
//             </span>
//           </h1>
//           <p className="text-slate-300 text-lg max-w-xl mx-auto leading-relaxed">
//             Tell us about your project. We'll respond within 24 hours with a
//             tailored plan — no jargon, no pressure.
//           </p>
//         </div>
//       </section>

//       {/* ─── CONTACT MAIN ─────────────────────────────────────── */}
//       <section className="py-20 bg-slate-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-12">
//           {/* Left – Info */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
//               <h3 className="font-display font-bold text-slate-900 text-lg mb-5">
//                 Contact Information
//               </h3>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3">
//                   <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <MapPin size={16} className="text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-400 mb-0.5 font-medium">Office</p>
//                     <p className="text-slate-700 text-sm">
//                       408A, 4th Floor, Shri Verdhan Complex,
//                       <br />
//                       RNT Marg, Indore, MP – 452001
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <Mail size={16} className="text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-400 mb-0.5 font-medium">Email</p>
//                     <a
//                       href="mailto:TechcoInfotech@gmail.com"
//                       className="text-slate-700 text-sm hover:text-blue-600 transition-colors"
//                     >
//                       TechcoInfotech@gmail.com
//                     </a>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <Phone size={16} className="text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-400 mb-0.5 font-medium">Phone</p>
//                     <p className="text-slate-700 text-sm">Available on request</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6 pt-5 border-t border-slate-100">
//                 <p className="text-xs text-slate-400 font-medium mb-3">Follow Us</p>
//                 <div className="flex gap-2">
//                   {[
//                     {
//                       icon: FaFacebook,
//                       href: "https://www.facebook.com/profile.php?id=61569684563878",
//                       label: "Facebook",
//                     },
//                     {
//                       icon: FaLinkedin,
//                       href: "https://www.linkedin.com/company/techcoinfotech/",
//                       label: "LinkedIn",
//                     },
//                     {
//                       icon: FaInstagram,
//                       href: "https://www.instagram.com/techcoinfotech/",
//                       label: "Instagram",
//                     },
//                   ].map((s) => (
//                     <a
//                       key={s.label}
//                       href={s.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       aria-label={s.label}
//                       className="w-9 h-9 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-500 rounded-lg flex items-center justify-center transition-colors"
//                     >
//                       <s.icon size={15} />
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="bg-blue-600 rounded-2xl p-6 text-white">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
//                   <Clock size={16} />
//                 </div>
//                 <h4 className="font-display font-bold">Quick Response</h4>
//               </div>
//               <p className="text-blue-100 text-sm leading-relaxed">
//                 We respond to every inquiry within <strong className="text-white">24 hours</strong>.
//                 For urgent requirements, mention it in your message and we'll
//                 prioritize accordingly.
//               </p>
//             </div>

//             <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
//               <iframe
//                 title="Techco Infotech Office Location"
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.063!2d75.8684!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQzJzEwLjYiTiA3NcKwNTInMDYuMiJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
//                 width="100%"
//                 height="200"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//               />
//               <div className="p-4">
//                 <p className="text-slate-700 text-sm font-medium">Shri Verdhan Complex</p>
//                 <p className="text-slate-400 text-xs">RNT Marg, Indore, Madhya Pradesh</p>
//               </div>
//             </div>
//           </div>

//           {/* Right – Form */}
//           <div className="lg:col-span-3">
//             <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
//               {!submitted ? (
//                 <>
//                   <h3 className="font-display font-bold text-slate-900 text-xl mb-2">
//                     Send Us a Message
//                   </h3>
//                   <p className="text-slate-500 text-sm mb-8">
//                     Fill in the details below and we'll get back to you shortly.
//                   </p>

//                   <form onSubmit={handleSubmit} className="space-y-5">
//                     <div className="grid sm:grid-cols-2 gap-5">
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-1.5">
//                           Full Name <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           name="name"
//                           required
//                           value={formData.name}
//                           onChange={handleChange}
//                           placeholder="Raunak Jashnani"
//                           className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-1.5">
//                           Email Address <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="email"
//                           name="email"
//                           required
//                           value={formData.email}
//                           onChange={handleChange}
//                           placeholder="you@company.com"
//                           className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid sm:grid-cols-2 gap-5">
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-1.5">
//                           Phone Number
//                         </label>
//                         <input
//                           type="tel"
//                           name="phone"
//                           value={formData.phone}
//                           onChange={handleChange}
//                           placeholder="+91 98765 43210"
//                           className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-1.5">
//                           Service Interested In
//                         </label>
//                         <select
//                           name="service"
//                           value={formData.service}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
//                         >
//                           <option value="">Select a service</option>
//                           {services.map((s) => (
//                             <option key={s} value={s}>{s}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-1.5">
//                         Tell Us About Your Project <span className="text-red-500">*</span>
//                       </label>
//                       <textarea
//                         name="message"
//                         required
//                         rows={5}
//                         value={formData.message}
//                         onChange={handleChange}
//                         placeholder="Describe your project, goals, and any specific requirements you have in mind..."
//                         className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
//                       />
//                     </div>

//                     <button
//                       type="submit"
//                       className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
//                     >
//                       Send Message <Send size={17} />
//                     </button>

//                     <p className="text-slate-400 text-xs text-center">
//                       By submitting, you agree to our Privacy Policy. We'll never spam you.
//                     </p>
//                   </form>
//                 </>
//               ) : (
//                 <div className="text-center py-16">
//                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
//                     <CheckCircle2 size={32} className="text-green-600" />
//                   </div>
//                   <h3 className="font-display font-bold text-slate-900 text-2xl mb-3">
//                     Message Received!
//                   </h3>
//                   <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
//                     Thanks for reaching out. Our team will review your requirements
//                     and get back to you within 24 hours.
//                   </p>
//                   <button
//                     onClick={() => {
//                       setSubmitted(false);
//                       setFormData({ name: "", email: "", phone: "", service: "", message: "" });
//                     }}
//                     className="mt-6 text-blue-600 text-sm font-medium hover:underline"
//                   >
//                     Send another message
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── FAQ ──────────────────────────────────────────────── */}
//       <section className="py-20 bg-white">
//         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
//               FAQ
//             </span>
//             <h2 className="font-display text-3xl font-bold text-slate-900 mt-2">
//               Common Questions
//             </h2>
//           </div>

//           <div className="space-y-3">
//             {faqs.map((faq, i) => (
//               <div
//                 key={i}
//                 className="border border-slate-200 rounded-2xl overflow-hidden"
//               >
//                 <button
//                   onClick={() => setOpenFaq(openFaq === i ? null : i)}
//                   className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
//                 >
//                   <span className="font-medium text-slate-800 text-sm pr-4">{faq.q}</span>
//                   <ArrowRight
//                     size={16}
//                     className={`text-slate-400 flex-shrink-0 transition-transform ${
//                       openFaq === i ? "rotate-90" : ""
//                     }`}
//                   />
//                 </button>
//                 {openFaq === i && (
//                   <div className="px-6 pb-5 border-t border-slate-100">
//                     <p className="text-slate-500 text-sm leading-relaxed pt-4">{faq.a}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── BOTTOM CTA ───────────────────────────────────────── */}
//       <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
//         <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
//           <div>
//             <h3 className="font-display font-bold text-xl mb-1">
//               Prefer to reach us directly?
//             </h3>
//             <p className="text-blue-100 text-sm">
//               Drop us an email and we'll reply within 24 hours.
//             </p>
//           </div>
//           <a
//             href="mailto:TechcoInfotech@gmail.com"
//             className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
//           >
//             <Mail size={17} />
//             TechcoInfotech@gmail.com
//           </a>
//         </div>
//       </section>
//     </>
//   );
// }
