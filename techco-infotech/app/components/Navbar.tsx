"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/Services", label: "Services" },
  { href: "/Portfolio", label: "Portfolio" },
  { href: "/Contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm border-slate-100" : "bg-white border-transparent"
      }`}
    >
      {/* Hover line effect styles for nav links */}
      <style>{`
        .nav-link-lines {
          position: relative;
          padding-top: 6px;
          padding-bottom: 6px;
        }
        .nav-link-lines::before,
        .nav-link-lines::after {
          content: "";
          position: absolute;
          left: 50%;
          width: 0%;
          height: 2px;
          background: #2563eb;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 2px;
        }
        .nav-link-lines::before {
          top: 0;
        }
        .nav-link-lines::after {
          bottom: 0;
        }
        .nav-link-lines:hover::before,
        .nav-link-lines:hover::after {
          width: 70%;
          left: 15%;
        }
        .nav-link-lines.active::before,
        .nav-link-lines.active::after {
          width: 70%;
          left: 15%;
        }
      `}</style>

      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.png"
              alt="Techco Infotech Logo"
              width={400}
              height={100}
              style={{ height: "55px", width: "auto" }}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link-lines px-4 py-2 text-base font-semibold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-blue-50/60 transition-all"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/Contact"
              className="ml-3 px-5 py-2.5 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-blue-600"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-blue-50 py-3 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-base font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 px-4">
              <Link
                href="/Contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-5 py-2.5 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}


// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu, X } from "lucide-react";

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
//   { href: "/Services", label: "Services" },
//   { href: "/Portfolio", label: "Portfolio" },
//   { href: "/Contact", label: "Contact" },
// ];

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"
//       }`}
//     >
//       {/* Wavy divider instead of a straight border line */}
//       <svg
//         className="absolute top-full left-0 w-full text-white"
//         viewBox="0 0 1440 30"
//         preserveAspectRatio="none"
//         style={{ height: "22px" }}
//       >
//         <path
//           d="M0,15 C180,30 360,0 540,12 C720,24 900,30 1080,10 C1260,-4 1350,4 1440,10 L1440,0 L0,0 Z"
//           fill="currentColor"
//         />
//         <path
//           d="M0,15 C180,30 360,0 540,12 C720,24 900,30 1080,10 C1260,-4 1350,4 1440,10"
//           fill="none"
//           stroke="#dbeafe"
//           strokeWidth="2"
//         />
//       </svg>
//       {/* Hover line effect styles for nav links */}
//       <style>{`
//         .nav-link-lines {
//           position: relative;
//           padding-top: 6px;
//           padding-bottom: 6px;
//         }
//         .nav-link-lines::before,
//         .nav-link-lines::after {
//           content: "";
//           position: absolute;
//           left: 50%;
//           width: 0%;
//           height: 2px;
//           background: #2563eb;
//           transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
//           border-radius: 2px;
//         }
//         .nav-link-lines::before {
//           top: 0;
//         }
//         .nav-link-lines::after {
//           bottom: 0;
//         }
//         .nav-link-lines:hover::before,
//         .nav-link-lines:hover::after {
//           width: 70%;
//           left: 15%;
//         }
//         .nav-link-lines.active::before,
//         .nav-link-lines.active::after {
//           width: 70%;
//           left: 15%;
//         }
//       `}</style>

//       <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Navbar height badhayi - h-20 → h-24 */}
//         <div className="flex items-center justify-between h-18">
//           {/* Logo aur bada */}
//           <Link href="/" className="flex items-center group">
//             <Image
//               src="/logo.png"
//               alt="Techco Infotech Logo"
//               width={400}
//               height={100}
//               style={{ height: "55px", width: "auto" }}
//               className="object-contain"
//               priority
//             />
//           </Link>

//           {/* Desktop links */}
//           <div className="hidden md:flex items-center gap-2">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="nav-link-lines px-4 py-2 text-base font-semibold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-blue-50/60 transition-all"
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <Link
//               href="/Contact"
//               className="ml-3 px-5 py-2.5 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
//             >
//               Get Started
//             </Link>
//           </div>

//           {/* Mobile toggle */}
//           <button
//             className="md:hidden p-2 text-slate-600 hover:text-blue-600"
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label="Toggle menu"
//           >
//             {isOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>

//         {/* Mobile menu */}
//         {isOpen && (
//           <div className="md:hidden border-t border-blue-50 py-3 pb-4 space-y-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 onClick={() => setIsOpen(false)}
//                 className="block px-4 py-3 text-base font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <div className="pt-2 px-4">
//               <Link
//                 href="/Contact"
//                 onClick={() => setIsOpen(false)}
//                 className="block w-full text-center px-5 py-2.5 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Get Started
//               </Link>
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu, X } from "lucide-react";

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
//   { href: "/Services", label: "Services" },
//   { href: "/Portfolio", label: "Portfolio" },
//   { href: "/Contact", label: "Contact" },
// ];

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled
//           ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-blue-50"
//           : "bg-white"
//       }`}
//     >
//       <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//  {/* Navbar height badhayi - h-20 → h-24 */}
// <div className="flex items-center justify-between h-18">

//   {/* Logo aur bada */}
//   <Link href="/" className="flex items-center group">
//     <Image
//       src="/logo.png"
//       alt="Techco Infotech Logo"
//       width={400}
//       height={100}
//       style={{ height: "55px", width: "auto" }}
//       className="object-contain"
//       priority
//     />
//   </Link>

//           {/* Desktop links */}
//           <div className="hidden md:flex items-center gap-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all"
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <Link
//               href="/Contact"
//               className="ml-3 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
//             >
//               Get Started
//             </Link>
//           </div>

//           {/* Mobile toggle */}
//           <button
//             className="md:hidden p-2 text-slate-600 hover:text-blue-600"
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label="Toggle menu"
//           >
//             {isOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>

//         {/* Mobile menu */}
//         {isOpen && (
//           <div className="md:hidden border-t border-blue-50 py-3 pb-4 space-y-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 onClick={() => setIsOpen(false)}
//                 className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <div className="pt-2 px-4">
//               <Link
//                 href="/Contact"
//                 onClick={() => setIsOpen(false)}
//                 className="block w-full text-center px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Get Started
//               </Link>
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }