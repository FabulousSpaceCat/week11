var express = require('express');
var mysql = require('mysql');
var bodyParser  = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'owm',
    password : 'root'
});

app.get("/", function(req, res){
    res.render("home");
});

app.listen(6969, function(){
    console.log("Server running on 6969!");
});