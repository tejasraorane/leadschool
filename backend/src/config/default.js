const { parseBooleanString, normalizePort } = require('./utils')

const config = {
    DOMAIN: process.env.DOMAIN || 'localhost:8080',
    PORT: normalizePort(process.env.PORT || '8080'),
    SECRET_KEY: process.env.SECRET_KEY || 'pPIK9H5yvFSoJyOzY',
    JWT_EXPIRY: process.env.JWT_EXPIRY || 3600,
    CRYPTO_KEY: process.env.CRYPTO_KEY || 'RmP97UjxH5AgZMxz',
    DATABASE: {
        NAME: process.env.DATABASE || 'postgres',
        USER: process.env.DATABASE_USER || 'postgres',
        PASSWORD: process.env.DATABASE_PASSWORD || 'root',
        HOST: process.env.DATABASE_HOST || '127.0.0.1',
        PORT: process.env.DATABASE_PORT || '5432'
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
