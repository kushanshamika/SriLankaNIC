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
    var dayCount = parseInt(nic.substring(2,5))
    var year,birthDate,defaultYear;
    



    V = V.toLowerCase();

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    
    var date = new Date();

    if (length == 10 && V=='v'){
        nicType = "old";
    }else if(length == 12 && Number.isInteger(parseInt(nic))){
        nicType = "new";
    }else{
        nicType = "invalid";
    }

    if (nicType == "old"){
        newNIC = "19"+nic.substring(0,2)+nic.substring(2,5)+"0"+nic.substring(5,8)+nic.substring(8,9);
        year = "19"+nic.substring(0,2);
        birthDate = date.addDays(dayCount);
    }else if(nicType =="new"){
        year = nic.substring(0,4);
    }else{

    }


    var respone = {type:nicType,newFormat:newNIC,birthYear:year,birthDate:birthDate}

    res.send(respone)
  })