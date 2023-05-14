// AGM 05/23
import { useState, useEffect } from "react";

import { clientApi } from "../utils/clientApi";

function useDataCollection(apiUrl, secure = false) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const getApiData = async () => {
      const response = await clientApi("get", apiUrl, secure);

      if (response.ok) {
        setData(response.data);
        setLoading(false);
      }
    };

    getApiData();
  }, [apiUrl, secure]);

  return [loading, data];
}

export default useDataCollection;
