"use client"

import { Calendar, MapPin, Award, Coffee } from "lucide-react"

const timeline = [
  {
    year: "2024",
    title: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    description: "Leading development of enterprise applications using React, Node.js, and cloud technologies.",
    type: "work",
  },
  {
    year: "2023",
    title: "Full Stack Developer",
    company: "Digital Agency",
    description: "Developed multiple client projects including e-commerce platforms and web applications.",
    type: "work",
  },
  {
    year: "2022",
    title: "Frontend Developer",
    company: "Startup Hub",
    description: "Specialized in React development and UI/UX implementation for various startup projects.",
    type: "work",
  },
  {
    year: "2021",
    title: "Computer Science Degree",
    company: "University",
    description: "Graduated with honors, focusing on software engineering and web technologies.",
    type: "education",
  },
]

const stats = [
  { label: "Years of Experience", value: "3+", icon: Calendar },
  { label: "Projects Completed", value: "50+", icon: Award },
  { label: "Cups of Coffee", value: "1000+", icon: Coffee },
  { label: "Countries Worked", value: "5", icon: MapPin },
]

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
          {/* Personal Info */}
          <div className="space-y-6">
            <div className="glass-effect rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Who I Am</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I'm a passionate full-stack developer with over 3 years of experience creating innovative web
                  solutions. My journey started with a curiosity about how websites work, and it has evolved into a deep
                  love for crafting exceptional digital experiences.
                </p>
                <p>
                  I specialize in modern JavaScript frameworks, particularly React and Node.js, and I'm always eager to
                  learn new technologies. I believe in writing clean, maintainable code and creating user-centered
                  designs.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                  or sharing knowledge with the developer community.
                </p>
              </div>
            </div>

            {/* Stats */}
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

          {/* Timeline */}
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
