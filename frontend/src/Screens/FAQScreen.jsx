import React from "react";

export default function FAQScreen() {
  return (
    <div className="flex justify-center mt-8 mb-8 text-justify">
      <div className="max-w-xl">
        <h1 className="text-4xl font-bold mb-4">Foire aux questions - FAQ</h1>

        <h2 className="text-2xl font-bold mb-2">
          Est-ce que le stage est obligatoire?
        </h2>

        <p className="mb-4">
          Le stage de fin d'études en informatique est obligatoire pour
          l'obtention du diplôme collégial.
        </p>

        <h2 className="text-2xl font-bold mb-2">
          Quel est l'horaire de l'étudiant durant les stages?
        </h2>

        <p className="mb-4">
          L'étudiant doit respecter l'horaire de l'entreprise durant son stage.
        </p>

        <h2 className="text-2xl font-bold mb-2">
          Est-ce que l'étudiant travaille pendant les journées pédagogiques et
          les journées de rattrapage?
        </h2>

        <p className="mb-4">
          L'étudiant doit respecter l'horaire de l'entreprise durant son stage
          et ce même durant les journées pédagogiques et de rattrapage.
        </p>

        <h2 className="text-2xl font-bold mb-2">
          Quelle est la durée d'un stage de fin d'études?
        </h2>

        <p className="mb-4">
          La durée du stage est de 15 semaines pour les deux profils de sortie
          (réseaux et programmation).
        </p>

        <h2 className="text-2xl font-bold mb-2">
          Quelles sont les dates prévues pour les stages?
        </h2>

        <p className="mb-4">
          Les stages sont prévus du 21 janvier au 3 mai 2023.
        </p>
      </div>
    </div>
  );
}
