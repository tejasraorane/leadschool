const models = require('../models')

class CategoryService {

    static async addCategory(category) {
        try {
            return await models.category.create(category)
        } catch(error) {
            throw error
        }
    }

    static async findCategory(condition) {
        try {
            return await models.category.findAll({
                where: condition
            })
        } catch(error) {
            throw error
        }
    }

    static async listCategories() {
        try {
            return await models.category.findAll()
        } catch(error) {
            throw error
        }
    }

    static async findCategoryId(condition) {
        try {
            return await models.category.findOne({
                where: condition
            })
        } catch(error) {
            throw error
        }
    }
}

module.exports = CategoryService
