# eMarketplace
An online marketplace simulating a digital store inventory with a user account system that allows users to place an order for items/services and checkout.
This store allows a user to:
* Create an account
* Log in & Edit an account
* Add items to a cart
* Update and remove Items from the cart
* Submit an order. 
* View placed order.
* View all orders placed from that account.

---

## Getting Started

To use this project, you'll need to do the following:

* Clone this repository onto your computer or upload it to heroku.

* If you're running it locally on your pc, also perform these steps:

    * run `npm i` from the terminal (this will install the npm modules: dotenv, bcrypt, connect-session-sequelize, express, express-handlebars, express-session, mysql2, passport, sequelize and validator)
    * create the mysql database using the `schema.sql` file
    * run 'server.js' to dynamically create the required tables
    * seed the newly created database tables with the `seeds.sql` file
    * create a `.env` file with your MySQL Database password in the following format 
      * (this was included in the `.gitignore` file to prevent the password from being exposed on Github):

```
PASSWORD="your_database_password_here"
```
This file will be imported by `config/index.js` On a local setup.

This works because `config/index.js` was modified in the following way:

```js
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    // assign the local password from the `.env` to a new password variable. 
    const password = process.env.PASSWORD;
    sequelize = new Sequelize(config.database, config.username,/*config.password is now*/ password, config);
}
```

---

## Our MySQL database layout for this project:

![MySQL Layout](/public/images/project2_database.png)

---

## NPM Packages used in this project
* [dotenv](https://www.npmjs.com/package/dotenv)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize)
* [express](https://www.npmjs.com/package/express)
* [express-handlebars](https://www.npmjs.com/package/express-handlebars)
* [express-session](https://www.npmjs.com/package/express-session)
* [mysql2](https://www.npmjs.com/package/mysql2)
* [passport](https://www.npmjs.com/package/passport)
* [sequelize](https://www.npmjs.com/package/sequelize)
* [validator](https://www.npmjs.com/package/validator)

---

## eMarketplace was created by:

* Vincent Shury's [LinkedIn Profile](https://www.linkedin.com/in/vincent-shury/), [Github Profile](https://github.com/Vincent440), [Portfolio](https://vincent440.github.io/) 
* [Mike Gullo's Portfolio](https://mike14747.github.io/) | | [Michelle William's Github](https://github.com/letscook1)
* [Live Website](https://emarketplace.herokuapp.com)

* Contact us at: letscook1@hotmail.com | vinceshury@gmail.com | mike14747@oh.rr.com for more info about this project.