import React, { useContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import Card from "../../shared/Card";
import { useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { config } from "../../config";
import SearchInput from "../Form/SearchInput";
import { useNavigate } from "react-router-dom";
export default function OffresDeStage() {
  
  const navigate = useNavigate();
  const [lesStagesAffiches, setLesStagesAffiches] = useState([]);
 const [searchIndex, setSearchIndex] = useState("");
 const auth = useContext(AuthContext);

  async function getStages() {
    if (auth.isCordonnateur) {
      try {
        const data = await axios.get(config.backend + "/api/stages/");

        const stages = data.data.stages;

        setLesStagesAffiches(stages);
      } catch (err) {
        console.error("[ERROR_BD]:" + err);
      }

    } else {
      try {
        const data = await axios.get(
          config.backend + "/api/employeurs/" + auth.userId + "/stages/"
        );

        const stages = data.data.stages;

        setLesStagesAffiches(stages);
      } catch (err) {
        console.error("[ERROR_BD]:" + err);
      }
    }
  }

useEffect(() => {
    getStages();
  }, []);



  return (
    <div className="flex justify-center mt-8 mb-8 text-justify">
      <div className="max-w-6xl text-center">
        <h2 className="text-2xl font-bold mb-5">
          Liste des offres de stage créées
        </h2>
        <SearchInput searchIndex={searchIndex} setSearchIndex={setSearchIndex} />
        <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {lesStagesAffiches
            .filter((stage) => { return (stage.etudiants.length < stage.nbPoste && (stage.description.includes(searchIndex) || stage.nomEntreprise.includes(searchIndex))) })
            .map((stage, index) => (
              <li
                className="ml-4 mb-4"
                key={index}
                onClick={() => {
                  /*setDialogTitle("Modifier ou supprimer le stage");
                  setOpen(true);
                  setStageSelected(stage);
                  */
                 navigate("/DetailStage/"+stage.id);
                }}
              >
                <Card className="text-center max-w-xl rounded overflow-hidden shadow-lg flex flex-col bg-white hover:bg-gray">
                  <h3>{stage.nomEntreprise}</h3>

                  <h3>
                    {" "}
                    <span className="font-semibold">Personne contact: </span>
                    {stage.nomContact}
                  </h3>

                  <h3>
                    <span className="font-semibold">Courriel: </span>
                    {stage.courrielContact}
                  </h3>

                  <h3>
                    <span className="font-semibold">Adresse: </span>
                    {stage.adresseEntreprise}
                  </h3>

                  <h3>
                    <span className="font-semibold">Postes disponibles: </span>
                    {stage.nbPoste}
                  </h3>

                  <h3>
                    <span className="font-semibold">Description: </span>
                    {stage.description}
                  </h3>
                </Card>
              </li>
            ))}
        </ul>
      </div>

      
    </div>
  );
}
