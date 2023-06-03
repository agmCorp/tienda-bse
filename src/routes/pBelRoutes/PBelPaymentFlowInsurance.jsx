import Protected from "../../auth/Protected";
import PBelPaymentFlowLayout from "../../components/common/pBelCommon/PBelPaymentFlowLayout";
import Insurance from "../../components/pBelInsQuote/Insurance";

function PBelPaymentFlowInsurance() {
  return (
    <Protected>
      <PBelPaymentFlowLayout>
        <Insurance />
      </PBelPaymentFlowLayout>
    </Protected>
  );
}

export default PBelPaymentFlowInsurance;
