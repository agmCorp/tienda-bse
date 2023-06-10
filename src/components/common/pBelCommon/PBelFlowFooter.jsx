import logoBSE from "../../../images/bse-logo-negative.png";
import Footer from "../Footer";
import styles from "./PBelFlowFooter.module.css";

function PBelFlowFooter() {
  return (
    <Footer
      bgColorPrimary={styles["bg-color-footer-primary"]}
      bgColorSecondary={styles["bg-color-footer-secondary"]}
      logo={logoBSE}
      heightLogo="h-2rem"
      hoverTextColor="text-primary"
    />
  );
}

export default PBelFlowFooter;
