"use client"

import { useEffect, useState } from "react"
import { Star, GitFork, Calendar, MapPin, LinkIcon, Activity } from "lucide-react"
import GitHubCalendar from "react-github-calendar"

interface GitHubUser {
  name: string
  bio: string
  avatar_url: string
  location: string
  blog: string
  followers: number
  following: number
  public_repos: number
  created_at: string
}

interface Repository {
  id: number
  name: string
  description: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string
  html_url: string
  updated_at: string
}

interface LanguageStats {
  [key: string]: number
}

export default function GitHub() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<Repository[]>([])
  const [languages, setLanguages] = useState<LanguageStats>({})
  const [contributions, setContributions] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const username = "mohmmedlahlali20"

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`)
        const userData = await userResponse.json()
        setUser(userData)

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        const reposData = await reposResponse.json()
        setRepos(reposData)

        const languageStats: LanguageStats = {}
        reposData.forEach((repo: Repository) => {
          if (repo.language) {
            languageStats[repo.language] = (languageStats[repo.language] || 0) + 1
          }
        })
        setLanguages(languageStats)

        const totalContributions = reposData.reduce(
          (total: number, repo: Repository) => total + repo.stargazers_count + repo.forks_count,
          0,
        )
        setContributions(totalContributions)
      } catch (error) {
        console.error("Error fetching GitHub data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  function getMostPopularLanguage(langs: LanguageStats): string | null {
    const entries = Object.entries(langs)
    if (entries.length === 0) return null
    entries.sort((a, b) => b[1] - a[1])
    return entries[0][0]
  }

  const mostPopularLanguage = getMostPopularLanguage(languages)

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: "from-yellow-400 to-yellow-600",
      TypeScript: "from-blue-400 to-blue-600",
      Python: "from-green-400 to-green-600",
      HTML: "from-orange-400 to-orange-600",
      CSS: "from-blue-300 to-blue-500",
      React: "from-cyan-400 to-cyan-600",
    }
    return colors[language] || "from-gray-400 to-gray-600"
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-sm sm:text-base">Loading GitHub data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-4">
            GitHub Profile
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            My coding journey and contributions on GitHub
          </p>
        </div>

        {user && (
          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8 mb-8 sm:mb-12">
            {/* Profile Card - Mobile First */}
            <div className="glass-effect p-4 sm:p-6 rounded-xl text-center">
              <img
                src={user.avatar_url || "/placeholder.svg"}
                alt={user.name}
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full border-4 border-blue-500 mb-3 sm:mb-4"
              />
              <h2 className="text-xl sm:text-2xl font-bold text-white">{user.name}</h2>
              <p className="text-gray-400 mb-2 text-sm sm:text-base">@{username}</p>
              {user.bio && <p className="text-gray-300 mb-4 text-sm sm:text-base px-2">{user.bio}</p>}

              {/* User Info */}
              <div className="text-xs sm:text-sm space-y-2 mb-4">
                {user.location && (
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <MapPin size={14} className="sm:w-4 sm:h-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.blog && (
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <LinkIcon size={14} className="sm:w-4 sm:h-4" />
                    <a
                      href={user.blog}
                      className="hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Website
                    </a>
                  </div>
                )}
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Calendar size={14} className="sm:w-4 sm:h-4" />
                  <span>Joined {new Date(user.created_at).getFullYear()}</span>
                </div>
              </div>

              {/* Stats Grid - Responsive */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-gray-700">
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-white">{user.public_repos}</div>
                  <div className="text-xs text-gray-400">Repos</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-white">{user.followers}</div>
                  <div className="text-xs text-gray-400">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-white">{user.following}</div>
                  <div className="text-xs text-gray-400">Following</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-lg sm:text-xl font-bold text-white">
                    <Activity size={16} className="sm:w-5 sm:h-5" />
                    {contributions !== null ? contributions : "-"}
                  </div>
                  <div className="text-xs text-gray-400">Activity</div>
                </div>
              </div>
            </div>

            {/* Languages & Calendar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Most Popular Language */}
              {mostPopularLanguage && (
                <div className="text-center">
                  <div className="text-base sm:text-lg font-semibold text-white">
                    Most Popular Language:{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                      {mostPopularLanguage}
                    </span>
                  </div>
                </div>
              )}

              {/* Languages Stats */}
              <div className="glass-effect p-4 sm:p-6 rounded-xl">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white">Top Languages</h3>
                <div className="space-y-3 sm:space-y-4">
                  {Object.entries(languages)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([language, count]) => {
                      const total = Object.values(languages).reduce((a, b) => a + b, 0)
                      const percentage = (count / total) * 100
                      return (
                        <div key={language}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white font-medium">{language}</span>
                            <span className="text-gray-400">{count} repos</span>
                          </div>
                          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${getLanguageColor(language)} transition-all duration-1000`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>

                {/* GitHub Calendar - Mobile Responsive */}
                <div className="mt-6 sm:mt-8">
                  <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">Contribution Activity</h4>
                  <div className="overflow-x-auto">
                    <div className="min-w-[300px]">
                      <GitHubCalendar
                        username={username}
                        blockSize={window.innerWidth < 640 ? 10 : 15}
                        blockMargin={window.innerWidth < 640 ? 3 : 5}
                        color="#c084f5"
                        fontSize={window.innerWidth < 640 ? 12 : 16}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Repositories Section */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-white">Recent Repositories</h3>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="glass-effect p-4 sm:p-6 rounded-xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <h4 className="font-semibold text-base sm:text-lg text-white truncate pr-2">{repo.name}</h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                  >
                    <LinkIcon size={16} />
                  </a>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {repo.description || "No description available"}
                </p>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-2">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getLanguageColor(repo.language)}`} />
                        <span className="text-xs sm:text-sm">{repo.language}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1">
                      <Star size={14} />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={14} />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 pt-2 border-t border-gray-700">
                  Updated {new Date(repo.updated_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
