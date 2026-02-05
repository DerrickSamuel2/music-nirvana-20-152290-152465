# Music Nirvana 2.0 User Interface (Web, React)

This is the web-based user interface for Music Nirvana 2.0, a feature-rich music playing and streaming application.

## Key Features

- Home: Featured playlists, top charts, new releases
- Search: Songs, albums, artists
- Library: Playlists (CRUD), recently added, liked songs
- Profile: View/update info, user settings, accessibility preferences
- Persistent playback controls: Play, pause, skip, shuffle, repeat, volume
- Accessibility: Keyboard navigation, high color contrast, screen reader support, large touch targets
- API integration with backend

## Getting Started

1. `cd UserInterface(Web/Mobile)`
2. Install dependencies: `npm install`
3. Start local dev server: `npm start`
4. Set your `.env` as per `.env.example`

## Folder Structure

- `src/` - Main source code
    - `components/` - Navigation, player bar, shared UI
    - `pages/` - Pages for Home, Search, Library, Profile
    - `context/` - React context for Auth and Playback
    - `utils/` - API utilities
    - `theme.js` - Theming and accessibility

## API

This UI expects a backend as described in the product documentation. Configure the backend API URL via `REACT_APP_API_BASE_URL`.

## Accessibility

Built using MUI with WCAG color contrast, screen reader labels, keyboard navigation, and touch-friendly controls.

---
