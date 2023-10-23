const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const https = require("https");
const fs = require("fs");
require("dotenv").config();
mongoose.set("strictQuery", true);

// const placesRoutes = require("./routes/places-routes");
const utilisateursRoutes = require("./routes/utilisateurs-routes");
const etudiantsRoutes = require("./routes/etudiants-routes");
const stagesRoutes = require("./routes/stages-route");
const employeursRoutes = require("./routes/employeurs-routes");
const coordonnateursRoutes = require("./routes/coordonnateurs-route");
const HttpErreur = require("./models/http-erreur");

const app = express();

app.use(bodyParser.json());

app.use((requete, reponse, next) => {
  reponse.setHeader("Access-Control-Allow-Origin", "*");
  reponse.setHeader("Access-Control-Allow-Headers", "*");
  reponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

// app.use("/api/places", placesRoutes);
app.use("/api/etudiants", etudiantsRoutes);
app.use("/api/stages", stagesRoutes);
app.use("/api/employeurs", employeursRoutes);
app.use("/api/utilisateurs", utilisateursRoutes);
app.use("/api/cordonnateurs", coordonnateursRoutes);
app.use((requete, reponse, next) => {
  return next(new HttpErreur("Route non trouvée", 404));
});

app.use((error, requete, reponse, next) => {
  if (reponse.headerSent) {
    return next(error);
  }
  reponse.status(error.code || 500);
  reponse.json({
    erreur: true,
    message: error.message || "Une erreur inconnue est survenue",
  });
});

const connectionString = `mongodb://${process.env.database_host}:${process.env.database_port}/${process.env.database_name}`;
// const connectionString = "mongodb://database:27017/gestionstage";
console.log("connection string : " + connectionString);
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connexion à la base de données réussie");
    if (process.env.mode == "prod") {
      console.log("starting https server");

      const httpsServer = https.createServer({
        key: fs.readFileSync("./ssl/server.key", "utf8"),
        cert: fs.readFileSync("./ssl/server.cert", "utf8")
      }, app);
      httpsServer.listen(process.env.app_listen_port);

    }
    else {
      console.log("starting http server");
      app.listen(process.env.app_listen_port);

    }
  })
  .catch((erreur) => {
    console.log(erreur);
  });

//app.listen(5000);
