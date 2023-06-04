import PBelProtected from "../../components/common/pBelCommon/PBelProtected";
import PBelPaymentFlowLayout from "../../components/common/pBelCommon/PBelPaymentFlowLayout";
import Insurance from "../../components/pBelInsQuote/Insurance";

function PBelPaymentFlowInsurance() {
  return (
    <PBelProtected>
      <PBelPaymentFlowLayout>
        <Insurance />
      </PBelPaymentFlowLayout>
    </PBelProtected>
  );
}

export default PBelPaymentFlowInsurance;
