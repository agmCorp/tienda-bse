import { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { useKeycloak } from "@react-keycloak/web";

import { clientApi } from "../../utils/clientApi";
import errorThumbnail from "../../images/error-thumbnail.png";
import "./ImageUpload.css";

function ImageUpload({ maxFiles, onResponses, apiFileUpload }) {
  const { keycloak } = useKeycloak();
  const fileUploadRef = useRef(null);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [controllers, setControllers] = useState(null);

  const fileExtensions = ["jpg", "png", "jpeg"];

  const getAccept = () =>
    "." +
    fileExtensions.reduce((previousValue, currentValue) => {
      return previousValue + ", ." + currentValue;
    });

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const shortFilename = (filename) => {
    const MAX_LENGTH = 20;
    const ext = filename.split(".").pop();
    const name = filename.substr(0, filename.length - ext.length - 1);
    return name.length > MAX_LENGTH
      ? `${name.substr(0, MAX_LENGTH)}...${ext}`
      : filename;
  };

  const handleUpload = (event) => {
    let uploadResponses = [];
    let totalSize = 0;
    let signals = new Map();

    // Previous validations
    for (let file of event.files) {
      const fileExt = file.name.split(".").pop();
      if (!fileExtensions.includes(fileExt)) {
        uploadResponses.push({
          error: true,
          filename: file.name,
          message: `Solo se permiten archivos de imagen (${getAccept()}).`,
        });
      } else {
        totalSize += file.size;
        signals.set(file.name, new AbortController());
      }
    }

    if (event.files.length > maxFiles) {
      let message;
      if (maxFiles > 0) {
        if (maxFiles > 1) {
          message = `Debe seleccionar un máximo de ${maxFiles} imágenes.`;
        } else {
          message = "Debe seleccionar una única imagen.";
        }
      } else {
        message = "Ya no puede adjuntar más imágenes.";
      }
      uploadResponses.push({
        error: true,
        filename: "",
        message,
      });
    }

    if (uploadResponses.length === 0) {
      setIsUploading(true);
      setControllers(signals);
      // Main process
      uploadFiles(event.files, totalSize, signals);
    } else {
      onResponses(uploadResponses);
    }
  };

  const uploadFiles = (files, totalSize, signals) => {
    let totalProgress = new Map();
    let uploadResponses = [];

    const callbackProgress = (file, uploadProgress) => {
      // For small files, more data is sent than the real size of the file
      const value = clamp(uploadProgress, 0, file.size);
      const fileProgress = Math.round((value * 100) / totalSize);
      totalProgress.set(file.name, fileProgress);

      let sum = 0;
      for (let progress of totalProgress.values()) {
        sum += progress;
      }
      setProgressBarValue(clamp(sum, 0, 100));
    };

    const callbackFileUploaded = (response) => {
      uploadResponses.push(response);

      if (uploadResponses.length === files.length) {
        setIsUploading(false);
        onResponses(uploadResponses);
        fileUploadRef.current.clear();
      }
    };

    for (let file of files) {
      uploadFile(
        file,
        signals.get(file.name).signal,
        callbackProgress,
        callbackFileUploaded
      );
    }
  };

  const uploadFile = async (
    file,
    signal,
    callbackProgress,
    callbackFileUploaded
  ) => {
    var formData = new FormData();
    formData.append("fileField", file);

    const response = await clientApi(
      "post",
      apiFileUpload,
      true,
      {}, // No need to add Content-Type: multipart/form-data
      formData,
      {
        signal,
        onUploadProgress: (progressEvent) => {
          callbackProgress(file, progressEvent.loaded);
        },
      },
      keycloak.token
    );

    const fileUploaded = {
      error: false,
      filename: file.name,
      message: response.data,
    };

    if (!response.ok) {
      fileUploaded.error = true;
      callbackProgress(file, 0);
    }

    callbackFileUploaded({ ...fileUploaded });
  };

  const handleSelect = () => {
    setProgressBarValue(0);
    setControllers(new Map());
  };

  const handleRemove = (file, callback) => {
    // If the file is being sent, it cancels it.
    // If it hasn't been sent yet, it prevents future sending.
    const found = controllers.get(file.name);
    if (found) {
      found.abort();
    }
    callback();
  };

  const chooseOptions = {
    icon: <i className="pi pi-fw pi-images text-3xl" />,
    iconOnly: false,
    label: "Seleccionar",
    className: "m-2",
  };

  const uploadOptions = {
    icon: <i className="pi pi-fw pi-cloud-upload text-3xl" />,
    iconOnly: false,
    label: "Adjuntar",
    className: "p-button-warning m-2",
  };

  const cancelOptions = {
    icon: "pi pi-fw pi-times text-3xl",
    iconOnly: false,
    label: "Cancelar",
    className: "p-button-danger m-2",
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;

    return (
      <div
        className={`${className} bg-blue-50 flex flex-column md:flex-row align-items-center`}
      >
        <div
          id="customHeaderButtons"
          className="flex flex-column md:flex-row md:text-left"
        >
          {chooseButton}
          {uploadButton}
          {cancelButton}
        </div>
        <div className="w-full md:w-6">
          <ProgressBar
            value={progressBarValue}
            className="bg-primary-100 h-2rem m-2"
          ></ProgressBar>
        </div>
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="hidden md:block">
        <div className="flex align-items-center flex-column">
          <i className="pi pi-image p-4 text-7xl border-circle text-primary-300 border-2"></i>
          <span className="text-primary text-lg my-3">
            Arrastre y suelte imagenes aquí
          </span>
        </div>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex flex-column md:flex-row align-items-center flex-wrap">
        <div className="flex flex-column md:flex-row align-items-center w-6">
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL ? file.objectURL : errorThumbnail}
            className="w-7rem"
          />
          <span className="flex flex-column text-left md:ml-3">
            {shortFilename(file.name)}
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2 m-2"
        />
        <Button
          type="button"
          icon="pi pi-times text-lg"
          className="p-button-outlined p-button-rounded p-button-danger md:ml-auto h-3rem px-3"
          onClick={() => handleRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  return (
    <FileUpload
      ref={fileUploadRef}
      disabled={isUploading}
      multiple
      accept={getAccept()}
      maxFileSize={5 * 1000 * 1000} // 5 MB
      invalidFileSizeMessageSummary="{0}: Tamaño inválido, "
      invalidFileSizeMessageDetail="el tamaño máximo permitido es de {0}."
      emptyTemplate={emptyTemplate}
      headerTemplate={headerTemplate}
      itemTemplate={itemTemplate}
      progressBarTemplate={<></>}
      chooseOptions={chooseOptions}
      uploadOptions={uploadOptions}
      cancelOptions={cancelOptions}
      customUpload
      uploadHandler={handleUpload}
      onSelect={handleSelect}
    />
  );
}

export default ImageUpload;
