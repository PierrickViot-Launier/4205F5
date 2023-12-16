import axios from "axios";
import { config } from "../../config";
import React from "react";
import FileUploader from "./FileUploader";

const PdfUpload = (props) => {


  

  const sauvegarderPdf = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        config.backend + "/api/uploads",  props.selectedFile
      ).then(response => {
        
        
        props.setAttachement(response.headers.location);
      
    
      })
    } catch (err) {
      console.log(err);
    }
  
  };


  return (

      <form onSubmit={sauvegarderPdf}>


        <FileUploader

          setSelectedFile={props.setSelectedFile}

        />

        <button className="button">Ajouter un fichier PDF</button>

      </form>

  );

};
export default PdfUpload;