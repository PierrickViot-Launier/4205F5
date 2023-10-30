import React from "react";
import axios from "axios";
import { useEffect } from "react";
import Card from "../../shared/Card";
import { useState } from "react";
import { config } from "../../config";

export default function EtudiantsCandidats({stage}) {
  const [lesEtudiants, setLesEtudiants] = useState([]);
  async function getEtudiants() {
    try {
      const data = await axios.get(config.backend + "/api/etudiants/");

      const etudiants = data.data.etudiants;

      //console.log(etudiants);
      setLesEtudiants(etudiants.filter(etudiant =>etudiant.stagesPostule.find(stagePostule => stagePostule.stagePostule._id === stage._id)));
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    getEtudiants();
  }, []);

  function getDateSoumission(stagesPostules, stageId) {
    const leStage = stagesPostules.find(stage => stage.stagePostule._id === stageId);
    if (leStage) {
      return leStage.date;
    } else {
      return "Date non disponible"; 
    }
    
  }
  return (
    <div className="flex justify-center mt-8 mb-8 text-justify">
      <div className="max-w-6xl text-center">
        <h2 className="text-2xl font-bold mb-5">
          Liste des candidats
        </h2>

        <ul className="inline grid grid-cols-1 ">
          
          
          {lesEtudiants.map((etudiant, index) => (
            <li
              className="ml-4 mb-4"
              key={index}
              onClick={() => {
                
                //console.log(etudiant);
                ;
              }}
            >
              <Card className="text-center max-w-xl rounded overflow-hidden shadow-lg flex flex-row bg-white hover:bg-gray">
              <h3>{etudiant.nom}</h3>

              <h3>
                  <span className="font-semibold">Date de soumission: </span>
                  {getDateSoumission(etudiant.stagesPostule, stage._id)}
                </h3>
                
                <h3>
                  <span className="font-semibold">Courriel: </span>
                  {etudiant.courriel}
                </h3>
                <h3>
                  <span className="font-semibold">Téléphone: </span>
                  {etudiant.telephone}
                </h3>

              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
