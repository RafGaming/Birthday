# Birthday — Premium Interactive Celebration (Starter)

This repository contains a premium, interactive birthday website scaffold (Vite + React). It includes an elegant UI with glassmorphism, neon glow accents, animated particles, a hero with cake and countdown, gift boxes, a masonry gallery with lightbox, a message wall (Supabase stub + localStorage fallback), a timeline, confetti utility, and an animated footer.

Quick start
1. Clone the repo and switch to the feature branch (if provided):
   - git clone git@github.com:RafGaming/Birthday.git
   - cd Birthday
2. Install dependencies:
   - npm install
3. Start dev server:
   - npm run dev
4. Open the URL printed by Vite (usually http://localhost:5173).

Supabase (optional)
- To enable remote persistence for the Message Wall, create a Supabase project and table:
  - Table name: `messages`
  - Columns:
    - id: UUID (or serial) primary key
    - name: text
    - text: text
    - created_at: timestamp with default `now()`
- Configure environment variables locally:
  - Create `.env.local` at the project root with:
    VITE_SUPABASE_URL=https://your-project.supabase.co
    VITE_SUPABASE_ANON_KEY=your-anon-key
- If the env vars are missing or Supabase cannot be reached, the app falls back to a localStorage-based demo.

Placeholders / assets
- This starter references placeholders under `public/assets/`:
  - `public/assets/birthday-melody.mp3` (replace with your audio)
  - `public/assets/photos/photo1.jpg` … `photo6.jpg` (replace with your images)
- There is a `public/assets/PLACEHOLDERS.md` describing which assets to add.

Accessibility & perf notes
- The project attempts to follow accessibility best practices (semantic HTML, aria attributes, keyboard navigation for interactive elements).
- Respect the `prefers-reduced-motion` setting (CSS media-query).
- For production, compress and convert images to WebP, and tune particle counts for mobile.

Development notes
- Tech: React 18 + Vite, Framer Motion for animations, minimal vanilla canvas for particles & confetti.
- To swap message backend to Supabase, configure `.env.local` and restart dev server.

If you want, I can:
- Add CI or deployment guidance,
- Integrate Supabase setup scripts,
- Replace placeholders with provided assets (if you upload them).

Enjoy building the birthday experience! 🎉
