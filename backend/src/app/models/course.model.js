const course = (sequelize, DataTypes) => {
    const course = sequelize.define('course', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        popularity: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        difficulty_level: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false, 
            defaultValue: Date.now()
        },
        created_by: {
            type: DataTypes.BIGINT,
            references: {
                model: 'user',
                key: 'id'
            },
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true, 
        },
        updated_by: {
            type: DataTypes.BIGINT,
            references: {
                model: 'user',
                key: 'id'
            },
            allowNull: true
        }
    }, {
        'tableName': 'course',
    })

    course.associate = function(models) {
        course.belongsToMany(models.category, {
            through: models.courseCategory,
            as: 'categories',
            foreignKey: 'course_id'
        })
    }

    return course
}

module.exports = course
