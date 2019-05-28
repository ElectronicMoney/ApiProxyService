const express = require('express');
const axios = require('axios');
let bodyParser = require('body-parser');

//create express app instance
const app = express();

//CORS on ExpressJS 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// create application/json parser
let jsonParser = bodyParser.json();

app.post('/oauth/token', jsonParser, (req, res) => {
    let credentials = {
        grant_type: 'password',
        client_id: 2,
        client_secret: 'tOOPU73brhrDpqCZxYWVWtxT2pMyazJ8UAImP1T2', 
        username: req.body.username, 
        password:req.body.password,
    };

    //Performing a POST request
    axios.post('http://127.0.0.1:8081/oauth/token', credentials)
      .then( (response) => {
        res.json(response.data);
      })
      .catch( (error) => {
        res.json(error);
      });

   
});


//set the port as env variable
const PORT = process.env.PORT || 8090;
//The server will now listen on the provided port
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));