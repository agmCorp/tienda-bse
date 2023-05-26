import Protected from "../../auth/Protected";
import PBelFlowLayout from "../../components/common/pBel/PBelFlowLayout";
import DebtControl from "../../components/pBelInsQuote/DebtControl";

function PBelFlowAdditionalData() {
  return (
    <Protected>
      <PBelFlowLayout>
        <DebtControl />
      </PBelFlowLayout>
    </Protected>
  );
}

export default PBelFlowAdditionalData;
