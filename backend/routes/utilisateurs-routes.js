const express = require("express");

const controleursUtilisateurs = require("../controllers/utilisateurs-controlleurs")
const router = express.Router();

router.post('/connexion', controleursUtilisateurs.connexion);
router.get("/getProfileByCourriel/:courriel", controleursUtilisateurs.getProfileByCourriel);
router.get("/getProfileByUserID/:userID", controleursUtilisateurs.getProfileByUserID);
router.post("/setProfileByUserID/:userID", controleursUtilisateurs.setProfileByUserID);
// router.post("/uploadAttachementsForUserByUserID/:userID", controleursUtilisateurs.uploadAttachementsForUserByUserID);




module.exports = router;
