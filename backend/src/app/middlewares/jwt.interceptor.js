const expressJwt = require('express-jwt'),
    config = require('config'),
    { pathToRegexp } = require('path-to-regexp')

/**
 * Intercepts the request and checks for jwt token and its validity.
 * 
 * For checking the validity I have used the express-jwt package.
 * 
 * We can define any paths which do not require authorization using 
 * the array of unprotected paths. 
 */
function jwtValidator() {
    const secret = config.get('SECRET_KEY')
    const unprotected = [
        pathToRegexp('/api-docs(.*)'),
        '/api/v1/admin/create',
        '/api/v1/admin/authenticate',
        '/api/v1/course/list',
        pathToRegexp('/styles(.*)'),
        pathToRegexp('/runtime-es2015(.*)'),
        pathToRegexp('/polyfills-es2015(.*)'),
        pathToRegexp('/main-es2015(.*)'),
        pathToRegexp('/scripts(.*)')
    ]

    return expressJwt({ secret }).unless({
        path: unprotected
    })
}

module.exports = jwtValidator
