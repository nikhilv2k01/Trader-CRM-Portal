
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { money } from "../../data/mockData";

export default function BalanceCard({ account, compact = false }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleFund = () => {
    navigate(`/fund?account=${account.id}`);
  };

  const handleTransfer = () => {
    navigate(`/accounts/transfer?from=${account.id}`);
  };

  const handleDetails = () => {
    navigate(`/accounts/${account.code.toLowerCase()}`);
  };

  const isDemo = account.status === "Demo";

  return (
    <article
      className={`account-card ${account.color} ${compact ? "compact" : ""}`}
    >
      <div className="card-top">
        <span className="bank-icon">▤</span>

        <span className={`status ${account.status.toLowerCase()}`}>
          {t(account.status.toLowerCase())}
        </span>
      </div>

      <h3>{account.name}</h3>

      <p className="account-code">
        {account.platform} · {account.code}
      </p>

      <strong className="card-balance">
        {money(account.balance, account.currency)}
      </strong>

      <span className="balance-label">{t("balance")}</span>

      <div className="card-stats">
        <div>
          <small>
            {isDemo ? t("open_positions") : t("unrealised").toUpperCase()}
          </small>

          <b className={account.unrealised < 0 ? "negative" : "positive"}>
            {isDemo
              ? t("none")
              : (account.unrealised >= 0 ? "+" : "") +
                money(account.unrealised, account.currency)}
          </b>
        </div>

        <div>
          <small>{t("equity").toUpperCase()}</small>
          <b>{money(account.equity, account.currency)}</b>
        </div>
      </div>

      <div className="margin-line">
        <span />
        <span />
      </div>

      <div className="margin-caption">
        <small>{t("free_margin")}</small>
        <b>
          {money(account.freeMargin, account.currency)} ·{" "}
          {account.marginPercent}%
        </b>
      </div>

      <div className="card-actions">
        <button type="button" onClick={handleFund}>
          {t("fund")}
        </button>

        <button type="button" onClick={handleTransfer}>
          {t("transfer")}
        </button>

        <button type="button" onClick={handleDetails}>
          {t("details")}
        </button>
      </div>

      <p className="updated">
        {t("updated_at", { date: "5 Oct", time: "02:33" })}
      </p>
    </article>
  );
}
