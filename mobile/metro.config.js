// Learn more https://docs.expo.dev/guides/monorepos/
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
// The shared /data directory lives one level up, at the repo root — outside
// Metro's default projectRoot. Metro's file-map crawler on this repo
// (Windows, path containing spaces, OneDrive-synced) does not reliably
// discover files reached only via `watchFolders` pointed at an ancestor
// directory — `../../data/x.js` imports resolve inconsistently even with
// the parent added to watchFolders. `mobile/data` is a directory junction
// (see below) to the real /data folder, so it stays inside projectRoot and
// Metro crawls it normally; `unstable_enableSymlinks` makes Metro follow
// the junction to the real files on disk.
const workspaceRoot = path.resolve(projectRoot, "..");

const config = getDefaultConfig(projectRoot);

config.resolver.unstable_enableSymlinks = true;

// Prefer mobile/'s own node_modules first, then fall back to the repo
// root's — mirrors the standard Expo monorepo setup even though this repo
// only has one node_modules today (in mobile/), in case that changes.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

module.exports = config;
