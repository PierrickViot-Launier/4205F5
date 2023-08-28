const HttpErreur = require("../models/http-erreur");

const Etudiant = require("../models/etudiant");
const Employeur = require("../models/employeur");
const Cordonnateur = require("../models/cordonnateur");
const connexion = async (requete, reponse, next) => {
  const { courriel, motDePasse } = requete.body;

  let utilisateurExiste;
  let typeUtilisateur;
  try {
    utilisateurExiste = await Etudiant.findOne({ courriel: courriel });
    typeUtilisateur = "etudiant"
  } catch {
    return next(
      new HttpErreur("Connexion échouée, veuillez réessayer plus tard", 500)
    );
  }
  if (!utilisateurExiste) {
    try {
      utilisateurExiste = await Employeur.findOne({ courriel: courriel });
      typeUtilisateur = "employeur"
    } catch {
      return next(
        new HttpErreur("Connexion échouée, veuillez réessayer plus tard", 500)
      );
    }
    if (!utilisateurExiste) {
      try {
        utilisateurExiste = await Cordonnateur.findOne({ courriel: courriel });
        typeUtilisateur = "cordonnateur"
      } catch {
        return next(
          new HttpErreur("Connexion échouée, veuillez réessayer plus tard", 500)
        );
      }
    
  }
  if (!utilisateurExiste || utilisateurExiste.motDePasse !== motDePasse) {
    return next(new HttpErreur("Courriel ou mot de passe incorrect", 401));
  }
  
};
reponse.json({
  message: "connexion réussie!",
  typeUtilisateur: typeUtilisateur,
  utilisateur: utilisateurExiste.toObject({ getters: true })
});
};
exports.connexion = connexion;
