// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
projectData = {};

// Start up an instance of app
const express = require('express');
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
// Callback to debug
const port = 8080;
const server = app.listen(port, listening);
function listening() {
    console.log(`server is running on port ${port}`);
}

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/body', function(req, res) {
    res.send(projectData);
});
// Post Route
app.post('/body', function(req, res) {
    newEntry = {
        body: req.body,
        location: req.body.content.name,
        temp: req.body.temp,
        Date: req.body.date,
        content: req.body.content,
        weather: req.body.content.weather[0]
    }
    projectData = newEntry;
    res.send(projectData);
    console.log(projectData);
});