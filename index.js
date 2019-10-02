const express = require('express');
const bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(bodyparser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.listen(8080 ,()=>console.log("Express Server Sratrted"));

  app.get('/nic',(req,res)=>{

    //sample NIC 651891060V
    var nic = req.query.nic;
    var nicType,newNIC;

    var length = nic.length;
    var V = nic.substring(9);
    V = V.toLowerCase();

    if (length == 10 && V=='v'){
        nicType = "old";
    }else if(length == 12 && Number.isInteger(nic)){
        nicType = "new";
    }else{
        nicType = "invalid";
    }

    if (nicType == "old"){
        newNIC = "19"+nic.substring(0,2)+nic.substring(2,5)+"0"+nic.substring(5,8)+nic.substring(8,9);
    }else{
        newNIC = "Not Related"
    }


    var respone = {type:nicType,newFormat:newNIC}

    res.send(respone)
  })