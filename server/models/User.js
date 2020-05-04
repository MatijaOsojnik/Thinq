const bcrypt = require('bcrypt')

function hashPassword(user, options) {
    SALT_FACTOR = 8

    if (!user.changed('password')) {
        return;
    }

    return bcrypt
        .genSalt(SALT_FACTOR)
        .then(salt => bcrypt.hash(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        display_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        icon_url: {
            type: DataTypes.STRING,
        },
        birth_date: {
            type: DataTypes.DATE
        },

    }, {
        hooks: {
            beforeSave: hashPassword
        }
    })
    User.prototype.comparePassword = function (password) {
        return bcrypt.compare(password, this.password)
    }
    return User;
}