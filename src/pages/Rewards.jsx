import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftRight, Gift, Info, ShieldCheck, Wallet } from "lucide-react";
import "../styles/Rewards.css";

const challenges = [
  {
    id: 1,
    title: "secure_your_account",
    frequency: "monthly",
    deadline: "ends_17_nov",
    status: "active_status",
    description: "secure_account_description",
    progress: 0,
    total: 1,
    reward: 350,
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "learning_week",
    frequency: "weekly",
    deadline: "ends_9_nov",
    status: "active_status",
    description: "learning_week_description",
    progress: 1,
    total: 2,
    reward: 250,
    icon: Wallet,
  },
  {
    id: 3,
    title: "ten_lot_week",
    frequency: "weekly",
    deadline: "ends_9_nov",
    status: "active_status",
    description: "ten_lot_week_description",
    progress: 4.25,
    total: 10,
    reward: 500,
    icon: ArrowLeftRight,
  },
  {
    id: 4,
    title: "know_your_workspace",
    frequency: "daily",
    deadline: "opens_7_nov",
    status: "scheduled_status",
    description: "know_workspace_description",
    progress: 0,
    total: 1,
    reward: null,
    icon: Wallet,
  },
];

const catalogue = [
  {
    id: 1,
    title: "broker_learning_session",
    description: "broker_learning_session_description",
    cost: 1000,
    inventory: "8",
    approval: "broker_review",
    expiry: "expires_16_dec",
    redeemable: true,
  },
  {
    id: 2,
    title: "education_resource_pack",
    description: "education_resource_pack_description",
    cost: 750,
    inventory: "open_inventory",
    approval: "automatic_approval",
    expiry: "expires_14_feb",
    redeemable: true,
  },
  {
    id: 3,
    title: "platform_vps_credit",
    description: "platform_vps_credit_description",
    cost: 2500,
    inventory: "3",
    approval: "broker_review",
    expiry: "expires_15_jan",
    redeemable: false,
  },
];

const redemptions = [
  {
    id: 1,
    title: "education_resource_pack",
    points: 750,
    date: "redemption_date_oct_31",
    status: "fulfilled",
  },
];

const ledger = [
  {
    id: 1,
    title: "redeemed_education_resource_pack",
    date: "ledger_date_oct_30",
    amount: -750,
  },
  {
    id: 2,
    title: "completed_identity_verification",
    date: "ledger_date_oct_27",
    amount: 750,
  },
  {
    id: 3,
    title: "completed_broker_education_challenge",
    date: "ledger_date_oct_23",
    amount: 250,
  },
  {
    id: 4,
    title: "completed_broker_profile_checklist",
    date: "ledger_date_oct_17",
    amount: 1200,
  },
];

export default function Rewards() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const balance = 1450;
  const nextReward = 2500;
  const progress = Math.round((balance / nextReward) * 100);

  const activeChallenges = challenges.filter(
    (challenge) => challenge.status === "active_status",
  ).length;

  return (
    <div className="rewards-page">
      <div className="rewards-heading">
        <div>
          <p className="eyebrow">{t("rewards")}</p>
          <h1 className="page-title">{t("challenges_and_rewards")}</h1>
          <p className="muted">{t("rewards_page_description")}</p>
        </div>

        <button
          className="rewards-outline-button"
          onClick={() => navigate("/games")}
        >
          {t("open_games")}
        </button>
      </div>

      <section className="rewards-hero">
        <div className="rewards-balance">
          <div className="rewards-progress-circle">
            <svg viewBox="0 0 100 100">
              <circle className="circle-background" cx="50" cy="50" r="43" />
              <circle
                className="circle-progress"
                cx="50"
                cy="50"
                r="43"
                style={{
                  strokeDasharray: `${(progress / 100) * 270} 270`,
                }}
              />
            </svg>
            <span>{progress}%</span>
          </div>

          <div className="rewards-balance-info">
            <small>{t("available_balance")}</small>
            <h2>
              <span className="diamond-icon">◆</span>
              {balance.toLocaleString("en-US")}
            </h2>
            <p>{t("nexus_points")} · AE</p>
          </div>

          <div className="next-reward">
            <span>{t("next_up_platform_vps")}</span>
            <strong>
              {t("points_to_go", {
                count: (nextReward - balance).toLocaleString("en-US"),
              })}
            </strong>
          </div>

          <div className="rewards-progress-bar">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="rewards-stat-grid">
          <div className="rewards-stat">
            <small>{t("can_redeem_now")}</small>
            <strong>2</strong>
            <span>{t("of_three_in_catalogue")}</span>
          </div>

          <div className="rewards-stat">
            <small>{t("earned")}</small>
            <strong>2,200</strong>
            <span>{t("all_time")}</span>
          </div>

          <div className="rewards-stat">
            <small>{t("redeemed")}</small>
            <strong>750</strong>
            <span>{t("all_time")}</span>
          </div>

          <div className="rewards-stat">
            <small>{t("on_offer")}</small>
            <strong>1,100</strong>
            <span>{t("from_three_open_challenges")}</span>
          </div>
        </div>
      </section>

      <div className="rewards-info">
        <Info size={14} />
        <span>{t("reward_requests_disabled_note")}</span>
      </div>

      <section className="rewards-section">
        <div className="rewards-section-heading">
          <div>
            <p className="eyebrow">{t("challenges")}</p>
            <h2>{t("progress_you_can_finish")}</h2>
          </div>
          <span>
            {t("challenge_count_summary", {
              open: activeChallenges,
              total: challenges.length,
            })}
          </span>
        </div>

        <div className="challenge-grid">
          {challenges.map((challenge) => {
            const Icon = challenge.icon;
            const percentage = Math.round(
              (challenge.progress / challenge.total) * 100,
            );

            return (
              <article
                className={`challenge-card ${
                  challenge.status === "scheduled_status" ? "scheduled" : ""
                }`}
                key={challenge.id}
              >
                <div className="challenge-top">
                  <div className="challenge-icon">
                    <Icon size={17} />
                  </div>

                  <div className="challenge-title">
                    <h3>{t(challenge.title)}</h3>
                    <small>
                      {t(challenge.frequency)} · {t(challenge.deadline)}
                    </small>
                    <span
                      className={`challenge-status ${
                        challenge.status === "scheduled_status"
                          ? "scheduled-status"
                          : ""
                      }`}
                    >
                      {t(challenge.status)}
                    </span>
                  </div>
                </div>

                <p className="challenge-description">
                  {t(challenge.description)}
                </p>

                <div className="challenge-progress-info">
                  <span>
                    {t("challenge_progress", {
                      progress: challenge.progress,
                      total: challenge.total,
                    })}
                    {challenge.id === 3 ? ` ${t("lots")}` : ""}
                  </span>
                  <strong>{percentage}%</strong>
                </div>

                <div className="challenge-progress-bar">
                  <span style={{ width: `${percentage}%` }} />
                </div>

                <div className="challenge-footer">
                  <strong className="challenge-reward">
                    {challenge.reward ? (
                      <>◆ {challenge.reward}</>
                    ) : (
                      t("direct_reward")
                    )}
                  </strong>

                  {challenge.status === "active_status" ? (
                    <button
                      className="rewards-small-button"
                      onClick={() => navigate("/profile")}
                    >
                      {t("continue")}
                    </button>
                  ) : (
                    <button
                      className="rewards-small-button"
                      onClick={() => navigate("/games")}
                    >
                      {t("preview")}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rewards-section">
        <div className="rewards-section-heading">
          <div>
            <p className="eyebrow">{t("catalogue")}</p>
            <h2>{t("redeem_what_you_earned")}</h2>
          </div>
          <span>{t("selected_by_broker")}</span>
        </div>

        <div className="catalogue-grid">
          {catalogue.map((item) => (
            <article
              key={item.id}
              className={`catalogue-card ${
                !item.redeemable ? "catalogue-disabled" : ""
              }`}
            >
              <div className="catalogue-top">
                <div className="catalogue-icon">
                  <Gift size={17} />
                </div>

                <span
                  className={`catalogue-badge ${
                    !item.redeemable ? "short-badge" : ""
                  }`}
                >
                  {item.redeemable
                    ? t("can_redeem")
                    : t("points_short", {
                        count: (item.cost - balance).toLocaleString("en-US"),
                      })}
                </span>
              </div>

              <h3>{t(item.title)}</h3>
              <p className="catalogue-description">{t(item.description)}</p>

              <div className="catalogue-details">
                <div>
                  <small>{t("cost")}</small>
                  <strong>◆ {item.cost.toLocaleString("en-US")}</strong>
                </div>

                <div>
                  <small>{t("inventory")}</small>
                  <strong>{t(item.inventory)}</strong>
                </div>

                <div>
                  <small>{t("approval")}</small>
                  <strong>{t(item.approval)}</strong>
                </div>

                <div>
                  <small>{t("available_until")}</small>
                  <strong>{t(item.expiry)}</strong>
                </div>
              </div>

              <div className="catalogue-footer">
                {item.redeemable
                  ? t("reward_requests_api_note")
                  : t("finish_challenge_to_reach", {
                      count: item.cost.toLocaleString("en-US"),
                    })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="rewards-bottom-grid">
        <section className="rewards-section redemption-section">
          <p className="eyebrow">{t("requests")}</p>
          <h2>{t("your_redemptions")}</h2>

          {redemptions.map((item) => (
            <div className="redemption-item" key={item.id}>
              <div>
                <strong>{t(item.title)}</strong>
                <small>
                  ◆ {item.points} · {t("fulfilled").toLowerCase()}{" "}
                  {t(item.date)}
                </small>
              </div>
              <span className="fulfilled-badge">{t(item.status)}</span>
            </div>
          ))}
        </section>

        <section className="rewards-section ledger-section">
          <div className="rewards-section-heading">
            <div>
              <p className="eyebrow">{t("ledger")}</p>
              <h2>{t("every_change_itemised")}</h2>
            </div>
            <span>{t("append_only")}</span>
          </div>

          <div className="ledger-list">
            {ledger.map((item) => (
              <div className="ledger-item" key={item.id}>
                <div>
                  <strong>{t(item.title)}</strong>
                  <small>{t(item.date)}</small>
                </div>

                <strong
                  className={
                    item.amount > 0 ? "ledger-positive" : "ledger-negative"
                  }
                >
                  {item.amount > 0 ? "+" : ""}
                  {item.amount.toLocaleString("en-US")}
                </strong>
              </div>
            ))}
          </div>

          <p className="ledger-note">{t("rewards_ledger_note")}</p>
        </section>
      </div>
    </div>
  );
}