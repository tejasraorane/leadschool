const categoryService = require('../../services/category.service'),
    logger = require('../../init/logger'),
    { NotFoundError } = require('../../errors/app.error')

module.exports = {

    createCategory(request, response, next) {
        try {
            let category = {
                name: request.body.name
            }

            categoryService.addCategory(category).then(_category => {
                response.status(201).send(_category)
                next()
            }).catch(error => {
                throw error
            })

        } catch(error) {
            logger.error('Failed to create category', error)
            next(new Error('Failed to create category'))
        }
    },

    listCategories(request, response, next) {
        categoryService.listCategories().then(_categories => {
            response.status(200).send(_categories)
            next()
        }).catch(error => {
            logger.error('Failed to list categories', error)
            next(new NotFoundError('Failed to list categories'))
        })
    }

}
