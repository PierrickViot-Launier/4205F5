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
import SearchInput from "../Form/SearchInput";

export default function OffresDeStage() {
  const [lesStagesAffiches, setLesStagesAffiches] = useState([]);
  const [remuneration, setRemuneration] = useState("");
  const [nbPoste, setNbPoste] = useState("");
  const [open, setOpen] = useState(false);
  const [stageId, setStageId] = useState("");
  const [searchIndex, setSearchIndex] = useState("");

  const auth = useContext(AuthContext);

  async function getStages() {
    if (auth.isCordonnateur) {
      try {
        const data = await axios.get("http://localhost:5000/api/stages/");

        const stages = data.data.stages;

        setLesStagesAffiches(stages);
      } catch {

      }
    } else {
      try {
        const data = await axios.get(
          "http://localhost:5000/api/employeurs/" + auth.userId + "/stages/"
        );

        const stages = data.data.stages;

        setLesStagesAffiches(stages);
      } catch (err) {
        console.log(err);
      }
    }
  }

  function remunerationHandler(event) {
    setRemuneration(event.target.value);

    console.log(event.target.value);
  }

  function nbPosteHandler(event) {
    setNbPoste(event.target.value);

    console.log(event.target.value);
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
        <SearchInput searchIndex={searchIndex} setSearchIndex={setSearchIndex}/>
        <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {lesStagesAffiches
            .filter((stage) => { return (stage.etudiants.length < stage.nbPoste && (stage.description.includes(searchIndex) || stage.nomEntreprise.includes(searchIndex))) })
            .map((stage, index) => (
            <li
              className="ml-4 mb-4"
              key={index}
              onClick={() => {
                setOpen(true);
                setStageId(stage._id);
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

        <DialogContent>
          <div>
            <TextField
              autoFocus
              id="remuneration"
              type="text"
              margin="dense"
              label="Remuneration"
              onChange={remunerationHandler}
            />
          </div>

          <TextField
            id="nbPoste"
            type="text"
            margin="dense"
            label="Nombre de postes"
            onChange={nbPosteHandler}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={async () => {
              setOpen(false);

              try {
                await axios.delete(
                  "http://localhost:5000/api/stages/" + stageId,
                  { etudiantId: auth.userId, stageId }
                );

                auth.modification(new Date().toLocaleString());
              } catch (err) {}

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
                  "http://localhost:5000/api/stages/" + stageId,
                  {
                    remuneration,
                    nbPoste,
                  }
                );

                auth.modification(new Date().toLocaleString());
              } catch (e) {
                console.log("22", e);
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
