//1
const { Sequelize } = require("sequelize")

//2
require("dotenv").config()
const { USER, PASSWORD, HOST, PORT, DB_NAME } = process.env

//4
const UserModel = require("./models/User")
const PostModel = require("./models/Post")

//3
const database = new Sequelize(
    `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`,
    { logging: false }
)

//5
UserModel(database)
PostModel(database)

const { User, Post } = database.models

User.hasMany(Post)
Post.belongsTo(User)

module.exports = {
    database,
    ...database.models
}