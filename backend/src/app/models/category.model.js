const category = (sequelize, DataTypes) => {
    const category = sequelize.define('category', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        'tableName': 'category',
    })

    category.associate = function(models) {
        category.belongsToMany(models.course, {
            through: models.courseCategory,
            as: 'courses',
            foreignKey: 'category_id'
        })
    }

    return category
}

module.exports = category
