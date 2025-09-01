#!/usr/bin/env node
/**
 * Ensures critical deps are present before running build/start to avoid
 * "Module not found: Can't resolve 'react-router-dom'".
 */
const { execSync } = require('child_process');

const critical = ['react-router-dom@6.26.1'];

function ensure(pkg) {
  try {
    const name = pkg.split('@')[0];
    require.resolve(name);
    console.log(`[deps] OK: ${name}`);
  } catch (e) {
    console.warn(`[deps] Missing: ${pkg}. Installing...`);
    try {
      execSync(`npm install ${pkg} --no-audit --no-fund --legacy-peer-deps`, {
        stdio: 'inherit',
      });
      console.log(`[deps] Installed: ${pkg}`);
    } catch (e2) {
      console.error(`[deps] Failed to install ${pkg}:`, e2.message);
      process.exit(1);
    }
  }
}

critical.forEach(ensure);
