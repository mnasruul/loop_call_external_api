var express = require('express');
var readline = require('readline');
var router = express.Router();
const app = express();
const request = require('request');
var BaseUrl = ""
const axios = require('axios').default;
var PORT = 3000;
var myToken = ""
 var Interface = {};
// const bodyParser = require('body-parser');
// app.use(bodyParser);
var instanceBaseUrl = axios.create({
  baseURL: BaseUrl,
  timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});
var instanceBaseUrlAPI = axios.create({
  baseURL: BaseUrl,
  timeout: 1000,
  headers: {'Authorization': 'Bearer ' + myToken}
});
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/login', function(req, res){
  /* 
     {
      "baseURL":"http://api.example.com",
      "url":"/login",
      "params":{"examples_id":1,"examples_name":""}
    }
  */
  res.header("Access-Control-Allow-Origin", "*");
  const bodyReq = req.body
  console.log(bodyReq)
  BaseUrl = bodyReq.baseURL;
  Interface['params'] = bodyReq.params;
  instanceBaseUrl = axios.create({
    baseURL: BaseUrl,
    timeout: 1000,
  });
  instanceBaseUrl.post(bodyReq.url,bodyReq.params).then(resA =>{
      let data = resA.data;
      console.log(data);
      if (resA.status == 200) {
        myToken = data.token;
      }
      res.json({token:myToken,data:data})
    }, err => {
      console.log(err)
    }).catch(error =>{
      console.log(error)
      res.status(500).send(error)
    })
});


app.post('/setHeaders', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  /* 
    {'Authorization': 'Bearer ASDASDASDA'}
  */
  const bodyReq = req.body
  instanceBaseUrl = axios.create({
    baseURL: BaseUrl,
    timeout: 1000,
    headers: bodyReq 
  });
  res.send("Success set Headers")
})
app.post('/POST/:lengthLoop', function(req, res){
  /* 
  {Url:"/API/Save", params:{examples_id:1,examples_name:""}}
  */
  res.header("Access-Control-Allow-Origin", "*");
  const bodyReq = req.body
  var data = [];
  const lengthLoop = parseInt(req.params.lengthLoop)
  console.log(lengthLoop)
    for (let index = 0; index < lengthLoop; index++) {
      console.log(index)
      instanceBaseUrl.post(bodyReq.Url,bodyReq.params).then(resA =>{
          let dataResp = resA.data;
          data.push(dataResp);
        }, err => {
          console.log(err)
        }).catch(error =>{
          console.log(error)
          res.status(500).json(error)
        });
    }
    console.log(data);
 res.status(200).json(data)
});

app.listen(PORT, function(){
  console.log('Express listening on: '+PORT); 
});