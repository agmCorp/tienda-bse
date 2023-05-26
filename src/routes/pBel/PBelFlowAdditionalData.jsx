import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useKeycloak } from "@react-keycloak/web";

import Protected from "../../auth/Protected";
import PBelFlowLayout from "../../components/common/pBel/PBelFlowLayout";
import AdditionalData from "../../components/pBelInsQuote/AdditionalData";
import DebtMessage from "../../components/common/pBel/DebtMessage";
import { selectOnAuthSuccess } from "../../reduxToolkit/userSlice";
import { clientApi } from "../../utils/clientApi";
import { API_PBEL_DEBT_CONTROL } from "../../utils/apiUrls";
import { getDocument, getDocumentType } from "../../utils/userProfileHelper";
import { selectPBelFlowSelectedData } from "../../reduxToolkit/pBel/pBelFlowSlice";
import Spinner from "../../utils/Spinner";

function PBelFlowAdditionalData() {
  const { keycloak } = useKeycloak();
  const onAuthSuccess = useSelector(selectOnAuthSuccess);
  const selectedData = useSelector(selectPBelFlowSelectedData);
  const [loadingDebtControl, setLoadingDebtControl] = useState(true);
  const [debtControl, setDebtControl] = useState(false);

  const CERTIFICATE_NUMBER = 0;

  useEffect(() => {
    const debtControl = async () => {
      const response = await clientApi(
        "get",
        `${API_PBEL_DEBT_CONTROL}/${getDocumentType(
          keycloak.tokenParsed
        )}/${getDocument(keycloak.tokenParsed)}/${
          selectedData.insurance.nroCotizacion
        }/${CERTIFICATE_NUMBER}`,
        true,
        {},
        {},
        {},
        keycloak.token
      );

      if (response.ok) {
        setDebtControl(response.data.clienteConDeuda);
        setLoadingDebtControl(false);
      }
    };

    if (onAuthSuccess) {
      console.log("Debt control");
      debtControl();
    }
  }, [
    onAuthSuccess,
    keycloak.token,
    keycloak.tokenParsed,
    selectedData.insurance.nroCotizacion,
  ]);

  return (
    <Protected>
      <PBelFlowLayout>
        {loadingDebtControl ? (
          <Spinner size="small" />
        ) : debtControl ? (
          <DebtMessage />
        ) : (
          <AdditionalData />
        )}
      </PBelFlowLayout>
    </Protected>
  );
}

export default PBelFlowAdditionalData;
