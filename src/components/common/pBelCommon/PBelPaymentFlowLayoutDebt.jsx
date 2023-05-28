import PBelPaymentFlowHeader from "./PBelPaymentFlowHeader";
import PBelPaymentFlowFooter from "./PBelPaymentFlowFooter";
import DebtMessage from "../DebtMessage";

function PaymentFlowLayoutDebt({ handleOnClick }) {
  return (
    <>
      <PBelPaymentFlowHeader />
      <DebtMessage handleOnClick={handleOnClick} isBikeFlow={false} />
      <PBelPaymentFlowFooter />
    </>
  );
}

export default PaymentFlowLayoutDebt;
