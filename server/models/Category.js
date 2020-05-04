module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
    })

    Category.associate = function (models) {
        Category.hasMany(models.Lecture)
    };

    return Category;
}