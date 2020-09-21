// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API's
// GET Request: reads the db.json and returns all saved notes as JSON

app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname + "/db/db.json"), (err, data) => {
    if (err) {
      throw err;
    }
    res.json(JSON.parse(data));
  });
});

// POST Request: Receives a new note => save on the request body => adds it to the db.json => returns new note to client
// app.post("/api/notes", (req, res) => {
//     const notes
//     fs.readFile(path.join(__dirname + "/db/db.json"), (err, data) => {
//         if (err) { throw err }
//         notes =JSON.parse(data)
//     })
//     const newEntryNote = {
//         title: req.body.title
//     }
// })
