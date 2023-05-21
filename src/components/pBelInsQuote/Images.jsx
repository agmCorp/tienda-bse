import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Messages } from "primereact/messages";
import { Message } from "primereact/message";
import { Button } from "primereact/button";

import ImageUpload from "../common/ImageUpload";
import {
  pBelFlowStepCompletedThunk,
  selectPBelFlowSelectedData,
} from "../../reduxToolkit/pBel/pBelFlowSlice";
import {
  pBelAddInvoiceInfo,
  pBelAddIssueInfo,
} from "../../reduxToolkit/pBel/pBelPaymentFlowSlice";
import { API_PBEL_FILEUPLOAD } from "../../utils/apiUrls";

function Images() {
  const selectedData = useSelector(selectPBelFlowSelectedData);
  const dispatch = useDispatch();
  const topRef = useRef(null);
  const msgs = useRef(null);
  const [responses, setResponses] = useState([]);
  const [filesUploaded, setFilesUploaded] = useState([]);
  const [error, setError] = useState(false);

  const MAX_FILES = 3;

  useEffect(() => {
    topRef.current.click();
  }, []);

  useEffect(() => {
    console.log("*** FILE UPLOAD RESPONSES", responses);

    let messages = [];
    let successfulUploads = [];
    responses.forEach((response) => {
      const fileReference = response.filename ? `${response.filename}:` : "";
      if (response.error) {
        messages.push({
          severity: "error",
          detail: `${fileReference} ${
            response.message.error ? response.message.error : response.message
          }`,
          sticky: true,
        });
      } else {
        messages.push({
          severity: "success",
          detail: `${fileReference} subido exitosamente.`,
          sticky: true,
        });
        successfulUploads.push(response.filename);
      }
    });
    msgs.current.replace(messages);
    setError(false);

    // Functional update pattern to avoid infinit loop
    setFilesUploaded((prevFilesUploaded) => [
      ...prevFilesUploaded,
      ...successfulUploads,
    ]);
  }, [responses]);

  const handleClick = () => {
    if (MAX_FILES !== filesUploaded.length) {
      setError(true);
    } else {
      dispatch(pBelAddIssueInfo({ mustIssue: true, issue: {} }));
      dispatch(pBelAddInvoiceInfo({ mustInvoice: true, invoice: {} }));
      dispatch(pBelFlowStepCompletedThunk({ images: filesUploaded }));
    }
  };

  return (
    <>
      <a style={{ display: "none" }} href="#top" ref={topRef}>
        Link hidden
      </a>
      <div
        id="top"
        className="text-900 font-bold text-3xl mb-4 text-center text-primary"
      >
        IMÁGENES
      </div>

      <div className="flex align-items-center flex-column text-700 text-xl mb-4 text-center line-height-3">
        Por último necesitamos que nos subas tres imágenes de un máximo de 5MB
        cada una.
        <div className="text-left m-4">
          <ul className="list-none m-0 p-0">
            <li>
              <i className="pi pi-image text-primary mr-3" />
              Una imagen de tu objeto personal
            </li>
            <li>
              <i className="pi pi-image text-primary mr-3" />
              Una imagen de la factura de compra
            </li>
            <li>
              <i className="pi pi-image text-primary mr-3" />
              Una imagen en donde se vea el número de serie
            </li>
          </ul>
        </div>
      </div>

      <Messages ref={msgs} />
      {MAX_FILES - filesUploaded.length > 0 && (
        <ImageUpload
          maxFiles={MAX_FILES - filesUploaded.length}
          onResponses={setResponses}
          apiFileUpload={`${API_PBEL_FILEUPLOAD}/${selectedData.insurance.nroCotizacion}`}
        />
      )}

      {filesUploaded.length > 0 && (
        <div className="col-12 p-3">
          <div className="text-500 font-medium mb-3">Imágenes adjuntas</div>
          {filesUploaded.map((file, index) => {
            return (
              <div
                key={index}
                className={`flex md:align-items-center md:justify-content-between ${
                  index === 0 ? "border-top-1" : ""
                } border-bottom-1 surface-border p-3 flex-column md:flex-row`}
              >
                <div className="flex align-items-center">
                  <span className="block pi pi-file mr-2" />
                  <span className="text-900">{file}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="text-center mt-4">
        {error && (
          <Message
            severity="error"
            text="Faltan imágenes por adjuntar."
            className="w-full mb-2"
          />
        )}
        <Button label="Pagar" className="w-8" onClick={handleClick} />
      </div>
    </>
  );
}

export default Images;
