const models = require('../models')

class CourseService {

    static async create(course) {
        try {
            return await models.course.create(course)
        } catch(error) {
            throw error
        }
    }

    static async findCourse(condition) {
        try {
            return await models.course.findOne({
                where: condition,
                include: [{
                    model: models.category,
                    as: 'categories',
                    attributes: ['id', 'name']
                }]
            })
        } catch(error) {
            throw error
        }
    }

    static async findCourseById(id) {
        try {
            return await models.course.findByPk(id, {
                include: [{
                    model: models.category,
                    as: 'categories',
                    attributes: ['id', 'name']
                }]
            })
        } catch(error) {
            throw error
        }
    }

    static async listCourses(page, filter = {}, categoryFilter = {}, order = []) {
        try {
            const limit = 10
            const offset = (page - 1) * limit
            return await models.course.findAll({
                where: filter,
                limit: limit,
                offset: offset,
                order: order,
                include: [{
                    model: models.category,
                    as: 'categories',
                    attributes: ['id', 'name'],
                    required: true,
                    through: { where: categoryFilter }
                }]
            })
        } catch(error) {
            throw error
        }
    }

    static async update(course, id) {
        try {
            return await models.course.update(course, {
                where: { id: id },
            })
        } catch(error) {
            throw error
        }
    }

    static async delete(id) {
        try {
            return await models.course.destroy({
                where: { id: id },
            })
        } catch(error) {
            throw error
        }
    }

}

module.exports = CourseService
