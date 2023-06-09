import {
  API_PBEL_ADH_DIGITAL_INVOICE,
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
      response = { ok: true, data: responseIssue.data.polizaObjPersonal };
    } else {
      console.error("*** ISSUE ERROR", responseIssue.data);
      response = { ok: false, data: responseIssue.message };
    }
  } else {
    response = { ok: true, data: issueInfo.issue };
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
      response = { ok: true, data: responseInvoice.data };
    } else {
      console.error("*** INVOICE ERROR", responseInvoice.data);
      response = { ok: false, data: responseInvoice.message };
    }
  } else {
    response = { ok: true, data: invoiceInfo.invoice };
  }
  return response;
};

const detailInvoice = async (invoiceDetail, invoiceNumber, token) => {
  let response = null;
  if (invoiceDetail.mustDetail) {
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
      response = { ok: true, data: responseInvoiceDetail.data };
    } else {
      console.error("*** DETAILINVOICE ERROR", responseInvoiceDetail.data);
      response = { ok: false, data: responseInvoiceDetail.message };
    }
  } else {
    response = { ok: true, data: invoiceDetail.detail };
  }
  return response;
};

const adhDigitalInvoice = async (
  invoiceAdhDigital,
  branch,
  policy,
  branchOffice,
  token
) => {
  let response = null;
  if (invoiceAdhDigital.mustAdhDigital) {
    const responseAdhDigitalInvoice = await clientApi(
      "post",
      API_PBEL_ADH_DIGITAL_INVOICE,
      true,
      {},
      { codRamo: branch, nroPoliza: policy, sucursal: branchOffice },
      {},
      token
    );
    if (responseAdhDigitalInvoice.ok) {
      response = { ok: true, data: responseAdhDigitalInvoice.data };
    } else {
      console.error(
        "*** ADHDIGITALINVOICE ERROR",
        responseAdhDigitalInvoice.data
      );
      response = { ok: false, data: responseAdhDigitalInvoice.message };
    }
  } else {
    response = { ok: true, data: invoiceAdhDigital.adhDigital };
  }
  return response;
};

export { min, issue, invoice, detailInvoice, adhDigitalInvoice };
