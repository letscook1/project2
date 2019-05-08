module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zip_code: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
    User.associate = function (models) {
        User.hasMany(models.orders, {
            onDelete: "cascade"
        });
        User.hasMany(models.reviews, {
            foreignKey: {name: 'userId', allowNull: false},
            onDelete: "cascade"
        });
        User.hasOne(models.carts, {
            foreignKey: {name: 'userId', allowNull: false},
            onDelete: "cascade"
        });
    };
    return User;
};