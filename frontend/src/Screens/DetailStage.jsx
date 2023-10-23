import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../config";





export default function DetailStage() {

    const [stage, setStage] = useState(null);

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
            </div>
        </>
    );
};





