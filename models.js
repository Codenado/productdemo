var mongoose = require('mongoose')
var _ = require('underscore')

module.exports = function(wagner) {
  mongoose.conect('mongodb://localhost:207017/test')

  var Category = mongoose.model('Category' require('./category'), 'categories')
  var Product = mongoose.model('Product', require('./product'), 'products')

  var models = {
    Category: Category,
    Product: Product
  }

  _.each(models, function(value, key){
    wagner.factory(key, function(){
      return value
    })
  })

}
