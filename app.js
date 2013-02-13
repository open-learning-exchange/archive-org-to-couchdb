var express = require('express')
var app = express()
var request = require('request')

app.get('/send.html', function(req, res){
  
  // Create a form that will put GET parameters into the URL
  var body = '<form method="GET" action="/send.html">   Source: <input type="text" name="source"><br>      Target:<input type="text" name="target"><br>      Level:<input type="text" name="level"><br>      Subject:<input type="text" name="subject"><br>      <input type="submit" value="send">    </form>';
  
  // Process the parameters if they exist
  if(req.query.source && req.query.target) {
    request({uri: req.query.source + "?output=json", json: true}, function(error, response, body) {
      var document = {
        id: body.metadata.identifier[0],
        properties: {
          type: "resource",
          title: body.metadata.identifier[0]
        }
      }
      console.log(document)
      request({uri: req.query.target + "/" + document.id, method: "PUT", body: JSON.stringify(document.properties)})
      
    })
    body += "<p>Archive.org resource successfully added to your CouchDB.</p>"
  }  

  // Print the body
  res.send(body)

})

app.listen(3000)
console.log('Listening on port 3000')
