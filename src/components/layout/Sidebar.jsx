import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  LayoutDashboard,
  WalletCards,
  CreditCard,
  FileText,
  Star,
  Gamepad2,
  Users,
  CircleHelp,
  Check,
  UserRound,
  X,
} from "lucide-react";

const groups = [
  {
    label: "overview",
    items: [["dashboard", "/", LayoutDashboard]],
  },
  {
    label: "money",
    items: [
      ["accounts", "/accounts", CreditCard],
      ["fund", "/fund", WalletCards],
      ["statements", "/statements", FileText],
    ],
  },
  {
    label: "engagement",
    items: [
      ["rewards", "/rewards", Star],
      ["games", "/games", Gamepad2],
      ["referrals", "/referrals", Users],
    ],
  },
  {
    label: "your_account",
    items: [
      ["support", "/support", CircleHelp],
      ["onboarding", "/onboarding", Check],
      ["profile", "/profile", UserRound],
    ],
  },
];

export default function Sidebar({ mobileOpen, closeMobile }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`sidebar-backdrop ${mobileOpen ? "show" : ""}`}
        onClick={closeMobile}
      />

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          hx<span> nexus</span>
          <i>.</i>
        </div>

        <button
          className="mobile-close"
          onClick={closeMobile}
          aria-label={t("close_sidebar")}
        >
          <X size={18} />
        </button>
        <button
          type="button"
          className="user-card"
          onClick={() => navigate("/profile")}
        >
          <div className="avatar">D</div>

          <div>
            <b>Dana</b>
            <small>{t("client_account_label")}</small>
          </div>
        </button>

        <nav>
          {groups.map((group) => (
            <section className="nav-group" key={group.label}>
              <p>{t(group.label).toUpperCase()}</p>

              {group.items.map(([key, path, Icon]) => (
                <NavLink
                  key={key}
                  to={path}
                  end={path === "/"}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={15} />
                      <span>{t(key)}</span>
                      {isActive && <i />}
                    </>
                  )}
                </NavLink>
              ))}
            </section>
          ))}
        </nav>

        <div className="sidebar-note">
          <b>{t("crm_workspace")}</b>

          <p>{t("sidebar_workspace_description")}</p>
        </div>
      </aside>
    </>
  );
}
