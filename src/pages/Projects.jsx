import React, { useEffect, useState } from "react";
import { ArrowRight, Github } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({}); // projectId: index

  const API_URL = "https://my-dev-portfolio-server-psi.vercel.app/api/projects";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);

        // init currentImageIndex
        const initIndexes = {};
        data.forEach((p) => (initIndexes[p._id] = 0));
        setCurrentImageIndex(initIndexes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleImageClick = (projectId, imagesLength) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectId]: (prev[projectId] + 1) % imagesLength,
    }));
  };

  if (loading) return <p className="text-center py-10">Loading projects...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <section
      id="projects"
      className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-white py-16 px-4 sm:px-6 md:px-8 font-sans text-gray-900"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-12 text-green-600 animate-slide-in-down">
          My Projects
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((proj, index) => (
            <div
              key={proj._id}
              className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between overflow-hidden relative border border-gray-100 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Images */}
              {proj.images && proj.images.length > 0 && (
                <div
                  className="mb-4 overflow-hidden rounded-lg cursor-pointer relative"
                  onClick={() =>
                    handleImageClick(proj._id, proj.images.length)
                  }
                >
                  <img
                    src={proj.images[currentImageIndex[proj._id]]}
                    alt={`${proj.name} Project Screenshot`}
                    className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-lg"
                  />
                  {proj.images.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 text-xs rounded">
                      Click to change ({currentImageIndex[proj._id] + 1}/
                      {proj.images.length})
                    </div>
                  )}
                </div>
              )}

              {/* Project Info */}
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800 group-hover:text-green-700 transition-colors duration-200">
                  {proj.name}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  {proj.description || "No description provided."}
                </p>
              </div>

              {/* Tech & Links */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.technologies &&
                    proj.technologies.map((techItem, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
                      >
                        {techItem}
                      </span>
                    ))}
                </div>

                <div className="flex gap-4 justify-center sm:justify-start mt-2">
                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 font-semibold transition-colors duration-200"
                    >
                      Live
                      <ArrowRight
                        className="ml-1 transition-transform group-hover:translate-x-1"
                        size={18}
                      />
                    </a>
                  )}
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold transition-colors duration-200"
                    >
                      <Github size={18} />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slide-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-down {
          animation: slide-in-down 0.8s ease-out forwards;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Projects;
