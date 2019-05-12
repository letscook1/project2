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
        res.render("categories", { category, user: req.isAuthenticated() });
    });
});

// find all products in a specific category
router.get("/category/:id", (req, res) => {
    db.categories.findAll({
        attributes: ['id', 'name', 'description'],
        order: [['id', 'ASC']]
    }).then(function (category) {
        db.products.findAll({
            attributes: ['id', 'name', 'description', 'image_url', 'price'],
            where: { categoryId: req.params.id },
            order: [['id', 'ASC']]
        }).then(function (categoryitems) {
            res.render("category_items", { categoryitems, category, user: req.isAuthenticated() });
        });
    });
});

// search for products with the search criteria in the name or description
router.get("/search/:criteria", (req, res) => {
    db.categories.findAll({
        attributes: ['id', 'name', 'description'],
        order: [['id', 'ASC']]
    }).then(function (category) {
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
        }).then(function (categoryitems) {
            res.render("category_items", { categoryitems, category, user: req.isAuthenticated() });
        });
    });
});

// passport's logout function
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

// login page
router.get("/login", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/account")
    }
    else {
        db.categories.findAll({
            attributes: ['id', 'name', 'description'],
            order: [['id', 'ASC']]
        }).then(function (category) {
            res.render("login", { category, user: req.isAuthenticated() });
        });

    }
});

// register page
router.get("/register", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/account");
    }
    else {
        db.categories.findAll({
            attributes: ['id', 'name', 'description'],
            order: [['id', 'ASC']]
        }).then(function (category) {
            res.render("account", { category, user: false });
        });
    }
});

// user account page
router.get("/account", (req, res) => {
    if (req.isAuthenticated()) {
        db.categories.findAll({
            attributes: ['id', 'name', 'description'],
            order: [['id', 'ASC']]
        }).then(function (category) {
            db.users.findOne({
                attributes: ['id', 'username', 'email', 'full_name', 'address', 'city', 'state', 'zip_code'],
                where: {
                    id: 1
                }
            }).then(function (account) {
                res.render("account", { account, category, user: req.isAuthenticated() });
            });
        });
    }
    else {
        res.redirect("/login");
    }
});

// find all of a user's orders
router.get("/account/orders", (req, res) => {
    if (req.isAuthenticated()) {
        db.categories.findAll({
            attributes: ['id', 'name', 'description'],
            order: [['id', 'ASC']]
        }).then(function (category) {
            db.orders.findAll({
                attributes: ['id', 'name', 'description'],
                where: { userId: req.userId },
                order: [['id', 'ASC']]
            }).then(function (data) {
                res.render("account", { data, category, user: req.isAuthenticated() });
            });
        });
    }
    else {
        res.redirect("/login");
    }
});

// find a specific order
router.get("/account/orders/:id", (req, res) => {
    if (req.isAuthenticated()) {
        db.categories.findAll({
            attributes: ['id', 'name', 'description'],
            order: [['id', 'ASC']]
        }).then(function (category) {
            db.orders.findOne({
            attributes: ['id', 'name', 'description'],
            where: { userId: req.userId },
            order: [['id', 'ASC']]
        }).then(function (data) {
            res.render("account", { data, category, user: req.isAuthenticated() });
        });
        });
        
    }
    else {
        res.redirect("/login");
    }
});

router.get("/cart", (req, res) => {
    if (req.isAuthenticated()) {
        db.categories.findAll({
            attributes: ['id', 'name', 'description'],
            order: [['id', 'ASC']]
        }).then(function (category) {
            db.cart_items.findAll({
                attributes: ['id', 'num', 'each_price', 'productId'],
                where: { userId: req.user },
                order: [['id', 'ASC']],
                include: [
                    { model: db.products, attributes: ['name', 'description'] }
                ]
            }).then(function (cart) {
                res.render("checkout", { cart, category, user: req.isAuthenticated() });
            });
        });
    }
    else {
        res.redirect("/login");
    }
});

// catch all for undefined routes that goes to our 404 error page
router.get("*", (req, res) => {
    db.categories.findAll({
        attributes: ['id', 'name', 'description'],
        order: [['id', 'ASC']]
    }).then(function (category) {
        res.render("error", { category, user: req.isAuthenticated() });
    });
});

module.exports = router;