// Live GitHub stats using the public GitHub REST API - no auth token required
// for basic public profile + repo data (rate-limited to 60 req/hr per IP by GitHub).
export async function getGithubStats(req, res, next) {
  try {
    const username = req.params.username || 'Shenbagapriyaa';
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
    ]);

    if (!userRes.ok) {
      return res.status(userRes.status).json({ message: 'GitHub user not found' });
    }

    const user = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];

    const languageCounts = {};
    repos.forEach(r => {
      if (r.language) languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;
    });

    res.json({
      username: user.login,
      name: user.name,
      avatarUrl: user.avatar_url,
      bio: user.bio,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      profileUrl: user.html_url,
      topLanguages: Object.entries(languageCounts).sort((a, b) => b[1] - a[1]).slice(0, 6),
      topRepos: repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
        .map(r => ({
          name: r.name,
          description: r.description,
          url: r.html_url,
          stars: r.stargazers_count,
          language: r.language
        }))
    });
  } catch (err) { next(err); }
}
