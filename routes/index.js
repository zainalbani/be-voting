const express = require('express');
const router = express.Router();
const mid = require("../middleware/restrict.js")
const CLogin = require("../controllers/login.js");
const CEmail = require("../controllers/emailController.js");
const CSearch = require("../controllers/searchUser.js")
const CAllCalon = require("../controllers/getAllCalon.js")
const CAllHasil = require("../controllers/getAllHasil.js")
const CCalonById = require("../controllers/getCalonById.js")
// const CWhatsapp = require("../controllers/whatsappController.js")
const CVoting = require("../controllers/votingController.js")
const CCreateCalon = require("../controllers/createCalon.js");
const CUpdateCalon = require("../controllers/updateCalon.js");
const CDeleteCalon = require("../controllers/deleteCalon.js");
const CJumlah = require("../controllers/fileJson.js")

const uploadImage = require("../middleware/storageImage.js");


router.post("/login", CLogin.login);
router.post("/register", CEmail);
router.get("/searchuser", CSearch.searchUser);
router.get("/getallcalon", CAllCalon.getAllCalon);
router.get("/getallhasil", CAllHasil.getAllHasil);
// router.post("/whatsapp/:nipd", CWhatsapp.sendOtp);
router.put("/voting/:nipd", CVoting.postVoting);
router.get("/getcalonbyid/:paslon_id", CCalonById.getCalonById);
router.post(
    "/createcalon",
    uploadImage.single("image_url"),
    CCreateCalon.createCalon
  );
  
  router.put(
    "/editcalon/:id",
    uploadImage.single("image_url"),
    CUpdateCalon.updateCalon
  );
  router.put(
    "/updatecalon/:id",
    CUpdateCalon.updateCalonWithoutImage
  );
  
  router.delete("/deletecalon/:id", CDeleteCalon.deleteCalon);
  router.put("/nonaktifcalon/:id", CDeleteCalon.nonaktifCalon);

  router.get('/jumlah', CJumlah.getAllCalon)

module.exports = router;