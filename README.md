# QuickNotes

QuickNotes is a lightweight browser-based note-taking app for quickly capturing and organizing short thoughts. Notes can be grouped by category, searched instantly, and stored in the browser so they remain available after the page is refreshed.

## Features

- Add notes of up to 200 characters.
- Organize notes into Personal, Work, and Study categories.
- Search notes as you type.
- Delete notes that are no longer needed.
- See an accurate count of all saved notes.
- Keep notes between browser sessions with local storage.
- Use the responsive interface on desktop and mobile screens.

## Run locally

No packages or build tools are required.

1. Clone or download this repository.
2. Open the project folder.
3. Open `index.html` in a web browser.

For a local development server, run the following command from the project folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## What I learned

- How to build an accessible page with semantic HTML and correctly linked form labels.
- How to create a responsive card layout using Flexbox, Grid, and media queries.
- How to render user-provided content safely with `createElement` and `textContent`.
- How to model notes as JavaScript objects and update the interface from an array.
- How to save and restore application data with JSON and `localStorage`.
