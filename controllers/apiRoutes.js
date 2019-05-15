"use strict";

var express = require("express");
var router = express.Router();
var passport = require("passport");

const bcrypt = require('bcrypt');
const saltRounds = 10;

var db = require("../models");

// delete an item from the cart
router.delete("/api/cart/", (req, res) => {
    db.cart_items.destroy({
        where: { id: req.body.id }
    }).then(function (data) {
        res.redirect("/cart");
    });
    res.redirect("/cart");
});

// update the quantity of an item in the cart
router.put("/api/cart/", (req, res) => {
    db.cart_items.update({
        num: req.body.num
    }, {
            where: { id: req.body.id }
        }).then(function (data) {
            res.redirect("/cart");
        });
});

// add an item to the cart
router.post("/api/cart", (req, res) => {
    db.cart_items.findOrCreate({
        where: { userId: req.user, productId: req.body.productId },
        defaults: {
            num: parseInt(req.body.num),
            each_price: req.body.each_price,
            userId: req.user,
            productId: req.body.productId
        }
    }).then(([cartItem, wasCreated]) => {
        if (wasCreated) {
            res.send("created").end();
        } else {
            // update the quantity since the item already existed
            db.cart_items.update({
                num: parseInt(cartItem.num) + parseInt(req.body.num)
            }, {
                    where: { id: cartItem.id }
                }).then(function (data) {
                    if (data) {
                        res.send("updated").end();
                    } else {
                        res.send("error").end();
                    }
                });
        }
    });
});

// route for processing a submitted order
// set variables for submitting an order
var orderId = 0;
var userId = 0;
// first find the cart that has been submitted
router.post("/api/cart/submitted", (req, res, next) => {
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
// next, delete the cart_items of the cartId that was submitted
router.post("/api/cart/submitted", (req, res) => {
    db.cart_items.destroy({
        where: { userId: userId }
    }).then(function () {
        res.send("submitted", { orderId: orderId, user: req.isAuthenticated() }).end();
    });
});

// update account info
router.put("/api/account", (req, res) => {
    db.users.update({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }).then(function (data) {
        res.redirect("/account");
    });
});

// register for an account
router.post("/api/account/register", (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        // db.users.create({
        //     username: req.body.username,
        //     password: hash,
        //     email: req.body.email
        // }).then(function (result) {
        //     if (result.id) {
        //         res.send("success").end();
        //     } else {
        //         res.send("failed").end();
        //     }
        // });
        db.users.findOrCreate({
            where: { username: req.body.username },
            defaults: {
                username: req.body.username,
                password: hash,
                email: req.body.email
            }
        }).then(([userArray, wasCreated]) => {
            if (wasCreated) {
                res.send("success").end();
            } else {
                res.send("taken").end();
            }
        });
    });
});

// login with an existing username and password
var userId = 0;
var pwd = "";
router.post("/api/account/login", (req, res) => {
    pwd = req.body.password;
    db.users.findOne({
        attributes: ['id', 'username', 'password'],
        where: {
            username: req.body.username
        }
    }).then(function (data) {
        if (data) {
            bcrypt.compare(pwd, data.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    userId = data.id;
                    req.login(userId, function (err) {
                        if (err) throw err;
                        console.log("\nUser is being logged in!\n");
                        res.send("success").end();
                    });
                } else {
                    console.log("\nPassword not valid!\n");
                    res.send("Password not valid!").end();
                }
            });
        } else {
            console.log("\nNo match found for the submitted username!\n");
            res.send("Username not found!").end();
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