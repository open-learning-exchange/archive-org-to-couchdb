This is an example API/App for taking a URL of any resource on Archive.org that has a PDF attachment and moving it to a CouchDB.  You can use the form at send.html or just use the HTTP API of /send.html?source={url of your the resource on archive.org}&target={the url of the CouchDB database you want that resource in}

Above and beyond just moving the file, some meta data is captured and structured so the resulting CouchDB Document will show up in the School BeLL Library App if you have it installed on that same database.
