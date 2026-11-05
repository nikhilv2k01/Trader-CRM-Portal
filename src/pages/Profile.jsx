import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  UserRound,
  ShieldCheck,
  FileText,
  Star,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import "../styles/Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [preferenceError, setPreferenceError] = useState("");

  const handlePreferenceClick = (preference) => {
    // Preferences are currently broker-managed.
    // Do not change the setting.
    setPreferenceError(preference);
  };

  return (
    <main className="profile-page">
      {/* PAGE HEADING */}
      <section className="profile-heading">
        <div>
          <p className="profile-eyebrow">{t("profile")}</p>

          <h1>Dana</h1>

          <p className="profile-subtitle">{t("profile_page_description")}</p>
        </div>

        <button
          type="button"
          className="profile-navigation-button"
          onClick={() => navigate("/onboarding")}
        >
          {t("onboarding")}
        </button>
      </section>

      {/* PROFILE SUMMARY */}
      <section className="profile-summary-card">
        <div className="profile-summary-left">
          <div className="profile-main-avatar">D</div>

          <div className="profile-summary-info">
            <h2>Dana</h2>
            <p>da***@hxnexus.com · en-AE</p>
          </div>
        </div>

        <span className="profile-mfa-badge">{t("multi_factor_on")}</span>
      </section>

      {/* PROFILE INFORMATION */}
      <section className="profile-information-grid">
        {/* CONTACT INFORMATION */}
        <article className="profile-information-card">
          <div className="profile-card-heading">
            <p className="profile-card-eyebrow">{t("identity")}</p>
            <h2>{t("contact")}</h2>
          </div>

          <div className="profile-detail-list">
            <div className="profile-detail-row">
              <span>{t("name_on_file")}</span>
              <strong>Dana</strong>
            </div>

            <div className="profile-detail-row">
              <span>{t("email")}</span>
              <strong>da***@hxnexus.com</strong>
            </div>

            <div className="profile-detail-row">
              <span>{t("locale")}</span>
              <strong>en-AE</strong>
            </div>
          </div>

          <p className="profile-card-description">
            {t("profile_contact_details_note")}{" "}
            <button
              type="button"
              className="profile-inline-link"
              onClick={() => navigate("/support")}
            >
              {t("support")}
            </button>
            ; {t("profile_identity_documents_note")}{" "}
            <button
              type="button"
              className="profile-inline-link"
              onClick={() => navigate("/onboarding")}
            >
              {t("onboarding")}
            </button>
            .
          </p>
        </article>

        {/* SECURITY INFORMATION */}
        <article className="profile-information-card">
          <div className="profile-card-heading">
            <p className="profile-card-eyebrow">{t("security")}</p>
            <h2>{t("sign_in_protection")}</h2>
          </div>

          <div className="profile-detail-list">
            <div className="profile-detail-row">
              <span>{t("multi_factor")}</span>

              <strong className="profile-enabled-badge">{t("enabled")}</strong>
            </div>

            <div className="profile-detail-row">
              <span>{t("active_sessions")}</span>
              <strong>2</strong>
            </div>
          </div>

          <p className="profile-card-description">
            {t("profile_session_description")}{" "}
            <button
              type="button"
              className="profile-inline-link"
              onClick={() => navigate("/support")}
            >
              {t("tell_support")}
            </button>{" "}
            — {t("profile_support_can_end_sessions")}
          </p>
        </article>

        {/* PREFERENCES */}
        <article className="profile-information-card">
          <div className="profile-card-heading">
            <p className="profile-card-eyebrow">{t("preferences")}</p>
            <h2>{t("what_we_send_you")}</h2>
          </div>

          <div className="profile-preference-list">
            {/* PRODUCT UPDATES */}
            <div className="profile-preference-row">
              <div className="profile-preference-icon">
                <FileText size={17} />
              </div>

              <div className="profile-preference-content">
                <strong>{t("product_updates")}</strong>
                <span>{t("product_updates_description")}</span>
              </div>

              <button
                type="button"
                className="profile-toggle profile-toggle-active"
                onClick={(e) => e.preventDefault()}
                aria-disabled="true"
                title={t("preference_cannot_be_changed")}
              >
                <span />
              </button>

              {preferenceError === "product" && (
                <AlertCircle
                  className="profile-preference-error"
                  size={19}
                  title={t("preference_changes_unavailable")}
                />
              )}
            </div>

            {/* MARKETING EMAIL */}
            <div className="profile-preference-row">
              <div className="profile-preference-icon">
                <Star size={17} />
              </div>

              <div className="profile-preference-content">
                <strong>{t("marketing_email")}</strong>
                <span>{t("marketing_email_description")}</span>
              </div>

              <button
                type="button"
                className="profile-toggle profile-toggle-inactive"
                onClick={(e) => e.preventDefault()}
                aria-disabled="true"
                title={t("preference_cannot_be_changed")}
              >
                <span />
              </button>

              {preferenceError === "marketing" && (
                <AlertCircle
                  className="profile-preference-error"
                  size={19}
                  title={t("preference_changes_unavailable")}
                />
              )}
            </div>

            {preferenceError && (
              <div className="profile-preference-message">
                <AlertCircle size={15} />
                {t("preference_changes_unavailable")}
              </div>
            )}
          </div>

          <p className="profile-card-description">
            {t("profile_service_messages_note")}
          </p>
        </article>
      </section>
    </main>
  );
}
