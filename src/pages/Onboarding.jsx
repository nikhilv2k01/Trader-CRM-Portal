import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check, UserRound } from "lucide-react";
import "../styles/Onboarding.css";

const steps = [
  {
    title: "complete_profile",
    description: "confirm_contact_details",
  },
  {
    title: "identity_verification",
    description: "submit_kyc_documents",
    note: "identity_verification_complete_note",
  },
  {
    title: "first_deposit",
    description: "fund_live_account",
  },
  {
    title: "open_trading_account",
    description: "select_account_type",
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const completed = steps.length;
  const progress = Math.round((completed / steps.length) * 100);

  return (
    <main className="onboarding-page">
      <section className="onboarding-heading">
        <div>
          <p className="onboarding-eyebrow">{t("onboarding")}</p>
          <h1>{t("onboarding_all_set")}</h1>
          <p className="onboarding-subtitle">
            {t("onboarding_completion_description")}
          </p>
        </div>

        <button
          type="button"
          className="onboarding-profile-button"
          onClick={() => navigate("/profile")}
        >
          <UserRound size={16} /> {t("profile")}
        </button>
      </section>

      <section
        className="onboarding-progress-card"
        aria-label={t("onboarding_progress")}
      >
        <div className="onboarding-progress-content">
          <p className="onboarding-section-label">{t("progress")}</p>

          <h2>
            {t("onboarding_steps_complete", {
              completed,
              total: steps.length,
            })}
          </h2>

          <p>{t("onboarding_nothing_further_needed")}</p>

          <div
            className="onboarding-progress-track"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t("onboarding_completion")}
          >
            <span style={{ width: `${progress}%` }} />
          </div>

          <p className="onboarding-done-text">{t("all_done")}</p>
        </div>

        <div
          className="onboarding-progress-ring"
          aria-label={t("onboarding_percentage_complete", {
            percentage: progress,
          })}
        >
          <span>{progress}%</span>
        </div>
      </section>

      <section
        className="onboarding-steps"
        aria-label={t("completed_onboarding_steps")}
      >
        {steps.map((step) => (
          <article className="onboarding-step-card" key={step.title}>
            <div className="onboarding-step-check">
              <Check size={19} strokeWidth={2.2} />
            </div>

            <div className="onboarding-step-copy">
              <h3>{t(step.title)}</h3>
              <p>{t(step.description)}</p>

              {step.note && (
                <p className="onboarding-step-note">{t(step.note)}</p>
              )}
            </div>

            <span className="onboarding-complete-pill">{t("complete")}</span>
          </article>
        ))}
      </section>

      <p className="onboarding-footnote">
        {t("onboarding_broker_review_note")}
      </p>
    </main>
  );
}
