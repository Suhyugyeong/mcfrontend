const express = require('express')
const { Comment } = require('../models')

const router = express.Router()

router.post('/', async(req, res, next) => {
  try{
    //유저가 전달하는 데이터를 db 에 저장.. 
    //우리가 만든 모델 객체의 create 함수.. 우리가 정의하지 않아도 자동으로 만들어진다
    const comment = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment
    })
    console.log(comment)
    res.status(200).json(comment)
  }catch(err){
    console.error(err)
    next(err)
  }
})

router.route('/:id')
  .patch(async (req, res, next) => {
    try {
      const result = await Comment.update({
        comment: req.body.comment,
      }, {
        where: {id: req.params.id}
      })
      res.json(result)
    }catch(err){
      console.error(err)
      next(err)
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Comment.destroy({
        where: {id: req.params.id}
      })
      res.json(result)
    }catch(err){
      console.error(err)
      next(err)
    }
  })

module.exports = router