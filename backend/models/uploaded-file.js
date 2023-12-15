const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const uploadedFileSchema = new Schema({

});

module.exports = mongoose.model("UploadedFile", uploadedFileSchema);
