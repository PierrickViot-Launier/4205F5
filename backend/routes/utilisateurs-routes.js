const express = require("express");

const controleursUtilisateurs = require("../controllers/utilisateurs-controlleurs")
const router = express.Router();

router.post('/connexion', controleursUtilisateurs.connexion);

module.exports = router;