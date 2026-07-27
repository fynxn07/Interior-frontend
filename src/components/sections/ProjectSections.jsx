import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { useProjects } from "../../hooks/useProjects";


function ProjectCard({ project, big = false }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 hover:border-[#C8A96A]/50 transition-colors duration-300 ${big ? "lg:col-span-2 lg:row-span-2 h-[320px] lg:h-[650px]" : "h-[260px] lg:h-[315px]"
        }`}
    >
      <Link to={`/projects/${project.id}`}>
        <img
          src={project.coverImage}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <span className="absolute top-5 left-5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs uppercase tracking-wider text-white">
          {project.category}
        </span>

        <div className="absolute left-5 sm:left-8 bottom-5 sm:bottom-8 right-5 sm:right-8">
          <h3 className="text-xl sm:text-3xl font-bold text-white">
            {project.title}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-gray-300 text-sm sm:text-base">
            <FaMapMarkerAlt className="text-[#C8A96A]" />
            {project.location}
          </div>
          <span className="mt-4 inline-flex items-center gap-2 text-[#C8A96A] text-sm font-semibold group-hover:gap-4 transition-all">
            View Project <FaArrowRight />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function ProjectsSection() {
  const { projects, loading,error } = useProjects();

  if (loading) {
    return null;
  }
  if (error) {
    return (
      <section className="bg-[#0B0B0B] py-20 text-center">
        <p className="text-red-400">
          Failed to load featured projects.
        </p>
      </section>
    );
  }

  const featured = Array.isArray(projects)
    ? projects.filter((p) => p.featured).slice(0, 3)
    : [];

  if (featured.length === 0) {
    return null;
  }



  return (
    <section className="bg-[#0B0B0B] py-20 md:py-28">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20 text-center"
        >
          <p className="mb-4 uppercase tracking-[6px] sm:tracking-[8px] text-[#C8A96A] text-sm">
            Featured Projects
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Our Signature Creations
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-gray-400 text-base lg:text-lg">
            A selection of residential, commercial, and hospitality
            projects delivered across the U.A.E.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:gap-8 lg:grid-cols-3">
          <ProjectCard project={featured[0]} big />
          {featured.slice(1
          ).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 rounded-lg bg-[#C8A96A] px-8 py-3.5 font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-500"
          >
            View All Projects <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;