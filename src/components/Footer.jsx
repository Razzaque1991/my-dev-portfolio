import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaFacebook, FaInstagram  } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll"; // smooth scroll

const Footer = () => {
  const year = new Date().getFullYear();

  const contactInfo = [
    { icon: <FaEnvelope />, text: "razzaque.0011@gmail.com", link: "https://mailto:razzaque.0011@gmail.com" },
    { icon: <FaPhone />, text: "+880 1234 567890", link: "tel:+8801755202615" },
    { icon: <FaMapMarkerAlt />, text: "Sirajgonj, Bangladesh", link: "https://maps.google.com/?q=Dhaka,Bangladesh" },
  ];

  const quickLinks = [
    { text: "About", link: "about" },
    { text: "Projects", link: "projects" },
    { text: "Contact", link: "contact" },
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/md-abdur-razzaque-7b01892b8/", color: "text-blue-600" },
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/Razzaque1991", color: "text-gray-800 dark:text-gray-200" },
    { name: "Facebook", icon: <FaFacebook />, url: "https://web.facebook.com/rahul.razzak/", color: "text-blue-600" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://instagram.com/md-abdur-razzaque", color: "text-pink-500" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-12">
        
        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Contact Info</h3>
          {contactInfo.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 hover:text-blue-400 transition-colors"
            >
              <span className="text-blue-500 text-lg flex-shrink-0">{item.icon}</span>
              <span>{item.text}</span>
            </a>
          ))}
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          {quickLinks.map((item, index) => (
            <ScrollLink
              key={index}
              to={item.link}       // section id
              smooth={true}
              duration={500}       // scroll speed
              offset={-70}         // navbar height adjust
              className="block cursor-pointer hover:text-blue-400 transition-colors"
            >
              {item.text}
            </ScrollLink>
          ))}
        </div>

        {/* Social Links */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white mb-4">Follow Me</h3>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow me on ${link.name}`}
                className={`${link.color} text-3xl hover:scale-110 transform transition-transform duration-300`}
              >
                {link.icon}
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-400">© {year} Md Abdur Razzaque. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
