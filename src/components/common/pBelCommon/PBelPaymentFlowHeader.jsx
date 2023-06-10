import logoBSE from "../../../images/bse-logo-negative.png";
import Header from "../Header";
import styles from "./PBelPaymentFlowHeader.module.css";

function PBelPaymentFlowHeader({ init }) {
  return (
    <Header
      bgColorPrimary={styles["bg-color-header-primary"]}
      bgColorSecondary={styles["bg-color-header-secondary"]}
      logo={logoBSE}
      heightLogo="h-4rem"
      title="PAGO ELECTRÓNICO"
      init={init}
    />
  );
}

export default PBelPaymentFlowHeader;
