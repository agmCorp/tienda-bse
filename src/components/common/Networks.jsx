import { useEffect } from "react";
import { clientApi } from "../../utils/clientApi";
import { useKeycloak } from "@react-keycloak/web";

function Networks({
  networks,
  handleNetworks,
  selectedData,
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
          nroFactura: selectedData.numeroFactura,
          documentId: selectedData.documentId,
          codProd: selectedData.codProducto,
          descProducto: selectedData.descProducto,
          codRamo: selectedData.codRamo,
          descRamo: selectedData.descRamo,
          nroPoliza: selectedData.nroPoliza,
          nroCertificado: "1",
          tipoDocumento: selectedData.tipoDocumento,
          nroDocumento: selectedData.nroDocumento,
          nombres: selectedData.nombres,
          apellidos: selectedData.apellidos,
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
          handlePaymentSent({ ok: true, data: "" });
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
    selectedData.numeroFactura,
    selectedData.documentId,
    selectedData.codProducto,
    selectedData.descProducto,
    selectedData.codRamo,
    selectedData.descRamo,
    selectedData.nroPoliza,
    selectedData.tipoDocumento,
    selectedData.nroDocumento,
    selectedData.nombres,
    selectedData.apellidos,
  ]);

  return <></>;
}

export default Networks;
