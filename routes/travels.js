const express = require("express")
const travelsRouter = express.Router()
const axios = require("axios")
const { Post } = require("../db")

let travels = []

const normalice = (text) => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

travelsRouter.get("/", async (req, res) => {

    const { name } = req.query

    try {
      if (travels.length === 0) {
        const response = await axios("https://my-app-three-flame.vercel.app/data.json")
        travels = response.data.datos
      }

      if (name) {
        const results = travels.filter((element) => {
          return (
            normalice(element.city) === normalice(name) ||
            normalice(element.location) === normalice(name)
          )
        })
        if (results.length) {
          res.status(200).json(results)
        } else {
          res.status(200).json({ error: "Not found" })
        }
      } else {
        res.status(200).json(travels)
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
})

travelsRouter.post("/", async (req, res) => {
    const { title, UserId, city, location, description, image } = req.body
    const date = new Date().getFullYear()

    try {
      if(!title || !UserId || !city || !location || !description || !image) {
        res.status(400).send("Missing data")
    } else {
        const newPost = await Post.create({ title, UserId, city, location, description, image, date })
        res.status(200).json(newPost)
    }
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
})

travelsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params

    try {
      const postDeleted = await Post.findByPk(id)
      if(postDeleted) {
        await postDeleted.destroy()
        res.status(200).send("Post deleted successfully")
      } else {
        res.status(404).send("Not found")
      }
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

travelsRouter.put("/", (req, res) => {
    const { id, title, user, city, location, description, image } = req.body

    const result = travels.find( item => item.id === Number(id))
    if(result) {
        result.id = id
        result.title = title ? title : result.title
        result.user = user ? user : result.user
        result.city = city ? city : result.city
        result.location = location ? location : result.location
        result.description = description ? description : result.description
        result.image = image ? image : result.image
        //console.log(travels)
        res.status(200).send("Updated")
    } else {
        res.status(404).send("Not found")
    }
})

module.exports = {
    travelsRouter
}