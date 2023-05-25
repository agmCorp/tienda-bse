import { useState, useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";

import { clientApi } from "../utils/clientApi";

function useDataCollection(apiUrl, secured = false) {
  const { keycloak } = useKeycloak();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const getApiData = async () => {
      const response = await clientApi(
        "get",
        apiUrl,
        secured,
        {},
        {},
        {},
        secured ? keycloak.token : ""
      );

      if (response.ok) {
        setData(response.data);
        setLoading(false);
      }
    };

    getApiData();
  }, [apiUrl, secured, keycloak.token]);

  return [loading, data];
}

export default useDataCollection;
