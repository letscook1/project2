"use strict";

var express = require("express");
var router = express.Router();

var db = require("../models");

router.get("/", (req, res) => {
    console.log(req.user);
    console.log(req.isAuthenticated());
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

// search route
// find matches in either the product name or dexcription
router.get("/search/:criteria", (req, res) => {

});

router.get("*", (req, res) => {
    res.render("error");
});

module.exports = router;

// app.get('/some_path',checkAuthentication,function(req,res){
//     //do something only if user is authenticated
// });
// function checkAuthentication(req,res,next){
//     if(req.isAuthenticated()){
//         //req.isAuthenticated() will return true if user is logged in
//         next();
//     } else{
//         res.redirect("/login");
//     }
// }