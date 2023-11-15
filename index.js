const express = require("express")
const server = express()
const cors = require("cors")
const { travelsRouter } = require("./routes/travels")
const { usersRouter } = require("./routes/users")

server.use(express.json())

server.use(cors())

server.use("/travels", travelsRouter)

server.use("/users", usersRouter)

server.listen(3001, () => {
    console.log("Listening on port 3001")
})