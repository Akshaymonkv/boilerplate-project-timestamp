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

//API endpoint for empty URL like ""<....>/api/""
app.get("/api/",(req,res)=>{
  const parsedDate = new Date();
  const returnData ={
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  }
  res.send(returnData)
})

//API endpoint for date field
app.get("/api/:date",(req, res)=>{
  /* A better loop but error handling has to be studied
  const a = req.params.date
  let parsedDate;
  if(a.length == 13){
    parsedDate = new Date(parseInt(a))
  }
  else{
    parsedDate = new Date(a)
  }

  if(isNaN(parsedDate.getTime())){
    res.json({
      error:"Invalid date"
    })
  }

  const returnData = {
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  }
  res.send(returnData)
*/

  
  const a = req.params.date
  if(a.length == 13){
    const unixTimestamp = new Date(parseInt(a))
    const returnData = {
      unix: unixTimestamp.getTime(),
      utc: unixTimestamp.toUTCString()
    }
    res.send(returnData)
  }
  else{
    const dateTimestamp = new Date(a)
    console.log(dateTimestamp)
    if (isNaN(dateTimestamp.getTime())){
        res.json({
          error:"Invalid date"
        })
      
    }
    else{
      const returnData = {
        unix: dateTimestamp.getTime(),
        utc: dateTimestamp.toUTCString()
      }
      res.send(returnData)
    }

  }


}
)

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
