var express = require('express')
var app = express()
var request = require('request')
var archiveOrgResource = {}
var newCouchDoc = {}
var processCtx = {}
var $ = require('jQuery')

app.get('/send.html', function(req, res){
  
  // Create a form that will put GET parameters into the URL
  var body = '<form method="GET" action="/send.html">   Source: <input type="text" name="source" size=70><br>      Target:<input type="text" name="target" size=70><br>      Level:<input type="text" name="level"><br>      Subject:<input type="text" name="subject"><br>      <input type="submit" value="send">    </form>';
  
  // Process the parameters if they exist
  if(req.query.source && req.query.target) {
    // Save the parameters for a deeper context
    processCtx = req.query

    //
    // GET the archive.org resource
    //
    request({uri: processCtx.source + "?output=json", json: true}, function(error, response, body) {
      // @todo Find the PDF
      archiveOrgResource = body
      var filename
      $.each(archiveOrgResource.files, function(index, element) {
        if (element.format == "Text PDF") {
          filename = index
        }
      })
      newCouchDoc = {
        id: archiveOrgResource.metadata.identifier[0],
        type: "resource",
        title: archiveOrgResource.metadata.identifier[0],
        level: parseInt(req.query.level),
        grade: parseInt(req.query.level),
        subject: processCtx.subject,
        openWith: "pdf-js-viewer",
        filename: filename
      }

      //
      // Save the resource to the target CouchDB
      //
      request({uri: processCtx.target + "/" + newCouchDoc.id, method: "PUT", body: JSON.stringify(newCouchDoc)}, function(error, response, body) {

        //
        // GET the archive.org resource file stream and pipe it to CouchDB
        //
        var newCouchDocInfo = JSON.parse(response.body)
        var sourceURI = 'http://archive.org/download/' + newCouchDocInfo.id + newCouchDoc.filename
        var targetURI = processCtx.target + "/" + newCouchDocInfo.id + newCouchDoc.filename + "?rev=" + newCouchDocInfo.rev 
        console.log(targetURI)
        console.log(sourceURI)
        request.get(sourceURI).pipe(request.put(targetURI))

      })
      
    })

    // @todo This is a lie. We're not really checking :P
    body += "<p>Archive.org resource successfully added to your CouchDB.</p>"

  }  

  // Print the body
  res.send(body)

})

app.listen(3000)
console.log('Listening on port 3000')
