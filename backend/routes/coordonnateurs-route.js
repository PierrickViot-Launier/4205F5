const express = require("express");

const controleursCoordonnateurs = require("../controllers/coordonnateur-controleurs");
const router = express.Router();

router.post("/creation", controleursCoordonnateurs.creation);

module.exports = router;
