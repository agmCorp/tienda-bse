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
          apellidos: selectedData.apellidos,
          certificado: "1",
          codProducto: selectedData.codProducto,
          codRamo: selectedData.codRamo,
          descProducto: selectedData.descProducto,
          descRamo: selectedData.descRamo,
          documentId: selectedData.documentId,
          idTransaccion: "", // hacer que lo calcule adentro el servicio java
          nombres: selectedData.nombres,
          nroDocumento: selectedData.nroDocumento,
          numPoliza: selectedData.nroPoliza,
          tipoDocumento: selectedData.tipoDocumento,
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
    selectedData.apellidos,
    selectedData.codProducto,
    selectedData.codRamo,
    selectedData.descProducto,
    selectedData.descRamo,
    selectedData.documentId,
    selectedData.nombres,
    selectedData.nroDocumento,
    selectedData.nroPoliza,
    selectedData.tipoDocumento,
  ]);

  return <></>;
}

export default Networks;
