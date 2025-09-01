# Recipe App — Web Frontend (React)

A responsive, accessible (WCAG 2.1 AA) React app for discovering, creating, organizing, and sharing recipes with meal planning, shopping lists, and social features.

## Features

- Authentication: email login/registration, session persistence, profile & privacy settings
- Recipes: browse/search with filters, detail pages, create/edit, organize into collections
- Meal Planning: weekly planner with breakfast/lunch/dinner entries
- Shopping Lists: generate from meal plan, view items
- Social: community feed, ratings, comments, follow/unfollow
- Accessibility: semantic structure, skip link, labels, ARIA, focus states, live regions
- Responsive & performant: minimal dependencies, code organized by features

## Getting Started

1) Install
- npm install

2) Configure environment
- cp .env.example .env
- Set REACT_APP_API_BASE_URL to your backend API base (e.g., https://api.example.com/api)

3) Run
- npm start
- Open http://localhost:3000

4) Test
- npm test

## Project Structure

- src/routes/AppRouter.jsx — All routes and providers
- src/state/AuthContext.jsx — Authentication/session context
- src/services/api.js — Axios client and API methods
- src/shared/Layout.jsx (+ layout.css) — App shell and navigation
- src/shared/components(.css).jsx — Reusable accessible components
- src/views/** — Pages for auth, recipes, meal planner, shopping list, community

## Environment Variables

- REACT_APP_API_BASE_URL: Backend API base URL
- REACT_APP_OAUTH_REDIRECT_URI (optional): Social OAuth redirect URI

## Accessibility

- Skip link to main content
- Form fields with associated labels and error helpers
- aria-live regions for status updates
- Focus outlines and keyboard operability
- Color contrast mindful styles

## Notes

- This frontend expects a RESTful backend with routes like /auth/login, /recipes, /meal-plan, etc.
- Update API endpoints in src/services/api.js if your backend differs.
