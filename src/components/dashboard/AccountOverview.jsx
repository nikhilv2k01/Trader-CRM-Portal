import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { accounts, chartData, money } from "../../data/mockData";

export default function AccountOverview() {
  const { t } = useTranslation();

  const [selected, setSelected] = useState(accounts[0]);
  const [view, setView] = useState("chart");

  return (
    <section className="panel overview-panel">
      <div className="panel-heading">
        <h2>{t("account_overview")}</h2>
        <a href="/accounts">{t("all_accounts")} ↗</a>
      </div>

      <div className="account-tabs">
        {accounts.map((a) => (
          <button
            key={a.id}
            className={selected.id === a.id ? "selected" : ""}
            onClick={() => setSelected(a)}
          >
            <b>{a.name}</b>
            <strong>{money(a.balance, a.currency)}</strong>
            <small>
              {a.platform} · {t(a.status.toLowerCase())}
            </small>
          </button>
        ))}
      </div>

      <div className="overview-balance">
        <div>
          <small>
            {t("balance")} <em>{selected.currency}</em>
          </small>
          <strong>{money(selected.balance, selected.currency)}</strong>
        </div>

        <div className="equity-pair">
          <div>
            <small>{t("equity")}</small>
            <b>{money(selected.equity, selected.currency)}</b>
          </div>

          <div>
            <small>{t("unrealised")}</small>
            <b className={selected.unrealised >= 0 ? "positive" : "negative"}>
              {selected.unrealised >= 0 ? "+" : ""}
              {money(selected.unrealised, selected.currency)}
            </b>
          </div>
        </div>
      </div>

      <div className="chart-head">
        <span>{t("recorded_movements")}</span>

        <div className="segmented">
          <button
            className={view === "chart" ? "on" : ""}
            onClick={() => setView("chart")}
          >
            {t("chart")}
          </button>

          <button
            className={view === "activity" ? "on" : ""}
            onClick={() => setView("activity")}
          >
            {t("activity")}
          </button>
        </div>
      </div>

      {view === "chart" ? (
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#078879" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#078879" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 4"
                vertical={false}
                stroke="#e5ecef"
              />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#78909a" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                domain={[9500, 13000]}
                tick={{ fontSize: 10, fill: "#78909a" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => "$" + (v / 1000).toFixed(2) + "k"}
                width={62}
              />

              <Tooltip formatter={(v) => money(v)} />

              <Area
                type="monotone"
                dataKey="balance"
                stroke="#078879"
                strokeWidth={2.5}
                fill="url(#balanceFill)"
                dot={{
                  r: 3.5,
                  fill: "#fff",
                  stroke: "#078879",
                  strokeWidth: 2,
                }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="activity-empty">
          <b>{t("no_recent_activity")}</b>
          <span>{t("account_movements_message")}</span>
        </div>
      )}

      <div className="chart-foot">
        <span>{t("cash_movements_disclaimer")}</span>
        <a href="/accounts">{t("account_details")} ↗</a>
      </div>
    </section>
  );
}
