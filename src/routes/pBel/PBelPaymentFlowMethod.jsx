import Protected from "../../auth/Protected";
import PBelPaymentFlowLayout from "../../components/common/pBel/PBelPaymentFlowLayout";
import PaymentMethod from "../../components/pBelInsQuote/PaymentMethod";

function PBelPaymentFlowMethod() {
  return (
    <Protected>
      <PBelPaymentFlowLayout>
        <PaymentMethod />
      </PBelPaymentFlowLayout>
    </Protected>
  );
}

export default PBelPaymentFlowMethod;
