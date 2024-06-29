const express = require('express');
const router = express.Router();
const mid = require("../middleware/restrict.js")
const CLogin = require("../controllers/login.js");
const CEmail = require("../controllers/emailController.js");
const CSearch = require("../controllers/searchUser.js")
const CAllCalon = require("../controllers/getAllCalon.js")
const CCalonById = require("../controllers/getCalonById.js")
// const CWhatsapp = require("../controllers/whatsappController.js")
const CVoting = require("../controllers/votingController.js")
const CCreateCalon = require("../controllers/createCalon.js");
const CUpdateCalon = require("../controllers/updateCalon.js");
const CDeleteCalon = require("../controllers/deleteCalon.js");

const uploadImage = require("../middleware/storageImage.js");


router.post("/login", CLogin.login);
router.post("/email", CEmail);
router.get("/searchuser", CSearch.searchUser);
router.get("/getallcalon", CAllCalon.getAllCalon);
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
  
  router.delete("/deletecalon/:id", CDeleteCalon.deleteCalon);

module.exports = router;