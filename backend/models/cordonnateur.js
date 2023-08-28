const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const cordonnateurSchema = new Schema({
    courriel: {type: String, required: true, unique:true},
    motDePasse: {type: String, required: true, minLength: 6}
});



module.exports = mongoose.model("Cordonnateur", cordonnateurSchema);