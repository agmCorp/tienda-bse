import { useSelector } from "react-redux";
import { useKeycloak } from "@react-keycloak/web";

import { selectPBelPaymentFlowIssueInfo } from "../../reduxToolkit/pBel/pBelPaymentFlowSlice";
import {
  API_PBEL_BANKS,
  API_PBEL_BANKS_CREDIT_CARDS,
  API_PBEL_ISSUE,
  API_PBEL_PAYMENT_METHODS,
} from "../../utils/apiUrls";
import useDataCollection from "../../hooks/useDataCollection";
import PaymentMethodForm from "../common/PaymentMethodForm";
import Spinner from "../../utils/Spinner";
import { clientApi } from "../../utils/clientApi";
import { selectPBelFlowSelectedData } from "../../reduxToolkit/pBel/pBelFlowSlice";
import { getDocumentType, getDocument } from "../../utils/userProfileHelper";

function PaymentMethod() {
  const CREDIT_CARD_CODE = 1000;

  const { keycloak } = useKeycloak();
  const [loadingBanks, banks] = useDataCollection(API_PBEL_BANKS, true);
  const [loadingBanksCreditCards, banksCreditCards] = useDataCollection(
    API_PBEL_BANKS_CREDIT_CARDS,
    true
  );
  const [loadingPaymentMethods, paymentMethods] = useDataCollection(
    API_PBEL_PAYMENT_METHODS,
    true
  );
  const issueInfo = useSelector(selectPBelPaymentFlowIssueInfo);
  const selectedData = useSelector(selectPBelFlowSelectedData);

  const getBanks = (banks, banksCreditCards, paymentMethods) => {
    const banksCodes = banks.map((bank) => bank.codigoBCU);
    const missingBanks = banksCreditCards.filter(
      (bankCreditCard) =>
        bankCreditCard.codigoBCU < CREDIT_CARD_CODE &&
        !banksCodes.includes(bankCreditCard.codigoBCU)
    );
    return [...banks, ...missingBanks, ...paymentMethods];
  };

  const getCreditCards = (banksCreditCards) => {
    return banksCreditCards.filter((card) => card.codigoBCU > CREDIT_CARD_CODE);
  };

  const issue = async (
    documentType,
    documentId,
    brand,
    serial,
    model,
    quotation,
    paymentPlan,
    invoiceDate,
    finalConsumption
  ) => {
    let response = null;
    if (issueInfo.mustIssue) {
      const responseIssue = await clientApi(
        "post",
        API_PBEL_ISSUE,
        true,
        {},
        {
          tipoDocumento: documentType,
          documento: documentId,
          marca: brand,
          serie: serial,
          modelo: model,
          nroCotizacion: quotation,
          planPago: paymentPlan,
          fechaFactura: invoiceDate,
          consumoFinal: finalConsumption,
        },
        {},
        keycloak.token
      );
      if (responseIssue.ok) {
        // const { productId, productLabel, branchOffice, branch, policy } =
        //   responseIssue.data;
        // response = { productId, productLabel, branchOffice, branch, policy };
        // dispatch(addIssueInfo({ mustIssue: false, issue: response }));
        console.log("responseIssue", responseIssue);
      } else {
        console.error("*** ISSUE ERROR", responseIssue); // CORREGIR
      }
    } else {
      response = issueInfo.issue; // CORREGIR
    }
    return response;
  };

  const onSubmit = async (data) => {
    console.log("cotizo y emito bloqueando", data);
    const responseIssue = await issue(
      getDocumentType(keycloak.tokenParsed),
      getDocument(keycloak.tokenParsed),
      selectedData.brand,
      selectedData.serial,
      selectedData.model,
      selectedData.insurance.nroCotizacion,
      selectedData.paymentPlan.cantCuotas,
      selectedData.invoiceDate,
      "S"
    );
    console.log("responseIssue total", responseIssue);
  };

  return (
    <>
      {loadingBanks || loadingBanksCreditCards || loadingPaymentMethods ? (
        <Spinner size="small" />
      ) : (
        <PaymentMethodForm
          onSubmit={onSubmit}
          banks={getBanks(banks, banksCreditCards, paymentMethods)}
          creditCards={getCreditCards(banksCreditCards)}
          showNetworks={false}
        />
      )}
    </>
  );
}

export default PaymentMethod;
