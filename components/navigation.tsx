"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FolderOpen, Award, User, Github } from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/skills", label: "Skills", icon: Award },
  { href: "/about", label: "About", icon: User },
  { href: "/github", label: "GitHub", icon: Github },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            ML
          </Link>
          <div className="hidden md:flex space-x-8">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  pathname === href ? "bg-white/20 text-white" : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </div>
          <div className="md:hidden flex space-x-4">
            {navItems.map(({ href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  pathname === href ? "bg-white/20 text-white" : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
