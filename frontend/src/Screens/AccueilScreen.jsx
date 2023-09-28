import React from "react";

export default function AccueilScreen() {
  const annee = new Date().getFullYear();


  return (
    <div className="flex justify-center mt-8 mb-8 text-justify">
      <div className="max-w-xl">
        <h1 className="text-4xl font-bold mb-4 text-center">Édition {annee}</h1>

        <p className="mb-4">
          Bienvenue sur le site des stages de fin d'études des techniques de
          l'informatique du Collège Montmorency!
        </p>

        <p className="mb-4">
          À la fin de leurs études, les étudiants sont appelés à mettre en
          pratique les compétences acquises durant le programme. Cela se fait
          grâce à la participation d'entreprises de la région qui les
          accueillent afin de finaliser leurs formations.
        </p>

        <p className="mb-4">
          Le Collège Montmorency offre ainsi aux employeurs l'occasion d'obtenir
          une main-d'œuvre compétente, tout en leur permettant de participer à
          la formation finale des étudiants.
        </p>

        <p className="mb-4">
          Le stage de fin d'études est une expérience concrète permettant
          d'acquérir une expérience professionnelle formatrice.
        </p>

        <p className="mb-4">
          Les étudiants terminent la portion académique de leurs études en
          informatique selon une des deux voies de sortie du programme: Réseaux
          et sécurité informatique Développement d'applications informatiques
        </p>
      </div>
    </div>
  );
}
