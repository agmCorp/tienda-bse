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
  selectPBelPaymentFlowInvoiceDetail,
} from "../../reduxToolkit/pBelSlices/pBelPaymentFlowSlice";
import {
  API_PBEL_BANKS,
  API_PBEL_BANKS_CREDIT_CARDS,
  API_PBEL_PAYMENT_METHODS,
} from "../../utils/apiUrls";
import useDataCollection from "../../hooks/useDataCollection";
import PaymentMethodForm from "../common/PaymentMethodForm";
import Spinner from "../common/Spinner";
import { selectPBelFlowSelectedData } from "../../reduxToolkit/pBelSlices/pBelFlowSlice";
import { getDocumentType, getDocument } from "../../utils/userProfileHelper";
import { pBelAddIssueInfo } from "../../reduxToolkit/pBelSlices/pBelPaymentFlowSlice";
import {
  min,
  issue,
  invoice,
  invoiceDetail,
  adhDigitalInvoice,
} from "./InsQuoteHelper";

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
  const invoiceDetail = useSelector(selectPBelPaymentFlowInvoiceDetail);
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
    let errorMessage = "";
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
    if (responseIssue.ok) {
      dispatch(
        pBelAddIssueInfo({ mustIssue: false, issue: responseIssue.data })
      );
      const responseInvoice = await invoice(
        invoiceInfo,
        responseIssue.data.codRamo,
        responseIssue.data.nroPoliza,
        "N",
        "",
        keycloak.token
      );
      if (responseInvoice.ok) {
        dispatch(
          pBelAddInvoiceInfo({
            mustInvoice: false,
            invoice: { ...responseInvoice.data },
          })
        );
        const responseInvoiceDetail = await invoiceDetail(
          invoiceDetail,
          min(responseInvoice.data.numerosFactura),
          keycloak.token
        );
        if (responseInvoiceDetail.ok) {
          dispatch(
            pBelAddInvoiceDetail({
              mustDetail: false,
              detail: { ...responseInvoiceDetail.data },
            })
          );
          const responseAdhDigitalInvoice = await adhDigitalInvoice(
            responseIssue.data.codRamo,
            responseIssue.data.nroPoliza,
            selectedData.insurance.sucursal,
            keycloak.token
          );
          if (responseAdhDigitalInvoice.ok) {
            setSubmittedData({
              ...data,
              ...responseIssue.data,
              ...responseInvoice.data,
              ...responseInvoiceDetail.data,
            });
          } else {
            errorMessage = `Error en adhesión a facturación digital: ${responseAdhDigitalInvoice.data}`;
          }
        } else {
          errorMessage = `Error al obtener factura: ${responseInvoiceDetail.data}`;
        }
      } else {
        errorMessage = `Error en facturación de póliza: ${responseInvoice.data}`;
      }
    } else {
      errorMessage =
        "No se ha podido completar la emisión de su póliza. Llame al 1998 o contacte a su corredor de confianza.";
    }
    return errorMessage;
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
