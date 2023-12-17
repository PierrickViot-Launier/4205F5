const HttpErreur = require("../models/http-erreur");

const path = require("path");

const multer = require("multer");





const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads/"));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0]);
    }
  });
  
  const singlePdfUpload = multer({
    storage,
    limits: {
      fileSize: 10 * 1024 * 1024 // 10 mb
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "application/pdf") {
        cb(null, true);
      }
      else {
        cb(null, false);
        const error = new HttpErreur("Only pdf files are allowed", 403);
        error.name = "ExtensionError";
        return cb(error);
      }
    }
  }).single("file");
  
  const uploadPdf = async (req, res, next) => {
  
    singlePdfUpload(req, res, function (error) {
      if (error instanceof multer.MulterError) {
        return next(new HttpErreur("Multer error", 500, error.message));
      }
      else if (error) {
        if (error.name == "ExtensionError") {
          return next(new HttpErreur("Wrong file extension : " + error.message, 413));
        }
        else {
          return next(new HttpErreur("Unknown error while processing", 500, error.message));
        }
        return;
      }
  
      res.header("Location", "/uploads/" + req.file.filename);

      // /!\ le client reçoit la réponse (endroit/url du fichier) via le Location header.

      res.status(201);
      res.end();


      //un requête post n'a pas de response body.
    //   res.json({
    //     path: req.file,
    //     body: req.body
    //   });
  
    });
  
  };
  
  
  
  
module.exports = {
    uploadPdf
};





