import React, { useRef } from 'react';

export default function Resume() {
  const resumeRef = useRef();

  const contact = {
    name: 'Md. Abdur Razzaque',
    father: "Md. Abdus Salam",
    dob: '01 June 1991',
    address: 'Sirajganj, Bangladesh',
    email: 'razzaque.0011@gmail.com',
    phone: '+880 1755-202615',
    linkedin: '#',
    github: '#',
    photo: "/images/razzak.jpg",
  };

  const education = [
    { degree: 'B.Sc. in Electrical & Electronic Engineering (EEE)', institute: 'World University of Bangladesh', year: '2015' },
    { degree: 'HSC', institute: 'Sirajganj Govt. Degree College', year: '2008' },
    { degree: 'SSC', institute: 'S.B. Railway Colony High School', year: '2006' },
  ];

  const skills = {
    frontend: ['React.js', 'Tailwind CSS', 'DaisyUI', 'Next.js (learning)'],
    backend: ['Node.js', 'Express.js'],
    database: ['MongoDB'],
    auth: ['Firebase', 'JWT'],
    languages: ['JavaScript (ES6+)', 'TypeScript (learning)'],
    tooling: ['Git', 'Vercel', 'Firebase Hosting', 'REST API'],
  };

  const projects = [
    {
      title: 'Car Rental System (MERN)',
      bullets: [
        'Car booking & management with Firebase Authentication',
        'Express.js + MongoDB backend with role-based protection',
        'Real-time booking updates; Deployed on Vercel & Firebase',
      ],
    },
    {
      title: 'SR Medicine (Multi-Vendor E-commerce)',
      bullets: [
        'Role-based dashboards (Admin/Seller/User)',
        'Stripe checkout, multilingual support (Bangla-English)',
        'Category & product management, sales reporting',
      ],
    },
    {
      title: 'Subscription Box Service & HobbyHub',
      bullets: [
        'Firebase Authentication, protected routes, review system',
        'Group creation/joining with MongoDB backend',
      ],
    },
  ];

  const courses = [
    { title: 'Complete Web Development Course', org: 'Programming Hero', date: '2025 (6 Months)' },
    { title: 'Self-Learning & Practice in Web Development', org: 'Personal Projects, Online Resources, YouTube, Documentation', date: '2018 – Present' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-800">
      <div ref={resumeRef} className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="md:flex">
          {/* Left column */}
          <div className="md:w-1/3 bg-gradient-to-b from-indigo-600 to-indigo-400 text-white p-8">
            <div className="text-center">
              <div className="h-32 w-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={contact.photo} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <h1 className="mt-4 text-2xl font-semibold">{contact.name}</h1>
              <p className="mt-1 text-sm opacity-90">MERN Stack Developer</p>
            </div>

            <div className="mt-6 text-sm space-y-3">
              <div>
                <h4 className="font-medium">Contact</h4>
                <p className="text-xs mt-1">{contact.address}</p>
                <p className="text-xs">{contact.phone}</p>
                <p className="text-xs">{contact.email}</p>
              </div>

              <div className="mt-4">
                <h4 className="font-medium">Personal</h4>
                <p className="text-xs mt-1">Father: {contact.father}</p>
                <p className="text-xs">DOB: {contact.dob}</p>
              </div>

              <div className="mt-4">
                <h4 className="font-medium">Languages</h4>
                <p className="text-xs mt-1">Bangla (Native)</p>
                <p className="text-xs">English (Professional)</p>
              </div>

              <div className="mt-4">
                <h4 className="font-medium">Tools & Deployment</h4>
                <p className="text-xs mt-1">Git · GitHub · Vercel · Firebase Hosting</p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="md:w-2/3 p-8">
            <section>
              <h2 className="text-xl font-semibold">Career Objective</h2>
              <p className="mt-2 text-sm leading-relaxed">
                Motivated and detail-oriented MERN Stack Developer with expertise in building scalable and user-friendly
                applications using React.js, Node.js, Express.js, and MongoDB. Currently enhancing skills in Next.js and
                TypeScript to keep up with modern web development trends. Seeking a challenging position to apply technical
                knowledge, problem-solving abilities, and contribute to organizational success.
              </p>
            </section>

            <section className="mt-6">
              <h3 className="text-lg font-semibold">Education</h3>
              <div className="mt-3 space-y-3">
                {education.map((e, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{e.degree}</p>
                      <p className="text-xs">{e.institute}</p>
                    </div>
                    <div className="text-xs opacity-80">{e.year}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <h3 className="text-lg font-semibold">Technical Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 text-sm">
                <div>
                  <p className="font-medium">Frontend</p>
                  <p className="text-xs mt-1">{skills.frontend.join(' · ')}</p>
                </div>
                <div>
                  <p className="font-medium">Backend</p>
                  <p className="text-xs mt-1">{skills.backend.join(' · ')}</p>
                </div>
                <div>
                  <p className="font-medium">Database</p>
                  <p className="text-xs mt-1">{skills.database.join(' · ')}</p>
                </div>
                <div>
                  <p className="font-medium">Authentication</p>
                  <p className="text-xs mt-1">{skills.auth.join(' · ')}</p>
                </div>
                <div>
                  <p className="font-medium">Languages</p>
                  <p className="text-xs mt-1">{skills.languages.join(' · ')}</p>
                </div>
                <div>
                  <p className="font-medium">Tooling</p>
                  <p className="text-xs mt-1">{skills.tooling.join(' · ')}</p>
                </div>
              </div>
            </section>

            <section className="mt-6">
              <h3 className="text-lg font-semibold">Projects</h3>
              <div className="mt-3 space-y-4 text-sm">
                {projects.map((p, i) => (
                  <div key={i} className="p-4 rounded-lg border border-gray-100">
                    <h4 className="font-medium">{p.title}</h4>
                    <ul className="list-disc pl-5 mt-2 text-xs space-y-1">
                      {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <h3 className="text-lg font-semibold">Training & Courses</h3>
              <div className="mt-2 text-sm">
                {courses.map((c, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{c.title}</p>
                      <p className="text-xs">{c.org}</p>
                    </div>
                    <div className="text-xs opacity-80">{c.date}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <h3 className="text-lg font-semibold">Languages & Interests</h3>
              <p className="mt-2 text-sm">Bangla (Native) · English (Professional Proficiency)</p>
            </section>
          </div>
        </div>
      </div>

      {/* Google Drive Direct Download Button */}
      <div className="max-w-4xl mx-auto mt-6">
        <a
          href="https://drive.google.com/uc?export=download&id=1GFLgypz38eqpaY4IlOmgaSr8fHcmZD3U"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
