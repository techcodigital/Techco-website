import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const footerLinks = {
  Pages: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/Services" },
    { label: "Contact", href: "/Contact" },
  ],

  Services: [
    { label: "Web Development", href: "/Services" },
    { label: "Digital Marketing", href: "/Services" },
    { label: "App Development", href: "/Services" },
    { label: "Generative AI", href: "/Services" },
  ],
};
const socials = [
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
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logos.png"
                alt="Techco Infotech Logo"
                width={150}
                height={65}
                className=" object-contain"
              />
              {/* <span className="font-display font-bold text-white text-lg">
                Techco<span className="text-blue-400"> Infotech</span>
              </span> */}
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              A full-service IT & Digital Growth Partner delivering web development,
              digital marketing, and AI-driven automation for businesses of all sizes.
            </p>

            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-slate-400 text-sm">
                  408A, 4th Floor, Shri Verdhan Complex, RNT Marg, Indore, MP 452001
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-blue-400 flex-shrink-0" />
                
                  <a href="mailto:TechcoInfotech@gmail.com"
                  className="text-slate-400 text-sm hover:text-blue-400 transition-colors"
                >
                  TechcoInfotech@gmail.com
                </a>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {socials.map((s) => (
                
                  <a key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 text-sm hover:text-blue-400 transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © 2025 Techco Infotech. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms", "Careers"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-slate-500 text-xs hover:text-slate-300 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}



// import Link from "next/link";
// import { Mail, MapPin, ArrowUpRight } from "lucide-react";
// import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

// const footerLinks = {
//   Pages: [
//     { label: "Home", href: "/" },
//     { label: "About Us", href: "/about" },
//     { label: "Services", href: "/Services" },
//     { label: "Contact", href: "/Contact" },
//   ],

//   Services: [
//     { label: "Web Development", href: "/Services" },
//     { label: "Digital Marketing", href: "/Services" },
//     { label: "App Development", href: "/Services" },
//     { label: "Generative AI", href: "/Services" },
//   ],
// };
// const socials = [
//   {
//     icon: FaFacebook,
//     href: "https://www.facebook.com/profile.php?id=61569684563878",
//     label: "Facebook",
//   },
//   {
//     icon: FaLinkedin,
//     href: "https://www.linkedin.com/company/techcoinfotech/",
//     label: "LinkedIn",
//   },
//   {
//     icon: FaInstagram,
//     href: "https://www.instagram.com/techcoinfotech/",
//     label: "Instagram",
//   },
// ];

// export default function Footer() {
//   return (
//     <footer className="bg-slate-900 text-white">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
//           {/* Brand */}
//           <div className="lg:col-span-2">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-sm font-display">T</span>
//               </div>
//               <span className="font-display font-bold text-white text-lg">
//                 Techco<span className="text-blue-400"> Infotech</span>
//               </span>
//             </div>
//             <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
//               A full-service IT & Digital Growth Partner delivering web development,
//               digital marketing, and AI-driven automation for businesses of all sizes.
//             </p>

//             <div className="space-y-2.5">
//               <div className="flex items-start gap-3">
//                 <MapPin size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
//                 <p className="text-slate-400 text-sm">
//                   408A, 4th Floor, Shri Verdhan Complex, RNT Marg, Indore, MP 452001
//                 </p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Mail size={16} className="text-blue-400 flex-shrink-0" />
//                 <a
//                   href="mailto:TechcoInfotech@gmail.com"
//                   className="text-slate-400 text-sm hover:text-blue-400 transition-colors"
//                 >
//                   TechcoInfotech@gmail.com
//                 </a>
//               </div>
//             </div>

//             <div className="flex gap-3 mt-6">
//               {socials.map((s) => (
//                 <a
//                   key={s.label}
//                   href={s.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={s.label}
//                   className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
//                 >
//                   <s.icon size={16} />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Link columns */}
//           {Object.entries(footerLinks).map(([section, links]) => (
//             <div key={section}>
//               <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
//                 {section}
//               </h4>
//               <ul className="space-y-2.5">
//                 {links.map((link) => (
//                   <li key={link.label}>
//                     <Link
//                       href={link.href}
//                       className="text-slate-400 text-sm hover:text-blue-400 transition-colors flex items-center gap-1 group"
//                     >
//                       {link.label}
//                       <ArrowUpRight
//                         size={12}
//                         className="opacity-0 group-hover:opacity-100 transition-opacity"
//                       />
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <p className="text-slate-500 text-xs">
//             © 2025 Techco Infotech. All rights reserved.
//           </p>
//           <div className="flex gap-4">
//             {["Privacy Policy", "Terms", "Careers"].map((item) => (
//               <Link
//                 key={item}
//                 href="#"
//                 className="text-slate-500 text-xs hover:text-slate-300 transition-colors"
//               >
//                 {item}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }