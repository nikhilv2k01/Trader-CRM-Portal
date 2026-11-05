import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function OpenAccount() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const initialType = searchParams.get("type") === "demo" ? "demo" : "standard";

  const [selectedAccount, setSelectedAccount] = useState(initialType);

  const accountTypes = {
    standard: {
      name: "standard_usd",
      environment: "live",
      currency: "USD",
      platform: "MetaTrader 5",
      badge: "live",
    },
    demo: {
      name: "demo_usd",
      environment: "demo",
      currency: "USD",
      platform: "MetaTrader 5",
      badge: "demo",
    },
  };

  const selected = accountTypes[selectedAccount];

  const handleOpenAccount = () => {
    // Demo action: replace with your API integration later.
    alert(
      t("account_request_submitted", {
        account: t(selected.name),
      }),
    );
    navigate("/accounts");
  };

  return (
    <div className="open-account-page">
      <div className="open-account-heading">
        <p className="eyebrow">{t("open_account_heading")}</p>
        <h1>{t("choose_account_type")}</h1>
        <p className="muted">{t("open_account_description")}</p>
      </div>

      <div className="open-account-layout">
        <div className="account-type-options">
          {Object.entries(accountTypes).map(([key, account]) => (
            <button
              key={key}
              type="button"
              className={`account-type-card ${
                selectedAccount === key ? "selected" : ""
              }`}
              onClick={() => setSelectedAccount(key)}
            >
              <span className={`account-badge ${key}`}>{t(account.badge)}</span>

              <h3>{t(account.name)}</h3>
              <p>
                {account.currency} · {account.platform}
              </p>
            </button>
          ))}
        </div>

        <div className="account-confirmation">
          <p className="eyebrow">{t("confirmation")}</p>
          <h2>{t(selected.name)}</h2>

          <div className="confirmation-details">
            <div>
              <small>{t("environment")}</small>
              <strong>{t(selected.environment)}</strong>
            </div>

            <div>
              <small>{t("currency")}</small>
              <strong>{selected.currency}</strong>
            </div>

            <div>
              <small>{t("platform")}</small>
              <strong>{selected.platform}</strong>
            </div>
          </div>

          <button
            type="button"
            className="button primary open-account-submit"
            onClick={handleOpenAccount}
          >
            {t("open_account")}
          </button>

          <p className="confirmation-note">
            {t("mt5_group_routing_note")}{" "}
            <span onClick={() => navigate("/accounts")}>
              {t("back_to_accounts")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
