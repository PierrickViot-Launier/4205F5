import React from "react";

export default function ProfilsCompetencesScreen() {
  function affichageProfil(event) {
    if (event.target.value === "Réseaux et sécurité") {
      document.getElementById("developpement").style.display = "none";
      document.getElementById("reseaux").style.display = "block";
    } else if (event.target.value === "Développement d'applications") {
      document.getElementById("reseaux").style.display = "none";
      document.getElementById("developpement").style.display = "block";
    } else {
      document.getElementById("reseaux").style.display = "none";
      document.getElementById("developpement").style.display = "none";
    }
  }
  return (
    <div className="flex justify-center mt-8 mb-8 text-justify">
      <div className="max-w-2xl">
        <select
          defaultValue="Sélectionnez un profil"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          name="profils"
          id="profils"
          onChange={affichageProfil}
        >
          <option value="Sélectionnez un profil">Sélectionnez un profil</option>
          <option value="Réseaux et sécurité">Réseaux et sécurité</option>
          <option value="Développement d'applications">
            Développement d'applications
          </option>
        </select>
        <div id="reseaux" className="hidden  mb-4">
          <h2 className="text-2xl font-bold mb-2">Réseaux et sécurité</h2>
          <div>
            Nos étudiants en Gestion de réseaux et sécurité ont suivi des cours
            leur permettant de:
            <ul className="list-disc list-inside">
              <li>
                gérer des réseaux informatiques et offrir du soutien aux
                personnes qui utilisent des ordinateurs et des réseaux,
                c’est-à-dire:
                <ul className="list-disc list-inside pl-10">
                  <li> monter un serveur </li>
                  <li>planifier et implanter un réseau </li>
                  <li>
                    implanter les technologies et les services propres au réseau
                    Internet
                  </li>{" "}
                  <li>assurer la gestion du réseau</li>{" "}
                  <li>planifier et déployer des environnements virtuels</li>{" "}
                  <li>
                    planifier et mettre en place la sécurité des systèmes
                    informatiques
                  </li>{" "}
                  <li>déployer les nouvelles technologies des réseaux </li>
                  <li>automatiser les tâches d’administration réseaux</li>{" "}
                  <li>superviser les réseaux </li>
                  <li>assurer le soutien technique aux utilisateurs</li>{" "}
                  <li>découvrir des nouvelles technologies </li>
                </ul>
              </li>{" "}
              <li>
                {" "}
                connaître de façon approfondie le traitement de l’information,
                les logiciels et les composants de l’ordinateur et des
                périphériques tels que:
                <ul className="list-disc list-inside pl-10">
                  {" "}
                  <li>
                    l’installation et la gestion des serveurs et des clients
                    Microsoft et Linux{" "}
                  </li>{" "}
                  <li>
                    la configuration, l’installation et la gestion d’un serveur
                    Web ou de courrier
                  </li>{" "}
                  <li>
                    le déploiement d’un système et d’une application client
                  </li>
                  <li>
                    {" "}
                    la mise en place de la sécurité des systèmes informatiques
                  </li>
                  <li>
                    l’utilisation des techniques pour tester et sécuriser les
                    équipements informatiques
                  </li>{" "}
                  <li>
                    le déploiement des environnements virtuels et de
                    l’infonuagique
                  </li>{" "}
                  <li>
                    la résolution de problèmes de réseaux sur les équipements
                    informatiques
                  </li>
                  <li>
                    préparation à la certification CEH (Certified Ethical
                    Hacker)
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div id="developpement" className="hidden  mb-4">
          <h2 className="text-2xl font-bold mb-2">
            Développement d'applications informatiques
          </h2>
          <div>
            Nos étudiant en Développement d'applications informatiques ont suivi
            des cours leur permettant de:
            <ul className="list-disc list-inside">
              {" "}
              <li>participer à l’analyse des systèmes à implanter</li>{" "}
              <li>
                détecter les problèmes, en dégager la structure et trouver les
                solutions logiques
              </li>{" "}
              <li>
                {" "}
                effectuer les jeux d’essai et la mise au point des programmes et
                des systèmes
              </li>{" "}
              <li>
                élaborer des systèmes et participer à leur implantation ou à
                leur modification dans les entreprises
              </li>{" "}
              <li>programmer des objets connectés </li>
              <li>sécuriser les applications informatiques</li>{" "}
              <li>virtualiser des postes de travail</li>
              <li>comprendre les notions fondamentales des réseaux</li>
              <li>
                {" "}
                gérer les versions des fichiers sources des applications
                informatiques
              </li>{" "}
              <li>déployer des applications infonuagiques</li>{" "}
              <li>découvrir les nouvelles technologies</li>
              <li>
                connaître de façon approfondie le traitement de l’information,
                les logiciels et les composants de l’ordinateur et des
                périphériques tels que:
                <ul className="list-disc list-inside pl-10">
                  {" "}
                  <li>
                    la programmation structurée et orientée objet et Web
                    dynamique
                  </li>{" "}
                  <li>
                    les bases de données l’installation et la configuration de
                    logiciels
                  </li>{" "}
                  <li>
                    les composantes matérielles de l’ordinateur, leur
                    installation et leur configuration les systèmes
                    d’exploitation (Windows et Linux)
                  </li>{" "}
                  <li>les méthodologies Agile telles que SCRUM</li>
                  <li>le développement pour plateforme mobile </li>
                  <li>l’assurance qualité logiciel</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
