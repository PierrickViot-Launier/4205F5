const express = require("express");

const controleursUtilisateurs = require("../controllers/utilisateurs-controlleurs")
const router = express.Router();

router.post('/connexion', controleursUtilisateurs.connexion);
router.get("/getProfileByCourriel", controleursUtilisateurs.getProfileByCourriel);

module.exports = router;