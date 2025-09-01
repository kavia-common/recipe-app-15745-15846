# WebFrontend Dependency Installation & Build Notes

- Use Node 18 LTS or Node 20 LTS. react-scripts 5 is not compatible with Node 22.
- Fresh install:
  - rm -rf node_modules package-lock.json
  - npm cache clean --force
  - npm install
- If you see Browserslist data out of date warnings, optionally run:
  - npx update-browserslist-db@latest
- If build fails with "Module not found: Can't resolve 'react-router-dom'":
  - Ensure npm install completed successfully (no network outages).
  - We pin react-router-dom to 6.26.1 which is compatible with React 18 and react-scripts 5.
  - Delete node_modules and package-lock.json, then npm install again.
