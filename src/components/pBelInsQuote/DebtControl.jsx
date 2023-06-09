import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useKeycloak } from "@react-keycloak/web";
import { useDispatch } from "react-redux";

import { selectOnAuthSuccess } from "../../reduxToolkit/userSlice";
import {
  pBelFlowGoToFirstStep,
  selectPBelFlowSelectedData,
} from "../../reduxToolkit/pBelSlices/pBelFlowSlice";
import { clientApi } from "../../utils/clientApi";
import { API_PBEL_DEBT_CONTROL } from "../../utils/apiUrls";
import { getDocument, getDocumentType } from "../../utils/userProfileHelper";
import Spinner from "../common/Spinner";
import DebtMessage from "../common/DebtMessage";
import AdditionalData from "./AdditionalData";

function DebtControl() {
  const { keycloak } = useKeycloak();
  const dispatch = useDispatch();
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
      console.log("*** Debt control");
      debtControl();
    }
  }, [
    onAuthSuccess,
    keycloak.token,
    keycloak.tokenParsed,
    selectedData.insurance.nroCotizacion,
  ]);

  const handleOnClick = () => {
    dispatch(pBelFlowGoToFirstStep());
  };

  return (
    <>
      {loadingDebtControl ? (
        <Spinner size="small" />
      ) : debtControl ? (
        <DebtMessage init={handleOnClick} />
      ) : (
        <AdditionalData />
      )}
    </>
  );
}

export default DebtControl;
