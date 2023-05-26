import Protected from "../../Auth/Protected";
import PBelFlowLayout from "../../components/common/pBel/PBelFlowLayout";
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
