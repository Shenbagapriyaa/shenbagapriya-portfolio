import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaCodeBranch } from "react-icons/fa";
import { profile } from "../data/profile.js";

export default function GithubStats() {
  const [stats, setStats] = useState(null);

  const fallbackStats = {
    publicRepos: 11,
    topLanguages: [
      ["JavaScript", 1],
      ["Python", 1],
      ["TypeScript", 1],
      ["HTML", 1],
      ["CSS", 1],
    ],
    topRepos: [
      {
        id: 1,
        name: "3D_CAD-File-Analyzer",
        description: "Python based 3D CAD file analyzer.",
        stargazers_count: 0,
        forks_count: 0,
        language: "Python",
        html_url:
          "https://github.com/Shenbagapriyaa/3D_CAD-File-Analyzer",
      },
      {
        id: 2,
        name: "Alumni-Management-System",
        description: "Full-stack Alumni Management System.",
        stargazers_count: 0,
        forks_count: 0,
        language: "JavaScript",
        html_url:
          "https://github.com/Shenbagapriyaa/Alumni-Management-System",
      },
      {
        id: 3,
        name: "Restaurant-Booking-Website",
        description: "Restaurant booking website.",
        stargazers_count: 0,
        forks_count: 0,
        language: "JavaScript",
        html_url:
          "https://github.com/Shenbagapriyaa/Restaurant-Booking-Website",
      },
      {
        id: 4,
        name: "URL-Shortener",
        description: "URL shortener web application.",
        stargazers_count: 0,
        forks_count: 0,
        language: "JavaScript",
        html_url:
          "https://github.com/Shenbagapriyaa/URL-Shortener",
      },
    ],
  };

  useEffect(() => {
    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(
            `https://api.github.com/users/${profile.githubUsername}`
          ),
          fetch(
            `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=100`
          ),
        ]);

        if (!userRes.ok) {
          throw new Error("GitHub API unavailable");
        }

        const user = await userRes.json();
        const repos = reposRes.ok ? await reposRes.json() : [];

        const languageCounts = {};

        repos.forEach((repo) => {
          if (repo.language) {
            languageCounts[repo.language] =
              (languageCounts[repo.language] || 0) + 1;
          }
        });

        setStats({
          publicRepos: user.public_repos,
          topLanguages: Object.entries(languageCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5),
          topRepos: repos
            .sort(
              (a, b) =>
                b.stargazers_count - a.stargazers_count
            )
            .slice(0, 4),
        });
      } catch (err) {
        console.log("Using saved GitHub data");
        setStats(fallbackStats);
      }
    }

    load();
  }, []);

  return (
    <div className="mt-16">
      <h3 className="font-display font-bold text-xl mb-6">
        Live from GitHub
      </h3>

      {!stats && (
        <p className="text-slate text-sm">
          Loading GitHub activity...
        </p>
      )}

      {stats && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid sm:grid-cols-3 gap-5 mb-6"
          >
            <div className="glass rounded-2xl p-5 text-center">
              <b className="font-display text-2xl font-extrabold">
                {stats.publicRepos}
              </b>
              <span className="block text-xs text-slate mt-1">
                Public Repositories
              </span>
            </div>

            <div className="glass rounded-2xl p-5 text-center">
              <b className="font-display text-2xl font-extrabold">
                {stats.topRepos.length}
              </b>
              <span className="block text-xs text-slate mt-1">
                Featured Projects
              </span>
            </div>

            <div className="glass rounded-2xl p-5 text-center">
              <b className="font-display text-2xl font-extrabold">
                {stats.topLanguages.length}
              </b>
              <span className="block text-xs text-slate mt-1">
                Languages Used
              </span>
            </div>
          </motion.div>

          {stats.topRepos.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-4">
              {stats.topRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass rounded-2xl p-4 hover:-translate-y-1 transition-transform"
                >
                  <p className="font-semibold text-sm">
                    {repo.name}
                  </p>

                  <p className="text-xs text-slate mt-1 line-clamp-2">
                    {repo.description ||
                      "No description provided."}
                  </p>

                  <div className="flex items-center gap-4 mt-3 text-xs text-slate">
                    <span className="flex items-center gap-1">
                      <FaStar size={11} />
                      {repo.stargazers_count}
                    </span>

                    <span className="flex items-center gap-1">
                      <FaCodeBranch size={11} />
                      {repo.forks_count}
                    </span>

                    {repo.language && (
                      <span className="tag">
                        {repo.language}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}