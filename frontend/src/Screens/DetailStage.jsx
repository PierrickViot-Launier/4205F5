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


export default function DetailStage() {

    const [stage, setStage] = useState(null);

    const auth = useContext(AuthContext);
    const { stageId } = useParams();


    if (!stage) {
        (async () => {
            const response = await fetch(
                config.backend + "/api/stages/" + stageId,
                {
                    method: "GET",
                }
            );

            const responseJson = await response.json();

            setStage(responseJson.stage);
        })();
    }



    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogTitle, setDialogTitle] = useState("");
    const [okDialogOpen, setOkDialogOpen] = useState(false);
    function showOkMessageDialog(message, title) {
        setDialogMessage(message);
        setDialogTitle(title);

        setOkDialogOpen(true);
    }



    async function buttonPostulerHandler() {
        let response;

        try {
            //   await axios.patch(
            //     config.backend + "/api/etudiants/postulation",
            //     { etudiantId: auth.userId, stageId }
            //   );

            response = await fetch(config.backend + "/api/etudiants/postulation", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PATCH",
                body: JSON.stringify({
                    etudiantId: auth.userId,
                    stageId
                })
            });

            const responseJson = await response.json();

            if (responseJson.erreur) {
                showOkMessageDialog(responseJson.message, "Erreur pendant la postulation");
            }
            else {
                showOkMessageDialog("Postulation envoyé", "confirmation");
            }

        } catch (err) {
            let errorMessage = err.message;

            try {
                const responseJson = await response.json();
                if (responseJson.erreur) {
                    errorMessage += "\n" + responseJson.message;
                }
            }
            catch (err2) {

            }
            showOkMessageDialog("Erreur pendant la postulation : " + err.message, "Erreur pendant la postulation");
        }

    }

    return (
        <>
            <div className="flex justify-center mt-8 mb-8 text-justify">
                <h2 className="text-2xl font-bold mb-5">
                    Détail du stage
                </h2>
            </div>
            <div className="justify-center mt-8 mb-8 text-center">
                {
                    stage
                    ?
                        (<>
                            
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

                        </>)
                    :
                        (<>
                            Chargement en cours...
                        </>)
                }
                <Button
                    onClick={buttonPostulerHandler}
                >Postuler</Button>

                <Dialog open={okDialogOpen} onClose={null}>
                    <DialogTitle>{dialogTitle}</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            {dialogMessage}
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            onClick={() => { setOkDialogOpen(false); }}
                        >
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};





