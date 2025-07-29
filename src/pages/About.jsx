import React from "react";

const About = () => {
  return (
    <section
      id="about"
      // Added animate-fade-in for a subtle entrance animation
      className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center px-6 py-16 bg-gradient-to-br from-white to-blue-50 text-gray-800 font-sans animate-fade-in"
      aria-label="About Md Abdur Razzaque - Full Stack MERN Developer" // More specific aria-label
    >
      <div className="max-w-4xl text-center px-4 sm:px-6 md:px-8"> {/* Added horizontal padding for smaller screens */}
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-green-600 animate-slide-in-down"> {/* Added responsive font size and animation */}
          About Me
        </h2>
        <p className="text-lg sm:text-xl leading-relaxed mb-6 text-gray-700 animate-fade-in-up animation-delay-100"> {/* Added text-gray-700 for softer look, and animation */}
          I am Md Abdur Razzaque, a passionate <strong className="text-green-600">Full Stack MERN Developer</strong> with expertise in building scalable and robust web applications. I love turning complex problems into simple, beautiful, and intuitive designs.
        </p>
        <p className="text-lg sm:text-xl leading-relaxed mb-6 text-gray-700 animate-fade-in-up animation-delay-200"> {/* Added animation */}
          My journey in development has equipped me with skills in <strong className="text-green-600">React, Node.js, Express, MongoDB</strong>, and various modern web technologies. I am constantly learning and improving to deliver efficient solutions and contribute meaningfully to every project I work on.
        </p>
        <p className="text-lg sm:text-xl leading-relaxed text-gray-700 animate-fade-in-up animation-delay-300"> {/* Added animation */}
          When I'm not coding, I enjoy exploring new technologies, contributing to open source, and sharing knowledge with the developer community.
        </p>
      </div>

      {/* Custom Animations for professional look */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

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

        /* Utility for staggered animations */
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
      `}</style>
    </section>
  );
};

export default About;