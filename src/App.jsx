import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Fund from "./pages/Fund";
import Accounts from "./pages/Accounts";
import OpenAccount from "./pages/OpenAccount";
import Transfer from "./pages/Transfer";
import AccountDetails from "./pages/AccountDetails";
import Statements from "./pages/Statements";
import Rewards from "./pages/Rewards";
import Games from "./pages/Games";
import Referrals from "./pages/Referrals";
import Support from "./pages/Support";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      {/* Main application layout */}
      <Route element={<MainLayout />}>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Money */}
        <Route path="/fund" element={<Fund />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/accounts/new" element={<OpenAccount />} />
        <Route path="/accounts/transfer" element={<Transfer />} />
        <Route path="/accounts/:accountCode" element={<AccountDetails />} />
        <Route path="/statements" element={<Statements />} />

        <Route path="/rewards" element={<Rewards />} />
        <Route path="/games" element={<Games />} />

        <Route path="/referrals" element={<Referrals />} />
        <Route path="/support" element={<Support />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Redirect invalid routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function Placeholder({ title }) {
  return (
    <div className="panel p-8">
      <p className="eyebrow">YOUR ACCOUNT</p>
      <h1 className="page-title">{title}</h1>
      <p className="muted mt-2">
        This section is ready for its next implementation.
      </p>
    </div>
  );
}
