const {DataTypes} = require('sequelize')
const sequelize = require("../db");
const Users = require("./User");

const UserSeatTracker = sequelize.define('user_seat_tracker', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    seatplace: {type: DataTypes.STRING},
    logged_in: {type: DataTypes.BIGINT},
    logged_out: {type: DataTypes.BIGINT},
    user_socket : {type: DataTypes.STRING},
}, {freezeTableName: true, updatedAt: false, createdAt: false})
UserSeatTracker.belongsTo(Users, {foreignKey: 'user_id', targetKey: 'id'})

module.exports = UserSeatTracker

