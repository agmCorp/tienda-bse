import axios from "axios";
import {
  API_BASE_URL,
  PUBLIC_SUBDIRECTORY,
  SECURE_SUBDIRECTORY,
} from "./constants";

import {
  logAxiosError,
  logAxiosRequest,
  logAxiosResponse,
} from "./logAxiosHelper";
import { validateToken } from "./tokenHelper";

const clientApi = async (
  method,
  apiUrl,
  secure = false,
  customHeaders = {},
  data = {},
  otherOptions = {}
) => {
  let result = { ok: true, data: {} };

  const headers = secure
    ? {
        Authorization: `Bearer ${validateToken().token}`,
        ...customHeaders,
      }
    : { ...customHeaders };

  try {
    const url = secure
      ? `${API_BASE_URL}/${SECURE_SUBDIRECTORY}/${apiUrl}`
      : `${API_BASE_URL}/${PUBLIC_SUBDIRECTORY}/${apiUrl}`;
    logAxiosRequest({
      method,
      url,
      secure,
      customHeaders,
      data,
      otherOptions,
    });
    const response = await axios({
      headers,
      method,
      url,
      data,
      ...otherOptions,
    });
    logAxiosResponse(response);
    result.data = response.data;
  } catch (err) {
    const errMessage = logAxiosError(axios, err);
    result.ok = false;
    result.data = errMessage;
  }

  return result;
};

export { clientApi };
