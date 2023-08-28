const express = require("express");

const controleursEmployeurs = require("../controllers/employeurs-controleurs");
const router = express.Router();

router.post("/inscription", controleursEmployeurs.inscription);
router.get("/:userId/stages", controleursEmployeurs.getStagesByUserId);
//router.post('/connexion', controleursEmployeurs.connexion);
module.exports = router;