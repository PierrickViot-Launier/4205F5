const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeurSchema = new Schema({
  nom: { type: String, required: true },
  nomEntreprise: { type: String, required: true},
  adresseEntreprise: {type: String, required: true},
  courriel: { type: String, required: true },
  motDePasse: { type: String, required: true },
  stages: [{ type: mongoose.Types.ObjectId, ref: "Stage" }]
});

module.exports = mongoose.model("Employeur", employeurSchema);
