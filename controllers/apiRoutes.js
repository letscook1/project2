"use strict";

var express = require("express");
var router = express.Router();
var passport = require("passport");

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
router.post("/api/cart/", (req, res) => {
    db.cart_items.create({
        num: req.body.num,
        each_price: req.body.each_price,
        userId: req.body.userId,
        productId: req.body.productId
    }, {
            where: { id: req.body.id }
        }).then(function (data) {
            res.redirect("/cart");
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
// next, delete the cart and related cart_items of the cartId that was submitted
router.post("/api/cart/submitted", (req, res) => {
    db.cart_items.destroy({
        where: { userId: userId }
    }).then(function () {
        res.render("submitted", { orderId: orderId, user: req.isAuthenticated() });
    });
});

// update account info
router.put("/api/account", (req, res) => {
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
        res.redirect("/account");
    });
});

// register for an account
router.post("/api/account/register", (req, res) => {
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
        res.send("success").end();
    });
});

// login with an existing username and password
var userId = 0;
router.post("/api/account/login", (req, res) => {
    db.users.findOne({
        attributes: ['id', 'username', 'password'],
        where: {
            username: req.body.username
        }
    }).then(function (data) {
        // bcrypt.compare(password, data.password, (err, isMatch) => {
        //     if(err) throw err;
        //     if (isMatch) {
        //         return done(null, userId);
        //     } else {
        //         return done(null, false, { message: "Password incorrect" });
        //     }
        // });

        // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
        //     // res == true
        // });
        // bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
        //     // res == false
        // });

        if (data) {
            userId = data.id;
            req.login(userId, function (err) {
                if (err) throw err;
                console.log("\nUser is being logged in!\n");
                res.send("success");
                res.end();
            });
        } else {
            console.log("\nNo match found for the submitted username and/or password!\n");
            res.send("failed");
            res.end;
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