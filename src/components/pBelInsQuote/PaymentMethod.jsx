import { useSelector } from "react-redux";
import { useKeycloak } from "@react-keycloak/web";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import {
  selectPBelPaymentFlowIssueInfo,
  selectPBelPaymentFlowInvoiceInfo,
  pBelAddInvoiceInfo,
  pBelPaymentFlowStepCompleted,
  pBelAddInvoiceDetail,
  selectPBelPaymentFlowInvoiceDetail,
  selectPBelPaymentFlowInvoiceAdhDigital,
  pBelAddInvoiceAdhDigital,
  pBelPaymentSent,
} from "../../reduxToolkit/pBelSlices/pBelPaymentFlowSlice";
import {
  API_PBEL_PAYMENT_METHODS_POLICY,
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
  detailInvoice,
  adhDigitalInvoice,
} from "./InsQuoteHelper";

function PaymentMethod() {
  const CREDIT_CARD_CODE = 1000;

  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();
  const [loadingPaymentMethodsPolicy, paymentMethodsPolicy] = useDataCollection(
    API_PBEL_PAYMENT_METHODS_POLICY,
    true
  );
  const [loadingPaymentMethods, paymentMethods] = useDataCollection(
    API_PBEL_PAYMENT_METHODS,
    true
  );
  const issueInfo = useSelector(selectPBelPaymentFlowIssueInfo);
  const invoiceInfo = useSelector(selectPBelPaymentFlowInvoiceInfo);
  const invoiceDetail = useSelector(selectPBelPaymentFlowInvoiceDetail);
  const invoiceAdhDigital = useSelector(selectPBelPaymentFlowInvoiceAdhDigital);
  const selectedData = useSelector(selectPBelFlowSelectedData);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    if (submittedData) {
      dispatch(pBelPaymentSent(false));
      dispatch(pBelPaymentFlowStepCompleted(submittedData));
    }
  }, [submittedData, dispatch]);

  const getBanks = (paymentMethodsPolicy, paymentMethods) => {
    const banks = paymentMethodsPolicy.filter(
      (bank) => bank.codigoBCU < CREDIT_CARD_CODE
    );
    return [...banks, ...paymentMethods];
  };

  const getCreditCards = (financialInstitutions) => {
    return financialInstitutions.filter(
      (card) => card.codigoBCU > CREDIT_CARD_CODE
    );
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
        const responseInvoiceDetail = await detailInvoice(
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
            invoiceAdhDigital,
            responseIssue.data.codRamo,
            responseIssue.data.nroPoliza,
            selectedData.insurance.sucursal,
            keycloak.token
          );
          if (responseAdhDigitalInvoice.ok) {
            dispatch(
              pBelAddInvoiceAdhDigital({
                mustAdhDigital: false,
                adhDigital: { ...responseAdhDigitalInvoice.data },
              })
            );

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
      {loadingPaymentMethodsPolicy || loadingPaymentMethods ? (
        <Spinner size="small" />
      ) : (
        <PaymentMethodForm
          onSubmit={onSubmit}
          banks={getBanks(paymentMethodsPolicy, paymentMethods)}
          creditCards={getCreditCards(paymentMethodsPolicy)}
          showNetworks={false}
        />
      )}
    </>
  );
}

export default PaymentMethod;
