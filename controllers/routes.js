"use strict";

var express = require("express");
var router = express.Router();

var db = require("../models");

router.get("/", (req, res) => {
    res.send("This is the homepage");
});

router.get("*", (req, res) => {
    res.render("error");
});

module.exports = router;