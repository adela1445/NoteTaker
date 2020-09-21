// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

const dataNotes = require("./db/db.json");
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
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

function writeNotes(notes) {
  notes = JSON.stringify(notes);
  console.log(notes);
  fs.writeFileSync("./db/db.json", notes, (err) => {
    if (err) {
      throw err;
    }
  });
}
// API's
// GET Request: reads the db.json and returns all saved notes as JSON

app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname + "/db/db.json"), (err, data) => {
    if (err) {
      throw err;
    }
    res.json(dataNotes);
  });
});

// POST Request: Receives a new note => save on the request body => adds it to the db.json => returns new note to client
app.post("/api/notes", (req, res) => {
  if (dataNotes.length == 0) {
    req.body.id = "0";
  } else {
    req.body.id = JSON.stringify(
      JSON.parse(dataNotes[dataNotes.length - 1].id) + 1
    );
  }
  console.log(req.body.id);

  dataNotes.push(req.body);

  writeNotes(dataNotes);
  console.log(dataNotes);
  res.json(req.body);
  // const notes
  // fs.readFile(path.join(__dirname + "/db/db.json"), (err, data) => {
  //     if (err) { throw err }
  //     notes = JSON.parse(data)
  // });
  // const newEntryNote = {
  //     title: req.body.title
  // }
});

// DELETE Request to remove a note with a unique ID

app.delete("/api/notes/:id", (req, res) => {
  const idTag = req.params.id.toString();
  console.log(idTag);

  for (let index = 0; index < dataNotes.length; index++) {
    if (dataNotes[i].idTag == idTag) {
      console.log("We got a hit!");
      res.send(dataNotes[i]);

      dataNotes.splice(i, 1);
      break;
    }
  }
  writeNotes(dataNotes);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
