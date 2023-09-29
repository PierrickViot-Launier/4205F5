const { v4: uuidv4 } = require("uuid");
const HttpErreur = require("../models/http-erreur");

const Employeur = require("../models/employeur");


const getEmployeurById = async (requete , reponse, next) => {
  const userId = requete.params.userId
  let employeur;
  try {
    employeur = await Employeur.findById(userId);
  } catch (erreur) {
    return next(
      new HttpErreur("Erreur lors de la récupération de l'employeur", 500)
    );
  }
  reponse.json({
    employeur: employeur.toObject({ getters: true }),
  });
}

const inscription = async (requete, reponse, next) => {
  const { nom, courriel, motDePasse, nomEntreprise, adresse, telephone, poste } = requete.body;


  let employeurExiste;

  try {
    employeurExiste = await Employeur.findOne({ courriel: courriel });
  } catch (err) {
    return next(new HttpErreur("Échec vérification si employeur existe", 500, err.message));
  }

  if (employeurExiste) {
    return next(
      new HttpErreur("L'employeur existe déjà, veuillez vous connecter", 422)
    );
  }

  let nouvelEmployeur = new Employeur({
    nom,
    courriel,
    motDePasse,
    nomEntreprise,
    telephone,
    poste,
    adresse,
    stages: [],
  });

  try {
    await nouvelEmployeur.save();
  } catch (err) {
    return next(new HttpErreur("Erreur lors de l'ajout de l'employeur", 422, err.message));
  }

  reponse
    .status(201)
    .json({ employeur: nouvelEmployeur.toObject({ getter: true }) });
};



const getStagesByUserId = async (requete, reponse, next) => {
  const userId = requete.params.userId;
  let employeur;
  let stages;

  try {
    employeur = await Employeur.findById(userId).populate("stages");
    stages = employeur.stages;
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération des stages", 500, err.message)
    );
  }

  // if (!stages) {
  //   return next(
  //     new HttpErreur("Aucun stage trouvé pour l'employeur fourni", 404)
  //   );
  // }

  reponse.json({
    stages: stages.map((stage) => stage.toObject({ getters: true })),
  });
};

exports.getStagesByUserId = getStagesByUserId;
exports.inscription = inscription;
exports.getEmployeurById = getEmployeurById;
