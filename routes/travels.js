const express = require("express")
const travelsRouter = express.Router()
const { Post, User } = require("../db")
const { Op, Sequelize } = require("sequelize");

// const normalice = (text) => {
//   return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
// }

travelsRouter.get("/", async (req, res) => {
  const { name } = req.query;

  try {
      let travels;

      if (name) {
          travels = await Post.findAll({
              include: {
                  model: User,
                  attributes: [ "name" ]
              },
              where: {
                  [Op.or]: [
                      Sequelize.literal(`LOWER(city) = LOWER('${name}')`),
                      Sequelize.literal(`LOWER(location) = LOWER('${name}')`)
                  ]
              }
          })

          if (travels.length) {
              res.status(200).json(travels)
          } else {
              res.status(200).json({ error: "Not found" })
          }
      } else {
          travels = await Post.findAll({
              include: {
                  model: User,
                  attributes: [ "name" ]
          }
      })
          res.status(200).json(travels)
      }
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
})

travelsRouter.post("/", async (req, res) => {
    const { title, UserId, city, location, description, image } = req.body;
    const date = new Date().getFullYear()

    try {
      if(!title || !UserId || !city || !location || !description || !image) {
        res.status(400).send("Missing data")
    } else {
        await Post.create({ title, UserId, city, location, description, image, date })
        res.status(200).send("Post created successfully")
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

travelsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const postToDelete = await Post.findByPk(id)
      if(postToDelete) {
        await postToDelete.destroy()
        res.status(200).send("Post deleted successfully")
      } else {
        res.status(404).send("Not found")
      }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

travelsRouter.put("/", async (req, res) => {
    const { id, title, city, location, description, image } = req.body;

    try {
      const postToUpdate = await Post.findByPk(id)
      if(postToUpdate) {
        await postToUpdate.update({
          title: title ? title : postToUpdate.title,
          city: city ? city : postToUpdate.city,
          location: location ? location : postToUpdate.location,
          description: description ? description : postToUpdate.description,
          image: image ? image : postToUpdate.image
        })
        res.status(200).send("Post updated successfully")
      } else {
        res.status(404).send("Not found")
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
})

module.exports = {
    travelsRouter
}