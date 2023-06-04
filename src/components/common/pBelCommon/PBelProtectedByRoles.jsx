import ProtectedByRoles from "../../../auth/ProtectedByRoles";
import usePBelAppFlowController from "../../../hooks/pBelHooks/usePBelAppFlowController";

function PBelProtectedByRoles({ roles, children }) {
  const accessGranted = usePBelAppFlowController();

  return (
    <>
      {accessGranted && (
        <ProtectedByRoles roles={roles}>
          <>{children}</>
        </ProtectedByRoles>
      )}
    </>
  );
}

export default PBelProtectedByRoles;
