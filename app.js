// Set up my toolbag
const express = require("express");
const bodyParser  = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Throw in my dataset and api key
const data = require("./city.list.json");
const key = require("./private/apikey.txt")

// Build the homepage
app.get("/", (req, res) => {
    let length = data.length;
    res.render("home", { length, key });
});

// Filter the list with a param
app.get("/automagical/:text", (req, res) => {
    let search = req.params.text;
    let matches = data.filter(city => {
        const regex = new RegExp(`^${search}`, "gi");
        return city.name.match(regex);
    });
    res.setHeader('content-type', 'application/json');
    res.send(matches);
});

// Weather search
app.post("/search", (req,res) =>{
    // Get value of location, index has been chosen already
    let index = req.body.refIndex;
    // Assign to variable
    let location = data[index].id;
    // Build the query
    // Res.render weather inside the query block so rendering doesn't happen until async call is complete
});

// Error pages

// And we're running
app.listen(6969, () => {
    console.log("Server listening on 6969!");
});

