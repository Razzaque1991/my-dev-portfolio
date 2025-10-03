import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
// Assuming QrCodeGenerator is a valid component for generating a QR code
import QrCodeGenerator from "./QrCodeGenerator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // --- Data Definitions ---

  const contactInfo = [
    { 
      icon: <FaEnvelope />, 
      text: "razzaque.0011@gmail.com", 
      link: "mailto:razzaque.0011@gmail.com", 
      label: "Email" 
    },
    { 
      icon: <FaPhone />, 
      text: "+8801755202615", 
      link: "tel:+8801755202615", 
      label: "Phone" 
    },
    { 
      icon: <FaMapMarkerAlt />, 
      text: "Sirajgonj, Bangladesh", 
      // A proper link to Google Maps searching for the location
      link: "https://www.google.com/maps/search/Sirajgonj,+Bangladesh", 
      label: "Location on map"
    },
  ];

  const quickLinks = [
    { text: "About", to: "about" },
    { text: "Projects", to: "projects" },
    { text: "Contact", to: "contact" },
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/md-abdur-razzaque-7b01892b8/", color: "text-blue-600" },
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/Razzaque1991", color: "text-gray-200 dark:text-gray-200" },
    { name: "Facebook", icon: <FaFacebook />, url: "https://web.facebook.com/rahul.razzak/", color: "text-blue-600" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://instagram.com/md-abdur-razzaque", color: "text-pink-500" },
  ];

  // --- Component Render ---

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12">

        {/* 1. Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Contact Info</h3>
          {contactInfo.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.label}: ${item.text}`}
              className="flex items-center space-x-3 hover:text-blue-400 transition-colors group"
            >
              {/* Icon with fixed size for consistency */}
              <span className="text-blue-500 w-5 h-5 flex items-center justify-center flex-shrink-0 group-hover:text-blue-400">
                {item.icon}
              </span>
              <span>{item.text}</span>
            </a>
          ))}
        </div>

        {/* 2. Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h3>
          <nav className="flex flex-col space-y-2">
            {quickLinks.map((item, index) => (
              <ScrollLink
                key={index}
                to={item.to}
                smooth={true}
                duration={500}
                offset={-70}
                className="cursor-pointer hover:text-blue-400 transition-colors w-max"
              >
                {item.text}
              </ScrollLink>
            ))}
          </nav>
        </div>

        {/* 3. My Contact QR */}
        <div className="space-y-4 flex flex-col items-center">
          <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">My Contact QR</h3>
          <div className="p-2 bg-white rounded shadow-lg">
            <QrCodeGenerator />
          </div>
          <p className="text-sm text-gray-400 text-center pt-2">Scan to save my VCard</p>
        </div>

        {/* 4. Social Links */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Follow Me</h3>
          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Connect with me on ${link.name}`}
                // Increased icon size and added a background for better visual weight
                className={`${link.color} text-4xl hover:scale-110 transform transition-transform duration-300`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 pt-6 border-t border-gray-800">
        <p className="text-center text-sm text-gray-500">
          &copy; {currentYear} Md Abdur Razzaque. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;