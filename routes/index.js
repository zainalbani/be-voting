const express = require('express');
const router = express.Router();
const CLogin = require("../controllers/login.js");
const CSearch = require("../controllers/searchUser.js")
const CAllCalon = require("../controllers/getAllCalon.js")

router.post("/login", CLogin.login);
router.get("/searchuser", CSearch.searchUser);
router.get("/getallcalon", CAllCalon.getAllCalon);

module.exports = router;