# About
This is an example API/App for taking a URL of any resource on Archive.org that has a PDF attachment and moving it to a CouchDB.  You can use the form at send.html or just use the HTTP API of /send.html?source={url of your the resource on archive.org}&target={the url of the CouchDB database you want that resource in}

Above and beyond just moving the file, some meta data is captured and structured so the resulting CouchDB Document will show up in the School BeLL Library App if you have it installed on that same database.

# Full list of HTTP Parameters
source
target
level
subject

# Examples
Here are some examples of, when this server is running, how you can push Archive.org PDFs to CouchDB.

## Using the form
![Using the form](https://raw.github.com/rjsteinert/archive-org-to-couchdb/master/screenshot.png)

## curl on the command line
> curl -XGET "http://127.0.0.1:3000/send.html?source=http://archive.org/details/BeLLGroundServerManual&target=http://bell.iriscouch.com/test-national-bell&level=1&subject=bell-training"

# Credits
rj@rjsteinert.com
