# HX Nexus Trader Portal (frontend demo)

A responsive React + Vite recreation of the supplied HX Nexus screenshots. The project is split into pages, layout components, feature components, and mock data.

## Requirements
- Node.js 18+
- npm

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Pages
- `/` — Dashboard
- `/fund` — Cashier / deposit and withdrawal request UI
- `/accounts` — Live USD, live EUR, practice accounts and account catalogue

## Notes
- This is a frontend-only demonstration. Balances and account information are mock data in `src/data/mockData.js`.
- Payment actions are illustrative only and do not connect to a payment provider.
- Account card actions are UI placeholders; connect them to your API and business rules when integrating a backend.
- Charts use Recharts. Icons use Lucide React. Styling uses Tailwind CSS directives plus component-level CSS in `src/index.css` for precise layout matching.
