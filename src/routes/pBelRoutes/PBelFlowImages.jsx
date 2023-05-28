import Protected from "../../auth/Protected";
import PBelFlowLayout from "../../components/common/pBelCommon/PBelFlowLayout";
import Images from "../../components/pBelInsQuote/Images";

function PBelFlowImages() {
  return (
    <Protected>
      <PBelFlowLayout>
        <Images />
      </PBelFlowLayout>
    </Protected>
  );
}

export default PBelFlowImages;
