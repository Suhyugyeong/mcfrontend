const express = require('express')
const Sequelize = require('sequelize')

const config = require('../config/config')['development']

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const router = express.Router()

router.route('/')
  .get(async (req, res, next) => {
    try {
      const query = 'SELECT * FROM users'
      //결과는 json
      const result = await sequelize.query(query, {type: Sequelize.QueryTypes.SELECT})
      console.dir(result)
      res.json(result)
    }catch(err){
      console.error(err)
      next(err)
    }
  })

module.exports = router