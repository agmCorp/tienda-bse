import { useEffect } from "react";
import { clientApi } from "../../utils/clientApi";
import { useKeycloak } from "@react-keycloak/web";

function Networks({
  networks,
  selectedData,
  apiUrlPaymentNetworks,
  handlePaymentSent,
}) {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    const networksPayment = async () => {
      const response = await clientApi(
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

      if (response.ok) {
        handlePaymentSent();
      }
    };

    if (networks) {
      networksPayment();
    }
  }, [
    apiUrlPaymentNetworks,
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
