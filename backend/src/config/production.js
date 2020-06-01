const { parseBooleanString, normalizePort } = require('./utils')

const config = {
    DOMAIN: process.env.DOMAIN,
    PORT: normalizePort(process.env.PORT || '8080'),
    SECRET_KEY: process.env.SECRET_KEY,
    JWT_EXPIRY: process.env.JWT_EXPIRY || 3600,
    CRYPTO_KEY: process.env.CRYPTO_KEY,
    DATABASE: {
        NAME: process.env.DATABASE,
        USER: process.env.DATABASE_USER,
        PASSWORD: process.env.DATABASE_PASSWORD,
        HOST: process.env.DATABASE_HOST,
        PORT: process.env.DATABASE_PORT
    },
    LOGGER: {
        CONSOLE: {
            ACTIVE: parseBooleanString(process.env.LOGGER_CONSOLE_ACTIVE, true)
        },
        FILE: {
            ACTIVE: parseBooleanString(process.env.LOGGER_FILE_ACTIVE, true),
            APP: process.env.LOGGER_FILE_APP || '/logs/app.log',
            EXCEPTION: process.env.LOGGER_FILE_EXCEPTION || '/logs/exceptions.log'
        }
    },
}

module.exports = config
