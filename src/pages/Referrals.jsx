import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Copy, Check, Mail, MessageCircle } from "lucide-react";
import "../styles/Referrals.css";

const referralCode = "HX-ALEX-4821";

const referralLink = `https://trader.hxnexus.com/register?ref=${referralCode}`;

const inviteStats = [
  {
    label: "invited",
    value: 7,
    description: "invites_sent",
    percentage: 100,
    color: "default",
  },
  {
    label: "registered",
    value: 2,
    description: "registered_percentage",
    percentage: 29,
    color: "registered",
  },
  {
    label: "funded",
    value: 2,
    description: "funded_percentage",
    percentage: 100,
    color: "funded",
  },
];

const inviteActivity = [
  {
    id: 1,
    email: "j***@example.com",
    dateKey: "invite_date_oct_24",
    status: "funded",
    initial: "J",
  },
  {
    id: 2,
    email: "s***@mail.test",
    dateKey: "invite_date_oct_17",
    status: "registered",
    initial: "S",
  },
  {
    id: 3,
    email: "m***@domain.test",
    dateKey: "invite_date_oct_12",
    status: "invited",
    initial: "M",
  },
];

export default function Referrals() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState("");

  const inviteMessage = t("referral_invite_message", {
    link: referralLink,
  });

  const copyToClipboard = async (value, type) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch (error) {
      // Fallback for browsers where Clipboard API is unavailable
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (successful) {
        setCopied(type);

        setTimeout(() => {
          setCopied("");
        }, 2000);
      }
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(t("referral_email_subject"));
    const body = encodeURIComponent(inviteMessage);

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareViaMessage = () => {
    const message = encodeURIComponent(inviteMessage);

    window.location.href = `sms:?body=${message}`;
  };

  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(inviteMessage);

    window.open(
      `https://wa.me/?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="referrals-page">
      {/* Page Heading */}
      <div className="referrals-heading">
        <p className="referrals-eyebrow">{t("referrals")}</p>

        <h1>{t("share_your_invite")}</h1>

        <p className="referrals-description">
          {t("referrals_page_description")}
        </p>
      </div>

      {/* Referral Banner */}
      <section className="referral-banner">
        {/* Left Section */}
        <div className="referral-main">
          <p className="referral-label">{t("your_invite_code")}</p>

          <div className="referral-code-row">
            <h2>{referralCode}</h2>

            <button
              type="button"
              className={`referral-action-button ${
                copied === "code" ? "copied" : ""
              }`}
              onClick={() => copyToClipboard(referralCode, "code")}
            >
              {copied === "code" ? (
                <>
                  <Check size={15} />
                  {t("copied")}
                </>
              ) : (
                <>
                  <Copy size={15} />
                  {t("copy_code")}
                </>
              )}
            </button>
          </div>

          {/* Referral URL */}
          <div className="referral-link-box">
            <span>{referralLink}</span>

            <button
              type="button"
              className={`referral-action-button referral-link-button ${
                copied === "link" ? "copied" : ""
              }`}
              onClick={() => copyToClipboard(referralLink, "link")}
            >
              {copied === "link" ? (
                <>
                  <Check size={15} />
                  {t("copied")}
                </>
              ) : (
                <>
                  <Copy size={15} />
                  {t("copy_link")}
                </>
              )}
            </button>
          </div>

          {/* Social Sharing */}
          <div className="referral-share">
            <span className="share-label">{t("share_via")}</span>

            <button
              type="button"
              className="share-button"
              onClick={shareViaEmail}
            >
              <Mail size={15} />
              {t("email")}
            </button>

            <button
              type="button"
              className="share-button"
              onClick={shareViaMessage}
            >
              <MessageCircle size={15} />
              {t("message")}
            </button>

            <button
              type="button"
              className="share-button"
              onClick={shareViaWhatsApp}
            >
              <MessageCircle size={15} />
              WhatsApp
            </button>
          </div>
        </div>

        {/* Right Section - Statistics */}
        <div className="referral-stats">
          {inviteStats.map((stat) => (
            <div className="referral-stat" key={stat.label}>
              <div className="referral-stat-heading">
                <span>{t(stat.label)}</span>
                <strong>{stat.value}</strong>
              </div>

              <div className="referral-progress">
                <div
                  className={`referral-progress-fill ${stat.color}`}
                  style={{
                    width: `${stat.percentage}%`,
                  }}
                />
              </div>

              <span className="referral-stat-description">
                {t(stat.description)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Invite Activity */}
      <section className="invite-activity">
        <div className="activity-heading">
          <p className="referrals-eyebrow">{t("recent")}</p>

          <h2>{t("invite_activity")}</h2>
        </div>

        <div className="activity-list">
          {inviteActivity.map((invite) => (
            <div className="activity-item" key={invite.id}>
              <div className="activity-user">
                <div className="activity-avatar">{invite.initial}</div>

                <div className="activity-user-info">
                  <strong>{invite.email}</strong>
                  <span>{t(invite.dateKey)}</span>
                </div>
              </div>

              <span className={`activity-status ${invite.status}`}>
                {t(invite.status)}
              </span>
            </div>
          ))}
        </div>

        <p className="activity-note">{t("referral_activity_privacy_note")}</p>
      </section>
    </div>
  );
}
