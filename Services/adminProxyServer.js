const express  = require('express');
const axios    = require('axios');
let bodyParser = require('body-parser');

const config   = {
  grantType: 'password',
	clientId: 2,
	clientSecret: 'y6lgDXlO4POpnMnwIFsPdkbsqcLTJx72hFVxJxe6',
};


//Admin_Base_url
const BASE_URL = 'http://127.0.0.1:8081';

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

app.post('/v1/oauth/token', jsonParser, (req, res) => {

    let credentials = {
        grant_type: config.grantType,
        client_id: config.clientId,
        client_secret: config.clientSecret, 
        username: req.body.username, 
        password:req.body.password,
    };

    //Performing a POST request
    axios.post(`${BASE_URL}/oauth/token`, credentials)
    .then( (response) => {
      res.header('Authorization', response.data.access_token);
      res.json(response.data);
    })
    .catch( (error) => {
      res.json(error.response.data);
    });

});


// app.get('/v1/admin', jsonParser, (req, res) => {
//   const header = {
//     headers: {'Authorization': `${req.headers.authorization}`}
//   }
//   //Performing a GET request
//   axios.get(`${BASE_URL}/v1/admin`, header)
//   .then( (response) => {
//     res.json(response.data);
//   })
//   .catch( (error) => {
//     res.json(error.response.data);
//   });

// });


//set the port as env variable
const PORT = process.env.PORT || 8091;
//The server will now listen on the provided port
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));