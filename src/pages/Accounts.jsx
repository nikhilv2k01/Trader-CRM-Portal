
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftRight } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import BalanceCard from "../components/common/BalanceCard";
import { accounts } from "../data/mockData";

export default function Accounts() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const usd = accounts.filter(
    (a) => a.currency === "USD" && a.status === "Live",
  );

  const eur = accounts.filter((a) => a.currency === "EUR");

  const demo = accounts.filter((a) => a.status === "Demo");

  return (
    <>
      <SectionHeading
        eyebrow="accounts"
        title="your_broker_accounts"
        description="accounts_page_description"
        action={
          <div className="heading-actions">
            <button
              className="button primary"
              onClick={() => navigate("/accounts/new")}
            >
              {t("open_account")}
            </button>

            <button
              className="button secondary"
              onClick={() => navigate("/accounts/transfer")}
            >
              <ArrowLeftRight size={15} />
              {t("transfer")}
            </button>
          </div>
        }
      />

      <section className="account-summary">
        <div>
          <small>{t("usd_held")}</small>
          <strong>$13,450.00</strong>
          <span>{t("across_live_accounts", { count: 2 })}</span>
          <div className="summary-progress">
            <i />
          </div>
          <small className="legend">
            ▪ {t("live_usd")} 93% &nbsp; ▪ {t("raw_spread_usd")} 7%
          </small>
        </div>

        <div>
          <small>{t("eur_held")}</small>
          <strong>€820.00</strong>
          <span>{t("across_live_accounts", { count: 1 })}</span>
        </div>

        <div>
          <small>{t("live_accounts")}</small>
          <strong>3</strong>
          <span>{t("currencies_count", { count: 2 })}</span>
        </div>

        <div>
          <small>{t("practice")}</small>
          <strong>1</strong>
          <span>{t("demo_account")}</span>
        </div>

        <p>{t("unrealised_pl_disclaimer")}</p>
      </section>

      <AccountSection
        title="usd_accounts"
        count="two_live_accounts"
        items={usd}
        navigate={navigate}
      />

      <AccountSection
        title="eur_accounts"
        count="one_live_account"
        items={eur}
        navigate={navigate}
      />

      <AccountSection
        title="practice_accounts"
        count="demo_balances_no_client_money"
        items={demo}
        navigate={navigate}
      />

      <section className="panel catalogue" id="catalogue">
        <div className="catalogue-head">
          <div>
            <p className="eyebrow">{t("broker_catalogue")}</p>
            <h2>{t("available_account_types")}</h2>
          </div>
        </div>

        <div className="catalogue-types">
          <button
            type="button"
            onClick={() => navigate("/accounts/new?type=standard")}
          >
            <span className="currency-icon">USD</span>
            <span>
              <b>{t("standard_usd")}</b>
              <small>{t("metatrader_5_usd")}</small>
            </span>
            <em className="live-tag">{t("live")}</em>
          </button>

          <button
            type="button"
            onClick={() => navigate("/accounts/new?type=demo")}
          >
            <span className="currency-icon">USD</span>
            <span>
              <b>{t("demo_usd")}</b>
              <small>{t("metatrader_5_usd")}</small>
            </span>
            <em className="demo-tag">{t("demo")}</em>
          </button>
        </div>

        <p className="muted catalogue-note">
          {t("broker_policy_revision")}
        </p>
      </section>

      <p className="accounts-disclaimer">
        {t("accounts_disclaimer")}
      </p>
    </>
  );
}

function AccountSection({ title, count, items, navigate }) {
  const { t } = useTranslation();

  return (
    <section className="account-section">
      <div className="account-section-heading">
        <div>
          <span className="section-icon">⊕</span>
          <div>
            <p className="eyebrow">{t("balances")}</p>
            <h2>{t(title)}</h2>
          </div>
        </div>

        <small>{t(count)}</small>
      </div>

      <div className="account-cards">
        {items.map((account) => (
          <BalanceCard
            key={account.id}
            account={account}
            onFund={() => navigate("/fund")}
            onTransfer={() => navigate("/accounts/transfer")}
            onDetails={() => navigate(`/accounts/${account.id}`)}
          />
        ))}
      </div>
    </section>
  );
}
