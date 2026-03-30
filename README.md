RUN INSTRUCTIONS

Prerequisites
- Node.js (LTS recommended, v18+). Verify with: node -v
- npm (comes with Node). Verify with: npm -v

Install dependencies
1. Open a terminal in the project root (where package.json is).
2. Run:

   npm install

Run development server
- Start dev server:

  npm run dev

- Open in browser: http://localhost:5173/
- To expose on LAN: npm run dev -- --host
- To change port: npm run dev -- --port 3000

Build & preview
- Build production bundle:

  npm run build

- Preview production build locally:

  npm run preview

Linting
- Run ESLint:

  npm run lint

Troubleshooting
- If a dependency fails to install, delete node_modules and package-lock.json then re-run `npm install`.
- If port 5173 is in use, run dev with a different port: `npm run dev -- --port 3001`.
- To fix audit issues: `npm audit fix` (review before applying major changes).
- On Windows PowerShell, run commands from the project folder and ensure you have permission to install global packages if needed.

Project structure notes
- Source: src/
- Static assets: public/
- Scripts and utilities: JS/
- Data patches: DATA/

Other
- To build for deployment, run `npm run build` and deploy the contents of the `dist/` folder produced by Vite.
- If you want me to open the site in your browser or create a README.md variant, tell me which you prefer.
