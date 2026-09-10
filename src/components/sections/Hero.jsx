
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../../assets/images/img18.jpg";

const stats = [
  { value: "45+", label: "Years in Business" },
  { value: "350+", label: "Projects Delivered" },
  { value: "7", label: "U.A.E. Emirates Served" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#070707]">
      {/* Background */}
      <motion.img
        src={heroImage}
        alt="OK Decoration — Luxury Interior Fit-Out"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "easeOut" }}
      />

      {/* Bottom fade — where stats/CTAs sit, needs the most contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      {/* Top fade — light touch, just enough for the headline to stay readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-transparent" />

      {/* Content — anchored to the bottom, not centered */}
      <div className="relative z-10 flex h-full w-full flex-col justify-end ">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-14 sm:px-10 lg:px-16 lg:pb-20">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.15}
            className="font-serif max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]"
          >
            Four Decades of 
            <br />
            <span className="text-[#C8A96A]"> Legacy &amp; Precision.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="mt-6 max-w-xl font-sans text-sm font-light leading-relaxed text-neutral-300 sm:text-base lg:text-lg"
          >
            Since 1978, we create timeless interiors where refined design meets
            precision, craftsmanship, and lasting quality.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.45} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/projects"
              className="rounded-md bg-[#C8A96A] px-7 py-3.5 font-sans text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D8BE81]"
            >
              Explore Projects
            </Link>
            <Link
              to="/contact"
              className="rounded-md border border-white/25 px-7 py-3.5 font-sans text-sm font-semibold text-white transition-all duration-300 hover:border-[#C8A96A] hover:text-[#C8A96A]"
            >
              Get Free Consultation
            </Link>
          </motion.div>

          {/* Stats + trust roster */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.6}
            className="mt-14 flex flex-col gap-8 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex flex-wrap gap-10 sm:gap-14">
              {stats.map((s) => (
                <div key={s.label}>
                  <h2 className="font-serif text-2xl font-medium text-white sm:text-3xl">{s.value}</h2>
                  <p className="mt-1 font-sans text-[11px] uppercase tracking-wider text-neutral-400 sm:text-xs">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1.5 lg:items-end">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C8A96A]/80">
                Trusted By
              </span>
              <span className="font-sans text-sm text-neutral-300">
                Emaar · Sobha · Cartier · DMCC
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa";

// import heroImage from "../../assets/images/img18.jpg";

// /* =========================================================
//    HERO STATS
// ========================================================= */

// const stats = [
//   {
//     value: "45+",
//     label: "Years in Business",
//   },
//   {
//     value: "350+",
//     label: "Projects Delivered",
//   },
//   {
//     value: "7",
//     label: "U.A.E. Emirates Served",
//   },
// ];

// /* =========================================================
//    REVEAL ANIMATION
// ========================================================= */

// const reveal = {
//   hidden: {
//     opacity: 0,
//     y: 6,
//   },

//   show: (delay = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 1.1,
//       delay,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   }),
// };

// /* =========================================================
//    HERO
// ========================================================= */

// function Hero() {
//   return (
//     <section className="relative min-h-screen w-full overflow-hidden bg-[#070707]">

//       {/* =====================================================
//           BACKGROUND IMAGE
//       ===================================================== */}

//       <div className="absolute inset-0 overflow-hidden">

//         <motion.img
//           src={heroImage}
//           alt="Luxury interior by OK Decoration"
//           className="
//             absolute
//             inset-0
//             h-full
//             w-full
//             object-cover
//             object-center
//             select-none
//           "
//           initial={{
//             scale: 1.035,
//           }}
//           animate={{
//             scale: 1.065,
//           }}
//           transition={{
//             duration: 22,
//             ease: "easeInOut",
//             repeat: Infinity,
//             repeatType: "reverse",
//           }}
//         />

      

      

       

//         {/* =================================================
//             BOTTOM GRADIENT

//             Gives stats a clean foundation.
//         ================================================= */}

//         <div
//           className="
//             absolute
//             inset-x-0
//             bottom-0
//             h-[48%]
//             bg-gradient-to-t
//             from-[#070707]
//             via-[#070707]/70
//             to-transparent
//           "
//         />

//         {/* =================================================
//             TOP GRADIENT

//             Protects the navbar without darkening the whole image.
//         ================================================= */}

//         <div
//           className="
//             absolute
//             inset-x-0
//             top-0
//             h-44
//             bg-gradient-to-b
//             from-[#070707]/75
//             via-[#070707]/25
//             to-transparent
//           "
//         />

//         {/* =================================================
//             SUBTLE VIGNETTE
//         ================================================= */}

//         <div
//           className="
//             absolute
//             inset-0
//             bg-[radial-gradient(circle_at_70%_38%,transparent_0%,transparent_42%,rgba(0,0,0,0.32)_100%)]
//           "
//         />

//         {/* =================================================
//             VERY SUBTLE WARM TONE
//         ================================================= */}

//         <div className="absolute inset-0 bg-[#C8A96A]/[0.01] mix-blend-overlay" />
//       </div>

//       {/* =====================================================
//           HERO CONTENT
//       ===================================================== */}

//       <div
//         className="
//           relative
//           z-20
//           mx-auto
//           flex
//           min-h-screen
//           max-w-[1600px]
//           flex-col
//           justify-end
//           px-6
//           pb-7
//           pt-40
//           sm:px-8
//           sm:pb-9
//           md:px-12
//           lg:px-16
//           lg:pb-10
//           xl:px-20
//         "
//       >

//         {/* ===================================================
//             TOP EDITORIAL LABEL

//             IMPORTANT:
//             Positioned well below the navbar.
//         =================================================== */}

//         <motion.div
//           variants={reveal}
//           initial="hidden"
//           animate="show"
//           custom={0.1}
//           className="
//             absolute
//             left-6
//             top-40
//             hidden
//             items-center
//             gap-3
//             sm:flex
//             md:left-12
//             lg:left-16
//             xl:left-20
//           "
//         >
//           <span className="h-px w-9 bg-[#C8A96A]" />

          
//         </motion.div>

//         {/* ===================================================
//             MAIN CONTENT
//         =================================================== */}

//         <div className="w-full">

//           {/* =================================================
//               EDITORIAL CONTENT
//           ================================================= */}

//           <div className="max-w-[850px]">

//             {/* Mobile label */}

//             <motion.div
//               variants={reveal}
//               initial="hidden"
//               animate="show"
//               custom={0.1}
//               className="
//                 mb-5
//                 flex
//                 items-center
//                 gap-3
//                 sm:hidden
//               "
//             >
//               <span className="h-px w-7 bg-[#C8A96A]" />

            
//             </motion.div>

//             {/* =================================================
//                 HEADLINE
//             ================================================= */}

//             <motion.h1
//               variants={reveal}
//               initial="hidden"
//               animate="show"
//               custom={0.22}
//               className="
//                 font-serif
//                 max-w-[820px]
//                 text-[46px]
//                 font-normal
//                 leading-[0.98]
//                 tracking-[-0.025em]
//                 text-white
//                 sm:text-[58px]
//                 md:text-[68px]
//                 lg:text-[76px]
//                 xl:text-[82px]
//               "
//             >
//               Four Decades of

//               <span
//                 className="
//                   block
//                   font-serif
//                   font-light
//                   italic
//                   text-transparent
//                   bg-clip-text
//                   bg-gradient-to-r
//                   from-[#F7EED7]
//                   via-[#D8BE81]
//                   to-[#A88746]
//                 "
//               >
//                 Legacy &amp; Precision.
//               </span>
//             </motion.h1>

//             {/* =================================================
//                 DESCRIPTION
//             ================================================= */}

//             <motion.p
//               variants={reveal}
//               initial="hidden"
//               animate="show"
//               custom={0.38}
//               className="
//                 mt-6
//                 max-w-[600px]
//                 text-[13px]
//                 font-light
//                 leading-[1.85]
//                 text-neutral-300
//                 sm:text-sm
//                 md:text-[15px]
//               "
//             >
//               Since 1978, OK Decoration has transformed complex
//               visions into reality across the U.A.E. — delivering
//               refined interiors for residential estates, corporate
//               spaces, and world-class hospitality.
//             </motion.p>

//             {/* =================================================
//                 CTA BUTTONS
//             ================================================= */}

//             <motion.div
//               variants={reveal}
//               initial="hidden"
//               animate="show"
//               custom={0.52}
//               className="
//                 mt-8
//                 flex
//                 flex-wrap
//                 items-center
//                 gap-3
//                 sm:mt-9
//                 sm:gap-4
//               "
//             >

//               {/* Primary CTA */}

//               <Link
//                 to="/projects"
//                 className="
//                   group
//                   inline-flex
//                   items-center
//                   gap-4
//                   rounded-sm
//                   bg-[#C8A96A]
//                   px-7
//                   py-3.5
//                   text-[9px]
//                   font-semibold
//                   uppercase
//                   tracking-[0.25em]
//                   text-[#080808]
//                   shadow-[0_12px_30px_rgba(0,0,0,0.3)]
//                   transition-all
//                   duration-500
//                   hover:-translate-y-0.5
//                   hover:bg-[#D8BE81]
//                   hover:shadow-[0_15px_35px_rgba(200,169,106,0.2)]
//                   sm:px-8
//                   sm:py-4
//                 "
//               >
//                 <span>
//                   Explore Projects
//                 </span>

//                 <FaArrowRight
//                   className="
//                     text-[10px]
//                     transition-transform
//                     duration-300
//                     group-hover:translate-x-1
//                   "
//                 />
//               </Link>

//               {/* Secondary CTA */}

//               <Link
//                 to="/contact"
//                 className="
//                   group
//                   inline-flex
//                   items-center
//                   gap-3
//                   rounded-sm
//                   border
//                   border-white/20
//                   bg-black/20
//                   px-7
//                   py-3.5
//                   text-[9px]
//                   font-medium
//                   uppercase
//                   tracking-[0.25em]
//                   text-white
//                   backdrop-blur-md
//                   transition-all
//                   duration-500
//                   hover:border-[#C8A96A]/70
//                   hover:bg-white/[0.04]
//                   hover:text-[#D8BE81]
//                   sm:px-8
//                   sm:py-4
//                 "
//               >
//                 <span>
//                   Get Free Consultation
//                 </span>
//               </Link>

//             </motion.div>
//           </div>

//           {/* =================================================
//               BOTTOM INFORMATION BAR
//           ================================================= */}

//           <motion.div
//             variants={reveal}
//             initial="hidden"
//             animate="show"
//             custom={0.72}
//             className="
//               mt-10
//               border-t
//               border-white/[0.12]
//               pt-6
//               sm:mt-12
//               sm:pt-7
//             "
//           >

//             <div
//               className="
//                 flex
//                 flex-col
//                 gap-7
//                 lg:flex-row
//                 lg:items-end
//                 lg:justify-between
//               "
//             >

//               {/* =================================================
//                   STATS
//               ================================================= */}

//               <div
//                 className="
//                   flex
//                   flex-wrap
//                   items-center
//                   gap-x-8
//                   gap-y-5
//                   sm:gap-x-12
//                   lg:gap-x-14
//                 "
//               >
//                 {stats.map((stat, index) => (
//                   <div
//                     key={stat.label}
//                     className="flex items-center gap-8"
//                   >

//                     <div className="flex flex-col">

//                       <span
//                         className="
//                           font-serif
//                           text-[30px]
//                           font-light
//                           leading-none
//                           text-white
//                           sm:text-[34px]
//                         "
//                       >
//                         {stat.value}
//                       </span>

//                       <span
//                         className="
//                           mt-2
//                           text-[8px]
//                           font-medium
//                           uppercase
//                           tracking-[0.2em]
//                           text-neutral-400
//                           sm:text-[9px]
//                         "
//                       >
//                         {stat.label}
//                       </span>

//                     </div>

//                     {/* Separator */}

//                     {index < stats.length - 1 && (
//                       <span
//                         className="
//                           hidden
//                           h-8
//                           w-px
//                           bg-white/10
//                           sm:block
//                         "
//                       />
//                     )}

//                   </div>
//                 ))}
//               </div>

//               {/* =================================================
//                   TRUSTED BY
//               ================================================= */}

//               <div
//                 className="
//                   flex
//                   flex-col
//                   lg:items-end
//                 "
//               >

//                 <span
//                   className="
//                     mb-2
//                     text-[8px]
//                     font-medium
//                     uppercase
//                     tracking-[0.3em]
//                     text-[#C8A96A]
//                   "
//                 >
//                   Trusted By
//                 </span>

//                 <div
//                   className="
//                     flex
//                     flex-wrap
//                     items-center
//                     gap-x-3
//                     gap-y-1
//                     text-[10px]
//                     font-light
//                     tracking-wide
//                     text-neutral-300
//                     sm:text-[11px]
//                   "
//                 >
//                   <span>
//                     Emaar
//                   </span>

//                   <span className="text-[#B29150]">
//                     •
//                   </span>

//                   <span>
//                     Sobha
//                   </span>

//                   <span className="text-[#B29150]">
//                     •
//                   </span>

//                   <span>
//                     Cartier
//                   </span>

//                   <span className="text-[#B29150]">
//                     •
//                   </span>

//                   <span>
//                     DMCC
//                   </span>
//                 </div>

//               </div>

//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* =====================================================
//           BOTTOM GOLD ACCENT
//       ===================================================== */}

//       <div
//         className="
//           pointer-events-none
//           absolute
//           bottom-0
//           left-0
//           h-px
//           w-full
//           bg-gradient-to-r
//           from-transparent
//           via-[#C8A96A]/55
//           to-transparent
//         "
//       />

//     </section>
//   );
// }

// export default Hero;