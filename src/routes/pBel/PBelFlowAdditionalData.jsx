import Protected from "../../auth/Protected";
import PBelFlowLayout from "../../components/common/pBel/PBelFlowLayout";
import AdditionalData from "../../components/pBelInsQuote/AdditionalData";

function PBelFlowAdditionalData() {
  return (
    <Protected>
      <PBelFlowLayout>
        <AdditionalData />
      </PBelFlowLayout>
    </Protected>
  );
}

export default PBelFlowAdditionalData;
