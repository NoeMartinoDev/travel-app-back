const { Sequelize } = require("sequelize")
const { pg } = require("pg")

require("dotenv").config()
const { USER, PASSWORD, HOSTANDPORT, DB_NAME } = process.env

const UserModel = require("./models/User")
const PostModel = require("./models/Post")

const database = new Sequelize(
    `postgres://${USER}:${PASSWORD}@${HOSTANDPORT}/${DB_NAME}`,
    { logging: false,
    dialectModule: pg }
)

//HOSTANDPORT=localhost:5432

UserModel(database)
PostModel(database)

const { User, Post } = database.models

User.hasMany(Post)
Post.belongsTo(User)

module.exports = {
    database,
    ...database.models
}