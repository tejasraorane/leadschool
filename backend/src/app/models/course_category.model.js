const courseCategory = (sequelize, DataTypes) => {
    const courseCategory = sequelize.define('course_category', {
        course_id: {
            type: DataTypes.BIGINT,
        },
        category_id: {
            type: DataTypes.BIGINT,
        }
    }, {
        'tableName': 'course_category',
    })
    return courseCategory
}

module.exports = courseCategory
