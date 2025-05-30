"use client"

import { useState } from "react"
import Image from "next/image"
import PetsWave from '@/public/projects/petsWave.png'
import MyVod from '@/public/projects/MyVod.png'
import gestion from '@/public/projects/CineManager.png'
import WareHouse from '@/public/projects/Warehouse_Management.png'
import { ExternalLink, Github } from "lucide-react"
const projects = [
  {
    id: 1,
    title: "PetsWave",
    description:
      "PetsWave is a full-stack e-commerce mobile application designed for pet lovers. It allows users to browse, purchase, and manage pet-related products. The platform features user authentication, cart management, Stripe payments, admin dashboard, and media upload support with MinIO.",
    image: PetsWave,
    technologies: [
      "React Native (Expo)",
      "React (Admin Panel)",
      "Node.js",
      "NestJS",
      "MongoDB",
      "MinIO",
      "Stripe",
      "Docker",
      "CI/CD",
    ],
    github: "https://github.com/yourusername/petswave",
    demo: "https://demo.com",
    category: "Mobile application",
  },
  {
    id: 2,
    title: "MyVod",
    description:
      "MyVod is a cross-platform cinema application that allows users to browse movies, watch trailers, book tickets for showtimes, and stream online content. It includes user authentication, responsive UI, ticket management, and streaming features. Media is handled using MinIO, and the app supports real-time updates using WebSockets.",
    image: MyVod,
    technologies: [
      "React Native (Expo)",
      "NestJS",
      "MongoDB",
      "MinIO",
      "JWT",
      "Socket.io",
      "Tailwind CSS",
    ],
    github: "https://github.com/yourusername/myvod",
    demo: "https://myvod-demo.com",
    category: "Full Stack",
  },
  {
    id: 3,
    title: "EventManager",
    description:
      "EventManager is a web application to manage events, allowing users to create, update, and delete events with user authentication and admin dashboard. Built with React.js frontend and NestJS backend using MongoDB and JWT authentication.",
    image: gestion,
    technologies: [
      "React.js",
      "NestJS",
      "MongoDB",
      "JWT",
      "Tailwind CSS",
    ],
    github: "https://github.com/yourusername/eventmanager",
    demo: "https://eventmanager-demo.com",
    category: "Full Stack",
  },
  {
    id: 4,
    title: "Warehouse Management",
    description:
      "Mobile app for inventory and stock management with notifications and product tracking, developed using React Native.",
    image: WareHouse,
    technologies: [
      "React Native",
      "Firebase",
      "Push Notifications",
    ],
    github: "https://github.com/yourusername/warehouse_management",
    demo: "https://warehouse-demo.com",
    category: "Mobile application",
  },
//   {
//     id: 5,
//     title: "Jadwali SaaS",
//     description:
//       "SaaS for timetable and scheduling management with JWT authentication and modern UI built using React, Next.js, NestJS, and Tailwind CSS.",
//     image: "/placeholder.svg?height=200&width=300",
//     technologies: [
//       "React",
//       "Next.js",
//       "NestJS",
//       "JWT",
//       "Tailwind CSS",
//     ],
//     github: "https://github.com/yourusername/jadwali_saas",
//     demo: "https://jadwali-demo.com",
//     category: "SaaS",
//   },
//   {
//     id: 6,
//     title: "Real-Time Chat API",
//     description:
//       "Backend API built with Express.js and Socket.io for real-time chat functionalities, user and message management, secured with JWT authentication.",
//     image: "/placeholder.svg?height=200&width=300",
//     technologies: [
//       "Express.js",
//       "Socket.io",
//       "JWT",
//     ],
//     github: "https://github.com/yourusername/realtime_chat_api",
//     demo: "https://chatapi-demo.com",
//     category: "Backend",
//   },
//   {
//     id: 7,
//     title: "School Management System",
//     description:
//       "Backend system built with Fastify and TypeScript for managing students, teachers, courses, and authentication with admin dashboards.",
//     image: "/placeholder.svg?height=200&width=300",
//     technologies: [
//       "Fastify",
//       "TypeScript",
//       "MongoDB",
//       "JWT",
//     ],
//     github: "https://github.com/yourusername/school_management_system",
//     demo: "https://school-demo.com",
//     category: "Backend",
//   },
 ]

const categories = ["All", "Full Stack", "Frontend", "Mobile application"]

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A collection of projects showcasing my skills and passion for development
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${selectedCategory === category
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                : "glass-effect text-gray-300 hover:text-white hover:bg-white/20"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-effect rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <Github size={16} />
                    <span className="text-sm">Code</span>
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm">Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
