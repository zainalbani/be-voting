const express = require('express');
const app = express();
const {sequelize} = require("./models");
const router = require('./routes');
const bodyParser = require('body-parser');
const port = 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(router);
app.use("/public", express.static("public"));
app.use(bodyParser.json());
app.listen(port, async function() {
    try{
        return console.log(`running on http://localhost:${port}`);
    } catch (error) {
        console.error("Error",error);
    }
    
});