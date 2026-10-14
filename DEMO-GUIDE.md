# Class Demo Guide: Superhero Punchlines

A 5-minute walkthrough of the AI development setup used to build this app.

## What to explain

1. **Claude as an AI coding agent.** The whole app was built by giving Claude one detailed assignment prompt. Claude planned the architecture, wrote every file, installed packages, ran builds, tested the built app with an automated (headless) browser, and fixed what it found.
2. **Selecting the local project folder.** In the Claude desktop app, the folder `C:\School Documents\Mobile Web\Homework 6\Joke Generator` was connected to the conversation. That gives the agent permission to read and write only inside that folder (it had to ask before it was allowed to delete files).
3. **How the agent creates and edits many files.** The agent writes each file directly into the folder (about 35 source files across `src/components`, `src/pages`, `src/hooks`, `src/data`, `src/utils`, `src/types`, `src/styles`) and edits them again when testing reveals a problem.
4. **The project lives on the laptop.** Everything (source, `node_modules`, and the `deploy` build) is a normal folder on the Windows drive. No Git or other source control is used, and it all works without the Claude conversation.
5. **Commands run locally.** The agent runs `npm install` and `npm run build` in a small Linux shell that the Claude desktop app runs on the laptop, with the project folder mounted inside it. Dependencies were installed with Windows versions of the build tools, so you can run the same commands yourself in PowerShell.
6. **How `deploy` is generated.** `npm run build` runs `tsc -b` (TypeScript check), then `vite build`. `vite.config.ts` sets `build.outDir: 'deploy'`, so the minified HTML, CSS, JS and fonts land in `deploy/`.
7. **Publishing to Firebase.** `firebase.json` points Hosting at `deploy` and rewrites every route to `index.html`, so React Router pages like `/settings` still work after a refresh. `firebase deploy` uploads the folder.

## Live demo sequence (about 5 minutes)

1. **Show the setup (1 min).** Open the Claude desktop app and show the conversation with the assignment prompt and the connected folder.
2. **Show the files (1 min).** Open the project folder in File Explorer or VS Code. Point out `src/` (source), `src/data/jokes.ts` (the joke list), `vite.config.ts` (`outDir: 'deploy'`), and `firebase.json` (`"public": "deploy"`). Mention there is no `.git` folder.
3. **Build it live (1 min).** In PowerShell, inside the project folder:
   ```powershell
   cd "C:\School Documents\Mobile Web\Homework 6\Joke Generator"
   npm run build
   ```
   Show the new files appearing in `deploy\`.
4. **Deploy it live (30 sec, optional).**
   ```powershell
   firebase deploy
   ```
   Point out the "Hosting URL" Firebase prints.
5. **Tour the app (1.5 min)** on the Firebase URL, ideally on a phone or with the browser in mobile view:
   - Pick **Marvel**, **DC**, **Marvel vs. DC**, then **Random**.
   - **Reveal** a punchline, **Favorite** it, and **Copy** it.
   - Open **Favorites**, then reopen a saved joke.
   - In **Settings**, switch to the **Night patrol** theme and turn on auto-reveal. Refresh the page to show the settings persist.
   - Visit **About** and **Help**. Refresh on `/help` to show direct routes work.
6. **Show a quick AI edit (optional, 30 sec).** Ask Claude something small, like "add one more Spider-Man joke", then rebuild and refresh.

## Talking points if asked

- **Framework / UI library:** React, plus daisyUI (a Tailwind CSS component library). daisyUI provides the theme system, toggles, radio buttons, select, modal dialog, FAQ collapses, alerts, toasts, badges and kbd keys. The comic look is custom CSS layered on top.
- **Why no API:** All 72 jokes are in a local TypeScript file, so the app works offline after loading and can't break if a joke service goes down.
- **No repeats:** Each category is shuffled like a deck, so every joke shows once before any repeat, and never twice in a row.
- **Persistence:** Favorites and settings are saved in the browser's localStorage.
- **Accessibility:** Keyboard navigation, visible focus outlines, screen-reader announcements, reduced-motion support, and large touch targets.
