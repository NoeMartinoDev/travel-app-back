const express = require("express")
const usersRouter = express.Router()

let usersDB = [
    {
        id: 1,
        name: "Noe",
        email: "noe@mail.com",
        password: "12345678"
    },
    {
        id: 2,
        name: "Romina",
        email: "romina@mail.com",
        password: "12345678"
    },
    {
        id: 3,
        name: "Juan Ignacio",
        email: "nacho@mail.com",
        password: "12345678"
    }
]

usersRouter.post("/login", (req, res) => {
    const { email, password} = req.body

    if(!email || !password) {
        res.status(400).json({ error: "Missing data"})
    } else {
        const user = usersDB.find( user => user.email === email)
        if(!user) {
            res.status(404).json({ error: "User not found"})
        } else {
            user.password === password
            ? res.status(200).json(user)
            : res.status(200).json({ error: "Incorrect data"})
        }
    }
})

let id = 4
usersRouter.post("/register" , (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400).json({ error: "Missing data"})
    } else {
        const newUser = {...req.body, id: id++}
        usersDB.push(newUser)
        console.log(usersDB)
        res.status(200).json(newUser)
    }
})

module.exports = {
    usersRouter
}