const { v4: uuidv4 } = require("uuid");
const HttpErreur = require("../models/http-erreur");

const Stage = require("../models/stage");
const Etudiant = require("../models/etudiant");
const Employeur = require("../models/employeur");

const creation = async (requete, reponse, next) => {
  const {
    nomContact,
    courrielContact,
    numeroContact,
    nomEntreprise,
    adresseEntreprise,
    nbPoste,
    description,
    remuneration,
    employeur,
  } = requete.body;

  let nouveauStage = new Stage({
    nomContact,
    courrielContact,
    numeroContact,
    nomEntreprise,
    adresseEntreprise,
    nbPoste,
    description,
    remuneration,
    etudiants: [],
    employeur: await Employeur.findById(employeur),
  });

  let unEmployeur;
  try {
    unEmployeur = await Employeur.findById(employeur).populate("stages");
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération de l'employeur", 500, err.message)
    );
  }
  try {
    await nouveauStage.save();
    unEmployeur.stages.push(nouveauStage);
    await unEmployeur.save();
  } catch (err) {
    return next(new HttpErreur("Erreur lors de l'ajout du stage", 422, err.message));
  }

  reponse.status(201).json({ stage: nouveauStage.toObject({ getter: true }) });
};

const getStageById = async (requete, reponse, next) => {
  const stageId = requete.params.stageId;
  let stage;
  try {
    stage = await Stage.findById(stageId);
  } catch (err) {
    return next(new HttpErreur("Erreur lors de la récupération du stage", 500, err.message));
  }
  if (!stage) {
    return next(new HttpErreur("Aucun stage trouvé pour l'id fourni", 404));
  }
  reponse.json({ stage: stage.toObject({ getters: true }) });
};

const getStages = async (requete, reponse, next) => {
  let stages;

  try {
    stages = await Stage.find();
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération des stages", 500, err.message)
    );
  }

  if (!stages) {
    return next(new HttpErreur("Aucun stage trouvé", 404));
  }

  reponse.json({ stages: stages });
};

const supprimerStage = async (requete, reponse, next) => {
  const stageId = requete.params.stageId;
  let stage;
  let employeur;
  let etudiants;
  try {
    stage = await Stage.findById(stageId).populate("etudiants employeur");
  } catch (err) {
    return next(new HttpErreur("Erreur lors de la suppression du stage", 500, err.message));
  }
  if (!stage) {
    return next(new HttpErreur("Impossible de trouver le stage", 404));
  }
  employeur = stage.employeur;
  etudiants = stage.etudiants;

  try {
    await stage.remove();

    for (i = 0; i < etudiants.length; i++) {
      etudiants[i].stagesPostule.pull(stage);

      await etudiants[i].save();
    }

    employeur.stages.pull(stage);

    await employeur.save();
  } catch (err) {
    return next(new HttpErreur("Erreur lors de la suppression du stage", 500, err.message));
  }
  reponse.status(200).json({ message: "Stage supprimé" });
};

const modifierStage = async (requete, reponse, next) => {
  const champsModifies = requete.body;
  const stageId = requete.params.stageId;

  let stage;

  try {
    stage = await Stage.findById(stageId);
    
    if (!stage) {
      console.log("DB: stage non trouve");
    }

    Object.keys(champsModifies).forEach(key => { 
      if (stage.hasOwnProperty(key)) { 
        stage[key] = champsModifies[key];
      }
    });

    await stage.save();
  } catch (err) {
    return next(new HttpErreur("Erreur lors de la mise à jour du stage", 500, err.message));
  }

  reponse.status(200).json({ stage: stage.toObject({ getters: true }) });
};

exports.getStageById = getStageById;
exports.modifierStage = modifierStage;
exports.supprimerStage = supprimerStage;
exports.getStages = getStages;
exports.creation = creation;
