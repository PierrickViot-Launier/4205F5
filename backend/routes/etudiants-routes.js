const express = require("express");

const controleursEtudiants = require("../controllers/etudiants-controleurs");
const router = express.Router();

router.post("/inscription", controleursEtudiants.inscription);
router.patch("/postulation", controleursEtudiants.postulationStage);
router.patch("/:etudiantId", controleursEtudiants.assignerStage);
//router.post('/connexion', controleursEtudiants.connexion);
router.get("/", controleursEtudiants.getEtudiants);
router.get("/:etudiantId/stages", controleursEtudiants.getStagesByUserId);
router.get("/:etudiantId", controleursEtudiants.getEtudiantById);
module.exports = router;
