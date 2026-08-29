export const toolchain = [
  ['codeforces', 'Codeforces', 'CONTESTS', 'competitive', 'https://codeforces.com'],
  ['leetcode', 'LeetCode', 'DSA / PRACTICE', 'competitive', 'https://leetcode.com'],
  ['codechef', 'CodeChef', 'COMPETITIVE', 'competitive', 'https://www.codechef.com'],
  ['github', 'GitHub', 'OPEN SOURCE', 'development', 'https://github.com'],
  ['react', 'React', 'FRONTEND', 'development', 'https://react.dev'],
  ['docker', 'Docker', 'CONTAINERS', 'devops', 'https://www.docker.com'],
  ['nodedotjs', 'Node.js', 'BACKEND', 'development', 'https://nodejs.org'],
  ['djangoproject', 'Django', 'BACKEND', 'development', 'https://www.djangoproject.com'],
  ['githubactions', 'GitHub Actions', 'CI / CD', 'devops', 'https://github.com/features/actions'],
];

export const orbit = { p: 220, e: 0, G: 1, M: 1 };
export const orbitRadius = orbit.p / (1 - orbit.e ** 2);
export const orbitalVelocity = Math.sqrt((orbit.G * orbit.M) / orbitRadius);
