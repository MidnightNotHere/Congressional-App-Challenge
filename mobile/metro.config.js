// Learn more https://docs.expo.dev/guides/monorepos/
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
// The shared /data directory lives one level up, at the repo root — outside
// Metro's default projectRoot. Metro only resolves/watches files inside
// watchFolders, so the repo root has to be added explicitly for
// `import ... from "../../data/ecosystem.js"` to work.
const workspaceRoot = path.resolve(projectRoot, "..");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];

// Prefer mobile/'s own node_modules first, then fall back to the repo
// root's — mirrors the standard Expo monorepo setup even though this repo
// only has one node_modules today (in mobile/), in case that changes.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

module.exports = config;
