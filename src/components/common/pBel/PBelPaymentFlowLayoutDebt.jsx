import PBelPaymentFlowHeader from "./PBelPaymentFlowHeader";
import PBelPaymentFlowFooter from "./PBelPaymentFlowFooter";
import DebtMessage from "./DebtMessage";

function PaymentFlowLayoutDebt({ handleClick }) {
  return (
    <>
      <PBelPaymentFlowHeader />
      <DebtMessage handleClick={handleClick} isBikeFlow={false} />
      <PBelPaymentFlowFooter />
    </>
  );
}

export default PaymentFlowLayoutDebt;
