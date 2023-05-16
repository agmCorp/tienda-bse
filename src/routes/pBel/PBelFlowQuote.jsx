// AGM 05/23
import PBelFlowLayout from "../../components/common/pBel/PBelFlowLayout";
import PBelQuoteInfo from "../../components/common/pBel/PBelQuoteInfo";

function PBelFlowQuote() {
  const kk1 = {
    id: 1,
    item: "4",
    label: "TODO RIESGO",
  };
  const kk2 = {
    id: 1,
    item: "6",
    label: "ROBO HURTO Y NO SE QUE",
  };

  return (
    <PBelFlowLayout>
      {/* <Quote /> */}
      <div className="grid grid-nogutter justify-content-center">
        <PBelQuoteInfo coverageType={kk1} />
        <PBelQuoteInfo coverageType={kk2} />
      </div>
    </PBelFlowLayout>
  );
}

export default PBelFlowQuote;
