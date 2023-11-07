const express = require("express")
const server = express()
const { travelsRouter } = require("./routes/travels")

server.use(express.json())

server.use("/travels", travelsRouter)

server.listen(3001, () => {
    console.log("Listening on port 3001")
})