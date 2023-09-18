const { v4: uuidv4 } = require("uuid");
const HttpErreur = require("../models/http-erreur");

const Etudiant = require("../models/etudiant");
const Stage = require("../models/stage");

const inscription = async (requete, reponse, next) => {
  const { DA, nom, courriel, motDePasse, telephone, addresseComplete } = requete.body;

  let etudiantExiste;

  try {
    etudiantExiste = await Etudiant.findOne({ DA: DA });
  } catch (err) {
    return next(new HttpErreur("Échec vérification étudiant existe", 500, err.message));
  }

  if (etudiantExiste) {
    return next(
      new HttpErreur("Étudiant existe déjà, veuillez vous connecter", 422)
    );
  }

  let nouvelEtudiant = new Etudiant({
    DA,
    nom,
    courriel,
    motDePasse,
    telephone,
    addresseComplete,
    stagesPostule: [],
    stage: null,
  });

  try {
    await nouvelEtudiant.save();
  } catch (err) {
    return next(new HttpErreur("Erreur lors de l'ajout de l'étudiant", 422, err.message));
  }

  reponse
    .status(201)
    .json({ etudiant: nouvelEtudiant.toObject({ getter: true }) });
};

const getEtudiants = async (requete, reponse, next) => {
  let etudiants;
  try {
    etudiants = await Etudiant.find().populate("stagesPostule stage");
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération des étudiants", 500, err.message)
    );
  }
  if (!etudiants) {
    return next(new HttpErreur("Aucun étudiant trouvé", 404));
  }
  reponse.status(201).json({ etudiants: etudiants });
};

const getEtudiantById = async (requete, reponse, next) => {
  const etudiantId = requete.params.etudiantId;

  let etudiant;

  try {
    etudiant = await Etudiant.findById(etudiantId);
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération de l'étudiant", 500, err.message)
    );
  }

  if (!etudiant) {
    return next(new HttpErreur("Aucun étudiant trouvé pour l'id fourni", 404));
  }
  reponse.json({ etudiant: etudiant.toObject({ getters: true }) });
};

const postulationStage = async (requete, reponse, next) => {
  // console.log(stageId);

  const { etudiantId, stageId } = requete.body;
  let dejaPostule = false;
  let etudiant;

  let stage;

  try {
    etudiant = await Etudiant.findById(etudiantId);
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération de l'étudiant", 500, err.message)
    );
  }

  try {
    stage = await Stage.findById(stageId);
  } catch (err) {
    return next(new HttpErreur("Erreur lors de la récupération du stage", 500, err.message));
  }

  // console.log(etudiant);
  for (i = 0; i < etudiant.stagesPostule.length; i++) {
    if (etudiant.stagesPostule[i]._id == stageId) {
      dejaPostule = true;
    }
  }

  if (dejaPostule) {
    return next(new HttpErreur("L'étudiant a déjà postulé à ce stage", 404));
  }

  try {
    // console.log(stage);
    etudiant.stagesPostule.push(stage);
    await etudiant.save();

    stage.etudiants.push(etudiant);

    await stage.save();
  } catch (err) {
    return next(new HttpErreur("Erreur lors de l'inscription au stage", 500, err.message));
  }

  reponse.json({ message: "Étudiant inscrit avec succès" });
};

const getStagesByUserId = async (requete, reponse, next) => {
  const etudiantId = requete.params.etudiantId;

  let etudiant;
  let stages;

  try {
    etudiant = await Etudiant.findById(etudiantId).populate("stagesPostule");

    stages = etudiant.stagesPostule;
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération des stages", 500, err.message)
    );
  }

  // console.log(etudiant);

  // console.log(stages);

  if (!stages || stages.length === 0) {
    return next(
      new HttpErreur("Aucun stage trouvé pour l'étudiant fourni", 404)
    );
  }

  reponse.json({ stages: stages });
};

const assignerStage = async (requete, reponse, next) => {
  const etudiantId = requete.params.etudiantId;
  const { stageId } = requete.body;
  let etudiant;
  let stage;
  try {
    stage = await Stage.findById(stageId).populate("etudiants");
  } catch (err) {
    return next(new HttpErreur("Erreur lors de la récupération du stage", 500, err.message));
  }
  try {
    etudiant = await Etudiant.findById(etudiantId).populate("stage");
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération de l'étudiant", 500, err.message)
    );
  }

  if (!stage || stage.etudiants.length == stage.nbPoste) {
    return next(
      new HttpErreur("Impossible d'assigner ce stage à l'étudiant", 404)
    );
  }

  if (!etudiant) {
    return next(new HttpErreur("Aucun étudiant trouvé pour l'id fourni", 404));
  }
  try {
    stage.etudiants.push(etudiant);
    await stage.save();
    etudiant.stage = stage;
    await etudiant.save();
  } catch (err) {
    return next(new HttpErreur("Erreur lors de l'assignation au stage", 500, err.message));
  }
  reponse.json({ etudiant: etudiant.toObject({ getter: true }) });
};

exports.assignerStage = assignerStage;
exports.getStagesByUserId = getStagesByUserId;
exports.getEtudiantById = getEtudiantById;
exports.getEtudiants = getEtudiants;
exports.inscription = inscription;
exports.postulationStage = postulationStage;
