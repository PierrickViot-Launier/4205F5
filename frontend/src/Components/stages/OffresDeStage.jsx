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
import { Box } from "@mui/material";

export default function OffresDeStage() {
  const [lesStagesAffiches, setLesStagesAffiches] = useState([]);
  const [open, setOpen] = useState(false);
  const [stageSelected, setStageSelected] = useState({
  
  });
  
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

  const genericModiferStageHandler = (event) => {
    setStageSelected({ ...stageSelected, [event.target.id]: event.target.value })
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
                  setOpen(true);
                  setStageSelected(stage);
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

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{"Modifier ou supprimer le stage"}</DialogTitle>

        <DialogContent
          sx={{
            width:500,
            maxWidth:'100%'
          }}
          >
            <TextField
              autoFocus
              id="nomContact"
              type="text"
              margin="dense"
              label="Nom de contact"
              fullWidth
              defaultValue={stageSelected.nomContact}
              onChange={genericModiferStageHandler}
            />
            <br />
            <TextField
              autoFocus
              id="courrielContact"
              type="text"
              margin="dense"
              label="Courriel de Contact"
              inputProps={{ inputMode: 'email', pattern: '[0-9]*' }}
              fullWidth
              defaultValue={stageSelected.courrielContact}
              onChange={genericModiferStageHandler}
            /><br />
            <TextField
              autoFocus
              id="numeroContact"
              type="text"
              margin="dense"
              label="Numero de contact"
              fullWidth
              defaultValue={stageSelected.numeroContact}
              onChange={genericModiferStageHandler}
            /><br />
            <TextField
              autoFocus
              id="nomEntreprise"
              type="text"
              margin="dense"
              label="Nom de l'entreprise"
              fullWidth
              defaultValue={stageSelected.nomEntreprise}
              onChange={genericModiferStageHandler}
            /><br />
            <TextField
              autoFocus
              id="adresseEntreprise"
              type="text"
              margin="dense"
              label="Adresse de l'entreprise"
              fullWidth
              defaultValue={stageSelected.adresseEntreprise}
              onChange={genericModiferStageHandler}
            /><br />
            <TextField
              autoFocus
              id="description"
              type="text"
              margin="dense"
              label="description"
              multiline
              maxRows={3}
              fullWidth
              defaultValue={stageSelected.description}
              onChange={genericModiferStageHandler}
            />
            <br />
            <TextField
              autoFocus
              id="remuneration"
              type="text"
              margin="dense"
              label="Remuneration"
              fullWidth
              defaultValue={stageSelected.remuneration}
              onChange={genericModiferStageHandler}
            />
            <br />
            <TextField
              id="nbPoste"
              type="text"
              margin="dense"
              label="Nombre de postes"
              fullWidth
              defaultValue={stageSelected.nbPoste}
              onChange={genericModiferStageHandler}
            />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={async () => {
              setOpen(false);

              try {
                await axios.delete(
                  config.backend + "/api/stages/" + stageSelected._id,
                  { etudiantId: auth.userId, stageId: stageSelected._id }
                );

                auth.modification(new Date().toLocaleString());
              } catch (err) { }

              await getStages();
            }}
          >
            Supprimer
          </Button>
          <Button
            onClick={async () => {
              setOpen(false);
              try {
                await axios.patch(
                  config.backend + "/api/stages/" + stageSelected._id, stageSelected
                );

                auth.modification(new Date().toLocaleString());
              } catch (err) {
                console.log(err);
              }
              getStages();
            }}
          >
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
