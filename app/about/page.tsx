"use client"

import {  Code, Briefcase, GraduationCap, Globe } from "lucide-react"

const timeline = [
  {
    year: "2025",
    title: "Intern Full Stack Developer",
    company: "IPPON Technologies",
    description: "Worked on modern web solutions and collaborative development using Agile methodologies during a 3-month internship.",
    type: "work",
  },
  {
    year: "2024",
    title: "Intern Full Stack Developer",
    company: "MedaiZain - buinco",
    description: "Completed a 2-month internship focused on building and optimizing web interfaces using React and Node.js.",
    type: "work",
  },
  {
    year: "2023 - 2025",
    title: "Full Stack Web Development Program",
    company: "YouCode",
    description: "Completed a two-year intensive program covering both frontend and backend development, project-based learning and agile methodologies.",
    type: "education",
  },
  {
    year: "2023",
    title: "Baccalauréat in Science and Technology – Electrical Engineering",
    company: "High School",
    description: "Graduated with a strong foundation in applied sciences and electrical systems.",
    type: "education",
  },
]


const stats = [
  { label: "Projects Completed", value: "50+", icon: Code }, 
  { label: "Internship Experience", value: "5 months", icon: Briefcase },
  { label: "Tech Stack Mastered", value: "10+", icon: GraduationCap },
  { label: "Collaborated With Teams", value: "3+", icon: Globe },
];
export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get to know more about my journey and passion for development
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="glass-effect rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Who I Am</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I'm a passionate and versatile full-stack developer with hands-on experience in building modern web and mobile applications. I have worked with a wide range of technologies including React Native, React.js, Vue.js, Next.js, NestJS, Express.js, Flask, and Laravel.
                </p>
                <p>
                  I’m proficient in using databases like MongoDB, MySQL, and PostgreSQL, and I also work with tools like Docker, MinIO, and CI/CD pipelines to streamline development and deployment processes. I follow a modular and scalable project architecture, often using a monorepo structure.
                </p>
                <p>
                  Over time, I’ve contributed to several full-featured projects such as e-commerce apps, media streaming platforms, and event management systems. I constantly seek to improve my skills and stay up-to-date with the latest technologies, while also preparing for professional certifications like the AWS Certified Developer – Associate.
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => {
                const IconComponent = stat.icon
                return (
                  <div key={stat.label} className="glass-effect rounded-xl p-6 text-center">
                    <IconComponent className="mx-auto mb-3 text-blue-400" size={32} />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column - Timeline */}
          <div className="glass-effect rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-white">My Journey</h2>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="relative pl-8">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"></div>
                  {index < timeline.length - 1 && (
                    <div className="absolute left-2 top-4 w-0.5 h-16 bg-gradient-to-b from-blue-400 to-purple-600 opacity-30"></div>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-blue-400 font-semibold">{item.year}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          item.type === "work" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.company}</p>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
