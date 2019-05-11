"use strict";

var express = require("express");
var router = express.Router();
const Sequelize = require('sequelize');
const op = Sequelize.Op;

var db = require("../models");

// find all categories and one product from each category
router.get("/", (req, res) => {
    console.log(req.user);
    console.log(req.isAuthenticated());
    db.categories.findAll({
        attributes: ['id', 'name', 'description'],
        group: ['id'],
        order: [['id', 'ASC']],
        include: [
            { model: db.products, attributes: ['id', 'name', 'description', 'image_url', 'price'] }
        ]
    }).then(function (category) {
        res.render("index", { category });
    });
});

// find all products in a specific category
router.get("/category/:id", (req, res) => {
    db.products.findAll({
        attributes: ['id', 'name', 'description', 'image_url', 'price'],
        where: { categoryId: req.params.id },
        order: [['id', 'ASC']]
    }).then(function (data) {
        res.render("category-items", { data });
    });
});

// search for products with the search criteria in the name or description
router.get("/search/:criteria", (req, res) => {
    db.products.findAll({
        attributes: ['id', 'name', 'description', 'image_url', 'price'],
        where: {
            [op.or]: [
                Sequelize.where(
                    Sequelize.fn('lower', Sequelize.col('name')),
                    { [op.like]: '%' + req.params.criteria + '%' }
                ),
                Sequelize.where(
                    Sequelize.fn('lower', Sequelize.col('description')),
                    { [op.like]: '%' + req.params.criteria + '%' }
                )
            ]
        },
        order: [['id', 'ASC']]
    }).then(function (data) {
        res.json(data);
    });
});

// passport's logout function
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

// login page
router.get("/login", (req, res) => {
    res.render("login");
});

// register page
router.get("/register", (req, res) => {
    res.render("account");
});

router.get("/cart", (req, res) => {
    db.cart_items.findAll({
        attributes: ['id', 'num', 'each_price'],
        where: { userId: req.userId.id },
        order: [['id', 'ASC']],
        include: [
            { model: db.products, attributes: ['id', 'name', 'description'] }
        ]
    }).then(function (data) {
        res.render("checkout", { data });
    });
});

// catch all for undefined routes that goes to our 404 error page
router.get("*", (req, res) => {
    res.render("error");
});

module.exports = router;