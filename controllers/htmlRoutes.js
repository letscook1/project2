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
    }).then(function (data) {
        res.render("index", data);
    });
});

// find all products in a specific category
router.get("/category/:id", (req, res) => {
    db.products.findAll({
        attributes: ['id', 'name', 'description', 'image_url', 'price'],
        where: { categoryId: req.params.id },
        order: [['id', 'ASC']]
    }).then(function (data) {
        res.render("categories", data);
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

// catch all for undefined routes that goes to our 404 error page
router.get("*", (req, res) => {
    res.render("error");
});

module.exports = router;