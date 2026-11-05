# HX Nexus – Trader Portal

A modern, responsive trader portal built with **React and Vite**, designed to provide clients with a centralized workspace for managing trading accounts, monitoring balances, handling funding activities, accessing statements, tracking rewards, and managing their account experience.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Application Modules](#application-modules)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Internationalization](#internationalization)
- [Theme Support](#theme-support)
- [Notification System](#notification-system)
- [Navigation and Routing](#navigation-and-routing)
- [Demo Data and Application Behavior](#demo-data-and-application-behavior)
- [Responsive Design](#responsive-design)
- [Future Enhancements](#future-enhancements)

---

## Project Overview

HX Nexus is a web-based trader portal that provides a unified interface for clients to access their trading-related information and account services.

The application focuses on delivering:

- A clean and modern dashboard.
- Centralized trading account information.
- Account balance and equity monitoring.
- Funding and internal transfer interfaces.
- Statement and transaction history views.
- Rewards and engagement features.
- Client onboarding and profile management.
- Support and notification interfaces.
- Multilingual user experience.
- Responsive layouts for desktop, tablet, and mobile devices.

The interface follows a professional financial-dashboard design, using a consistent visual language with reusable components and modular styles.

## Key Features

### 1. Dashboard

The dashboard provides an overview of the client's trading workspace.

Features include:

- Personalized welcome section.
- Account overview cards.
- Balance and equity information.
- Recorded account movements.
- Live balance summary.
- Quick actions for deposits, withdrawals, and transfers.
- Workspace activity and engagement information.

### 2. Trading Accounts

Provides an overview of available trading accounts.

Features include:

- Live and demo account information.
- Account currency and platform details.
- Balance and equity information.
- Free margin and margin utilization.
- Individual account details.
- Account activity and movement history.
- Account type information.

### 3. Funding

Provides a cashier-style interface for managing funding-related activities.

Features include:

- Deposit interface.
- Withdrawal interface.
- Funding request information.
- Payment review and confirmation screens.
- Funding status and transaction summaries.

### 4. Internal Transfers

Allows users to explore transferring funds between eligible trading accounts.

Features include:

- Source and destination account selection.
- Currency compatibility checks.
- Transfer amount validation.
- Available balance validation.
- Before-and-after balance previews.
- Account swapping.
- Transfer confirmation interface.

The current transfer demonstration updates account balances locally in React state. It does not execute a real broker transaction.

### 5. Statements

Provides a statement archive interface.

Features include:

- Monthly statement archive.
- Year and period filtering.
- Statement status indicators.
- Selected statement preview.
- Download interaction.
- Broker-managed document information.

### 6. Rewards

Provides a rewards and engagement interface.

Features include:

- Rewards points overview.
- Challenges and progress tracking.
- Rewards catalogue.
- Redemption history.
- Points activity ledger.
- Reward eligibility and status information.

### 7. Games and Engagement

Includes interactive engagement features designed around educational market activities.

Examples include:

- Market predictor.
- Bull vs Bear.
- Calendar challenges.
- Price target predictions.
- Leaderboards.
- Points and experience tracking.

### 8. Referrals

Provides a referral interface.

Features include:

- Referral code display.
- Referral link sharing.
- Email sharing interface.
- Invitation activity.
- Registration and funding statistics.

### 9. Support

Provides a centralized support workspace.

Features include:

- Support ticket listing.
- Ticket search.
- Ticket status information.
- Ticket creation interface.
- Live chat demonstration.
- Support queue selection.
- Announcements and notices.

### 10. Onboarding

Provides a client onboarding progress overview.

Features include:

- Profile completion.
- Contact detail confirmation.
- Identity verification status.
- First deposit information.
- Trading account opening steps.
- Onboarding completion progress.

### 11. Profile

Provides a client profile and account preferences interface.

Features include:

- Profile information.
- Contact details.
- Locale information.
- Multi-factor authentication status.
- Active session information.
- Product update preferences.
- Marketing email preferences.

### 12. Notifications

The header includes an interactive notification panel.

Features include:

- Notification bell with unread count.
- All notifications filter.
- Unread notifications filter.
- Mark all as read.
- Individual notification read status.
- Notification category and timestamps.
- Navigation to the relevant application page.
- Responsive notification panel.
- Persistent read/unread state using browser local storage.

Notification examples include:

- Prediction settled.
- Reward request updated.
- Verification document received.
- Support reply available.

The current notifications are sample frontend data.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| Vite | Frontend development server and build tool |
| JavaScript (ES6+) | Application logic |
| React Router DOM | Client-side routing |
| Tailwind CSS | Utility-first styling where used |
| CSS3 | Custom layouts, animations and responsive styling |
| Lucide React | Icons |
| i18next | Internationalization framework |
| react-i18next | React translation integration |
| Browser Local Storage | Client-side preference and notification persistence |

---

## Application Modules

| Module | Route |
|---|---|
| Dashboard | `/` |
| Accounts | `/accounts` |
| Fund | `/fund` |
| Statements | `/statements` |
| Rewards | `/rewards` |
| Games | `/games` |
| Referrals | `/referrals` |
| Support | `/support` |
| Onboarding | `/onboarding` |
| Profile | `/profile` |
| Transfer | `/transfer` |

Some modules may still use placeholder screens or frontend demonstration data depending on the current implementation.

---

## Project Structure

A suggested project structure is:

```text
hx-nexus/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── dashboard/
│   │   └── layout/
│   │       ├── Header.jsx
│   │       ├── MainLayout.jsx
│   │       └── Sidebar.jsx
│   │
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── locales/
│   │   ├── en.json
│   │   ├── fr.json
│   │   ├── es.json
│   │   ├── de.json
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Accounts.jsx
│   │   ├── AccountDetails.jsx
│   │   ├── Fund.jsx
│   │   ├── Transfer.jsx
│   │   ├── Statements.jsx
│   │   ├── Rewards.jsx
│   │   ├── Games.jsx
│   │   ├── Referrals.jsx
│   │   ├── Support.jsx
│   │   ├── Onboarding.jsx
│   │   └── Profile.jsx
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── Header.css
│   │   ├── Notifications.css
│   │   ├── Dashboard.css
│   │   ├── Accounts.css
│   │   ├── Fund.css
│   │   ├── Transfer.css
│   │   └── ...
│   │
│   ├── i18n.js
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

This structure describes the recommended organization; actual filenames may differ in your working repository.

---

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js (LTS recommended).
- npm.
- Git.

Check your installed versions:

```bash
node -v
npm -v
```

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

### 2. Navigate to the Project

```bash
cd hx-nexus
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Vite will display a local development URL, usually:

```text
http://localhost:5173
```

Open the URL in your browser to access the application.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates a production build |
| `npm run preview` | Previews the production build locally |

Run the production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Internationalization

The application uses **i18next** and **react-i18next** to support multiple languages.

The language selector is available in the application header.

### Supported Languages

1. English
2. French
3. Spanish
4. Portuguese
5. Brazilian Portuguese
6. Italian
7. Arabic
8. German
9. Dutch
10. Russian
11. Chinese
12. Japanese
13. Korean
14. Hindi
15. Malayalam
16. Tamil
17. Telugu
18. Turkish
19. Polish
20. Swedish
21. Indonesian
22. Thai
23. Vietnamese

### Translation Configuration

The translation configuration is maintained in:

```text
src/i18n.js
```

Translation resources are stored as JSON files inside the locales directory.

Example:

```json
{
  "dashboard": "Dashboard",
  "accounts": "Accounts",
  "fund": "Fund",
  "transfer": "Transfer",
  "notifications": "Notifications",
  "sign_out": "Sign out"
}
```

### Using Translations in Components

```jsx
import { useTranslation } from "react-i18next";

export default function Example() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("dashboard")}</h1>
      <p>{t("accounts")}</p>
    </div>
  );
}
```

The selected language is saved using browser local storage, allowing the application to restore the user's language preference.

---

## Theme Support

The application provides light and dark theme controls in the header.

Users can switch between themes using the theme toggle.

Theme styling is managed through application-level theme state and CSS classes.

---

## Notification System

The notification interface is integrated into the application header.

### Notification Interactions

- Clicking the bell opens the notification panel.
- The unread badge reflects the number of unread notifications.
- Users can switch between All and Unread.
- Mark all as read updates every notification.
- Clicking an individual notification marks it as read.
- The application navigates to the notification's configured destination.
- Notification state is stored in browser local storage.

### Example Notification Structure

```javascript
{
  id: 1,
  category: "SETTLEMENT",
  title: "Prediction settled",
  description: "Market prediction has been scored.",
  date: "Aug 28, 12:42 UTC",
  section: "new",
  read: false,
  route: "/games",
  icon: "settlement"
}
```

To add a notification, add another object to the notification data array and configure its destination route.

---

## Navigation and Routing

The application uses React Router DOM for client-side navigation.

Example:

```jsx
import { BrowserRouter } from "react-router-dom";
import App from "./App";

function Main() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Main;
```

Application routes are configured inside `App.jsx`.

The shared layout contains reusable application components such as the sidebar and header.

---

## Demo Data and Application Behavior

The current application includes frontend demonstration data for several modules.

Examples include:

- Sample client information.
- Trading account balances.
- Account movements.
- Reward points and challenges.
- Referral statistics.
- Support tickets and announcements.
- Notifications.
- Transfer balances.

Some interactions update React state or browser local storage rather than communicating with a live backend.

### Important

The following should not be considered production broker integrations unless separately implemented:

- Actual deposits and withdrawals.
- Real trading account operations.
- Broker-side internal transfers.
- Live account balance synchronization.
- Real statement PDF generation.
- Backend notification delivery.
- Persistent support ticket creation.
- Authentication and authorization.
- Broker-managed identity verification.

These features require appropriate backend APIs and broker integrations.

---

## Responsive Design

The application is designed to adapt to:

- Desktop screens.
- Laptop screens.
- Tablets.
- Mobile devices.

Responsive behavior includes:

- Collapsible sidebar navigation.
- Flexible dashboard layouts.
- Responsive account cards.
- Mobile-friendly forms.
- Responsive notification panel.
- Scrollable content areas.
- Adaptive spacing and typography.

---

## Future Enhancements

Potential improvements for the next development phase:

### Backend Integration
- Integrate Django or another backend API.
- Connect authentication and user management.
- Integrate broker account APIs.
- Synchronize balances and transactions.
- Implement real funding workflows.

### Notifications
- Retrieve notifications from a backend API.
- Implement server-side read/unread status.
- Add real-time notification delivery.
- Support pagination and notification history.

### Security
- Implement secure authentication.
- Add role-based access control.
- Integrate multi-factor authentication.
- Implement secure session management.
- Validate sensitive financial operations server-side.

### Production Readiness
- Add automated testing.
- Add error boundaries and API error handling.
- Configure environment variables.
- Add CI/CD workflows.
- Configure production hosting and monitoring.

---

## License

This project is intended for demonstration and development purposes.

Add the appropriate license information before distributing or publishing the project publicly.

---

**HX Nexus – Trader Portal**

A centralized, responsive workspace for the modern trading client.
