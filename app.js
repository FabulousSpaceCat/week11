// Set up my toolbag
const express = require("express");
const bodyParser  = require("body-parser");
const request = require("request");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


// Throw in my dataset and api key
const data = require("./city.list.json");
const apikey = require("./private/apikey.json");
const key = apikey.key;

// Build the homepage
app.get("/", (req, res) => {
    let length = data.length;
    res.render("home", { length, key });
});

// Filter the list with a param
// Set up for figuring out how to double filter for state and country
app.get("/automagical/:text", (req, res) => {
    // Get the search term
    let text = req.params.text;
    // Split on commas, trim excess spaces, push it into an array
    let search = text.split(",").map(item => {
        return item.trim();
    });
    // If only the city name
    //if (search.length === 1) {
        // Filter the array for city
        let matches = data.filter(item => {
            // By the first entry in the search array
            // starts with search term, case insensitive
            const regex = new RegExp(`^${search[0]}`, "gi");
            return item.name.match(regex);
        });
        //Set the header and send the info back
        res.setHeader("content-type", "application/json");
        res.send(matches);
    //}
});

// Weather search
app.post("/search", (req,res) =>{
    // Assign city id from hidden field
    let id = req.body.refIndex;
    // Build URL
    let url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=imperial&appid=${key}`
    // Let's talk to OpenWeatherMap
    request(url, function (err, response, body) {
        if(err){
            res.render("home", { error });
        } else {
            let responseData = JSON.parse(body);
            res.render("weather", { responseData });
        }
    });
});

// Error pages (just a token attempt for the two most common) 
// I should probably just make a block of these and an error page view
// And copy them into future projects forever

// 404
app.use((req, res) => {
    res.status(404).send("404: Page not Found");
});

// 500
app.use((req, res) => {
    res.status(500).send("500: Internal Server Error");
});

// And we're running
app.listen(6969, () => {
    console.log("Server listening on 6969!");
});

