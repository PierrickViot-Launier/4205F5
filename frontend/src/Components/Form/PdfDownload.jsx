import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../config";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
const PdfDownload = (props) => {

    const auth = useContext(AuthContext);
    const [etudiant, setEtudiant] = useState(null);
      
    const attachements = props.attachements;
 

    const telechargerFichiers = () => {
        for(let i = 0; i<attachements.length; i++){
          let link = document.createElement("a");
          link.href = attachements[i];
          link.download = attachements[i]; 
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
       
    };

  return (

    <div>
        <button className="button" onClick={telechargerFichiers}>Télécharger</button>
    </div>

  );

};
export default PdfDownload;