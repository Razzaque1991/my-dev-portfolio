import React, { useMemo } from "react";
import { FaLaptopCode, FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiMongodb, SiFirebase } from "react-icons/si";
import ManageExperience from "../admin/ManageExperience";  

const About = () => {
  const skills = useMemo(
    () => [
      {
        icon: <FaReact />,
        text: "React.js, Redux",
        description: "Building modern, dynamic user interfaces.",
      },
      {
        icon: <FaNodeJs />,
        text: "Node.js, Express.js",
        description: "Developing robust and scalable server-side applications.",
      },
      {
        icon: <FaDatabase />,
        text: "MongoDB, Firebase",
        description: "Managing data with NoSQL databases.",
      },
      {
        icon: <FaLaptopCode />,
        text: "RESTful APIs & Integration",
        description: "Creating and consuming APIs for seamless communication.",
      },
      {
        icon: <FaReact />,
        text: "Responsive & Modern UI Design",
        description: "Crafting beautiful and accessible user interfaces.",
      },
    ],
    []
  );

  return (
    <section
      id="about"
      className="py-16 px-4 md:px-8 bg-gray-50 text-gray-800"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto max-w-4xl">
        {/* ---------- Heading ---------- */}
        <header className="text-center mb-12">
          <h2
            id="about-heading"
            className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-4 animate-fade-in-down"
          >
            About Me
          </h2>
          <p className="text-lg text-gray-600 animate-fade-in">
            A Glimpse into My Journey and Expertise
          </p>
        </header>

        {/* ---------- Profile & Bio ---------- */}
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 lg:p-12 mb-12 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <p className="text-lg leading-relaxed mb-4">
                Hi, I'm <strong className="text-blue-600">Md Abdur Razzaque</strong>, a passionate
                <strong className="text-blue-600"> Full Stack MERN Developer</strong> dedicated to
                building scalable and user-friendly web applications. I enjoy turning complex
                problems into elegant, intuitive solutions that provide a seamless experience.
              </p>
              <p className="text-lg leading-relaxed">
                With a strong foundation in modern web technologies, I continuously strive to
                leverage the latest tools and best practices to deliver efficient and impactful
                solutions. My goal is to build digital products that are not just functional, but
                also a delight to use.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105">
                <img
                  src="https://i.ibb.co/FbFNvsDv/FB-IMG-1518037179418-2.jpg"
                  alt="Profile picture of Md Abdur Razzaque"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-500 opacity-20"></div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Skills ---------- */}
        <div className="animate-fade-in-up">
          <h3 className="text-3xl font-bold text-center text-blue-600 mb-8">
            My Key Skills
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <li
                key={index}
                className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="text-2xl text-blue-500 flex-shrink-0">
                  {skill.icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-1">{skill.text}</h4>
                  <p className="text-gray-600 text-sm">{skill.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Experience Section ---------- */}
        <div className="mt-16">
          <ManageExperience />
        </div>
      </div>

      {/* ---------- Animations ---------- */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fadeInDown 0.8s ease-out forwards; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default About;
