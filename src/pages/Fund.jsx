
import { useTranslation } from "react-i18next";

import SectionHeading from "../components/common/SectionHeading";
import FundingOverview from "../components/fund/FundingOverview";
import PaymentForm from "../components/fund/PaymentForm";
import AvailableBalances from "../components/fund/AvailableBalances";

export default function Fund() {
  const { t } = useTranslation();

  return (
    <>
      <SectionHeading
        eyebrow="fund"
        title="cashier"
        description="fund_page_description"
      />

      <FundingOverview />

      <div className="fund-grid">
        <PaymentForm />

        <div className="fund-side">
          <AvailableBalances />
        </div>
      </div>
    </>
  );
}
