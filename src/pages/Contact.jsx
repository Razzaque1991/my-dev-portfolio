import React, { useState, useRef } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      text: "razzaque.0011@gmail.com",
      link: "https://mailto:razzaque.0011@gmail.com",
      label: "Email address",
    },
    {
      icon: <FaPhone />,
      text: "+880 1755202615",
      link: "tel:+8801755202615",
      label: "Phone number",
    },
    {
      icon: <FaMapMarkerAlt />,
      text: "Sirajgonj, Bangladesh",
      link: "https://maps.google.com/?q=Dhaka,Bangladesh",
      label: "Location on map",
    },
  ];

  const socialLinks = [
   { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/md-abdur-razzaque-7b01892b8/", color: "text-blue-600" },
       { name: "GitHub", icon: <FaGithub />, url: "https://github.com/Razzaque1991", color: "text-gray-800 dark:text-gray-200" },
       { name: "Facebook", icon: <FaFacebook />, url: "https://web.facebook.com/rahul.razzak/", color: "text-blue-600" },
       { name: "Instagram", icon: <FaInstagram />, url: "https://instagram.com/md-abdur-razzaque", color: "text-pink-500" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        "service_tc80olk",    // Service ID
        "template_tvdpocy",   // Template ID
        formRef.current,
        "pfbMeh_Z5_2XKtjsc"  // Public Key
      );
      toast.success("Message sent successfully!");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS Error:", err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 md:px-8 bg-gray-50 text-gray-800" aria-labelledby="contact-heading">
      <div className="container mx-auto max-w-5xl">
        <header className="text-center mb-12 animate-fade-in-down">
          <h2 id="contact-heading" className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600">I'd love to hear from you. Let's build something great together.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-6 animate-fade-in-left">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="flex items-center space-x-4 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transform transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="text-blue-600 text-2xl">{item.icon}</div>
                <span className="text-lg font-medium">{item.text}</span>
              </a>
            ))}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={`${link.color} text-3xl hover:text-blue-800 transition-transform transform hover:scale-125`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6 animate-fade-in-right">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                name="from_name"
                placeholder="Your Name"
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                name="from_email"
                placeholder="you@example.com"
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message..."
                rows={5}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold py-3 rounded-md transition-colors ${
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-down { animation: fadeInDown 0.8s ease-out forwards; }

        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-fade-in-left { animation: fadeInLeft 0.8s ease-out forwards; }

        @keyframes fadeInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-fade-in-right { animation: fadeInRight 0.8s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default Contact;
