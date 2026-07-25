import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt, FaCalendarAlt, FaUserTie } from "react-icons/fa";
import { useProjects } from "../../hooks/useProjects";

function ProjectDetail() {
  const { id } = useParams();

  const {
    projects,
    loading,
    getById,
  } = useProjects();

  const project = getById(id);

  // Wait until the projects have finished loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <p className="text-gray-400">Loading project...</p>
      </div>
    );
  }

  // Show 404/redirect if the project doesn't exist
  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const relatedProjects = projects
    .filter(
      (p) =>
        p.id !== project.id &&
        p.category === project.category
    )
    .slice(0, 3);

  const meta = [
    {
      icon: FaUserTie,
      label: "Client",
      value: project.client,
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: project.location,
    },
    {
      icon: FaCalendarAlt,
      label: "Status",
      value: project.status,
    },
  ];

  return (
    <div className="bg-[#111111] min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-end max-w-screen-2xl mx-auto px-6 lg:px-10 pb-14">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-[#C8A96A] text-sm transition-colors mb-6 w-fit"
          >
            ← Back to Projects
          </Link>

          <span className="w-fit rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs uppercase tracking-wider text-white mb-5">
            {project.category}
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl font-bold text-white max-w-3xl"
          >
            {project.title}
          </motion.h1>
        </div>
      </section>

      {/* Meta + description */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-16 md:py-20">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <p className="uppercase tracking-[6px] text-[#C8A96A] mb-4 text-sm">
              Project Scope
            </p>
            <p className="text-gray-300 leading-8 text-base sm:text-lg">
              {project.duration}. Delivered by OK Decoration's in-house
              project management, joinery, and fit-out teams — from initial
              survey through to final handover.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 mt-10 rounded-lg bg-[#C8A96A] px-8 py-3.5 font-semibold text-black hover:-translate-y-1 hover:bg-yellow-500 transition-all duration-300"
            >
              Start a Similar Project <FaArrowRight />
            </Link>
          </motion.div>

          {/* Glass meta panel — over open dark background, correct use of blur */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 border border-white/10 bg-white/[0.04] backdrop-blur-xl h-fit space-y-6"
          >
            {meta.map((m) => {
              const MIcon = m.icon;
              return (
                <div key={m.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C8A96A]/15 border border-[#C8A96A]/40 flex items-center justify-center text-[#C8A96A] flex-shrink-0">
                    <MIcon size={14} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      {m.label}
                    </p>
                    <p className="text-white font-medium">{m.value}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Gallery */}
        {project.gallery?.length > 0 && (
          <div className="mt-16 grid sm:grid-cols-2 gap-6">
            {project.gallery.map((img,index) => (
              <motion.img
                key={img.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                src={img.url}
                alt={project.title}
                className="rounded-2xl w-full h-[280px] sm:h-[320px] object-cover"
              />
            ))}
          </div>
        )}
      </section>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="border-t border-white/10 bg-[#0b0b0b] py-16 md:py-20">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-10">
              Related Projects
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.id}`}
                  className="group relative overflow-hidden rounded-2xl h-[240px] border border-white/10 hover:border-[#C8A96A]/50 transition-colors duration-300"
                >
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute left-5 bottom-5 right-5">
                    <h4 className="text-white font-semibold">{p.title}</h4>
                    <span className="inline-flex items-center gap-2 mt-2 text-[#C8A96A] text-sm font-semibold group-hover:gap-3 transition-all">
                      View <FaArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ProjectDetail;