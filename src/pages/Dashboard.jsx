
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Plus,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
} from "lucide-react";

import AccountOverview from "../components/dashboard/AccountOverview";
import LiveBalances from "../components/dashboard/LiveBalances";
import DashboardExtras from "../components/dashboard/DashboardExtras";

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      {/* Dashboard Introduction */}
      <div className="dashboard-intro">
        <div>
          <p className="eyebrow">{t("your_workspace")}</p>
          <h1 className="welcome-title">
            {t("welcome", { name: "Dana" })}
          </h1>
          <p className="muted">
            {t("dashboard_intro_description")}
          </p>
        </div>

        <button
          className="button secondary"
          onClick={() => navigate("/accounts/new")}
        >
          <Plus size={14} />
          {t("open_account")}
        </button>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="button primary" onClick={() => navigate("/fund")}>
          <ArrowDownToLine size={15} />
          {t("deposit")}
          <span>↗</span>
        </button>

        <button className="button secondary" onClick={() => navigate("/fund")}>
          <ArrowUpFromLine size={15} />
          {t("withdraw")}
          <span>↗</span>
        </button>

        <button
          className="button secondary"
          onClick={() => navigate("/accounts/transfer")}
        >
          <ArrowLeftRight size={15} />
          {t("transfer")}
          <span>↗</span>
        </button>
      </div>

      {/* Account Overview */}
      <div className="dashboard-grid">
        <AccountOverview />

        <div className="dashboard-side">
          <LiveBalances />
        </div>
      </div>

      {/* Additional Dashboard Sections */}
      <DashboardExtras />
    </>
  );
}
