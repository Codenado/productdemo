var express = require('express')
var status = require('http-status')

module.exports = fuction(){
  var api = express.Router()

  api.get('/category/id/:id', wagner.invoke(function(Category){
    return function(req, res) {
      Category.findOne({ _id: req.params.id },function(e, category){
        if(e) {
          return res.status(status.INTERNAL_SERVER_ERROR).json({error:error.toString() })
        }
        if(!category) {
          return res.status(status.NOT_FOUND).json({error: "Not Found" }
        }
        res.json({ category: category })
      })
    }
  }))

  api.get('/category/parent/:id', wagner.invoke(function(Category){
    return function(req, res){
      Category
      .find({parent: req.params.id})
      .sort({ _id: 1})
      .exec(function(e, categories){
        if(e){
          return res.status(status.INTERNAL_SERVER_ERROR).json({error:error.toString() })
        }
        res.json({ categories: categories})
      })
    }
  }))
  return api
}
