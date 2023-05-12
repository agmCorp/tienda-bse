import { useState, useEffect } from "react";

import useIsMountedRef from "./useIsMountedRef";
import { clientApi } from "../utils/clientApi";

function useDataCollection(apiUrl, secure = false) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const isMounted = useIsMountedRef();

  useEffect(() => {
    const getApiData = async () => {
      const response = await clientApi("get", apiUrl, secure);

      if (response.ok && isMounted.current) {
        setData(response.data);
        setLoading(false);
      }
    };

    getApiData();
  }, [apiUrl, secure, isMounted]);

  return [loading, data];
}

export default useDataCollection;
