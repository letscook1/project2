module.exports = function (sequelize, DataTypes) {
    const Order = sequelize.define('orders', {
        shipping_cost: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        order_total: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
    Order.associate = function (models) {
        Order.belongsTo(models.users, {
            foreignKey: {name: 'userId', allowNull: false},
            onDelete: "cascade"
        });
    };
    return Order;
};