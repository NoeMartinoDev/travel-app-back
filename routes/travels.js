const express = require("express")
const travelsRouter = express.Router()
const axios = require("axios")

let travels = []

travelsRouter.get("/", async (req, res) => {
    try {
        const response = await axios("https://my-app-three-flame.vercel.app/data.json")
        travels = response.data.datos
        res.status(200).json(travels)
    } catch (error) {
        res.status(500).send("Server error")
    }
})

module.exports = {
    travelsRouter
}