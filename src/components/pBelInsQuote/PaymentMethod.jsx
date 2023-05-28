import { useSelector } from "react-redux";
import { useKeycloak } from "@react-keycloak/web";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import {
  selectPBelPaymentFlowIssueInfo,
  selectPBelPaymentFlowInvoiceInfo,
  pBelAddInvoiceInfo,
  pBelPaymentFlowStepCompleted,
  setComeFromSpe,
  pBelAddInvoiceDetail,
} from "../../reduxToolkit/pBel/pBelPaymentFlowSlice";
import {
  API_PBEL_BANKS,
  API_PBEL_BANKS_CREDIT_CARDS,
  API_PBEL_PAYMENT_METHODS,
} from "../../utils/apiUrls";
import useDataCollection from "../../hooks/useDataCollection";
import PaymentMethodForm from "../common/PaymentMethodForm";
import Spinner from "../../utils/Spinner";
import { selectPBelFlowSelectedData } from "../../reduxToolkit/pBel/pBelFlowSlice";
import { getDocumentType, getDocument } from "../../utils/userProfileHelper";
import { pBelAddIssueInfo } from "../../reduxToolkit/pBel/pBelPaymentFlowSlice";
import { min, issue, invoice, invoiceDetail } from "./pBelInsQuoteHelper";

function PaymentMethod() {
  const CREDIT_CARD_CODE = 1000;

  const dispatch = useDispatch();
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
  const invoiceInfo = useSelector(selectPBelPaymentFlowInvoiceInfo);
  const selectedData = useSelector(selectPBelFlowSelectedData);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    if (submittedData) {
      dispatch(setComeFromSpe(false));
      dispatch(pBelPaymentFlowStepCompleted(submittedData));
    }
  }, [submittedData, dispatch]);

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

  const onSubmit = async (data) => {
    const responseIssue = await issue(
      issueInfo,
      getDocumentType(keycloak.tokenParsed),
      getDocument(keycloak.tokenParsed),
      selectedData.brand,
      selectedData.serial,
      selectedData.model,
      selectedData.insurance.nroCotizacion,
      selectedData.paymentPlan.cantCuotas,
      selectedData.invoiceDate,
      "S",
      keycloak.token
    );
    if (responseIssue) {
      dispatch(pBelAddIssueInfo({ mustIssue: false, issue: responseIssue }));

      const responseInvoice = await invoice(
        invoiceInfo,
        responseIssue.codRamo,
        responseIssue.nroPoliza,
        "N",
        "",
        keycloak.token
      );
      if (responseInvoice) {
        dispatch(
          pBelAddInvoiceInfo({
            mustInvoice: false,
            invoice: { ...responseInvoice },
          })
        );

        const responseInvoiceDetail = await invoiceDetail(
          min(responseInvoice.numerosFactura),
          keycloak.token
        );
        if (responseInvoiceDetail) {
          dispatch(pBelAddInvoiceDetail({ ...responseInvoiceDetail }));

          // llamar a nico
          setSubmittedData({
            ...data,
            ...responseIssue,
            ...responseInvoice,
            ...responseInvoiceDetail,
          });
        }
      }
    }
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
