import { accounts, money } from "../../data/mockData";
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  Globe,
  ArrowLeftRight,
} from "lucide-react";

export default function AvailableBalances() {
  return (
    <>
      <section className="panel available-panel">
        <p className="eyebrow">AVAILABLE</p>
        <h2>Your balances</h2>

        <div className="available-list">
          {accounts
            .filter((a) => a.status === "Live")
            .map((a) => (
              <div className="available-item" key={a.id}>
                <span className="currency-icon">{a.currency}</span>

                <span>
                  <b>{a.name}</b>
                  <small>{a.currency}</small>
                </span>

                <strong>{money(a.balance, a.currency)}</strong>
              </div>
            ))}
        </div>

        <p className="muted note">
          Requests carry a currency, not an account. Your broker allocates a
          deposit to the matching account.
        </p>
      </section>

      <section className="panel limits-panel">
        <p className="eyebrow">VISA / MASTERCARD</p>
        <h2>Limits</h2>

        <div className="limit-row">
          <span>
            <ArrowUp size={15} /> Minimum
          </span>
          <b>$10.00</b>
        </div>

        <div className="limit-row">
          <span>
            <ArrowDown size={15} /> Maximum
          </span>
          <b>$500,000.00</b>
        </div>

        <div className="limit-row">
          <span>
            <DollarSign size={15} /> Fee
          </span>
          <b>1.50%</b>
        </div>

        <div className="limit-row">
          <span>
            <Globe size={15} /> Currencies
          </span>
          <b>USD · EUR</b>
        </div>

        <div className="limit-row">
          <span>
            <ArrowLeftRight size={15} /> Direction
          </span>
          <b>Deposit and withdraw</b>
        </div>
      </section>
    </>
  );
}
