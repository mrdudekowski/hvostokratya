import { spawnSync } from "node:child_process";

const result = spawnSync("pnpm", ["exec", "next", "build"], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    GITHUB_PAGES: "true",
  },
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
