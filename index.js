const express = require('express');
const bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(bodyparser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.listen(8080 ,()=>console.log("Express Server Sratrted"));

  app.get('/nic',(req,res)=>{

    //sample NIC 651891060V
    var nic = req.query.nic;
    var nicType;

    var length = nic.length;
    if (length == 10){
        nicType = "old";
    }else if(length == 12 && Number.isInteger(nic)){
        nicType = "new";
    }else{
        nicType = "invalid";
    }

    var respone = {type:nicType}

    res.send(respone)
  })