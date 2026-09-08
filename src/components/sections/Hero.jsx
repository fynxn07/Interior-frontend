// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import heroImage from "../../assets/images/img17.jpg";


// const stats = [
//   { value: "45+", label: "Years in Business" },
//   { value: "350+", label: "Projects Delivered" },
//   { value: "7", label: "U.A.E. Emirates Served" },
// ];

// const fadeUp = {
//   hidden: { opacity: 0, y: 30 },
//   show: (delay = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, delay, ease: "easeOut" },
//   }),
// };

// function Hero() {
//   return (
//     <section className="relative h-screen overflow-hidden bg-[#111111]">
//       <motion.img
//         src={heroImage}
//         alt="OK Decoration — Luxury Interior Fit-Out"
//         className="absolute inset-0 h-full w-full object-cover opacity-70"
//         initial={{ scale: 1.15 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 10, ease: "easeOut" }}
//       />

//       <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
//       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

//       <div className="relative z-10 mx-auto flex h-full max-w-screen-2xl items-center px-6 lg:px-10 pt-24 lg:pt-0">
//         <div className="max-w-2xl">
      

//           <motion.h1
//             variants={fadeUp}
//             initial="hidden"
//             animate="show"
//             custom={0.25}
//             className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white"
//           >
//             Four Decades of
//             <br />
//             <span className="text-[#C8A96A]">Legacy &amp; Precision.</span>
//           </motion.h1>

//           <motion.p
//             variants={fadeUp}
//             initial="hidden"
//             animate="show"
//             custom={0.4}
//             className="mt-5 lg:mt-6 max-w-xl text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-gray-300"
//           >
//             Since 1978, OK Decoration has transformed complex visions into
//             reality across the U.A.E. — turnkey interiors for residential
//             estates, corporate hubs, and world-class hospitality venues.
//           </motion.p>

//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             animate="show"
//             custom={0.55}
//             className="mt-8 lg:mt-10 flex flex-wrap gap-3 lg:gap-4"
//           >
//             <Link
//               to="/projects"
//               className="rounded-lg bg-[#C8A96A] px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-500"
//             >
//               Explore Projects
//             </Link>
//             <Link
//               to="/contact"
//               className="rounded-lg border border-[#C8A96A] px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-[#C8A96A] transition-all duration-300 hover:bg-[#C8A96A] hover:text-black"
//             >
//               Get Free Consultation
//             </Link>
//           </motion.div>

//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             animate="show"
//             custom={0.75}
//             className="mt-10 lg:mt-16 flex gap-6 sm:gap-10"
//           >
//             {stats.map((s) => (
//               <div key={s.label}>
//                 <h2 className="text-2xl sm:text-3xl font-bold text-[#C8A96A]">{s.value}</h2>
//                 <p className="mt-1 text-xs sm:text-sm text-gray-400">{s.label}</p>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </div>

//       <motion.div
//         initial={{ opacity: 0, x: 40 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 1, duration: 0.7 }}
//         className="hidden lg:flex absolute bottom-40 right-10 xl:right-16 flex-col gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md max-w-[220px]"
//       >
//         <span className="text-xs uppercase tracking-widest text-[#C8A96A]">Trusted by</span>
//         <span className="text-white text-sm font-medium">Emaar · Sobha · Cartier · DMCC</span>
//       </motion.div>
//     </section>
//   );
// }

// export default Hero;


// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { FaArrowRight, FaFileAlt } from "react-icons/fa";

// import heroImage from "../../assets/images/img18.jpg";

// const stats = [
//   {
//     value: "45",
//     suffix: "+",
//     label: "Years of Heritage",
//   },
//   {
//     value: "350",
//     suffix: "+",
//     label: "Landmark Projects",
//   },
//   {
//     value: "7",
//     suffix: "",
//     label: "Direct Execution",
//     extra: "EMIRATES",
//   },
// ];

// const fadeUp = {
//   hidden: {
//     opacity: 0,
//     y: 28,
//   },

//   visible: (delay = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 1,
//       delay,
//       ease: [0.16, 1, 0.3, 1],
//     },
//   }),
// };

// function Hero() {
//   return (
//     <section className="relative min-h-screen w-full overflow-hidden bg-[#070707]">

//       {/* =========================================================
//           BACKGROUND IMAGE
//       ========================================================= */}

//       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

//         <motion.img
//           src={heroImage}
//           alt="OK Decoration luxury interior"
//           className="
//             h-full
//             w-full
//             object-cover
//             object-center
//             select-none
//             brightness-[0.78]
//             contrast-[1.05]
//           "
//           initial={{
//             scale: 1.04,
//           }}
//           animate={{
//             scale: 1.08,
//           }}
//           transition={{
//             duration: 18,
//             ease: "easeInOut",
//             repeat: Infinity,
//             repeatType: "reverse",
//           }}
//         />

//         {/* Main cinematic vignette */}
//         {/* <div
//           className="
//             absolute
//             inset-0
//             bg-[radial-gradient(circle_at_72%_32%,rgba(0,0,0,0.05)_0%,rgba(8,8,10,0.58)_58%,rgba(5,5,7,0.94)_100%)]
//             mix-blend-multiply
//           "
//         /> */}

//         {/* Lower-third darkness */}
//         <div
//           className="
//             absolute
//             inset-x-0
//             bottom-0
//             h-[72vh]
//             bg-gradient-to-t
//             from-[#070709]
//             via-[#070709]/85
//             to-transparent
//           "
//         />

//         {/* Top darkness */}
//         <div
//           className="
//             absolute
//             inset-x-0
//             top-0
//             h-48
//             bg-gradient-to-b
//             from-[#070709]/85
//             via-[#070709]/35
//             to-transparent
//           "
//         />

//         {/* Very subtle warm atmosphere */}
//         <div className="absolute inset-0 bg-[#C8A96A]/[0.015] mix-blend-overlay" />
//       </div>

//       {/* =========================================================
//           UPPER BREATHING SPACE
//       ========================================================= */}

//       <div
//         className="
//           relative
//           z-10
//           flex
//           min-h-[28vh]
//           w-full
//           items-start
//           justify-end
//           px-6
//           pt-28
//           sm:px-8
//           md:px-12
//           lg:px-16
//         "
//       >
//         {/* Location badge */}

//         {/* <motion.div
//           initial={{
//             opacity: 0,
//             y: -10,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           transition={{
//             duration: 1,
//             delay: 1.1,
//           }}
//           className="
//             hidden
//             sm:inline-flex
//             items-center
//             gap-2.5
//             rounded-full
//             border
//             border-white/10
//             bg-black/30
//             px-4
//             py-2
//             text-[10px]
//             uppercase
//             tracking-[0.25em]
//             text-neutral-300
//             backdrop-blur-xl
//           "
//         >
//           <span
//             className="
//               h-1.5
//               w-1.5
//               rounded-full
//               bg-emerald-400
//               shadow-[0_0_8px_rgba(52,211,153,0.8)]
//             "
//           />

//           <span>
//             Dubai · U.A.E.
//           </span>
//         </motion.div> */}
//       </div>

//       {/* =========================================================
//           MAIN LOWER THIRD
//       ========================================================= */}

//       <main
//         className="
//           relative
//           z-20
//           w-full
//           px-6
//           pb-8
//           sm:px-8
//           md:px-12
//           lg:px-16
//           lg:pb-10
//         "
//       >
//         <div className="mx-auto max-w-screen-2xl">

//           {/* =====================================================
//               MAIN CONTENT GRID
//           ===================================================== */}

//           <div
//             className="
//               grid
//               grid-cols-1
//               items-end
//               gap-10
//               lg:grid-cols-12
//               lg:gap-14
//           "
//           >

//             {/* ===================================================
//                 LEFT CONTENT
//             =================================================== */}

//             <motion.div
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               custom={0.15}
//               className="
//                 flex
//                 flex-col
//                 items-start
//                 text-left
//                 lg:col-span-8
//               "
//             >

//               {/* Small gold label */}

//               <div className="mb-5 flex items-center gap-3">

//                 <span className="h-[1px] w-8 bg-[#C8A96A]" />

//                 <span
//                   className="
//                     text-[9px]
//                     font-medium
//                     uppercase
//                     tracking-[0.28em]
//                     text-[#D8BE81]
//                     sm:text-[10px]
//                   "
//                 >
//                   Haute Interior Architecture · Turnkey Fit-Out
//                 </span>

//               </div>

//               {/* =================================================
//                   MAIN HEADING
//               ================================================= */}

//               <motion.h1
//                 variants={fadeUp}
//                 initial="hidden"
//                 animate="visible"
//                 custom={0.25}
//                 className="
//                   font-display
//                   max-w-5xl
//                   text-[44px]
//                   font-normal
//                   leading-[1.02]
//                   tracking-[-0.025em]
//                   text-neutral-100
//                   sm:text-6xl
//                   md:text-7xl
//                   lg:text-[5.5rem]
//                   xl:text-[6rem]
//                 "
//               >
//                 Four Decades of

//                 <span
//                   className="
//                     mt-1
//                     block
//                     font-display
//                     font-light
//                     italic
//                     text-transparent
//                     bg-clip-text
//                     bg-gradient-to-r
//                     from-[#F9F1D8]
//                     via-[#C8A96A]
//                     to-[#A88746]
//                     drop-shadow-[0_2px_15px_rgba(200,169,106,0.18)]
//                     sm:mt-2
//                   "
//                 >
//                   Legacy &amp; Precision.
//                 </span>
//               </motion.h1>

//               {/* =================================================
//                   DESCRIPTION
//               ================================================= */}

//               <motion.p
//                 variants={fadeUp}
//                 initial="hidden"
//                 animate="visible"
//                 custom={0.42}
//                 className="
//                   mt-5
//                   max-w-2xl
//                   text-sm
//                   font-light
//                   leading-relaxed
//                   text-neutral-300
//                   sm:mt-6
//                   sm:text-base
//                   md:text-lg
//                 "
//               >
//                 Turnkey architectural masterworks for distinguished
//                 private residences, corporate havens, and landmark
//                 hospitality across the Arabian Gulf.
//               </motion.p>

//               {/* =================================================
//                   BUTTONS
//               ================================================= */}

//               <motion.div
//                 variants={fadeUp}
//                 initial="hidden"
//                 animate="visible"
//                 custom={0.58}
//                 className="
//                   mt-8
//                   flex
//                   flex-wrap
//                   items-center
//                   gap-4
//                   sm:mt-10
//                   sm:gap-5
//                 "
//               >

//                 {/* Primary */}

//                 <Link
//                   to="/projects"
//                   className="
//                     group
//                     inline-flex
//                     items-center
//                     gap-3
//                     rounded-sm
//                     bg-gradient-to-r
//                     from-[#C8A96A]
//                     to-[#D8BE81]
//                     px-7
//                     py-3.5
//                     text-[10px]
//                     font-semibold
//                     uppercase
//                     tracking-[0.22em]
//                     text-[#070707]
//                     shadow-[0_10px_30px_rgba(200,169,106,0.25)]
//                     transition-all
//                     duration-300
//                     hover:-translate-y-0.5
//                     hover:shadow-[0_14px_35px_rgba(200,169,106,0.38)]
//                     sm:px-8
//                     sm:py-4
//                   "
//                 >
//                   <span>
//                     Explore Portfolio
//                   </span>

//                   <FaArrowRight
//                     className="
//                       text-[11px]
//                       transition-transform
//                       duration-300
//                       group-hover:translate-x-1
//                     "
//                   />
//                 </Link>

//                 {/* Secondary */}

//                 <Link
//                   to="/quotation"
//                   className="
//                     group
//                     inline-flex
//                     items-center
//                     gap-2.5
//                     rounded-sm
//                     border
//                     border-white/15
//                     bg-black/25
//                     px-7
//                     py-3.5
//                     text-[10px]
//                     font-medium
//                     uppercase
//                     tracking-[0.22em]
//                     text-neutral-200
//                     backdrop-blur-xl
//                     transition-all
//                     duration-300
//                     hover:-translate-y-0.5
//                     hover:border-[#C8A96A]/50
//                     hover:bg-white/[0.06]
//                     hover:text-white
//                     sm:px-7
//                     sm:py-4
//                   "
//                 >
//                   <FaFileAlt
//                     className="
//                       text-[11px]
//                       text-[#C8A96A]
//                       transition-transform
//                       duration-300
//                       group-hover:scale-110
//                     "
//                   />

//                   <span>
//                     Request Consultation
//                   </span>
//                 </Link>

//               </motion.div>
//             </motion.div>

//             {/* ===================================================
//                 RIGHT FEATURE CARD
//             =================================================== */}

      
//           </div>

//           {/* =====================================================
//               DIVIDER
//           ===================================================== */}

//           <div
//             className="
//               mt-10
//               h-[1px]
//               w-full
//               bg-white/[0.09]
//               sm:mt-12
//             "
//           />

//           {/* =====================================================
//               BOTTOM METRICS
//           ===================================================== */}

//           <div
//             className="
//               mt-7
//               grid
//               grid-cols-1
//               items-center
//               gap-8
//               md:grid-cols-12
//               md:gap-6
//             "
//           >

//             {/* =================================================
//                 STATS
//             ================================================= */}

//             <motion.div
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               custom={0.9}
//               className="
//                 flex
//                 flex-wrap
//                 items-center
//                 gap-x-8
//                 gap-y-6
//                 sm:gap-x-10
//                 lg:gap-x-14
//                 md:col-span-7
//               "
//             >
//               {stats.map((stat, index) => (
//                 <div
//                   key={stat.label}
//                   className="flex items-center gap-7"
//                 >

//                   <div className="flex flex-col">

//                     <div className="flex items-baseline gap-1">

//                       <span
//                         className="
//                           font-display
//                           text-3xl
//                           font-light
//                           leading-none
//                           text-white
//                           sm:text-4xl
//                         "
//                       >
//                         {stat.value}
//                       </span>

//                       {stat.suffix && (
//                         <span
//                           className="
//                             font-display
//                             text-2xl
//                             font-light
//                             text-[#C8A96A]
//                           "
//                         >
//                           {stat.suffix}
//                         </span>
//                       )}

//                       {stat.extra && (
//                         <span
//                           className="
//                             ml-1
//                             text-[8px]
//                             font-medium
//                             uppercase
//                             tracking-[0.18em]
//                             text-[#C8A96A]
//                             sm:text-[9px]
//                           "
//                         >
//                           {stat.extra}
//                         </span>
//                       )}

//                     </div>

//                     <span
//                       className="
//                         mt-2
//                         text-[8px]
//                         font-medium
//                         uppercase
//                         tracking-[0.2em]
//                         text-neutral-400
//                         sm:text-[9px]
//                       "
//                     >
//                       {stat.label}
//                     </span>

//                   </div>

//                   {/* Separator */}

//                   {index < stats.length - 1 && (
//                     <div
//                       className="
//                         hidden
//                         h-8
//                         w-[1px]
//                         bg-white/10
//                         sm:block
//                       "
//                     />
//                   )}

//                 </div>
//               ))}
//             </motion.div>

//             {/* =================================================
//                 TRUSTED BY
//             ================================================= */}

//             <motion.div
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               custom={1}
//               className="
//                 md:col-span-5
//                 md:text-right
//               "
//             >

//               <span
//                 className="
//                   mb-2
//                   block
//                   text-[8px]
//                   font-medium
//                   uppercase
//                   tracking-[0.3em]
//                   text-[#C8A96A]/80
//                   sm:text-[9px]
//                 "
//               >
//                 Commissioned &amp; Trusted By
//               </span>

//               <div
//                 className="
//                   flex
//                   flex-wrap
//                   items-center
//                   gap-x-3
//                   gap-y-1
//                   text-[10px]
//                   font-light
//                   tracking-wider
//                   text-neutral-300
//                   md:justify-end
//                   sm:text-xs
//                 "
//               >
//                 <span className="transition-colors hover:text-[#D8BE81]">
//                   Emaar Properties
//                 </span>

//                 <span className="text-[#B29150]">
//                   •
//                 </span>

//                 <span className="transition-colors hover:text-[#D8BE81]">
//                   Sobha Realty
//                 </span>

//                 <span className="text-[#B29150]">
//                   •
//                 </span>

//                 <span className="transition-colors hover:text-[#D8BE81]">
//                   Cartier
//                 </span>

//                 <span className="text-[#B29150]">
//                   •
//                 </span>

//                 <span className="transition-colors hover:text-[#D8BE81]">
//                   DMCC
//                 </span>

//                 <span className="text-[#B29150]">
//                   •
//                 </span>

//                 <span className="transition-colors hover:text-[#D8BE81]">
//                   Meraas
//                 </span>
//               </div>

//             </motion.div>

//           </div>

//         </div>
//       </main>

//       {/* =========================================================
//           BOTTOM GOLD HAIRLINE
//       ========================================================= */}

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{
//           duration: 2,
//           delay: 1,
//         }}
//         className="
//           pointer-events-none
//           absolute
//           bottom-0
//           left-0
//           h-[1px]
//           w-full
//           bg-gradient-to-r
//           from-transparent
//           via-[#C8A96A]/50
//           to-transparent
//         "
//       />

//     </section>
//   );
// }

// export default Hero;


import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaFileAlt } from "react-icons/fa";

import heroImage from "../../assets/images/img18.jpg";

const stats = [
  { value: "45", suffix: "+", label: "Years of Heritage" },
  { value: "350", suffix: "+", label: "Landmark Projects" },
  { value: "7", suffix: "", label: "Direct Execution", extra: "EMIRATES" },
];

const trustedBy = ["Emaar", "Sobha Realty", "Cartier", "DMCC"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#070707]">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.img
          src={heroImage}
          alt="OK Decoration luxury interior"
          className="h-full w-full object-cover object-center select-none brightness-[0.78] contrast-[1.05]"
          initial={{ scale: 1.04 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[72vh] bg-gradient-to-t from-[#070709] via-[#070709]/85 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#070709]/85 via-[#070709]/35 to-transparent" />
        <div className="absolute inset-0 bg-[#C8A96A]/[0.015] mix-blend-overlay" />
      </div>

      {/* Lower-third content, anchored bottom — not centered */}
      <main className="relative z-20 w-full px-6 pb-8 sm:px-8 md:px-12 lg:px-16 lg:pb-10 flex flex-col justify-end min-h-screen">
        <div className="mx-auto w-full max-w-screen-2xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="flex flex-col items-start text-left"
          >
          
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.25}
              className="font-serif max-w-5xl text-[44px] font-light leading-[1.02] tracking-[-0.025em] text-neutral-100 sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem]"
            >
              Four Decades of
              <span className="mt-1 block italic font-normal text-gold-gradient drop-shadow-[0_4px_25px_rgba(200,169,106,0.2)] sm:mt-2">
                Legacy &amp; Precision.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.42}
              className="mt-5 max-w-2xl font-sans text-sm font-light leading-relaxed text-neutral-300 sm:mt-6 sm:text-base md:text-lg"
            >
              Turnkey architectural masterworks for distinguished private residences, corporate havens, and landmark hospitality across the U.A.E.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.58}
              className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10 sm:gap-5"
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-3 rounded-sm bg-gradient-to-r from-[#C8A96A] to-[#D8BE81] px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#070707] shadow-[0_10px_30px_rgba(200,169,106,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(200,169,106,0.38)] sm:px-8 sm:py-4"
              >
                <span>Explore Portfolio</span>
                <FaArrowRight className="text-[11px] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/quotation"
                className="luxury-glass-soft group inline-flex items-center gap-2.5 rounded-sm px-7 py-3.5 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C8A96A]/50 hover:bg-white/[0.06] hover:text-white sm:px-7 sm:py-4"
              >
                <FaFileAlt className="text-[11px] text-[#C8A96A] transition-transform duration-300 group-hover:scale-110" />
                <span>Request Consultation</span>
              </Link>
            </motion.div>
          </motion.div>

          <div className="mt-10 h-px w-full bg-white/[0.09] sm:mt-12" />

          <div className="mt-7 grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.9}
              className="flex flex-wrap items-center gap-x-8 gap-y-6 sm:gap-x-10 lg:gap-x-14 md:col-span-7"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="flex items-center gap-7">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-3xl font-light leading-none text-white sm:text-4xl">
                        {stat.value}
                      </span>
                      {stat.suffix && (
                        <span className="font-serif text-2xl font-light text-[#C8A96A]">
                          {stat.suffix}
                        </span>
                      )}
                      {stat.extra && (
                        <span className="ml-1 font-sans text-[8px] font-medium uppercase tracking-[0.18em] text-[#C8A96A] sm:text-[9px]">
                          {stat.extra}
                        </span>
                      )}
                    </div>
                    <span className="mt-2 font-sans text-[8px] font-medium uppercase tracking-[0.2em] text-neutral-400 sm:text-[9px]">
                      {stat.label}
                    </span>
                  </div>
                  {index < stats.length - 1 && (
                    <div className="hidden h-8 w-px bg-white/10 sm:block" />
                  )}
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="md:col-span-5 md:text-right"
            >
              <span className="mb-2 block font-sans text-[8px] font-medium uppercase tracking-[0.3em] text-[#C8A96A]/80 sm:text-[9px]">
                Commissioned &amp; Trusted By
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[10px] font-light tracking-wider text-neutral-300 md:justify-end sm:text-xs">
                {trustedBy.map((name, i) => (
                  <span key={name} className="flex items-center gap-x-3">
                    <span className="transition-colors hover:text-[#D8BE81]">{name}</span>
                    {i < trustedBy.length - 1 && <span className="text-[#B29150]">•</span>}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#C8A96A]/50 to-transparent"
      />
    </section>
  );
}

export default Hero;