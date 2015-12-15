var express = require('express')
var status = require('http-status')
var bodyparser = require('body-parser')
var _ = require('underscore')

module.exports = fuction(wagner){
  var api = express.Router()

  api.use(bodyparser.json())

  api.get('/product/text/query', wagner.invoke(function(Product){
    return function(req, res){
      Product.find(
        { $text : { $search : req.params.query } },
        { score : { $ meta: 'textScore'  } }).sort({ score: { $meta : 'textScore'}}).limit(10).exec(handleMany).bind(null, 'products', res))
    }
  }))
  return api
}

  api.get('/product/id:/id', wagner.invoke(function(Product){
    return function(req, res){
      Product.findOne({_id: req.params.id },
        handleOne.bind(null, 'product', res))
    }
  }))

  api.get('/product/category/:id', wagner.invoke(function(Product){
    return function(req, res){
      var sort = { name: 1 }
      if (req.query.price === "1"){
        sort = { 'internal.approximatePriceUSD': 1 }
      } else if (req.query.price === "-1"){
        sort = { 'internal.approximatePriceUSD': -1 }
      }
      Product.find({ 'category.ancestors': req.params.id }).sort(sort).exec(handleMany.bind(null, 'products', res))
    }
  }))

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

function handleOne(property, res, e, result){
  if(e){
    return res.status(status.INTERNAL_SERVER_ERROR).json({error:error.toString() })
  }
  if (!result) {
    return res.status(status.NOT_FOUND).json({error: "Not Found" }
  }

  var json = {}
  json[property] = result
  res.json(json)
}
