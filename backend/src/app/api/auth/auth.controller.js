const userService = require('../../services/user.service'),
    logger = require('../../init/logger'),
    { AuthenticationError,  } = require('../../errors/app.error'),
    { encrypt, validate } = require('../../utils/crypto.util'),
    jwt = require('jsonwebtoken'),
    config = require('config')

module.exports = {

    authenticate(request, response, next) {
        const username = request.body.username

        userService.findUser(username).then(_user => {

            if(!validate(_user.password, request.body.password)) {
                return next(new AuthenticationError(`Password is incorrect for ${username}`))
            }

            const payload = {
                username: _user.username,
                id: _user.id
            }

            const token = jwt.sign(payload, config.get('SECRET_KEY'), {
                expiresIn: Number(config.get('JWT_EXPIRY'))
            })

            delete _user.password

            response.status(200).send({
                message: `Login successful for user - ${username}`,
                user: _user,
                token: token
            })
        }).catch(error => {
            logger.error(`Authentication failed for user - ${username}`, error)
            next(new AuthenticationError(`User Authentication Failed For - ${username}`))
        })
    },

    addUser(request, response, next) {
        const username = request.body.username,
            password = request.body.password

        const user = {
            username: username,
            password: encrypt(password)
        }
        userService.addUser(user).then(_user => {
            delete _user.password
            response.status(201).send(_user)
            next()
        }).catch(error => {
            logger.error(`Failed to save user - ${username}`, error)
            next(new Error(`Failed to save user - ${username}`))
        })
    }

}
