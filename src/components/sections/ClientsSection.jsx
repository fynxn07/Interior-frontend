// import { motion } from "framer-motion";
// import { clientsData } from "../../data/ClientsData";

// const featured = clientsData.slice(0, 6);
// const marqueeRow1 = clientsData.slice(0, 10);
// const marqueeRow2 = clientsData.slice(10, 20);

// function LogoTile({ client, index }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay: index * 0.08 }}
//       whileHover={{ y: -8 }}
//       className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#C8A96A]/70 transition-colors duration-300 shadow-lg shadow-black/30 hover:shadow-[#C8A96A]/20"
//     >
//       {/* Logo window — logo now genuinely fills the space, tight crop + minimal frame padding */}
//       <div className="relative flex items-center justify-center h-28 sm:h-32 bg-white px-5 py-4">
//         <img
//           src={client.logo}
//           alt={client.name}
//           className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
//         />
//         <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
//       </div>

//       <div className="bg-[#171717] py-3 text-center border-t border-white/5">
//         <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-gray-400 group-hover:text-[#C8A96A] transition-colors duration-300">
//           {client.name}
//         </span>
//       </div>
//     </motion.div>
//   );
// }

// function MarqueeRow({ items, reverse = false }) {
//   const doubled = [...items, ...items];
//   return (
//     <div className="overflow-hidden relative">
//       <motion.div
//         className="flex gap-5 w-max"
//         animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
//         transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
//       >
//         {doubled.map((client, i) => (
//           <div
//             key={`${client.name}-${i}`}
//             className="flex items-center justify-center h-24 w-44 p-5 rounded-xl bg-white flex-shrink-0 shadow-md shadow-black/25"
//           >
//             <img
//               src={client.logo}
//               alt={client.name}
//               className="w-full h-full object-contain"
//             />
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// function ClientsSection() {
//   return (
//     <section className="relative bg-[#0B0B0B] py-20 md:py-28 border-y border-white/10 overflow-hidden">
//       <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="text-center mb-14 md:mb-16"
//         >
//           <p className="uppercase tracking-[6px] sm:tracking-[8px] text-[#C8A96A] text-sm">
//             Trusted By
//           </p>
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">
//             Clients &amp; Brands
//           </h2>
//           <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-base lg:text-lg">
//             Trusted by leading developers and organisations across the U.A.E.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-16">
//           {featured.map((client, index) => (
//             <LogoTile key={client.name} client={client} index={index} />
//           ))}
//         </div>
//       </div>

//       <div className="relative">
//         <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/90 to-transparent z-10" />
//         <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#0B0B0B] via-[#0B0B0B]/90 to-transparent z-10" />
//         <div className="space-y-5">
//           <MarqueeRow items={marqueeRow1} />
//           <MarqueeRow items={marqueeRow2} reverse />
//         </div>
//       </div>

//       <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 mt-16 md:mt-20">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="max-w-3xl mx-auto text-center rounded-2xl p-8 sm:p-10 border border-[#C8A96A]/30 bg-[#C8A96A]/[0.06] backdrop-blur-xl"
//         >
//           <p className="text-white italic text-lg sm:text-xl leading-8">
//             "We strive to execute the best piece of work for all our
//             clients — keeping the sole objective of customer satisfaction
//             in mind."
//           </p>
//           <p className="mt-5 text-[#C8A96A] text-sm uppercase tracking-widest">
//             OK Decoration & Building Maintenance LLC
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// export default ClientsSection;

import { motion } from "framer-motion";
import { clientsData } from "../../data/ClientsData";
import PremiumCard from "../../components/ui/PremiumCard";

const featured = clientsData.slice(0, 6);
const marqueeRow1 = clientsData.slice(0, 10);
const marqueeRow2 = clientsData.slice(10, 20);

function LogoTile({ client, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
    >
      <PremiumCard className="shadow-lg shadow-black/30 hover:shadow-[#C8A96A]/25 transition-shadow duration-300">
        {/* Logo window — unchanged, still white, still object-contain */}
        <div className="relative flex items-center justify-center h-28 sm:h-32 bg-white px-5 py-4">
          <img
            src={client.logo}
            alt={client.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
          <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/5 to-transparent" />
        </div>

        <div className="bg-[#171717] py-3 text-center border-t border-white/5">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-gray-400 group-hover:text-[#C8A96A] transition-colors duration-300">
            {client.name}
          </span>
        </div>
      </PremiumCard>
    </motion.div>
  );
}

function MarqueeTile({ client }) {
  return (
    <PremiumCard className="h-24 w-44 flex-shrink-0 shadow-md shadow-black/25">
      <div className="flex items-center justify-center h-full w-full p-5 bg-white">
        <img
          src={client.logo}
          alt={client.name}
          className="w-full h-full object-contain"
        />
      </div>
    </PremiumCard>
  );
}

function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden relative">
      <motion.div
        className="flex gap-5 w-max"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((client, i) => (
          <MarqueeTile key={`${client.name}-${i}`} client={client} />
        ))}
      </motion.div>
    </div>
  );
}

function ClientsSection() {
  return (
    <section className="relative bg-[#0B0B0B] py-20 md:py-28 border-y border-white/10 overflow-hidden">
      {/* Ambient gold glow behind the heading — depth without motion */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C8A96A]/[0.08] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-16"
        >
          <span className="inline-block h-px w-12 bg-[#C8A96A]/60 mb-4" />
          <p className="uppercase tracking-[6px] sm:tracking-[8px] text-[#C8A96A] text-sm">
            Trusted By
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">
            Clients &amp; Brands
          </h2>
          <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-base lg:text-lg">
            Trusted by leading developers and organisations across the U.A.E.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-16">
          {featured.map((client, index) => (
            <LogoTile key={client.name} client={client} index={index} />
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/90 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#0B0B0B] via-[#0B0B0B]/90 to-transparent z-10" />
        <div className="space-y-5">
          <MarqueeRow items={marqueeRow1} />
          <MarqueeRow items={marqueeRow2} reverse />
        </div>
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10 mt-16 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <PremiumCard className="max-w-3xl mx-auto shadow-xl shadow-black/40">
            <div className="text-center p-8 sm:p-10 bg-[#C8A96A]/[0.06]">
              <p className="text-white italic text-lg sm:text-xl leading-8">
                "We strive to execute the best piece of work for all our
                clients — keeping the sole objective of customer satisfaction
                in mind."
              </p>
              <p className="mt-5 text-[#C8A96A] text-sm uppercase tracking-widest">
                OK Decoration &amp; Building Maintenance LLC
              </p>
            </div>
          </PremiumCard>
        </motion.div>
      </div>
    </section>
  );
}

export default ClientsSection;