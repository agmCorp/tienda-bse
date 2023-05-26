import Protected from "../../auth/Protected";
import PBelPaymentFlowLayout from "../../components/common/pBel/PBelPaymentFlowLayout";

function PBelPaymentFlowInsurance() {
  return (
    <Protected>
      <PBelPaymentFlowLayout>
        SEGURO
        {/* <Insurance /> */}
      </PBelPaymentFlowLayout>
    </Protected>
  );
}

export default PBelPaymentFlowInsurance;
