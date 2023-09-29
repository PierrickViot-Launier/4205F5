import React from "react";
import axios from "axios";
import { useEffect } from "react";
import Card from "../../shared/Card";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { config } from "../../config";


export default function Etudiants() {
  const [lesEtudiants, setLesEtudiants] = useState([]);
  const [open, setOpen] = useState(false);
  const [etudiantId, setEtudiantId] = useState("");
  const [stageSelectionne, setStageSelectionne] = useState("");
  const [lesStages, setLesStages] = useState([]);
  const [type, setType] = useState("");

  function stageHandler(event) {
    setStageSelectionne(event.target.value);
  }

  async function getEtudiants() {
    try {
      const data = await axios.get(config.backend + "/api/etudiants/");

      const etudiants = data.data.etudiants;

      // console.log(etudiants);

      setLesEtudiants(etudiants);
    } catch (err) {
      // console.log(err);
    }
  }

  async function getStages(type) {
    try {
      const data = await axios.get(config.backend + "/api/stages/");

      const stages = data.data.stages;

      setLesStages(
        stages.filter(
          (stage) =>
            stage.type === type &&
            parseInt(stage.nbPoste) > stage.etudiants.length
        )
      );
    } catch (err) {
      // console.log(err);
    }
  }

  async function getProfilEtudiant(id) {
    try {
      const data = await axios.get(config.backend + "/api/etudiants/" + id);

      const etudiant = data.data.etudiant;
      setType(etudiant.profil);
    } catch (err) {
      // console.log(err);
    }
  }

  useEffect(() => {
    getEtudiants();
    // getStages(type);
  }, []);

  useEffect(() => {
    getStages(type);
  }, [type]);

  return (
    <div className="flex justify-center mt-8 mb-8 text-justify">
      <div className="max-w-6xl text-center">
        <h2 className="text-2xl font-bold mb-5">
          Liste des étudiants en recherche de stage
        </h2>

        <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {lesEtudiants.map((etudiant, index) => (
            <li
              className="ml-4 mb-4"
              key={index}
              onClick={() => {
                setOpen(true);
                setEtudiantId(etudiant._id);
                // console.log(etudiant.profil);
                getProfilEtudiant(etudiant._id);
              }}
            >
              <Card className="text-center max-w-xl rounded overflow-hidden shadow-lg flex flex-col bg-white hover:bg-gray">
                <h3>{etudiant.nom}</h3>

                <h3>
                  {" "}
                  <span className="font-semibold">DA: </span>
                  {etudiant.DA}
                </h3>

                <h3>
                  <span className="font-semibold">Courriel: </span>
                  {etudiant.courriel}
                </h3>

                <h3>
                  <span className="font-semibold">Profil: </span>
                  {etudiant.profil}
                </h3>

                <h3>
                  <span className="font-semibold">Stages postulés: </span>
                </h3>

                <ul>
                  {etudiant.stagesPostule.length !== 0 ? (
                    etudiant.stagesPostule.map((stage) => (
                      <li>{stage.nomEntreprise}</li>
                    ))
                  ) : (
                    <li>L'étudiant a postulé à aucun stage.</li>
                  )}
                </ul>

                <h3>
                  <span className="font-semibold">Stage: </span>
                  {etudiant.stage !== null
                    ? etudiant.stage.nomEntreprise
                    : "L'étudiant n'est pas assigné à un stage."}
                </h3>
              </Card>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{"Assigner un stage à l'étudiant"}</DialogTitle>

        <DialogContent>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="stages-label">Stages</InputLabel>

            <Select
              labelId="stages-label"
              id="stages"
              label="Stages"
              value={stageSelectionne}
              onChange={stageHandler}
            >
              <MenuItem value="">
                <em>Sélectionnez un stage</em>
              </MenuItem>

              {lesStages.map((stage, index) => {
                return (
                  <MenuItem key={index} value={stage._id}>
                    {stage.nomEntreprise}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={async () => {
              setOpen(false);

              try {
                await axios.patch(
                  config.backend + "/api/etudiants/" + etudiantId,
                  { stageId: stageSelectionne }
                );
              } catch (err) {}

              getStages();

              getEtudiants();
            }}
          >
            Assigner l'étudiant à ce stage
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
