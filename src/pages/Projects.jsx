import React from "react";
import { ArrowRight } from "lucide-react"; // Importing an icon for the link

const projectsData = [
  {
    title: "MERN E-commerce Platform",
    description:
      "Developed a robust full-stack e-commerce solution with secure user authentication, product management, shopping cart functionality, and integrated Stripe for seamless payment processing. Features an intuitive admin dashboard for order and inventory management.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Stripe", "Tailwind CSS"], // Added Tailwind to tech
    link: "https://your-ecommerce-site.com",
    image: "https://via.placeholder.com/400x250/CCE0CC/333333?text=E-commerce+Platform" // Placeholder image
  },
  {
    title: "Real-time Social Media App",
    description:
      "Engineered a dynamic social media application featuring real-time chat, customizable user profiles, media sharing, and post interaction capabilities. Built to foster community engagement and seamless communication.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "Material-UI"], // Example of another UI lib
    link: "https://your-socialmedia-app.com",
    image: "https://via.placeholder.com/400x250/D2E8F0/333333?text=Social+Media+App" // Placeholder image
  },
  {
    title: "Personal Portfolio Website",
    description:
      "Designed and developed a modern, responsive personal portfolio website to effectively showcase development skills, key projects, and professional contact information. Focus on clean UI/UX and performance.",
    tech: ["React", "Tailwind CSS", "Vite"], // Added Vite as an example
    link: "https://your-portfolio-site.com",
    image: "https://via.placeholder.com/400x250/E6D9EF/333333?text=Portfolio+Website" // Placeholder image
  },
  {
    title: "Task Management System",
    description: "A comprehensive task management application allowing users to create, assign, track, and complete tasks. Includes features for team collaboration and progress visualization.",
    tech: ["React", "Node.js", "PostgreSQL", "Chakra UI"],
    link: "https://your-task-app.com",
    image: "https://via.placeholder.com/400x250/F8E5CC/333333?text=Task+Manager"
  }
];

const Projects = () => {
  return (
    <section
      id="projects"
      // Applied a subtle gradient background for a professional touch
      className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-white py-16 px-4 sm:px-6 md:px-8 font-sans text-gray-900"
      aria-label="Projects by Md Abdur Razzaque - Full Stack MERN Developer"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-12 text-green-600 animate-slide-in-down">
          My Projects
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.map(({ title, description, tech, link, image }, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between overflow-hidden relative border border-gray-100 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }} // Staggered animation
            >
              {/* Project Image (Optional but highly recommended for professionalism) */}
              {image && (
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src={image}
                    alt={`${title} Project Screenshot`}
                    className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-lg"
                  />
                </div>
              )}

              <div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800 group-hover:text-green-700 transition-colors duration-200">
                  {title}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  {description}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100">
                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tech.map((techItem, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>
                {/* View Project Button */}
                <button
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 font-semibold transition-colors duration-200"
                  aria-label={`View ${title} project`}
                >
                  View Project
                  <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" size={18} />
                </button>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Custom Animations */}
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