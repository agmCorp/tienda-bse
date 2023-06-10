import logoBSE from "../../../images/bse-logo-negative.png";
import Header from "../../common/Header";
import styles from "./PBelFlowHeader.module.css";

function PBelFlowHeader({ init }) {
  return (
    <Header
      bgColorPrimary={styles["bg-color-header-primary"]}
      bgColorSecondary={styles["bg-color-header-secondary"]}
      logo={logoBSE}
      heightLogo="h-4rem"
      title="NOTEBOOKS Y CÁMARAS FOTOGRÁFICAS"
      init={init}
    />
  );
}

export default PBelFlowHeader;
