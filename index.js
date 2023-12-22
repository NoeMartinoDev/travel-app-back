const express = require("express")
const server = express()
const cors = require("cors")
const { database } = require("./db")
const { travelsRouter } = require("./routes/travels")
const { usersRouter } = require("./routes/users")

server.use(express.json())

server.use(cors())

const corsOptions = {
    origin: "http://localhost:3000",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}

travelsRouter.use(cors(corsOptions))

usersRouter.use(cors(corsOptions))

server.use("/travels", travelsRouter)

server.use("/users", usersRouter)

database.sync({ force: false }).then(() => {
    console.log("DB connected")
    server.listen(3001, () => {
        console.log("Listening on port 3001")
    })
})

