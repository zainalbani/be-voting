const express = require('express');
const router = express.Router();
const mid = require("../middleware/restrict.js")
const CLogin = require("../controllers/login.js");
const CSearch = require("../controllers/searchUser.js")
const CAllCalon = require("../controllers/getAllCalon.js")
const CWhatsapp = require("../controllers/whatsappController.js")
const CVoting = require("../controllers/votingController.js")

router.post("/login", CLogin.login);
router.get("/searchuser", CSearch.searchUser);
router.get("/getallcalon", CAllCalon.getAllCalon);
router.post("/whatsapp/:nipd", CWhatsapp.sendOtp);
router.put("/voting/:nipd", CVoting.postVoting);

module.exports = router;