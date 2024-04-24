const express = require('express');
const router = express.Router();
const CLogin = require("../controllers/login.js");
const CSearch = require("../controllers/searchUser.js")

router.post("/login", CLogin.login);
router.get("/searchuser", CSearch.searchUser);

module.exports = router;