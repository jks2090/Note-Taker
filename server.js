
var express = require("express");
const fs = require("fs");
var path = require("path");

var app = express();


var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, function () {
    console.log(`App is listening on http://localhost:${PORT}`);
});




app.get("/", function (req, res) {

    res.sendFile(path.join(__dirname, "index.html"));
});




app.get("/notes", function (req, res) {

    res.sendFile(path.join(__dirname, "/public/notes.html"));
});



app.get("/api/notes", function (req, res) {
    return res.sendFile(path.join(__dirname, "./db/db.json"));
});




app.post("/api/notes", function (req, res) {

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        const newnote = JSON.parse(data);
        req.body.id = Date.now();
        newnote.push(req.body);
        console.log(newnote);
        fs.writeFile("./db/db.json", JSON.stringify(newnote), (err) => {
            if (err) {
                throw err;
            }
            res.json(newnote);
        });

    });
});




app.delete("/api/notes/:id", function (req, res) {
    var paramsID = parseInt(req.params.id);
    var newArray = [];

    console.log("70 " + JSON.stringify(paramsID));

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        var currentData = JSON.parse(data);


        for (i = 0; i < currentData.length; i++) {
            
            if (paramsID !== currentData[i].id) {
                console.log("found it");
                newArray.push(currentData[i]);
            }







        }
        console.log("87 " + JSON.stringify(newArray));
        fs.writeFile("./db/db.json", JSON.stringify(newArray), (err) => {
            if (err) throw err;


            console.log("92 " + JSON.stringify(newArray));
            res.sendFile(path.join(__dirname, "./db/db.json"));
        });
    });


});
