export default function FundingOverview() {
  return (
    <section className="panel funding-overview">
      <div>
        <p className="eyebrow">FUNDING OVERVIEW</p>
        <h2>Available balances</h2>
        <p className="muted">Currencies are shown separately.</p>
      </div>

      <div className="funding-stat">
        <small>USD AVAILABLE</small>
        <strong>$13,450.00</strong>
        <span>2 linked accounts</span>
      </div>

      <div className="funding-stat">
        <small>EUR AVAILABLE</small>
        <strong>€820.00</strong>
        <span>1 linked account</span>
      </div>
    </section>
  );
}
