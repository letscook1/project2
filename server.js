"use strict";

var express = require("express");
var app = express();

var PORT = process.env.PORT || 3000;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public/css"));
app.use(express.static("public/images"));
app.use(express.static("public/js"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/routes.js");
app.use(routes);

db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, () => {
        console.log("App listening on PORT " + PORT);
    });
}).catch(function (error) {
    console.log(error);
});