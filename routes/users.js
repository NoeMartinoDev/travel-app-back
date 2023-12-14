const express = require("express")
const usersRouter = express.Router()
const { User } = require("../db")

usersRouter.get("/", async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

usersRouter.post("/login", async (req, res) => {
    const { email, password} = req.body;

    if(!email || !password) {
        res.status(400).json({ error: "Missing data" })
    } else {
        const user = await User.findOne({ where: { email } })
        if(!user) {
            res.status(200).json({ error: "User not found" })
        } else {
            user.password === password
            ? res.status(200).json(user)
            : res.status(200).json({ error: "Incorrect data" })
        }
    }
})

usersRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        res.status(400).json({ error: "Missing data" })
    } else {
        const user = await User.findOne({ where: { email } })
        if(user) {
            res.status(200).send("User alredy exits")
        } else {
            await User.create({ name, email, password })
            res.status(200).send("User created successfully")
        }
    }
})

module.exports = {
    usersRouter
}