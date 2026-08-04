#!/usr/bin/env node
/* Creates mobile/data as a link to the shared /data layer at the repo root.
   Metro's file-map crawler doesn't reliably discover files reached only via
   watchFolders pointed at an ancestor directory (observed on Windows/OneDrive
   with a spaced path); keeping the shared files reachable inside mobile/'s
   own project root sidesteps that. Not committed (see .gitignore) — this
   script recreates it on every `npm install` so a fresh clone works. */

const fs = require("fs");
const path = require("path");

const target = path.resolve(__dirname, "..", "..", "data");
const linkPath = path.resolve(__dirname, "..", "data");

if (!fs.existsSync(target)) {
  console.warn(`[link-data] shared /data folder not found at ${target}, skipping`);
  process.exit(0);
}

if (fs.existsSync(linkPath)) {
  const stat = fs.lstatSync(linkPath);
  if (stat.isSymbolicLink()) {
    process.exit(0);
  }
  console.warn(`[link-data] ${linkPath} already exists and is not a symlink — leaving it alone`);
  process.exit(0);
}

try {
  fs.symlinkSync(target, linkPath, process.platform === "win32" ? "junction" : "dir");
  console.log(`[link-data] linked mobile/data -> ${target}`);
} catch (err) {
  console.warn(`[link-data] failed to create link: ${err.message}`);
}
