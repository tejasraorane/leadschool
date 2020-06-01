const Sequelize = require('sequelize'),
    courseService = require('../../services/course.service'),
    categoryService = require('../../services/category.service'),
    logger = require('../../init/logger'),
    { BadRequestError, NotFoundError } = require('../../errors/app.error')

module.exports = {
    async createCourse(request, response, next) {
        try {
            let course = {
                name: request.body.name,
                author: request.body.author,
                popularity: request.body.popularity,
                difficulty_level: request.body.difficulty_level,
                created_by: request.body.created_by
            }

            course = await courseService.create(course)

            let category = await categoryService.findCategory({id: request.body.category_id})

            await course.addCategory(category)

            courseService.findCourseById(course.id).then(course => {
                response.status(201).send(course)
                next()
            }).catch(error => {
                throw error
            })

        } catch(error) {
            logger.error('Failed to create course', error)
            next(new Error('Failed to create course'))
        }
    },

    async listCourses(request, response, next) {
        const order = request.body.order || [['popularity', 'DESC'], ['author', 'ASC'], ['name', 'ASC']]
        let filter = {}
        if(request.body.filter) {
            const query = []
            query.push({name: request.body.filter})
            query.push({author: request.body.filter})
            filter = {
                [Sequelize.Op.or]: query
            }
        }

        let categoryFilter = {}
        if(request.body.category_filter) {
            let category = await categoryService.findCategoryId({name: request.body.category_filter})
            categoryFilter = {
                category_id: category.id
            }
        }

        const page = request.body.page
        if(page == 0) {
            return next(new BadRequestError('Page number cannot be zero'))
        }

        courseService.listCourses(page, filter, categoryFilter, order).then(courses => {
            response.status(200).send(courses)
            next()
        }).catch(error => {
            logger.error('Failed to list courses', error)
            next(new BadRequestError('Failed to list courses'))
        })
    },

    async updateCourse(request, response, next) {
        const courseId = request.params.id
        let course = await courseService.findCourseById(courseId)
        
        let category = await categoryService.findCategory({id: request.body.category_id})

        await course.addCategory(category)

        let updatedValues = {
            author:  request.body.author || course.author,
            popularity: request.body.popularity || course.popularity,
            difficulty_level: request.body.difficulty_level || course.difficulty_level,
            updated_at: Date.now(),
            updated_by: request.body.updated_by
        }

        courseService.update(updatedValues, courseId).then(async rows => {
            if(rows[0] == 0) {
                return next(new Error(`Failed to update course - ${courseId}`))
            }
            let _course = await courseService.findCourseById(courseId)
            response.status(201).send(_course)
            next()
        }).catch(error => {
            logger.error(`Failed to update course - ${courseId}`, error)
            next(new Error(`Failed to update course - ${courseId}`))
        })
    },

    findCourse(request, response, next) {
        courseService.findCourseById(request.params.id).then(_course => {
            if(!_course) {
                return next(new NotFoundError(`Failed to fetch course for id - ${request.params.id}`))
            }
            response.status(201).send(_course)
            next()
        }).catch(error => {
            logger.error(`Failed to fetch course for id - ${request.params.id}`, error)
            next(new NotFoundError(`Failed to fetch course for id - ${request.params.id}`))
        })
    },

    deleteCourse(request, response, next) {
        courseService.delete(request.params.id).then(() => {
            response.status(201).send({
                message: `Course successfully deleted - ${request.params.id}`
            })
        }).catch(error => {
            logger.error(`Failed to delete course for id - ${request.params.id}`, error)
            next(new NotFoundError(`Failed to delete course for id - ${request.params.id}`))
        })
    }
}
