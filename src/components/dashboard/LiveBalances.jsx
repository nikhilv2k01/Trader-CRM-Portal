
import { useTranslation } from "react-i18next";
import { accounts, money } from "../../data/mockData";

export default function LiveBalances() {
  const { t } = useTranslation();

  return (
    <>
      <section className="live-balances">
        <div className="live-title">
          <span>◎</span>
          <h2>{t("live_balances")}</h2>
        </div>

        <div className="currency-balance">
          <small>USD</small>
          <strong>$13,450.00</strong>
          <span>{t("accounts_count", { count: 2 })}</span>
        </div>

        <div className="currency-balance">
          <small>EUR</small>
          <strong>€820.00</strong>
          <span>{t("accounts_count", { count: 1 })}</span>
        </div>

        <p>{t("currency_balance_disclaimer")}</p>

        <a href="/accounts">{t("all_accounts")} ↗</a>
      </section>

      <section className="panel margin-overview">
        <div className="margin-heading">
          <div>
            <h3>{t("margin_overview")}</h3>
            <small>{t("live_usd")}</small>
          </div>

          <div className="donut">
            <b>77%</b>
          </div>
        </div>

        <div className="margin-row">
          <span>
            <i className="dot teal-dot" />
            {t("free_margin")}
          </span>
          <b>$9,824.00</b>
        </div>

        <div className="margin-row">
          <span>
            <i className="dot pale-dot" />
            {t("margin_in_use")}
          </span>
          <b>$2,858.00</b>
        </div>
      </section>
    </>
  );
}
