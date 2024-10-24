// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//for the first timestamp
app.get("/api/:date?",(req,res)=>{
  //converted into valid format
  const dateString = req.params.date
  const parsedDate = new Date(dateString)
  //checking if unix timestamp or not
  if(dateString.length == 13){
    const convertedDate = new Date(parseInt(dateString))
    //const unixParsed = new Date(convertedDate)
    const returnData ={
      unix: convertedDate.getTime(),
      utc: convertedDate.toUTCString()
    }
      res.send(returnData)
  }
  //for invalid date
else if(isNaN(parsedDate.getTime())){
    res.json({
      error: 'Invalid date'
    })
  }
  //for normal timestamp received
  else{
    const returnData ={
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  }
    res.send(returnData)
}
}
)
//Could have added this in the same get method but was throwing error from freecodecdamp site so took the suggestion from thier help to create an empty get method
//That conditional check could have been done by a ternary operator
app.get("/api/",(req,res)=>{
  const parsedDate = new Date();
  const returnData ={
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  }
  res.send(returnData)
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
