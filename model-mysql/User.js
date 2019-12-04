module.exports = function (sequelize, DataTypes) {
    const Users = sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            defaultValue: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }, email: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })

    Users.sync();
    return Users;
}