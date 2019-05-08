"use strict";

var express = require("express");
var router = express.Router();

var db = require("../models");

router.get("/", (req, res) => {
    res.render("index");
});

router.get("*", (req, res) => {
    res.render("error");
});

module.exports = router;