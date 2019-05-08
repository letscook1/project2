"use strict";

var express = require("express");
var router = express.Router();

var db = require("../models");

router.get("/", (req, res) => {
    db.categories.findAll({
        attributes: ['id', 'name', 'description'],
        order: [['id', 'ASC']],
        include: [
            { model: db.products, attributes: ['id', 'name', 'description', 'image_url', 'price'] }
        ]
    }).then(function (data) {
        res.render("index", data);
    });
});

router.get("/category/:id", (req, res) => {
    db.products.findAll({
        attributes: ['id', 'name', 'description', 'image_url', 'price'],
        where: {
            categoryId: req.params.id
        },
        order: [['id', 'ASC']]
    }).then(function (data) {
        res.json(data);
        // res.render("categories", data);
    });
});

router.post("/api/cart", (req, res) => {
    db.carts.findOne({
        attributes: ['id'],
        where: {
            userId: username
        },
        order: [['id', 'ASC']],
        include: [
            { model: db.cart_items, attributes: ['id'] }
        ]
    }).then(function (data) {
        res.render("index", data);
    });
});

router.get("*", (req, res) => {
    res.render("error");
});

module.exports = router;