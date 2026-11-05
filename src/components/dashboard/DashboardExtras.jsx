import { Clock3, MessageSquare, Trophy, Star, ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function DashboardExtras() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const openItems = [
    {
      title: "fund_requests_in_progress",
      description: "awaiting_broker_review",
      count: 1,
      Icon: Clock3,
    },
    {
      title: "open_support_threads",
      description: "a_reply_may_be_waiting",
      count: 1,
      Icon: MessageSquare,
    },
    {
      title: "challenges_in_progress",
      description: "progress_counts_toward_points",
      count: 3,
      Icon: Trophy,
    },
  ];

  const pointsActivity = [
    {
      title: "redeemed_education_resource_pack",
      date: "Oct 30",
      points: "-750",
      type: "negative",
    },
    {
      title: "completed_identity_verification",
      date: "Oct 27",
      points: "+750",
      type: "positive",
    },
    {
      title: "completed_broker_education_challenge",
      date: "Oct 23",
      points: "+250",
      type: "positive",
    },
  ];

  return (
    <div className="dashboard-extras">
      {/* What's Open */}
      <section className="extra-card">
        <h3>{t("whats_open")}</h3>

        <div className="open-list">
          {openItems.map(({ title, description, count, Icon }) => (
            <div className="open-item" key={title}>
              <div className="open-icon">
                <Icon size={15} />
              </div>

              <div className="open-info">
                <b>{t(title)}</b>
                <small>{t(description)}</small>
              </div>

              <span className="open-count">{count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Points Activity */}
      <section className="extra-card">
        <div className="extra-card-heading">
          <h3>{t("points_activity")}</h3>

          <button className="text-link" onClick={() => navigate("/statements")}>
            {t("ledger")} <ArrowRight size={13} />
          </button>
        </div>

        <div className="points-list">
          {pointsActivity.map((item) => (
            <div className="points-item" key={item.title}>
              <div>
                <b>{t(item.title)}</b>
                <small>{t(item.date)}</small>
              </div>

              <strong className={item.type}>{item.points}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* Nexus Points */}
      <section className="extra-card nexus-points-card">
        <div className="extra-card-heading">
          <h3>{t("nexus_points")}</h3>
          <Star size={20} className="nexus-star" />
        </div>

        <div className="nexus-points-value">1,450</div>

        <button
          className="nexus-rewards-link"
          onClick={() => navigate("/rewards")}
        >
          {t("view_rewards")} <ArrowRight size={13} />
        </button>
      </section>
    </div>
  );
}
