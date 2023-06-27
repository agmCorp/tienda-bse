import ProtectedByRoles from "../../../auth/ProtectedByRoles";
import usePBelAppFlowController from "../../../hooks/pBelHooks/usePBelAppFlowController";

function PBelProtectedByRoles({ children }) {
  const accessGranted = usePBelAppFlowController();

  return (
    <>
      {accessGranted && (
        <ProtectedByRoles roles={["user"]}>
          <>{children}</>
        </ProtectedByRoles>
      )}
    </>
  );
}

export default PBelProtectedByRoles;
