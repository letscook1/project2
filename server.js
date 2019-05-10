"use strict";

var express = require("express");
var app = express();

var PORT = process.env.PORT || 3000;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// var Sequelize = require('sequelize');
var session = require("express-session");
var passport = require("passport");
// var SequelizeStore = require('connect-session-sequelize')(session.Store);
// new SequelizeStore({
//     checkExpirationInterval: 15 * 60 * 1000,
//     expiration: 24 * 60 * 60 * 1000
// });

app.use(session({
    secret: 'asdwelhjt',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var cartRoutes = require("./controllers/cartRoutes.js");
app.use('/api/cart', cartRoutes);

var accountRoutes = require("./controllers/accountRoutes.js");
app.use('/api/account', accountRoutes);

var htmlRoutes = require("./controllers/htmlRoutes.js");
app.use('/', htmlRoutes);

db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`));
}).catch(function (error) {
    console.log(error);
});