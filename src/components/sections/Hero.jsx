
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import heroImage from "../../assets/images/img18.jpg";

// const stats = [
//   { value: "45+", label: "Years in Business" },
//   { value: "350+", label: "Projects Delivered" },
//   { value: "7", label: "U.A.E. Emirates Served" },
// ];

// const fadeUp = {
//   hidden: { opacity: 0, y: 24 },
//   show: (delay = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
//   }),
// };

// function Hero() {
//   return (
//     <section className="relative h-screen w-full overflow-hidden bg-[#070707]">
//       {/* Background */}
//       <motion.img
//         src={heroImage}
//         alt="OK Decoration — Luxury Interior Fit-Out"
//         className="absolute inset-0 h-full w-full object-cover"
//         initial={{ scale: 1.08 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 14, ease: "easeOut" }}
//       />

//       {/* Bottom fade — where stats/CTAs sit, needs the most contrast */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
//       {/* Top fade — light touch, just enough for the headline to stay readable */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-transparent" />

//       {/* Content — anchored to the bottom, not centered */}
//       <div className="relative z-10 flex h-full w-full flex-col justify-end ">
//         <div className="mx-auto w-full max-w-[1440px] px-6 pb-14 sm:px-10 lg:px-16 lg:pb-20">
//           <motion.h1
//             variants={fadeUp}
//             initial="hidden"
//             animate="show"
//             custom={0.15}
//             className="font-serif max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]"
//           >
//             Four Decades of 
//             <br />
//             <span className="text-[#C8A96A]"> Legacy &amp; Precision.</span>
//           </motion.h1>

//           <motion.p
//             variants={fadeUp}
//             initial="hidden"
//             animate="show"
//             custom={0.3}
//             className="mt-6 max-w-xl font-sans text-sm font-light leading-relaxed text-neutral-300 sm:text-base lg:text-lg"
//           >
//             Since 1978, we create timeless interiors where refined design meets
//             precision, craftsmanship, and lasting quality.
//           </motion.p>

//           <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.45} className="mt-9 flex flex-wrap items-center gap-4">
//             <Link
//               to="/projects"
//               className="rounded-md bg-[#C8A96A] px-7 py-3.5 font-sans text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D8BE81]"
//             >
//               Explore Projects
//             </Link>
//             <Link
//               to="/contact"
//               className="rounded-md border border-white/25 px-7 py-3.5 font-sans text-sm font-semibold text-white transition-all duration-300 hover:border-[#C8A96A] hover:text-[#C8A96A]"
//             >
//               Get Free Consultation
//             </Link>
//           </motion.div>

//           {/* Stats + trust roster */}
//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             animate="show"
//             custom={0.6}
//             className="mt-14 flex flex-col gap-8 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between"
//           >
//             <div className="flex flex-wrap gap-10 sm:gap-14">
//               {stats.map((s) => (
//                 <div key={s.label}>
//                   <h2 className="font-serif text-2xl font-medium text-white sm:text-3xl">{s.value}</h2>
//                   <p className="mt-1 font-sans text-[11px] uppercase tracking-wider text-neutral-400 sm:text-xs">
//                     {s.label}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div className="flex flex-col gap-1.5 lg:items-end">
//               <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C8A96A]/80">
//                 Trusted By
//               </span>
//               <span className="font-sans text-sm text-neutral-300">
//                 Emaar · Sobha · Cartier · DMCC
//               </span>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Hero;

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
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#070707]">
      {/* Background — mobile crop shifted so the photo's focal point stays framed on tall/narrow screens */}
      <motion.img
        src={heroImage}
        alt="OK Decoration — Luxury Interior Fit-Out"
        className="absolute inset-0 h-full w-full object-cover object-[70%_center] sm:object-center"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "easeOut" }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-transparent" />

      {/* Content — anchored to the bottom on every screen size */}
      <div className="relative z-10 flex min-h-[100svh] w-full flex-col justify-end">
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-10 sm:px-10 sm:pb-14 lg:px-16 lg:pb-20">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.15}
            className="font-serif max-w-full font-medium leading-[1.15] tracking-tight text-white sm:max-w-3xl sm:leading-[1.08]"
            style={{ fontSize: "clamp(2rem, 7vw, 4.5rem)" }}
          >
            Four Decades of
            <br />
            <span className="text-[#C8A96A]">Legacy &amp; Precision.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="mt-4 max-w-full font-sans font-light leading-relaxed text-neutral-300 sm:mt-6 sm:max-w-xl"
            style={{ fontSize: "clamp(0.85rem, 2.2vw, 1.125rem)" }}
          >
            Since 1978, we create timeless interiors where refined design meets
            precision, craftsmanship, and lasting quality.
          </motion.p>

          {/* Buttons — full width, stacked on mobile so they're easy to tap; side-by-side from sm up */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.45}
            className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Link
              to="/projects"
              className="rounded-md bg-[#C8A96A] px-6 py-3 text-center font-sans text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D8BE81] sm:px-7 sm:py-3.5"
            >
              Explore Projects
            </Link>
            <Link
              to="/contact"
              className="rounded-md border border-white/25 px-6 py-3 text-center font-sans text-sm font-semibold text-white transition-all duration-300 hover:border-[#C8A96A] hover:text-[#C8A96A] sm:px-7 sm:py-3.5"
            >
              Get Free Consultation
            </Link>
          </motion.div>

          {/* Stats + trust roster — 2-column grid on mobile (3rd stat wraps cleanly),
              single flex row from sm up. Trust line gets its own clearly separated block on mobile. */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.6}
            className="mt-8 border-t border-white/10 pt-5 sm:mt-14 sm:pt-8 lg:flex lg:items-center lg:justify-between"
          >
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:flex sm:flex-wrap sm:gap-10 lg:gap-14">
              {stats.map((s) => (
                <div key={s.label} className="min-w-0">
                  <h2
                    className="font-serif font-medium text-white"
                    style={{ fontSize: "clamp(1.25rem, 3.5vw, 1.875rem)" }}
                  >
                    {s.value}
                  </h2>
                  <p className="mt-1 font-sans text-[10px] uppercase tracking-wider text-neutral-400 sm:text-[11px] lg:text-xs">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-1.5 sm:mt-8 lg:mt-0 lg:items-end">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C8A96A]/80">
                Trusted By
              </span>
              <span className="font-sans text-xs text-neutral-300 sm:text-sm">
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