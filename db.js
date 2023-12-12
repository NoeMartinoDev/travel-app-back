const { Sequelize } = require("sequelize")

require("dotenv").config()
const { USER, PASSWORD, HOST, PORT, DB_NAME } = process.env

const UserModel = require("./models/User")
const PostModel = require("./models/Post")

const database = new Sequelize(
    `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`,
    { logging: false }
)

UserModel(database)
PostModel(database)

const { User, Post } = database.models

User.hasMany(Post)
Post.belongsTo(User)

module.exports = {
    database,
    ...database.models
}