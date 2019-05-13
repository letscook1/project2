"use strict";

var express = require("express");
var cookieParser = require('cookie-parser')
var app = express();
app.use(cookieParser())

var PORT = process.env.PORT || 3000;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var session = require("express-session");
var passport = require("passport");
var SequelizeStore = require('connect-session-sequelize')(session.Store);

app.use(session({
    secret: 'asdwelhjt',
    store: new SequelizeStore({
        db: db.sequelize
      }),
      resave: false,
      // proxy: true // if you do SSL outside of node.
    saveUninitialized: false
    // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var apiRoutes = require("./controllers/apiRoutes.js");
app.use(apiRoutes);

var htmlRoutes = require("./controllers/htmlRoutes.js");
app.use(htmlRoutes);

db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`));
}).catch(function (error) {
    console.log(error);
});