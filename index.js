
var mongodb = require('mongodb');

var uri =  'mongodb://localhost:27017/example';
mongodb.MongoClient.connect(uri, function(e, db){
  if(e){
    console.log(e)
  }
  db.collection('example').insert({x: 1}, function(e, r){
    if(e){
      console.log(e)
      process.exit(1)
    }
    db.collection('exjeample').find().toArray(function(e, docs){
      if(e){
        console.log(e)
        process.exit(1)
      }
    console.log(docs)
     process.exit(0)
    })
  })
})
