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
            id: req.id
        },
        order: [['id', 'ASC']],
        include: [
            { model: db.cart_items, attributes: ['id', 'num', 'each_price'] }
        ]
    }).then(function (data) {
        res.render("index", data);
    });
});

// set cart variables
var itemsObj = {};
var orderId = 0;
var cartId = 0;

// first find the cart that has been submitted
router.post("/api/submitted", (req, res, next) => {
    cartId = req.body.id;
    db.carts.findOne({
        attributes: ['id', 'userId'],
        where: {
            id: req.body.id
        },
        include: [
            { model: db.cart_items, attributes: ['id', 'num', 'each_price', 'cartId', 'productId'] }
        ]
    }).then(function (data) {
        itemsObj = data.toJSON();
        // then add the submitted cart to the orders table, then add each of the items from cart_items to the order_items table with the correct orderID
        db.orders.create({
            shipping_cost: req.body.shipping_cost,
            order_total: req.body.order_total,
            userId: itemsObj.userId
        }).then(function (result) {
            orderId = result.id;
            itemsObj.cart_items.forEach(function (element) {
                db.order_items.create({
                    num: element.num,
                    each_price: element.each_price,
                    orderId: orderId,
                    productId: element.productId
                });
            });
        });
    });
    next();
});

// next, delete the cart and related cart_items of the cartId that was submitted
router.post("/api/submitted", (req, res) => {
    db.carts.destroy({
        where: { id: cartId }
    }).then(function () {
        db.cart_items.destroy({
            where: { cartId: cartId }
        }).then(function () {
            res.render("checkout");
        });
    });
});

router.post("/api/login", (req, res) => {
    db.users.findOne({
        attributes: ['id', 'username'],
        where: {
            username: req.body.username,
            password: req.body.password
        }
    }).then(function (data) {
        var newData = {}
        if (data) {
            newData = data.toJSON();
            console.log(newData);
        } else {
            console.log("\nNo match found for the submitted username and/or password!\n");
        }
        res.json(newData);
    });
});

// search route
// find matches in either the product name or dexcription
router.get("/search/:criteria", (req, res) => {

});

router.get("*", (req, res) => {
    res.render("error");
});

module.exports = router;