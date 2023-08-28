import React from "react";
import { Link } from "react-router-dom";
import NouveauStage from "../Components/stages/NouveauStage";
export default function FormulaireEmployeurScreen() {


  
  return (
    <div className="flex justify-center mt-8 mb-8 text-justify">
      <div className="max-w-xl">
        {" "}
        <h1 className="text-4xl font-bold mb-4 text-center">
          {" "}
          Formulaire d'inscription de milieu de stage
        </h1>
        Stages réguliers ayant lieu à la session hiver. Les stages sont du 21
        janvier au 3 mai 2023 (il est toutefois possible après entente avec le
        coordonnateur de débuter le stage un peu plus tôt) Sur réception de ce
        formulaire, le coordonnateur des stages entrera en contact avec le
        responsable en entreprise pour discuter du stage. Veuillez vous référez
        à la page{" "}
        <Link
          to="/Profils"
          className="text-blue-600 underline decoration-transparent transition duration-300 ease-in-out hover:decoration-inherit"
        >
          Profils et compétences
        </Link>{" "}
        pour connaître le profil de sortie et les compétences des étudiants.
        <NouveauStage />
      </div>
    </div>
  );
}
