module.exports = function (sequelize, DataTypes) {
    const Product = sequelize.define('products', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
    Product.associate = function (models) {
        Product.hasMany(models.reviews, {
            foreignKey: {name: 'productId', allowNull: false},
            onDelete: "cascade"
        });
        Product.hasMany(models.order_items, {
            foreignKey: {name: 'productId', allowNull: false},
            onDelete: "cascade"
        });
        Product.hasMany(models.cart_items, {
            foreignKey: {name: 'productId', allowNull: false},
            onDelete: "cascade"
        });
        Product.belongsTo(models.categories, {
            foreignKey: {name: 'categoryId', allowNull: false},
            onDelete: "cascade"
        });
    };
    return Product;
};