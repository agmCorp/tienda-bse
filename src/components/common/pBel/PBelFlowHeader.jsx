// AGM 05/23
import logoBSE from "../../../images/bse-logo-negative.png";
import Header from "../../common/Header";
import styles from "./PBelFlowHeader.module.css";

function PBelFlowHeader() {
  return (
    <Header
      bgColor={styles["bg-color-header"]}
      logo={logoBSE}
      heightLogo="h-4rem"
      title="NOTEBOOKS Y CÁMARAS FOTOGRÁFICAS"
    />
  );
}

export default PBelFlowHeader;
