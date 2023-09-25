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
  const courriel = requete.params.courriel;

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
};

const getProfileByUserID = async (requete, reponse, next) => {
  const userID = requete.params.userID;
  try {
    const etudiant = await Etudiant.findById(userID);
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
      const employeur = await Employeur.findById(userID);
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
        const coordonateur = await Cordonnateur.findById(userID);
        if (!coordonateur) {
          throw new Error("coordonateur not found");
        }
        response.json({
          typeUtilisateur: "coordonateur",
          profile: coordonateur.toObject()
        });
      }
      catch (err) {
        return next(new HttpErreur("Utilisateur introuvable", 404));

      }
    }
  }


};


const setProfileByUserID = async (requete, reponse, next) => {
  const userID = requete.params.userID;

  function setExistingProperties(modelObj) {
    for (const property in requete.body) {
      modelObj[property] = requete.body[property];
    }
  }

  //todo: il faudrait faire les validations server-side au lieu de faire confience au client

  try {

    try {
      const etudiant = await Etudiant.findById(userID);
      setExistingProperties(etudiant);
      await etudiant.save();
    }
    catch (err) {
      try {
        const employeur = await Employeur.findById(userID);
        console.log("employeur");
        console.log(employeur.toObject());
        setExistingProperties(employeur);
        console.log(employeur.toObject());
        try {
          await employeur.save();
        }
        catch (err) {
          console.log(err);
          return next(new HttpErreur("Erreur pendant la sauvegarde de l'employeur", 500, err));
        }
      }
      catch (err) {
        try {
          const coordonateur = await Cordonnateur.findById(userID);
          setExistingProperties(coordonateur);
          await coordonateur.save();
        }
        catch (err) {
          return next(new HttpErreur("Erreur pendant la modification du profile", 500, err));
        }
      }
    }

    reponse.json({});
  }
  catch (err) {
    return next(new HttpErreur("Erreur pendant la modification du profile", 500, err));
  }
};



module.exports = {
  connexion,
  getProfileByCourriel,
  getProfileByUserID,
  setProfileByUserID
};
