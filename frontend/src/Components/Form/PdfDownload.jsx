import React from "react";
import { config } from "../../config";
const PdfDownload = ({ attachements }) => {
  const telechargerFichiers = () => {
    for (let i = 0; i < attachements.length; i++) {
      let link = document.createElement("a");
      link.href = config.backend + attachements[i];
      link.target="_blank";
      link.rel="noreferrer"
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button className="button" onClick={telechargerFichiers}>
      Télécharger le(s) PDF
    </button>
  );
};
export default PdfDownload;
