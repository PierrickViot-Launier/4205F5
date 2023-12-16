const express = require("express");

const controleursUpload = require("../controllers/upload-controlleurs");
const router = express.Router();





router.post("/uploadPdf", controleursUpload.uploadPdf);




module.exports = router;


