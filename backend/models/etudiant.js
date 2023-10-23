const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const etudiantSchema = new Schema({
  DA: { type: String, required: true },
  nom: { type: String, required: true },
  courriel: { type: String, required: true },
  motDePasse: { type: String, required: true },
  telephone: { type: String, required: true },
  adresse: { type: String, required: true },
  stagesPostule: [
    {
      stagePostule: { type: mongoose.Types.ObjectId, ref: "Stage" },
      date: { type: String },
    },
  ],
  stage: { type: mongoose.Types.ObjectId, ref: "Stage" },
});

module.exports = mongoose.model("Etudiant", etudiantSchema);
