"use strict";
require('dotenv').config()
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const session = require("express-session");
const passport = require("passport");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

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

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "guest" }));
app.set("view engine", "handlebars");

const apiRoutes = require("./controllers/apiRoutes.js");
app.use(apiRoutes);

const htmlRoutes = require("./controllers/htmlRoutes.js");
app.use(htmlRoutes);

db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`));
}).catch(function (error) {
    console.log(error);
});