const logAxiosError = (axios, axiosError) => {
  let errorMessage;

  // Axios supports AbortController to cancel requests
  if (axios.isCancel(axiosError)) {
    errorMessage = "Cancelado";
    console.log("*** AXIOS REQUEST CANCELED", axiosError.message);
  } else {
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorMessage = axiosError.response.data;
    } else if (axiosError.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      errorMessage = axiosError.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = axiosError.message;
    }
    console.error("*** AXIOS ERROR", errorMessage);
  }
  return errorMessage;
};

const logAxiosResponse = (response) => {
  console.log("*** AXIOS RESPONSE", response.data);
};

const logAxiosRequest = (axiosRequest) => {
  console.log("*** AXIOS REQUEST", axiosRequest);
};

export { logAxiosError, logAxiosResponse, logAxiosRequest };
