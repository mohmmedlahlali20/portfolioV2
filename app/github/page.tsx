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

        // Calculate language stats
        const languageStats: LanguageStats = {}
        reposData.forEach((repo: Repository) => {
          if (repo.language) {
            languageStats[repo.language] = (languageStats[repo.language] || 0) + 1
          }
        })
        setLanguages(languageStats)

        // Dummy contributions calculation: sum of stars + forks on fetched repos
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
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading GitHub data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            GitHub Profile
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">My coding journey and contributions on GitHub</p>
        </div>

        {user && (
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="glass-effect rounded-xl p-8 text-center">
                <img
                  src={user.avatar_url || "/placeholder.svg"}
                  alt={user.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-blue-400"
                />
                <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
                <p className="text-gray-400 mb-4">@{username}</p>
                {user.bio && <p className="text-gray-300 mb-6">{user.bio}</p>}

                <div className="space-y-3 text-sm">
                  {user.location && (
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                      <MapPin size={16} />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.blog && (
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                      <LinkIcon size={16} />
                      <a href={user.blog} className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                        Website
                      </a>
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <Calendar size={16} />
                    <span>Joined {new Date(user.created_at).getFullYear()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-700">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{user.public_repos}</div>
                    <div className="text-xs text-gray-400">Repos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{user.followers}</div>
                    <div className="text-xs text-gray-400">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{user.following}</div>
                    <div className="text-xs text-gray-400">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-xl font-bold text-white">
                      <Activity size={18} />
                      {contributions !== null ? contributions : "-"}
                    </div>
                    <div className="text-xs text-gray-400">Contributions*</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              {mostPopularLanguage && (
                <div className="mb-6 text-white font-semibold text-lg text-center">
                  Most Popular Language: <span className="underline">{mostPopularLanguage}</span>
                </div>
              )}

              <div className="glass-effect rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Most Used Languages</h3>
                <div className="space-y-4">
                  {Object.entries(languages)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([language, count]) => {
                      const percentage = (count / Object.values(languages).reduce((a, b) => a + b, 0)) * 100
                      return (
                        <div key={language} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">{language}</span>
                            <span className="text-gray-400">{count} repos</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${getLanguageColor(language)} rounded-full transition-all duration-1000`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>

                <div className="mt-10">
                  <GitHubCalendar
                    username="mohmmedlahlali20"
                    blockSize={15}
                    blockMargin={5}
                    color="#c084f5"
                    fontSize={16}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Recent Repositories</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <div key={repo.id} className="glass-effect rounded-xl p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white truncate">{repo.name}</h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <LinkIcon size={16} />
                  </a>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {repo.description || "No description available"}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getLanguageColor(repo.language)}`} />
                        {repo.language}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
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

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <span className="text-xs text-gray-500">
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Contributions Summary</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 text-white rounded-lg">
                <thead>
                  <tr>
                    <th className="py-3 px-6 text-left border-b border-gray-700">Repository</th>
                    <th className="py-3 px-6 text-left border-b border-gray-700">Stars</th>
                    <th className="py-3 px-6 text-left border-b border-gray-700">Forks</th>
                    <th className="py-3 px-6 text-left border-b border-gray-700">Watchers</th>
                    <th className="py-3 px-6 text-left border-b border-gray-700">Total Contributions</th>
                  </tr>
                </thead>
                <tbody>
                  {repos.map(repo => {
                    const totalContributions = repo.stargazers_count + repo.forks_count + repo.watchers_count;
                    return (
                      <tr key={repo.id} className="border-b border-gray-700 hover:bg-gray-700">
                        <td className="py-3 px-6">{repo.name}</td>
                        <td className="py-3 px-6">{repo.stargazers_count}</td>
                        <td className="py-3 px-6">{repo.forks_count}</td>
                        <td className="py-3 px-6">{repo.watchers_count}</td>
                        <td className="py-3 px-6 font-bold">{totalContributions}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
