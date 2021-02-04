## Lopp Call Esternal API
* Login
* Set Header (Token)
* Call APi

# Run 
* npm install
* node app.js

# /Login
*    Body :  {
              "baseURL":"http://api.examples.com",
              "url":"/authenticate",
              "params":{
                "username": "examples@mail.com",
                "password": "passowrd"
              }
            }
* this for get Token

# /setHeaders
*  {'Authorization': 'Bearer ASDASDASDA'}

# POST/:lengthLoop
*      {
      "Url":"/API/save", 
      "params" :{}
     }
