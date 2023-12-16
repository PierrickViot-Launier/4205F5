import React, { useState } from "react";
import { config } from "../../config";

// const FileUploader = ({setSelectedFile, attachement,    onFileUpload}) => {
const FileUploader = ({ onFileUploaded }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false); //true si l'upload est en cours mais qu'il n'est pas terminé

  const handleFileInput = (e) => {
    if (e.target) {
      // console.log(e.target.files[0]);
      // const attachement = e.target.files[0];
      // setSelectedFile(attachement);
      setFile(e.target.files[0]);
    }
  };


  function uploadButtonClickHandler(e) {
    e.preventDefault();
    if (file && !uploading) {
      setUploading(true);
      // https://stackoverflow.com/questions/5587973/javascript-upload-file
      const formData = new FormData();
      formData.append("file", file);

      try {
        (async () => {
          const response = await fetch(config.backend + "/api/uploads/uploadPdf", {
            method: "POST",
            body: formData
          });

          setUploading(false);

          // console.log(response.headers.get("Location"));
          onFileUploaded(response.headers.get("Location"));
        })();
      }
      catch (ex) {
        setUploading(false);
      }
    }
  }

  return (
    <div>
      <input
        // value={attachement}
        type="file"
        id="file"
        name="file"
        onChange={handleFileInput}
      />

      {
        !uploading
        && (
          <button className="button" onClick={uploadButtonClickHandler}>Ajouter un fichier PDF</button>
        )
      }
    </div>
  );
};

export default FileUploader;
