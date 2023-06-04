import PBelProtected from "../../components/common/pBelCommon/PBelProtected";
import PBelPaymentFlowLayout from "../../components/common/pBelCommon/PBelPaymentFlowLayout";
import PaymentMethod from "../../components/pBelInsQuote/PaymentMethod";

function PBelPaymentFlowMethod() {
  return (
    <PBelProtected>
      <PBelPaymentFlowLayout>
        <PaymentMethod />
      </PBelPaymentFlowLayout>
    </PBelProtected>
  );
}

export default PBelPaymentFlowMethod;
