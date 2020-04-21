// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, () => { console.log(`running on localhost: ${port}`) })

//app.get('/website', addData);


// Callback to debug

// Initialize all route with a callback function
// GET route
// GET route

app.get('/data', sendData);
// POST route
app.post("/data", saveData);

// Callback function to complete GET '/all'
function sendData(request, response) {
    response.send(projectData);
    console.log(projectData)
    console.log('get from server');
};
// Callback function to complete POST to server '/data'
function saveData(request, respond) {
    console.log('post to server')
    const newData = {
        temperatur: request.body.temperatur,
        date: request.body.date,
        userResponse: request.body.userResponse
    };
    projectData = newData;

}