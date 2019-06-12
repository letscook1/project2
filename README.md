# MarketPlace
An Ecommerce Marketplace based off of a store inventory and user database that allows a user to place an order for items/services and checkout.

## How users can get started with the project:

To use this project, you'll need to do the following:

* Clone this repository onto your computer or upload it to heroku.

* If you're running it locally on your pc, also perform these steps:

    * run 'npm i' from the terminal (this will install the npm modules: bcrypt, connect-session-sequelize, express, express-handlebars, express-session, mysql2, passport, sequelize and validator)
    * create a mysql database using the schema in: **schema.sql** (this will create the database, but it won't have any tables... just yet)
    * run 'server.js' to dynamically the tables necessary
    * populate the newly created database with the data in: **seeds.sql**
    * create a **config/pwd.js** file with the following contents (since this was excluded from being sent to guthub in the .gitignore file):

```
var pwd = "your_password";

module.exports = pwd;
```

This file will only be imported by 'config/index.js' if you're running this app locally because we modified 'config/index.js' in the following way:

```
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    const pwd = require("../config/pwd.js"); // this line was added
    sequelize = new Sequelize(config.database, config.username, pwd, config); // config.password was replaced by pwd
}
```

The above **config/pwd.js** file was utilized to keep our local MySQL passwords from being uploaded to the github repository.

---

## Our MySQL database layout for this project:

![MySQL Layout](/public/images/project2_database.png)

---

## NPM Packages used in this project
* bcrypt (https://www.npmjs.com/package/bcrypt)
* connect-session-sequelize (https://www.npmjs.com/package/connect-session-sequelize)
* express (https://www.npmjs.com/package/express)
* express-handlebars (https://www.npmjs.com/package/express-handlebars)
* express-session (https://www.npmjs.com/package/express-session)
* mysql2 (https://www.npmjs.com/package/mysql2)
* passport (https://www.npmjs.com/package/passport)
* sequelize (https://www.npmjs.com/package/sequelize)
* validator (https://www.npmjs.com/package/validator)

---

## This project was created and is maintained by:

* [Michelle Williams](https://github.com/letscook1) | [Vincent Shury](https://www.linkedin.com/feed/) [Github](https://github.com/Vincent440) [Portfolio](https://vincent440.github.io/) | [Mike Gullo](https://mike14747.github.io/)
* https://glacial-bayou-58542.herokuapp.com/
* https://github.com/letscook1/project2
* Contact us at: letscook1@hotmail.com | vinceshury@gmail.com | mike14747@oh.rr.com for more info about this project.