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
        phone_num: {
            type: DataTypes.STRING
        }

    }, {
        hooks: {
            beforeSave: hashPassword
        }
    })
    User.prototype.comparePassword = function (password) {
        return bcrypt.compare(password, this.password)
    }

    const Role = sequelize.models.Role;
    const Lecture = sequelize.models.Lecture;

    Role.belongsToMany(User, {
        through: 'RoleUsers'
    });
    User.belongsToMany(Role, {
        through: 'RoleUsers'
    });

    Lecture.belongsToMany(User, {
        through: 'LectureUsers'
    })
    User.belongsToMany(Lecture, {
        through: 'LectureUsers'
    })

    return User;
}