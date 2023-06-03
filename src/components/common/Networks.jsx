import { useEffect } from "react";
import { clientApi } from "../../utils/clientApi";
import { useKeycloak } from "@react-keycloak/web";

function Networks({
  networks,
  handleNetworks,
  paymentData,
  apiUrlPaymentNetworks,
  handlePaymentSent,
}) {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    const networksPayment = async () => {
      let response = null;
      const responseNetworks = await clientApi(
        "post",
        apiUrlPaymentNetworks,
        true,
        {},
        {
          medioDePago: "0000",
          nroFactura: paymentData.numeroFactura,
          documentId: paymentData.documentId,
          codProd: paymentData.codProducto,
          descProducto: paymentData.descProducto,
          codRamo: paymentData.codRamo,
          descRamo: paymentData.descRamo,
          nroPoliza: paymentData.nroPoliza,
          nroCertificado: "1",
          tipoDocumento: paymentData.tipoDocumento,
          nroDocumento: paymentData.nroDocumento,
          nombres: paymentData.nombres,
          apellidos: paymentData.apellidos,
        },
        {},
        keycloak.token
      );

      if (responseNetworks.ok) {
        response = { ok: true, data: responseNetworks.data };
      } else {
        response = { ok: false, data: responseNetworks.message };
      }
      return response;
    };

    const networksPaymentCaller = async () => {
      if (networks) {
        const response = await networksPayment();
        if (response.ok) {
          handlePaymentSent({ ok: true, data: response.data.idTrn });
        } else {
          handlePaymentSent({
            ok: false,
            data: "No se ha podido completar el pago de su póliza.",
          });
        }
        handleNetworks(false);
      }
    };

    networksPaymentCaller();
  }, [
    apiUrlPaymentNetworks,
    handleNetworks,
    handlePaymentSent,
    keycloak.token,
    networks,
    paymentData.numeroFactura,
    paymentData.documentId,
    paymentData.codProducto,
    paymentData.descProducto,
    paymentData.codRamo,
    paymentData.descRamo,
    paymentData.nroPoliza,
    paymentData.tipoDocumento,
    paymentData.nroDocumento,
    paymentData.nombres,
    paymentData.apellidos,
  ]);

  return <></>;
}

export default Networks;
