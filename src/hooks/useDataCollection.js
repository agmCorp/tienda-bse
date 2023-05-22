import { useState, useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";

import { clientApi } from "../utils/clientApi";

function useDataCollection(apiUrl, secure = false) {
  const { keycloak } = useKeycloak();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const getApiData = async () => {
      const response = await clientApi(
        "get",
        apiUrl,
        secure,
        {},
        {},
        {},
        secure ? keycloak.token : {}
      );

      if (response.ok) {
        setData(response.data);
        setLoading(false);
      }
    };

    getApiData();
  }, [apiUrl, secure, keycloak.token]);

  return [loading, data];
}

export default useDataCollection;
