// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
// Sets up the Express App
// =============================================================
// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML GET Requests

//Basic route that sends the user to the notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(path.join(__dirname, "./public"), "notes.html"));
});
// Basic route that sends the user first to the Home Page or if user enters nonexistent url
app.get("*", (req, res) => {
  res.sendFile(path.join(path.join(__dirname, "./public"), "index.html"));
});

// API GET Requests
// Below code handles when users "visit" a page.
// In each of the below cases when a user visits a link
// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
// ---------------------------------------------------------------------------

//The user gets sent to the api notes in JSON data
app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});
// API: Created the ID in order to specify the note accordingly
app.get("/api/notes/:id", function (req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(savedNotes[Number(req.params.id)]);
});

//   POST Request: A new note is received in order to save it on the request body => add it to the db.jsonn => return to client
app.post("/api/notes", function (req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newNote = req.body;
  let uniqueID = savedNotes.length.toString();
  newNote.id = uniqueID;
  savedNotes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  console.log("Note saved to db.json.");
  res.json(savedNotes);
});

//    DELETE Request: Receive param with specified ID => delete note using filter and rewriting currnoteid with new note id
app.delete("/api/notes/:id", function (req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteID = req.params.id;
  let newID = 0;
  console.log(`Deleting note with ID ${noteID}`);
  savedNotes = savedNotes.filter((currNote) => {
    return currNote.id != noteID;
  });

  for (currNote of savedNotes) {
    currNote.id = newID.toString();
    newID++;
  }

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  res.json(savedNotes);
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log(`Now listening to port ${PORT}.`);
});
