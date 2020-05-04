module.exports = (sequelize, DataTypes) => {
    const Lecture = sequelize.define('Lecture', {
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
    });

    Lecture.associate = function (models) {
        Lecture.belongsTo(models.Category)
    };

    return Lecture;
}