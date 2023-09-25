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
  } catch (err) {
    return next(
      new HttpErreur("Connexion échouée, veuillez réessayer plus tard", 500, err.message)
    );
  }
  if (!utilisateurExiste) {
    try {
      utilisateurExiste = await Employeur.findOne({ courriel: courriel });
      typeUtilisateur = "employeur"
    } catch (err) {
      return next(
        new HttpErreur("Connexion échouée, veuillez réessayer plus tard", 500, err.message)
      );
    }
    if (!utilisateurExiste) {
      try {
        utilisateurExiste = await Cordonnateur.findOne({ courriel: courriel });
        typeUtilisateur = "coordonnateur"
      } catch (err) {
        return next(
          new HttpErreur("Connexion échouée, veuillez réessayer plus tard", 500, err.message)
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


//récupérer un profil de l'user dans les etudiants, les employeurs ou etc, et non dans controlleurs correspondants
const getProfileByCourriel = async (requete, reponse, next) => {
  const { courriel } = requete.body;

  try {
    const etudiant = await Etudiant.findOne({ courriel: courriel });
    if (!etudiant) {
      throw new Error("etudiant not found");
    }
    reponse.json({
      typeUtilisateur: "etudiant",
      profile: etudiant.toObject()
    });
  }
  catch (err) {
    try {
      const employeur = await Employeur.findOne({ courriel: courriel });
      if (!employeur) {
        throw new Error("employeur not found");
      }
      reponse.json({
        typeUtilisateur: "employeur",
        profile: employeur.toObject()
      });
    }
    catch (err) {
      try {
        const coordonateur = await Cordonnateur.findOne({ courriel: courriel });
        if (!coordonateur) {
          throw new Error("coordonateur not found");
        }
        response.json({
          typeUtilisateur: "coordonateur",
          profile: coordonateur.toObject()
        });
      }
      catch (err) {

      }
    }
  }


  return next(new HttpErreur("Utilisateur introuvable", 404));
}




module.exports = {
  connexion,
  getProfileByCourriel
};
