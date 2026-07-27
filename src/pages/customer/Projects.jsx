import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { useProjects } from "../../hooks/useProjects";

function Projects() {
  const { projects, loading } = useProjects();


  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(projects.map((p) => p.category))],
    [projects]
  );

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <p className="text-gray-400">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] min-h-screen">
      {/* Header */}
      <section className="relative pt-40 pb-16 px-6 lg:px-10 text-center border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C8A96A]/[0.06] to-transparent pointer-events-none" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[6px] sm:tracking-[8px] text-[#C8A96A] mb-4 text-sm"
        >
          Our Portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
        >
          Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 mt-6 max-w-2xl mx-auto text-base lg:text-lg"
        >
          350+ projects delivered across residential, commercial, and
          hospitality spaces in the U.A.E.
        </motion.p>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm uppercase tracking-wider border transition-all duration-300 ${activeCategory === cat
                  ? "bg-[#C8A96A] text-black border-[#C8A96A]"
                  : "text-white/80 border-white/20 hover:border-[#C8A96A] hover:text-[#C8A96A]"
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Grid */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-16 md:py-20">
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl h-[360px] border border-white/10 hover:border-[#C8A96A]/50 transition-colors duration-300 shadow-lg shadow-black/30"
              >
                <Link to={`/projects/${project.id}`}>
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />

                  {/* Category tag — glass, floats over open image area, this placement is correct for blur */}
                  <span className="absolute top-5 left-5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs uppercase tracking-wider text-white">
                    {project.category}
                  </span>

                  <div className="absolute left-6 bottom-6 right-6">
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-gray-300 text-sm">
                      <FaMapMarkerAlt className="text-[#C8A96A]" />
                      {project.location}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-[#C8A96A] text-sm font-semibold group-hover:gap-4 transition-all">
                      View Project <FaArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-20">
            No projects in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Projects;