
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Wallet,
  ArrowDownToLine,
  ArrowLeftRight,
  CreditCard,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Lock,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
} from "lucide-react";

import { accounts, money, chartData } from "../data/mockData";
import "../styles/AccountDetails.css";

export default function AccountDetails() {
  const { accountCode } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const account = useMemo(
    () =>
      accounts.find(
        (item) => item.code.toLowerCase() === accountCode?.toLowerCase()
      ),
    [accountCode]
  );

  if (!account) {
    return (
      <div className="panel p-8">
        <h2>{t("account_not_found")}</h2>
        <p className="muted mt-2">
          {t("requested_account_not_found")}
        </p>
        <button
          className="button primary mt-4"
          onClick={() => navigate("/accounts")}
        >
          {t("back_to_accounts")}
        </button>
      </div>
    );
  }

  const isDemo = account.status === "Demo";

  const marginUsed = account.margin;
  const equity = account.equity;
  const freeMargin = account.freeMargin;

  const marginPercentage = equity > 0 ? (marginUsed / equity) * 100 : 0;
  const freePercentage = equity > 0 ? (freeMargin / equity) * 100 : 0;

  const movements = [
    {
      title: "transfer_from_raw_spread",
      type: "transfer_in",
      date: "date_sept_30",
      amount: 500,
      icon: ArrowDownLeft,
    },
    {
      title: "bank_transfer_recorded",
      type: "deposit",
      date: "date_sept_24",
      amount: 1000,
      icon: CreditCard,
    },
    {
      title: "transfer_to_raw_spread",
      type: "transfer_out",
      date: "date_sept_18",
      amount: -1500,
      icon: ArrowUpRight,
    },
    {
      title: "card_deposit_recorded",
      type: "deposit",
      date: "date_sept_11",
      amount: 2000,
      icon: CreditCard,
    },
  ];

  const accountChart = chartData.map((item) => ({
    ...item,
    balance:
      account.balance +
      (item.balance - chartData[chartData.length - 1].balance),
  }));

  const chartValues = accountChart.map((item) => item.balance);
  const minValue = Math.min(...chartValues) * 0.97;
  const maxValue = Math.max(...chartValues) * 1.03;

  const chartPoints = accountChart.map((item, index) => {
    const x = 40 + (index * 650) / (accountChart.length - 1);
    const y =
      165 - ((item.balance - minValue) / (maxValue - minValue || 1)) * 125;

    return { ...item, x, y };
  });

  const chartLine = chartPoints
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  const chartArea = `40,180 ${chartLine} 690,180`;

  const transferPartner = accounts.find(
    (item) =>
      item.id !== account.id &&
      item.currency === account.currency &&
      item.status === "Live"
  );

  return (
    <div className="account-details-page">
      {/* PAGE HEADER */}

      <div className="account-details-heading">
        <div>
          <p className="eyebrow">
            {t(account.status.toLowerCase())} {t("account")} ·{" "}
            {account.currency}
          </p>

          <h1>{account.name}</h1>

          <p className="muted">
            {t("account_details_description")}
          </p>
        </div>

        <div className="account-detail-actions">
          <button
            className="button primary"
            onClick={() => navigate(`/fund?account=${account.id}`)}
          >
            <ArrowDownToLine size={15} />
            {t("fund")}
          </button>

          <button
            className="button secondary"
            onClick={() => navigate(`/accounts/transfer?from=${account.id}`)}
          >
            <ArrowLeftRight size={15} />
            {t("transfer")}
          </button>

          <button
            className="button secondary"
            onClick={() => navigate("/accounts")}
          >
            {t("all_accounts")}
          </button>
        </div>
      </div>

      {/* BALANCE SUMMARY */}

      <section className="account-detail-summary">
        <div className="account-stat-card dark-stat">
          <small>{t("balance").toUpperCase()}</small>
          <h2>{money(account.balance, account.currency)}</h2>
          <p>{t("settled_funds_description")}</p>
        </div>

        <div className="account-stat-card">
          <small>{t("equity").toUpperCase()}</small>
          <h2>{money(account.equity, account.currency)}</h2>
          <p className={account.unrealised >= 0 ? "positive" : "negative"}>
            {account.unrealised >= 0 ? "+" : ""}
            {money(account.unrealised, account.currency)}
            {" · "}
            {account.balance > 0
              ? ((account.unrealised / account.balance) * 100).toFixed(2)
              : "0.00"}
            % {t("unrealised")}
          </p>
        </div>

        <div className="account-stat-card">
          <small>{t("free_margin").toUpperCase()}</small>
          <h2>{money(account.freeMargin, account.currency)}</h2>
          <p>
            {freePercentage.toFixed(1)}% {t("of_equity_available")}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}

      <div className="account-details-grid">
        <div className="account-details-main">
          {/* EQUITY COMPOSITION */}

          <section className="detail-panel">
            <div className="detail-panel-heading">
              <div>
                <p className="eyebrow">{t("composition").toUpperCase()}</p>
                <h2>{t("where_equity_sits")}</h2>
              </div>

              <small>{t("as_at_date")}</small>
            </div>

            <div className="equity-progress">
              <span
                className="margin-progress"
                style={{ width: `${marginPercentage}%` }}
              />
              <span
                className="free-progress"
                style={{ width: `${freePercentage}%` }}
              />
            </div>

            <div className="equity-breakdown">
              <div>
                <small>
                  <i className="dot margin-dot" />
                  {t("margin_in_use").toUpperCase()}
                </small>
                <strong>{money(marginUsed, account.currency)}</strong>
                <span>{marginPercentage.toFixed(1)}%</span>
              </div>

              <div>
                <small>
                  <i className="dot free-dot" />
                  {t("free_margin").toUpperCase()}
                </small>
                <strong>{money(freeMargin, account.currency)}</strong>
                <span>{freePercentage.toFixed(1)}%</span>
              </div>

              <div>
                <small>
                  <i className="dot equity-dot" />
                  {t("equity").toUpperCase()}
                </small>
                <strong>{money(equity, account.currency)}</strong>
                <span>100%</span>
              </div>
            </div>

            <p className="detail-description">
              {t("equity_composition_description")}
            </p>
          </section>

          {/* WORKSPACE MOVEMENTS */}

          <section className="detail-panel movements-panel">
            <div className="detail-panel-heading">
              <div>
                <p className="eyebrow">{t("activity").toUpperCase()}</p>
                <h2>{t("workspace_movements")}</h2>
              </div>

              <small>
                {t("in")} {money(3500, account.currency)} · {t("out")}{" "}
                {money(1500, account.currency)}
              </small>
            </div>

            <div className="movement-summary">
              <div>
                <small>{t("opening_balance").toUpperCase()}</small>
                <strong>
                  {money(account.balance - 2000, account.currency)}
                </strong>
              </div>

              <div>
                <small>{t("net_movement").toUpperCase()}</small>
                <strong className="positive">
                  +{money(2000, account.currency)}
                </strong>
              </div>

              <div>
                <small>{t("current_balance").toUpperCase()}</small>
                <strong>{money(account.balance, account.currency)}</strong>
              </div>

              <div className="recorded-count">
                <small>{t("recorded_movements_count", { count: 4 }).toUpperCase()}</small>
              </div>
            </div>

            {/* BALANCE CHART */}

            <div className="balance-chart">
              <div className="chart-label chart-label-top">
                {money(maxValue, account.currency)}
              </div>

              <div className="chart-label chart-label-middle">
                {money((maxValue + minValue) / 2, account.currency)}
              </div>

              <div className="chart-label chart-label-bottom">
                {money(minValue, account.currency)}
              </div>

              <svg
                viewBox="0 0 730 190"
                preserveAspectRatio="none"
                className="balance-chart-svg"
              >
                <defs>
                  <linearGradient
                    id="balanceGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#18b99f"
                      stopOpacity="0.25"
                    />
                    <stop
                      offset="100%"
                      stopColor="#18b99f"
                      stopOpacity="0.01"
                    />
                  </linearGradient>
                </defs>

                <line
                  x1="0"
                  y1="180"
                  x2="730"
                  y2="180"
                  stroke="#dce6e9"
                />

                <line
                  x1="0"
                  y1="120"
                  x2="730"
                  y2="120"
                  stroke="#dce6e9"
                  strokeDasharray="4 4"
                />

                <polygon points={chartArea} fill="url(#balanceGradient)" />

                <polyline
                  points={chartLine}
                  fill="none"
                  stroke="#18b99f"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />

                {chartPoints.map((point) => (
                  <g key={point.date}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="5"
                      fill="#ffffff"
                      stroke="#18b99f"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                ))}
              </svg>

              <div className="chart-dates">
                <span>{t("chart_start_date")}</span>
                <span>{t("recorded_movements_count", { count: 4 })}</span>
                <span>{t("chart_end_date")}</span>
              </div>
            </div>

            {/* TRANSACTION HISTORY */}

            <div className="movement-list">
              {movements.map((movement, index) => {
                const Icon = movement.icon;

                return (
                  <div className="movement-item" key={index}>
                    <div className="movement-icon">
                      <Icon size={17} />
                    </div>

                    <div className="movement-info">
                      <strong>{t(movement.title)}</strong>
                      <small>
                        {t(movement.type)} · {t(movement.date)}
                      </small>
                    </div>

                    <div className="movement-amount">
                      <strong
                        className={
                          movement.amount >= 0 ? "positive" : "negative"
                        }
                      >
                        {movement.amount >= 0 ? "+" : "-"}
                        {money(Math.abs(movement.amount), account.currency)}
                      </strong>

                      <small>
                        {t("balance")}{" "}
                        {money(
                          account.balance -
                            movements
                              .slice(index)
                              .reduce((sum, item) => sum + item.amount, 0),
                          account.currency
                        )}
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}

        <div className="account-details-sidebar">
          {/* ACCOUNT DETAILS */}

          <section className="detail-panel">
            <p className="eyebrow">{t("account").toUpperCase()}</p>
            <h2>{t("details")}</h2>

            <DetailRow
              icon={<CreditCard size={14} />}
              label="platform"
              value={
                account.platform === "MT5"
                  ? "MetaTrader 5"
                  : account.platform
              }
            />

            <DetailRow
              icon={<FileText size={14} />}
              label="account_number"
              value={account.code.toLowerCase()}
              mono
            />

            <DetailRow
              icon={<Wallet size={14} />}
              label="currency"
              value={account.currency}
            />

            <DetailRow
              icon={<CheckCircle2 size={14} />}
              label="environment"
              value={
                <span className={`detail-status ${isDemo ? "demo" : "live"}`}>
                  {t(account.status.toLowerCase())}
                </span>
              }
            />

            <DetailRow
              icon={<Calendar size={14} />}
              label="first_recorded"
              value={t("first_recorded_date")}
            />

            <DetailRow
              icon={<Clock size={14} />}
              label="balances_updated"
              value={t("balances_updated_date")}
            />

            <DetailRow
              icon={<RefreshCw size={14} />}
              label="internal_transfers"
              value={
                transferPartner
                  ? t("available_matching_accounts", { count: 1 })
                  : t("no_matching_account")
              }
              highlight
            />
          </section>

          {/* TRANSFER PARTNERS */}

          <section className="detail-panel">
            <p className="eyebrow">{t("same_currency").toUpperCase()}</p>
            <h2>{t("transfer_partners")}</h2>

            {transferPartner ? (
              <button
                className="transfer-partner"
                onClick={() =>
                  navigate(`/accounts/transfer?from=${account.id}`)
                }
              >
                <strong>{transferPartner.name}</strong>
                <span>
                  {money(transferPartner.balance, transferPartner.currency)}
                </span>
              </button>
            ) : (
              <p className="detail-description">
                {t("no_eligible_transfer_accounts")}
              </p>
            )}

            <p className="detail-description">
              {t("internal_transfer_description")}
            </p>
          </section>

          {/* MT5 PASSWORD */}

          <section className="detail-panel password-panel">
            <p className="eyebrow">{t("mt5_credentials").toUpperCase()}</p>
            <h2>{t("platform_password")}</h2>

            <p className="detail-description">
              {t("platform_password_description")}
            </p>

            <button
              className="password-button"
              onClick={() =>
                alert(t("password_management_coming_soon"))
              }
            >
              <Lock size={14} />
              {t("change_password")}
            </button>

            <small>{t("password_not_changed_workspace")}</small>
          </section>
        </div>
      </div>

      <p className="account-details-disclaimer">
        {t("account_details_disclaimer")}
      </p>
    </div>
  );
}

function DetailRow({ icon, label, value, mono, highlight }) {
  const { t } = useTranslation();

  return (
    <div className="account-detail-row">
      <span className="detail-row-icon">{icon}</span>
      <span className="detail-row-label">{t(label)}</span>

      <strong
        className={`${mono ? "mono" : ""} ${
          highlight ? "highlight-value" : ""
        }`}
      >
        {value}
      </strong>
    </div>
  );
}
