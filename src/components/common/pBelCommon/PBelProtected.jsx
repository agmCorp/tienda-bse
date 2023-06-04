import Protected from "../../../auth/Protected";
import usePBelAppFlowController from "../../../hooks/pBelHooks/usePBelAppFlowController";

function PBelProtected({ children }) {
  const accessGranted = usePBelAppFlowController();

  return (
    <>
      {accessGranted && (
        <Protected>
          <>{children}</>
        </Protected>
      )}
    </>
  );
}

export default PBelProtected;
