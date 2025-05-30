"use client"

import { useState } from "react"
import { Database, Globe, Smartphone, Settings } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend",
    icon: Globe,
    skills: [
      { name: "React", level: 90, color: "from-sky-400 to-sky-600" },
      { name: "Next.js", level: 85, color: "from-neutral-500 to-neutral-700" },
      { name: "Vue.js", level: 80, color: "from-emerald-400 to-emerald-600" },
      { name: "Redux", level: 80, color: "from-purple-500 to-purple-700" },
      { name: "Vite.js", level: 75, color: "from-yellow-400 to-pink-500" },
      { name: "TypeScript", level: 80, color: "from-blue-500 to-blue-700" },
      { name: "Tailwind CSS", level: 95, color: "from-cyan-400 to-cyan-600" },
      { name: "HTML", level: 100, color: "from-orange-500 to-orange-700" },
      { name: "CSS", level: 90, color: "from-blue-400 to-blue-600" },
    ],
  },
  {
    title: "Backend",
    icon: Database,
    skills: [
      { name: "Node.js", level: 85, color: "from-green-500 to-green-700" },
      { name: "NestJS", level: 80, color: "from-red-500 to-red-700" },
      { name: "Express.js", level: 85, color: "from-zinc-400 to-zinc-600" },
      { name: "Python", level: 80, color: "from-yellow-400 to-yellow-600" },
      { name: "Flask", level: 70, color: "from-gray-400 to-gray-600" },
      { name: "PHP", level: 75, color: "from-indigo-400 to-indigo-600" },
      { name: "Laravel", level: 80, color: "from-red-400 to-red-600" },
      { name: "MongoDB", level: 75, color: "from-emerald-500 to-emerald-700" },
      { name: "PostgreSQL", level: 70, color: "from-indigo-500 to-indigo-700" },
      { name: "MySQL", level: 70, color: "from-sky-500 to-sky-700" },
    ],
  },
  {
    title: "Mobile",
    icon: Smartphone,
    skills: [
      { name: "React Native", level: 75, color: "from-purple-500 to-purple-700" },
      { name: "Expo", level: 80, color: "from-indigo-400 to-indigo-600" },
    ],
  },
  {
    title: "Tools & Others",
    icon: Settings,
    skills: [
      { name: "Git", level: 90, color: "from-amber-500 to-amber-700" },
      { name: "GitHub", level: 85, color: "from-gray-700 to-black" },
      { name: "Docker", level: 70, color: "from-blue-500 to-blue-700" },
      { name: "Postman", level: 80, color: "from-orange-500 to-orange-700" },
      { name: "Swagger", level: 75, color: "from-lime-400 to-lime-600" },
      { name: "Jest", level: 80, color: "from-rose-400 to-rose-600" },
      { name: "JWT", level: 75, color: "from-yellow-500 to-yellow-700" },
      { name: "phpMyAdmin", level: 65, color: "from-orange-300 to-orange-500" },
      { name: "MinIO", level: 70, color: "from-red-400 to-red-600" },
      { name: "Apache", level: 70, color: "from-stone-500 to-stone-700" },
      { name: "UML", level: 60, color: "from-slate-400 to-slate-600" },
      { name: "NPM", level: 85, color: "from-red-500 to-red-700" },
      { name: "PNPM", level: 80, color: "from-yellow-500 to-yellow-700" },
      { name: "Ubuntu", level: 80, color: "from-orange-600 to-orange-800" },
      { name: "Jira", level: 70, color: "from-blue-400 to-blue-600" },
    ],
  },
];


export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState(0)

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            My Skills
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Technologies and tools I use to bring ideas to life</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {skillCategories.map((category, index) => {
                const IconComponent = category.icon
                return (
                  <button
                    key={category.title}
                    onClick={() => setSelectedCategory(index)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                      selectedCategory === index
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "glass-effect text-gray-300 hover:text-white hover:bg-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent size={24} />
                      <span className="font-semibold">{category.title}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="glass-effect rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-8 text-white">{skillCategories[selectedCategory].title} Skills</h2>

              <div className="space-y-6">
                {skillCategories[selectedCategory].skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{
                          width: `${skill.level}%`,
                          animationDelay: `${index * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
