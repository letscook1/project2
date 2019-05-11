"use strict";

var express = require("express");
var router = express.Router();
var passport = require("passport");

var db = require("../models");

// update account info
router.put("/", (req, res) => {
    db.users.update({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        full_name: req.body.full_name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code
    }).then(function (data) {
        res.render("account", data);
    });
});

// find all of a user's orders
router.get("/orders", (req, res) => {
    db.users.findAll({
        attributes: ['id', 'name', 'description'],
        order: [['id', 'ASC']]
    }).then(function (data) {
        res.render("account", data);
    });
});

// find a specific order
router.get("/orders/:id", (req, res) => {
    db.users.findAll({

    }).then(function (data) {
        res.render("account", data);
    });
});

// register for an account
router.post("/register", (req, res) => {
    db.users.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        full_name: req.body.full_name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code
    }).then(function (data) {
        redirect("/login");
    });
});

// login with an existing username and password
var userId = 0;
var username = "";
var email = "";
router.post("/login", (req, res) => {
    db.users.findOne({
        attributes: ['id', 'username', 'email'],
        where: {
            username: req.body.username,
            password: req.body.password
        }
    }).then(function (data) {
        if (data) {
            userId = data.id;
            username = data.username;
            email = data.email;
        }
        if (userId) {
            console.log("\nUser is being logged in!\n");
            req.login(userId, function (err) {
                if (err) throw err;
                res.redirect("/");
            });
        } else {
            console.log("\nNo match found for the submitted username and/or password!\n");
            res.redirect("/login");
        }
    });
});

passport.serializeUser(function (userId, done) {
    done(null, userId);
});

passport.deserializeUser(function (userId, done) {
    done(null, userId);
});

module.exports = router;