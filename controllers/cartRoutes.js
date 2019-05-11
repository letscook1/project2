"use strict";

var express = require("express");
var router = express.Router();

var db = require("../models");

// delete an item from the cart
router.delete("/", (req, res) => {
    db.cart_items.destroy({
        where: { id: req.body.id }
    }).then(function (data) {
        res.redirect("/");
    });
});

// update the quantity of an item in the cart
router.put("/", (req, res) => {
    db.cart_items.update({
        num: req.body.num
    }, { where: { id: req.body.id }
    }).then(function (data) {
        res.redirect("/");
    });
});

// add an item to the cart
router.post("/", (req, res) => {
    db.cart_items.create({
        num: req.body.num,
        each_price: req.body.each_price,
        userId: req.body.userId,
        productId: req.body.productId
    }, {
        where: { id: req.body.id }
    }).then(function (data) {
        res.redirect("/");
    });
});

// route for processing a submitted order
// set variables for submitting an order
var orderId = 0;
var userId = 0;
// first find the cart that has been submitted
router.post("/submitted", (req, res, next) => {
    userId = req.body.id;
    db.cart_items.findAll({
        attributes: ['id', 'num', 'each_price', 'productId'],
        where: { userId: req.body.id }
    }).then(function (data) {
        // then add the submitted cart to the orders table, then add each of the items from cart_items to the order_items table with the correct orderID
        db.orders.create({
            shipping_cost: req.body.shipping_cost,
            order_total: req.body.order_total,
            userId: userId
        }).then(function (result) {
            orderId = result.id;
            data.forEach(function (element) {
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
router.post("/submitted", (req, res) => {
    db.cart_items.destroy({
        where: { userId: userId }
    }).then(function () {
        res.render("checkout");
    });
});

module.exports = router;