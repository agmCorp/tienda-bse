import {
  API_PBEL_INVOICE,
  API_PBEL_INVOICE_DETAILS,
  API_PBEL_ISSUE,
} from "../../utils/apiUrls";
import { clientApi } from "../../utils/clientApi";

const min = (col) => {
  const numbers = col.map((number) => parseInt(number, 10));
  return Math.min(...numbers);
};

const issue = async (
  issueInfo,
  documentType,
  documentId,
  brand,
  serial,
  model,
  quotation,
  paymentPlan,
  invoiceDate,
  finalConsumption,
  token
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
      token
    );
    if (responseIssue.ok) {
      response = responseIssue.data.polizaObjPersonal;
    } else {
      console.error("*** ISSUE ERROR", responseIssue.data);
    }
  } else {
    response = issueInfo.issue;
  }
  return response;
};

const invoice = async (
  invoiceInfo,
  branch,
  policy,
  contemplateDays,
  date,
  token
) => {
  let response = null;
  if (invoiceInfo.mustInvoice) {
    const responseInvoice = await clientApi(
      "post",
      API_PBEL_INVOICE,
      true,
      {},
      {
        codRamo: branch,
        nroPoliza: policy,
        contemplaDias: contemplateDays,
        fecha: date,
      },
      {},
      token
    );
    if (responseInvoice.ok) {
      response = responseInvoice.data;
    } else {
      console.error("*** INVOICE ERROR", responseInvoice.data);
    }
  } else {
    response = invoiceInfo.invoice;
  }
  return response;
};

const invoiceDetail = async (invoiceNumber, token) => {
  let response = null;

  const responseInvoiceDetail = await clientApi(
    "get",
    `${API_PBEL_INVOICE_DETAILS}/${invoiceNumber}`,
    true,
    {},
    {},
    {},
    token
  );
  if (responseInvoiceDetail.ok) {
    response = responseInvoiceDetail.data;
  } else {
    console.error("*** INVOICE ERROR", responseInvoiceDetail.data);
  }
  return response;
};

export { min, issue, invoice, invoiceDetail };
