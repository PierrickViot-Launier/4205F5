import axios from "axios";
import { config } from "../../config";
import React from "react";
import FileUploader from "./FileUploader";


/**
 * 
 * @deprecated
 * @param {*} param0 
 * @returns 
 */
const PdfUpload = ({selectedFile, setSelectedFile, setAttachements}) => {


  

  const sauvegarderPdf = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        config.backend + "/api/uploads",  selectedFile
      ).then(response => {
        
        
        setAttachements(response.headers.location);
      
    
      })
    } catch (err) {
      console.log(err);
    }
  
  };


  return (

      <form onSubmit={sauvegarderPdf}>


        <FileUploader

          setSelectedFile={setSelectedFile}

        />

        <button className="button">Ajouter un fichier PDF</button>

      </form>

  );

};
export default PdfUpload;