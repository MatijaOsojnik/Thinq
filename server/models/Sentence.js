module.exports = (sequelize, DataTypes) => {
    const Sentence = sequelize.define('Sentence', {
        sentence: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        is_sentence: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        pronounciation_url: {
            type: DataTypes.STRING
        },
        image_url: {
            type: DataTypes.STRING
        }
    }, {})

    const Lecture = sequelize.models.Lecture;

    Sentence.belongsToMany(Lecture, {
        through: 'LectureSentences'
    });
    Lecture.belongsToMany(Sentence, {
        through: 'LectureSentences'
    });

    return Sentence;
}