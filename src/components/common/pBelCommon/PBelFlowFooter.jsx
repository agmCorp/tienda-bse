import logoBSE from "../../../images/bse-logo-negative.png";
import Footer from "../Footer";
import styles from "./PBelFlowFooter.module.css";

function PBelFlowFooter() {
  return (
    <Footer
      bgColor={styles["bg-color-footer"]}
      logo={logoBSE}
      heightLogo="h-2rem"
      hoverTextColor="text-primary"
    />
  );
}

export default PBelFlowFooter;
