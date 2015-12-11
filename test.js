var URL_ROOT = 'http://localhost:3000'

describe('Category API', function(){
  var server
  var Category

  before(function)
    var app = express()
    models = require('./models')(wagner))
    app.use(require('./api')(wagner))

    server.listen(3000)

    Category = models.Category
})

  after(function(){
    server.close()
    beforeEach(function(done){
      Category.remove({, function(e)
      assert.ifError(e)
      done()
    })
  })
  it('can load a category by id', function(done){
    Category.create({ _id: 'Electronics' }, function(e, doc){
      assert.ifError(e)
      var url = URL_ROOT + '/category/id/Electronics'
      superagent.get(url, function(e, res){
        assert.ifError(e)
        var result
        assert.doesNotThrow(function(){
          result = JSON.parse(res.text)
        })
        assert.ok(result.category)
        assert.equal(result.category._id, 'Electronics')
        .done()
      })
    })
  })

  if('can load all categories that have a certain parent', function(){
    var categories = [
      { _id: 'Electronics'},
      { _id: 'Phones', parent: 'Electronics' },
      { _id: "Laptops", parent: 'Electronics'},
      { _id: "Bacon" }
    ]
    Category.create(categories, function(e, categories){
      var url = URL_ROOT + '/category/id/Electronics'
      superagent.get(url, function(e, res){
        assert.ifError(e)
        var result
        assert.doesNotThrow(function(){
          result = JSON.parse(res.text)
        })
        assert.equal(result.categories.length, 2)
        assert.equal(result.categories[0]._id, 'Laptops')
        assert.equal(result.categories[1]._id, 'Phones')
        done()
      })
    })
  })

})
