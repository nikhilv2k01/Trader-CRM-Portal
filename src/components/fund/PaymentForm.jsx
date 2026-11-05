import { useMemo, useState } from "react";
import { CreditCard, Wallet, Building2, CheckCircle2 } from "lucide-react";

const presets = [100, 250, 500, 1000];

export default function PaymentForm() {
  const [type, setType] = useState("Deposit");
  const [method, setMethod] = useState("card");
  const [amount, setAmount] = useState("100.00");
  const [currency, setCurrency] = useState("USD");
  const [step, setStep] = useState(2);
  const [confirmed, setConfirmed] = useState(false);

  const methods = {
    Deposit: [
      {
        id: "card",
        name: "Visa / Mastercard",
        description: "USD · EUR",
        fee: 1.5,
        icon: CreditCard,
      },
      {
        id: "crypto",
        name: "USDT (TRC-20)",
        description: "USD",
        fee: 0.5,
        icon: Wallet,
      },
    ],
    Withdraw: [
      {
        id: "card",
        name: "Visa / Mastercard",
        description: "USD · EUR",
        fee: 1.5,
        icon: CreditCard,
      },
      {
        id: "bank",
        name: "Bank transfer",
        description: "USD",
        fee: 0,
        icon: Building2,
      },
    ],
  };

  const numeric = Math.max(0, Number(amount) || 0);

  const selectedMethod = methods[type].find((item) => item.id === method);

  const feePercentage = selectedMethod?.fee ?? 0;

  const fee = useMemo(
    () => (numeric * feePercentage) / 100,
    [numeric, feePercentage],
  );

  const receiveAmount = Math.max(0, numeric - fee);

  const isDeposit = type === "Deposit";

  const availableAmount = currency === "USD" ? 13450 : 820;

  const formatMoney = (value) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency,
    });

  const changeType = (newType) => {
    setType(newType);
    setMethod("card");
    setStep(2);
    setConfirmed(false);

    if (newType === "Withdraw") {
      setCurrency("USD");
    }
  };

  const changeMethod = (newMethod) => {
    setMethod(newMethod);

    if (newMethod === "crypto" || newMethod === "bank") {
      setCurrency("USD");
    }
  };

  const handleReview = () => {
    if (numeric <= 0) return;
    setStep(3);
    setConfirmed(false);
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  return (
    <section className="panel payment-panel">
      <p className="eyebrow">CASHIER</p>
      <h2>New payment request</h2>

      {/* Deposit / Withdraw */}
      <div className="payment-tabs">
        <button
          className={isDeposit ? "active" : ""}
          onClick={() => changeType("Deposit")}
        >
          Deposit
        </button>

        <button
          className={!isDeposit ? "active" : ""}
          onClick={() => changeType("Withdraw")}
        >
          Withdraw
        </button>
      </div>

      {/* Steps */}
      <div className="steps">
        <div className={step >= 1 ? "done" : ""}>
          <i>01</i>
          <span>
            <b>Method</b>
            <small>{selectedMethod?.name}</small>
          </span>
        </div>

        <span className="step-line" />

        <div className={step >= 2 ? "done" : ""}>
          <i>02</i>
          <span>
            <b>Amount</b>
            <small>
              {currency} {numeric.toFixed(2)}
            </small>
          </span>
        </div>

        <span className="step-line" />

        <div className={step >= 3 ? "done" : ""}>
          <i>03</i>
          <span>
            <b>Review</b>
            <small>{step >= 3 ? "Ready to request" : "Pending"}</small>
          </span>
        </div>
      </div>

      <div className="form-divider" />

      {/* Payment method */}
      <label className="field-label">METHOD</label>

      <div className="method-options">
        {methods[type].map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              className={method === item.id ? "chosen" : ""}
              onClick={() => {
                changeMethod(item.id);
                setConfirmed(false);
              }}
            >
              <span className="method-icon">
                <Icon size={18} />
              </span>

              <span>
                <b>{item.name}</b>
                <small>{item.description}</small>
              </span>

              <strong>
                {item.fee === 0 ? "No fee" : `${item.fee.toFixed(2)}%`}
              </strong>
            </button>
          );
        })}
      </div>

      {/* Amount */}
      <label className="field-label amount-label" htmlFor="amount">
        AMOUNT
      </label>

      <div className="amount-input">
        <input
          id="amount"
          type="number"
          min="0"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setConfirmed(false);
          }}
        />

        <select
          value={currency}
          onChange={(e) => {
            setCurrency(e.target.value);
            setConfirmed(false);
          }}
        >
          <option value="USD">USD</option>
          {method === "card" && <option value="EUR">EUR</option>}
        </select>
      </div>

      <div className="amount-available">
        {formatMoney(availableAmount)} available
      </div>

      {/* Preset amounts */}
      <div className="presets">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            className={numeric === preset ? "picked" : ""}
            onClick={() => {
              setAmount(preset.toFixed(2));
              setConfirmed(false);
            }}
          >
            {formatMoney(preset)}
          </button>
        ))}

        {!isDeposit && (
          <button
            type="button"
            onClick={() => setAmount(availableAmount.toFixed(2))}
          >
            All
          </button>
        )}
      </div>

      {/* Fee calculation */}
      <div className="fee-summary">
        <div>
          <span>{isDeposit ? "YOU SEND" : "YOU REQUEST"}</span>
          <strong>{formatMoney(numeric)}</strong>
        </div>

        <div className="fee-operator">
          <span>FEE ({feePercentage.toFixed(2)}%)</span>
          <strong>- {formatMoney(fee)}</strong>
        </div>

        <div className="credited-amount">
          <span>{isDeposit ? "CREDITED" : "YOU RECEIVE"}</span>
          <strong>{formatMoney(receiveAmount)}</strong>
        </div>
      </div>

      <div className="payment-assurances">
        <span>✓ Fee shown upfront</span>
        <span>✓ Currency-bound</span>
        <span>✓ Broker reviewed</span>
      </div>

      {/* Review section */}
      {step >= 3 && (
        <div className="payment-review">
          <p className="eyebrow">REVIEW</p>
          <h2>{type}</h2>

          <div className="review-row">
            <span>Method</span>
            <strong>{selectedMethod?.name}</strong>
          </div>

          <div className="review-row">
            <span>Amount</span>
            <strong>{formatMoney(numeric)}</strong>
          </div>

          <div className="review-row">
            <span>Fee</span>
            <strong>{formatMoney(fee)}</strong>
          </div>

          <div className="review-row">
            <span>{isDeposit ? "Credited" : "Received"}</span>
            <strong>{formatMoney(receiveAmount)}</strong>
          </div>

          <p className="fine-print">
            Requests are recorded for broker review. Nothing is sent to a
            payment provider from this screen.
          </p>

          {!confirmed ? (
            <div className="review-actions">
              <button className="button secondary" onClick={() => setStep(2)}>
                Back
              </button>

              <button
                className="button primary confirm-request"
                onClick={handleConfirm}
              >
                Confirm request
              </button>
            </div>
          ) : (
            <div className="request-success">
              <CheckCircle2
                size={42}
                strokeWidth={2}
                aria-label="Request confirmed"
              />
            </div>
          )}
        </div>
      )}

      {/* Request button */}
      {step < 3 && (
        <button
          className="button primary submit-request"
          disabled={numeric <= 0}
          onClick={handleReview}
        >
          Request {isDeposit ? "deposit" : "withdrawal"}
        </button>
      )}

      <p className="fine-print">
        Requests are recorded for broker review. Nothing is sent to a payment
        provider from this screen.
      </p>
    </section>
  );
}
