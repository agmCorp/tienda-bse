import logoBSE from "../../../images/bse-logo-negative.png";
import Header from "../Header";

function PBelPaymentFlowHeader({ init }) {
  return (
    <Header
      bgColor="bg-blue-800"
      logo={logoBSE}
      heightLogo="h-4rem"
      title="PAGO ELECTRÓNICO"
      init={init}
    />
  );
}

export default PBelPaymentFlowHeader;
