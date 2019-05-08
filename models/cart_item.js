module.exports = function (sequelize, DataTypes) {
    var CartItem = sequelize.define("cart_items", {
        num: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    CartItem.associate = function (models) {
        CartItem.belongsTo(models.carts, {
            foreignKey: {name: 'cartId', allowNull: false},
            onDelete: "cascade"
        });
        CartItem.belongsTo(models.products, {
            foreignKey: {name: 'productId', allowNull: false},
            onDelete: "cascade"
        });
    };
    return CartItem;
};