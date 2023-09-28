import React, { useContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import Card from "../../shared/Card";
import { useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { config } from "../../config";

export default function StagesPostules() {
  const [lesStages, setLesStages] = useState([]);

  const auth = useContext(AuthContext);

  async function getStages() {
    try {
      const data = await axios.get(
        config.backend + "/api/etudiants/" + auth.userId + "/stages/"
      );

      const stages = data.data.stages;

      console.log(data);

      // console.log(stages);

      setLesStages(stages);
    } catch (err) {
      // console.log(err);
    }
  }

  useEffect(() => {
    getStages();
  }, []);

  return (
    <div className="flex justify-center mt-8 mb-8 text-justify">
      <div className="max-w-6xl text-center">
        <h2 className="text-2xl font-bold mb-2">Liste des stages postulés </h2>
        <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {lesStages.map((stage, index) => (
            <li className="ml-4 mb-4" key={index}>
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
