# KU Design Class Builder

Scheduler + planning tool for KU Design courses (Fall 2026).

## Tech Stack

- Vite
- TypeScript
- React
- shadcn/ui
- Tailwind CSS
- React Router

## Getting Started

```sh
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app runs at [http://localhost:8081](http://localhost:8081).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test:e2e` | Run Playwright E2E tests |

## Project Structure

- `src/pages/AdminDashboard.tsx` - main scheduler screen
- `src/components/scheduler/` - scheduler UI components
- `src/data/` - scheduler data (courses, rooms, instructors, time blocks)
- `src/components/ui/` - shadcn/ui components
