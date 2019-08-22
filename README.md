# MarketPlace
An e-commerce Marketplace simulating a digital store inventory with a user account system that allows users to place an order for items/services and checkout.

## How users can get started with the project:

To use this project, you'll need to do the following:

* Clone this repository onto your computer or upload it to heroku.

* If you're running it locally on your pc, also perform these steps:

    * run 'npm i' from the terminal (this will install the npm modules: dotenv, bcrypt, connect-session-sequelize, express, express-handlebars, express-session, mysql2, passport, sequelize and validator)
    * create a mysql database using the schema in: **schema.sql** (this will create the database, but it won't have any tables... just yet)
    * run 'server.js' to dynamically the tables necessary
    * populate the newly created database with the data in: **seeds.sql**
    * create a `.env` file with the following contents (since this was included in the `.gitignore` file):

```
PASSWORD="your_database_password_here"
```

This file will only be imported by 'config/index.js' if you're running this app locally because we modified 'config/index.js' in the following way:

```js
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    const password = process.env.PASSWORD; // this new line pulls in the local password from the `.env` file. 
    sequelize = new Sequelize(config.database, config.username, password, config); // config.password was replaced by pwd
}
```

The above `.env` file was utilized to keep our local MySQL passwords from being uploaded to the github repository.

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

## This project was created and is maintained by:

* [Vincent Shury](https://www.linkedin.com/feed/) ( [Github Profile](https://github.com/Vincent440), [Portfolio](https://vincent440.github.io/) ) | [Mike Gullo](https://mike14747.github.io/) | [Michelle Williams](https://github.com/letscook1)
* [Live Website](https://glacial-bayou-58542.herokuapp.com/)
* [master REPO](https://github.com/letscook1/project2)
* Contact us at: letscook1@hotmail.com | vinceshury@gmail.com | mike14747@oh.rr.com for more info about this project.