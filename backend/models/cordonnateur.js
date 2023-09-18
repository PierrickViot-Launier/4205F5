const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const cordonnateurSchema = new Schema({
    courriel: {type: String, required: true, unique:true},
    motDePasse: {type: String, required: true, minLength: 6},
    nomInstitution: {type: String, required: true},
    telephone: {type: String, required: true},
    remarque: {type: String, required: false}
});



module.exports = mongoose.model("Cordonnateur", cordonnateurSchema);