const express = require('express'),
    config = require('config'),
    appRoot = require('app-root-path'),
    expressSwaggerFactory = require('express-swagger-generator')

const authRoute = require('../api/auth/auth.route'),
    courseRoute = require('../api/course/course.route'),
    categoryRoute = require('../api/category/category.route')

/**
 * Imports Routes for application.
 * This makes the application loosely coupled
 * cause we can add/remove any service without
 * affecting the application as and when required.
 */
const router = express.Router()
const options = {
    swaggerDefinition: {
        info: {
            description: 'LeadSchool App Server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: config.get('DOMAIN'),
        basePath: '/api/v1',
        produces: [
            'application/json',
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
            }
        }
    },
    basedir: `${appRoot}/src/app`, //app absolute path
    files: ['./api/**/*.route.js'] //Path to the API handle folder
}

exports.importRoutes = (app) => {
    const expressSwagger = expressSwaggerFactory(app)

    // Init api route
    app.use('/api/v1', router)

    // Import Routes
    router.use('/admin', authRoute)
    router.use('/course', courseRoute)
    router.use('/category', categoryRoute)
    
    expressSwagger(options)
}
