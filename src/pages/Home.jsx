import React, { useEffect, useState } from "react";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTailwindcss,
  SiGit, // Added Git for comprehensive skills
  SiGithub, // Added Github for comprehensive skills
} from "react-icons/si";
import {
  HiOutlineCode,
  HiOutlineServer,
  HiOutlineDatabase,
  HiOutlineCloud, // Added for general cloud concepts or deployment
} from "react-icons/hi";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile view based on window width
  useEffect(() => {
    const handleResize = () => {
      // Consider a slightly larger breakpoint for smooth transitions
      setIsMobile(window.innerWidth < 1024); // md breakpoint is 768px, lg is 1024px. Using 1024 to catch tablets.
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const skillsIcons = [
    // Frontend
    { Icon: SiHtml5, name: "HTML5", color: "#E44D26", category: "Frontend" },
    { Icon: SiCss3, name: "CSS3", color: "#1572B6", category: "Frontend" },
    { Icon: SiJavascript, name: "JavaScript", color: "#F7DF1E", category: "Frontend" },
    { Icon: SiReact, name: "React.js", color: "#61DAFB", category: "Frontend" },
    { Icon: SiTailwindcss, name: "Tailwind CSS", color: "#38B2AC", category: "Styling" },
    { Icon: HiOutlineCode, name: "UI Frameworks (e.g., DaisyUI)", color: "#4A5568", category: "Styling" },

    // Backend
    { Icon: SiNodedotjs, name: "Node.js", color: "#339933", category: "Backend" },
    { Icon: SiExpress, name: "Express.js", color: "#000000", category: "Backend" },
    { Icon: HiOutlineServer, name: "RESTful APIs", color: "#718096", category: "Backend" },

    // Database
    { Icon: SiMongodb, name: "MongoDB", color: "#47A248", category: "Database" },
    { Icon: HiOutlineDatabase, name: "Mongoose ODM", color: "#2D3748", category: "Database" },

    // Tools & Concepts
    { Icon: SiGit, name: "Git Version Control", color: "#F05032", category: "Tools" },
    { Icon: SiGithub, name: "GitHub Workflow", color: "#181717", category: "Tools" },
    { Icon: HiOutlineCloud, name: "Cloud Deployment", color: "#63B3ED", category: "Deployment" },
  ];

  // Dynamic sizes based on mobile state
  const imageSizeClass = isMobile ? "w-48 h-48" : "w-80 h-80"; // Adjusted values
  const outerCircleSize = isMobile ? "w-[20rem] h-[20rem]" : "w-[30rem] h-[30rem]"; // Adjusted to Tailwind units
  const innerCircleSize = isMobile ? "w-[14rem] h-[14rem]" : "w-[22rem] h-[22rem]"; // Adjusted to Tailwind units
  const iconRadius = isMobile ? 100 : 200; // Radius for icon positioning (pixels)
  const iconPadding = isMobile ? "p-1.5" : "p-2"; // Padding for the icon background
  const individualIconSize = isMobile ? 22 : 28; // Size for the Lucide icon itself

  return (
    <section
      className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-white overflow-hidden font-sans"
      aria-label="Introduction to Md Abdur Razzaque's Portfolio"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Column: Intro Text */}
        <div className="text-center md:text-left animate-fade-in-up">
          <p className="text-lg text-green-700 font-semibold mb-2">Hello, I'm</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-gray-900 leading-tight">
            Md Abdur Razzaque
          </h1>
          <p className="text-gray-800 text-xl sm:text-2xl font-medium mb-6">
            <span className="text-green-600">Full Stack MERN Developer</span>
          </p>
          <p className="text-gray-700 text-base sm:text-lg max-w-lg mx-auto md:mx-0">
            Passionate about building robust and scalable web applications. I craft elegant solutions using the MERN stack, bringing ideas to life with clean code and efficient design.
          </p>
        </div>

        {/* Right Column: Profile Image with Spinning Icons */}
        <div className="relative flex justify-center items-center animate-fade-in-right">
          {/* Profile Image with gradient border */}
          <div className="relative z-10 p-1 rounded-full bg-gradient-to-br from-green-500 to-teal-500 shadow-2xl">
            <img
              src="https://i.ibb.co/FbFNvsDv/FB-IMG-1518037179418-2.jpg"
              alt="Md Abdur Razzaque - Full Stack MERN Developer Profile"
              className={`${imageSizeClass} rounded-full object-cover border-4 border-white`}
            />
          </div>

          {/* Outer Circle for icons: slower, reverse spin */}
          <div
            className={`absolute rounded-full border border-dashed border-gray-300 animate-spin-slow-outer pointer-events-none flex items-center justify-center ${outerCircleSize}`}
          >
            {/* Inner Circle for icons: faster, normal spin */}
            <div
              className={`absolute rounded-full border border-dashed border-gray-200 animate-spin-fast-inner pointer-events-none ${innerCircleSize}`}
            ></div>

            {/* Icons positioned absolutely around the circles */}
            {skillsIcons.map(({ Icon, name, color }, index) => {
              const angle = (360 / skillsIcons.length) * index;
              const x = iconRadius * Math.cos((angle * Math.PI) / 180);
              const y = iconRadius * Math.sin((angle * Math.PI) / 180);

              return (
                <div
                  key={name}
                  title={name} // Tooltip on hover
                  aria-label={name} // For screen readers
                  className={`absolute ${iconPadding} rounded-full bg-white shadow-xl cursor-pointer
                             transform transition-transform duration-300 hover:scale-125 hover:shadow-2xl
                             flex items-center justify-center group`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: `translate(-50%, -50%) rotate(${angle}deg) rotate(-${angle}deg)`, // Keeps icon upright
                  }}
                >
                  <Icon size={individualIconSize} style={{ color: color }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom animations (in <style> tag for simplicity in a single component file) */}
      <style>{`
        /* Keyframes for spinning animations */
        @keyframes spin-normal {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        /* Animation speeds for outer and inner circles */
        .animate-spin-slow-outer {
          animation: spin-reverse 35s linear infinite; /* Slower, reverse spin for outer ring */
        }
        .animate-spin-fast-inner {
          animation: spin-normal 20s linear infinite; /* Faster, normal spin for inner ring */
        }

        /* Fade-in animations for content */
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out forwards;
          animation-delay: 0.3s;
        }
      `}</style>
    </section>
  );
};

export default Home;