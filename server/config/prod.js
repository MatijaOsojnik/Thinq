require('dotenv').config()

module.exports = {
    port: process.env.PORT || 8082,
    salt: process.env.HASH_SALT || 8,
    db: {
        database_url: process.env.DB_URI,
        options: {
            dialect: process.env.DIALECT || 'postgres'
        }
    },
    authentication: {
        sessionSecret: process.env.SESSION_SECRET,
        jwtSecret: process.env.JWT_SECRET
    }
}