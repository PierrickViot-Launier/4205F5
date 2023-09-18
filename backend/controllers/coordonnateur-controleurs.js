const { v4: uuidv4 } = require("uuid");
const HttpErreur = require("../models/http-erreur");

const Stage = require("../models/stage");
const Coordonnateur = require("../models/cordonnateur");

const creation = async (requete, reponse, next) => {
  const { courriel, motDePasse, nomInstitution, telephone, remarque } = requete.body;

  let nouveauCordonnateur = new Coordonnateur({
    courriel,
    motDePasse,
    nomInstitution,
    telephone,
    remarque
  });

  try {
    await nouveauCordonnateur.save();
  } catch {
    return next(
      new HttpErreur("Erreur lors de la création du cordonnateur", 500)
    );
  }

  reponse
    .status(201)
    .json({ cordonnateur: nouveauCordonnateur.toObject({ getter: true }) });
};

exports.creation = creation;
