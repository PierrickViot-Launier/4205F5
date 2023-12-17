import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../config";
import Button from "../Components/Form/Button";

import axios from "axios";
import { AuthContext } from "../shared/context/auth-context";
import { useContext } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import TextField from "@mui/material/TextField";

import EtudiantsCandidats from "../Components/etudiants/EtudiantsCandidats";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Carte from "../Components/OpenMap/Carte";
export default function DetailStage() {
  const [stage, setStage] = useState(null);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { stageId } = useParams();

  if (!stage) {
    (async () => {
      const response = await fetch(config.backend + "/api/stages/" + stageId, {
        method: "GET",
      });

      const responseJson = await response.json();

      setStage(responseJson.stage);
    })();
  }

  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [okDialogOpen, setOkDialogOpen] = useState(false);
  function showOkMessageDialog(message, title) {
    setDialogMessage(message);
    setDialogTitle(title);

    setOkDialogOpen(true);
  }

  // A voir si on remet les methodes en haut.
  const modifierStageHandler = async () => {
    setOpen(false);
    try {
      if (stage.courrielContact.match(/.+@.+\..+/g)) {
        console.log("email is correcte");
        console.log(stage);
        await axios.patch(config.backend + "/api/stages/" + stage._id, stage);

        auth.modification(new Date().toLocaleString());
      } else {
        setDialogTitle("Adresse courriel invalide");

        setOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const genericModiferStageHandler = (event) => {
    setStage({ ...stage, [event.target.id]: event.target.value });
    //console.log(event.target.id);
  };

  const supprimerStageHandler = async () => {
    setOpen(false);

    try {
      await axios.delete(config.backend + "/api/stages/" + stage._id);

      auth.modification(new Date().toLocaleString());
      navigate("/gererOffres");
      
    } catch (err) {
      console.log(err)
    }

  };

  async function buttonPostulerHandler() {
    let response;

    try {
      //   await axios.patch(
      //     config.backend + "/api/etudiants/postulation",
      //     { etudiantId: auth.userId, stageId }
      //   );

      response = await fetch(config.backend + "/api/etudiants/postulation", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          etudiantId: auth.userId,
          stageId,
        }),
      });

      const responseJson = await response.json();

      if (responseJson.erreur) {
        showOkMessageDialog(
          responseJson.message,
          "Erreur pendant la postulation"
        );
      } else {
        showOkMessageDialog("Postulation envoyé", "confirmation");
      }
    } catch (err) {
      let errorMessage = err.message;

      try {
        const responseJson = await response.json();
        if (responseJson.erreur) {
          errorMessage += "\n" + responseJson.message;
        }
      } catch (err2) {}
      showOkMessageDialog(
        "Erreur pendant la postulation : " + err.message,
        "Erreur pendant la postulation"
      );
    }
  }

  return (
    <>
      <div className="flex justify-center mt-8 mb-8 text-justify">
        <h2 className="text-2xl font-bold mb-5">Détail du stage</h2>
      </div>
      <div className="justify-center mt-8 mb-8 text-center">
        {stage ? (
          <>
            <h3>
              <span className="font-semibold">Nom entreprise: </span>
              {stage.nomEntreprise}
            </h3>

            <h3>
              <span className="font-semibold">Nom du contacte: </span>
              {stage.nomContact}
            </h3>
            <h3>
              <span className="font-semibold">Courriel du contacte: </span>
              {stage.courrielContact}
            </h3>
            <h3>
              <span className="font-semibold">Numéro du contacte: </span>
              {stage.numeroContact}
            </h3>
            <h3>
              <span className="font-semibold">Adresse de l'entreprise: </span>
              {stage.adresseEntreprise}
            </h3>
            <h3>
              <span className="font-semibold">Nombre de postes: </span>
              {stage.nbPoste}
            </h3>
            <h3>
              <span className="font-semibold">Description: </span>
              {stage.description}
            </h3>
            <h3>
              <span className="font-semibold">Rémunération: </span>
              {stage.remuneration}
            </h3>

            <Carte adresse={stage.adresseEntreprise} />


            {auth.isEmployeur ? (
              <React.Fragment>
                <EtudiantsCandidats stage={stage} />
                <Button
                  onClick={() => {
                    setDialogTitle("Modifier ou supprimer le stage");
                    setOpen(true);
                  }}
                >
                  Modifier
                </Button>
              </React.Fragment>
            ) : (
              <>
                <Button onClick={buttonPostulerHandler}>Postuler</Button>
              </>
            )}
            <Dialog open={okDialogOpen} onClose={null}>
              <DialogTitle>{dialogTitle}</DialogTitle>

              <DialogContent>
                <DialogContentText>{dialogMessage}</DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button
                  onClick={() => {
                    setOkDialogOpen(false);
                  }}
                >
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>{dialogTitle}</DialogTitle>

              <DialogContent
                sx={{
                  width: 500,
                  maxWidth: "100%",
                }}
              >
                <TextField
                  autoFocus
                  id="nomContact"
                  type="text"
                  margin="dense"
                  label="Nom de contact"
                  fullWidth
                  defaultValue={stage.nomContact}
                  onChange={genericModiferStageHandler}
                />
                <br />
                <TextField
                  autoFocus
                  id="courrielContact"
                  type="text"
                  margin="dense"
                  label="Courriel de Contact"
                  inputProps={{ inputMode: "email", pattern: "[0-9]*" }}
                  fullWidth
                  defaultValue={stage.courrielContact}
                  onChange={genericModiferStageHandler}
                />
                <br />
                <TextField
                  autoFocus
                  id="numeroContact"
                  type="text"
                  margin="dense"
                  label="Numero de contact"
                  fullWidth
                  defaultValue={stage.numeroContact}
                  onChange={genericModiferStageHandler}
                />
                <br />
                <TextField
                  autoFocus
                  id="nomEntreprise"
                  type="text"
                  margin="dense"
                  label="Nom de l'entreprise"
                  fullWidth
                  defaultValue={stage.nomEntreprise}
                  onChange={genericModiferStageHandler}
                />
                <br />
                <TextField
                  autoFocus
                  id="adresseEntreprise"
                  type="text"
                  margin="dense"
                  label="Adresse de l'entreprise"
                  fullWidth
                  defaultValue={stage.adresseEntreprise}
                  onChange={genericModiferStageHandler}
                />
                <br />
                <TextField
                  autoFocus
                  id="description"
                  type="text"
                  margin="dense"
                  label="description"
                  multiline
                  maxRows={3}
                  fullWidth
                  defaultValue={stage.description}
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
                  defaultValue={stage.remuneration}
                  onChange={genericModiferStageHandler}
                />
                <br />
                <TextField
                  id="nbPoste"
                  type="text"
                  margin="dense"
                  label="Nombre de postes"
                  fullWidth
                  defaultValue={stage.nbPoste}
                  onChange={genericModiferStageHandler}
                />
              </DialogContent>

              <DialogActions>
                <Button onClick={supprimerStageHandler}>Supprimer</Button>
                <Button onClick={modifierStageHandler}>Modifier</Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <>Chargement en cours...</>
        )}
      </div>
    </>
  );
}
