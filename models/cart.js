module.exports = function (sequelize, DataTypes) {
    const Cart = sequelize.define('carts', {
        
    }, {
        freezeTableName: true,
        timestamps: false
    });
    Cart.associate = function (models) {
        Cart.belongsTo(models.users, {
            foreignKey: {name: 'userId', allowNull: false},
            onDelete: "cascade"
        });
        Cart.hasMany(models.cart_items, {
            foreignKey: {name: 'cartId', allowNull: false},
            onDelete: "cascade"
        });
    };
    return Cart;
};