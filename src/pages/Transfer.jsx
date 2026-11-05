import { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  ArrowRightLeft,
  Check,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const initialAccounts = [
  {
    id: "live-usd",
    name: "live_usd",
    number: "MT5 · live-usd",
    currency: "USD",
    balance: 12450,
  },
  {
    id: "raw-usd",
    name: "raw_spread_usd",
    number: "MT5 · usd-raw",
    currency: "USD",
    balance: 1000,
  },
];

const formatMoney = (amount, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);

export default function Transfer() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState(initialAccounts);
  const [fromId, setFromId] = useState("live-usd");
  const [toId, setToId] = useState("raw-usd");
  const [amount, setAmount] = useState("100.00");
  const [message, setMessage] = useState("");

  const fromAccount = accounts.find((a) => a.id === fromId);
  const toAccount = accounts.find((a) => a.id === toId);

  const transferAmount = Number(amount) || 0;
  const fee = 0;

  const isValid =
    fromAccount &&
    toAccount &&
    fromId !== toId &&
    fromAccount.currency === toAccount.currency &&
    transferAmount > 0 &&
    transferAmount <= fromAccount.balance;

  const afterFromBalance = fromAccount
    ? fromAccount.balance - transferAmount
    : 0;

  const afterToBalance = toAccount ? toAccount.balance + transferAmount : 0;

  const eligibleAccounts = useMemo(
    () => accounts.filter((a) => a.currency === fromAccount?.currency),
    [accounts, fromAccount],
  );

  const handleSwap = () => {
    setFromId(toId);
    setToId(fromId);
    setMessage("");
  };

  const handleAmount = (value) => {
    setAmount(String(value));
    setMessage("");
  };

  const handleConfirm = () => {
    if (!isValid) return;

    setAccounts((previous) =>
      previous.map((account) => {
        if (account.id === fromId) {
          return {
            ...account,
            balance: account.balance - transferAmount,
          };
        }

        if (account.id === toId) {
          return {
            ...account,
            balance: account.balance + transferAmount,
          };
        }

        return account;
      }),
    );

    setMessage(t("transfer_completed_successfully"));
    setAmount("0.00");
  };

  const AccountSelect = ({ value, onChange, excludeId }) => (
    <select
      className="transfer-account-select"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        setMessage("");
      }}
    >
      {accounts
        .filter(
          (account) =>
            account.id !== excludeId &&
            account.currency === accounts.find((a) => a.id === value)?.currency,
        )
        .map((account) => (
          <option key={account.id} value={account.id}>
            {t(account.name)} — {account.number}
          </option>
        ))}

      {accounts
        .filter(
          (account) =>
            account.id !== excludeId &&
            account.currency !== accounts.find((a) => a.id === value)?.currency,
        )
        .map((account) => (
          <option key={account.id} value={account.id} disabled>
            {t(account.name)} — {t("different_currency")}
          </option>
        ))}
    </select>
  );

  return (
    <div className="transfer-page">
      {/* Page heading */}
      <div className="transfer-heading">
        <p className="eyebrow">{t("internal_transfer")}</p>
        <h1>{t("move_funds_between_live_accounts")}</h1>
        <p className="muted">{t("transfer_page_description")}</p>
      </div>

      {/* Information banner */}
      <div className="transfer-banner">
        <div className="transfer-banner-left">
          <div className="transfer-banner-icon">
            <ArrowLeftRight size={23} />
          </div>

          <div>
            <p className="eyebrow">{t("account_to_account")}</p>
            <h3>{t("move_settled_funds_with_preview")}</h3>
            <p className="muted">{t("transfer_banner_description")}</p>
          </div>
        </div>

        <div className="transfer-banner-stats">
          <div>
            <small>{t("transfer_fee")}</small>
            <strong>{t("none")}</strong>
          </div>

          <div>
            <small>{t("currency")}</small>
            <strong>{fromAccount?.currency || "USD"}</strong>
          </div>

          <div>
            <small>{t("eligible")}</small>
            <strong>
              {t("accounts_count", { count: eligibleAccounts.length })}
            </strong>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="transfer-layout">
        {/* Transfer form */}
        <section className="transfer-form panel">
          <div className="transfer-section-heading">
            <div>
              <p className="eyebrow">{t("transfer_details")}</p>
              <h2>{t("select_your_route")}</h2>
            </div>

            <span className="demo-label">{t("demonstration")}</span>
          </div>

          {/* Steps */}
          <div className="transfer-steps">
            <div className="transfer-step">
              <span>1</span>
              {t("accounts")}
            </div>

            <i />

            <div className="transfer-step">
              <span>2</span>
              {t("amount")}
            </div>

            <i />

            <div className="transfer-step current">
              <span>3</span>
              {t("confirm")}
            </div>
          </div>

          {/* Account selection */}
          <div className="account-route">
            <div className="route-account">
              <label>{t("from_account")}</label>

              <div className="route-select-wrapper">
                <div className="currency-icon">USD</div>

                <div className="route-select-content">
                  <AccountSelect
                    value={fromId}
                    onChange={setFromId}
                    excludeId={toId}
                  />

                  <small>{fromAccount?.number}</small>
                </div>

                <ChevronDown size={14} />
              </div>

              <div className="route-balance">
                <small>{t("available_now")}</small>

                <strong>
                  {formatMoney(
                    fromAccount?.balance || 0,
                    fromAccount?.currency,
                  )}
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="swap-accounts"
              onClick={handleSwap}
              title={t("swap_accounts")}
              aria-label={t("swap_accounts")}
            >
              <ArrowLeftRight size={18} />
            </button>

            <div className="route-account">
              <label>{t("to_account")}</label>

              <div className="route-select-wrapper">
                <div className="currency-icon blue">USD</div>

                <div className="route-select-content">
                  <AccountSelect
                    value={toId}
                    onChange={setToId}
                    excludeId={fromId}
                  />

                  <small>{toAccount?.number}</small>
                </div>

                <ChevronDown size={14} />
              </div>

              <div className="route-balance">
                <small>{t("current_balance")}</small>

                <strong>
                  {formatMoney(toAccount?.balance || 0, toAccount?.currency)}
                </strong>
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="transfer-amount-section">
            <div className="transfer-amount-heading">
              <label>{t("amount_to_transfer")}</label>

              <small>
                {formatMoney(fromAccount?.balance || 0, fromAccount?.currency)}{" "}
                {t("available")}
              </small>
            </div>

            <div className="transfer-amount-input">
              <span>{fromAccount?.currency || "USD"}</span>

              <input
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setMessage("");
                }}
                placeholder="0.00"
              />
            </div>

            <div className="quick-amounts">
              {[100, 500, 1000].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleAmount(value)}
                >
                  {formatMoney(value)}
                </button>
              ))}

              <button
                type="button"
                onClick={() => handleAmount(fromAccount?.balance || 0)}
              >
                {t("max")}
              </button>
            </div>
          </div>

          {/* Validation */}
          {!isValid && transferAmount > 0 && (
            <p className="transfer-error">
              {fromId === toId
                ? t("select_two_different_accounts")
                : fromAccount?.currency !== toAccount?.currency
                  ? t("same_currency_required")
                  : transferAmount > (fromAccount?.balance || 0)
                    ? t("insufficient_available_balance")
                    : t("enter_valid_transfer_amount")}
            </p>
          )}

          {/* Conditions */}
          <div className="transfer-conditions">
            <span>
              <Check size={13} /> {t("same_currency_only")}
            </span>

            <span>
              <Check size={13} /> {t("no_transfer_fee")}
            </span>

            <span>
              <Check size={13} /> {t("balance_checked")}
            </span>
          </div>
        </section>

        {/* Transfer summary */}
        <aside className="transfer-summary panel">
          <div className="summary-heading">
            <div>
              <p className="eyebrow">{t("review")}</p>
              <h2>{t("transfer_summary")}</h2>
            </div>

            <span className="ready-badge">
              {isValid ? t("ready") : t("review")}
            </span>
          </div>

          <div className="summary-amount">
            <small>{t("you_are_moving")}</small>

            <h1>{formatMoney(transferAmount, fromAccount?.currency)}</h1>

            <p>
              {t("fee")} {formatMoney(fee)}
            </p>
          </div>

          <div className="summary-balance">
            <small>{t("from_after_transfer")}</small>

            <div>
              <strong>{fromAccount && t(fromAccount.name)}</strong>
              <b>{formatMoney(afterFromBalance, fromAccount?.currency)}</b>
            </div>
          </div>

          <div className="summary-connector">
            <span />
            <ArrowLeftRight size={13} />
            <span />
          </div>

          <div className="summary-balance">
            <small>{t("to_after_transfer")}</small>

            <div>
              <strong>{toAccount && t(toAccount.name)}</strong>
              <b>{formatMoney(afterToBalance, toAccount?.currency)}</b>
            </div>
          </div>

          <div className="summary-details">
            <div>
              <span>{t("exchange")}</span>
              <strong>{t("not_required")}</strong>
            </div>

            <div>
              <span>{t("transfer_type")}</span>
              <strong>{t("internal")}</strong>
            </div>

            <div>
              <span>{t("recorded_by")}</span>
              <strong>{t("your_broker")}</strong>
            </div>
          </div>

          <button
            type="button"
            className="button primary confirm-transfer"
            onClick={handleConfirm}
            disabled={!isValid}
          >
            {t("confirm_transfer")}
          </button>

          {message && (
            <p className="transfer-success">
              <Check size={15} /> {message}
            </p>
          )}

          <p className="summary-footer">{t("demonstration_transfer_note")}</p>
        </aside>
      </div>

      <div className="transfer-security-note">
        <ShieldCheck size={15} />
        {t("internal_transfer_security_note")}
      </div>
    </div>
  );
}
