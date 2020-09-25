const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = function (app) {
  const filePath = path.join(__dirname, "../db/db.json");
  //The user gets sent to the api notes in JSON data
  app.get("/api/notes", (req, res) => {
    res.sendFile(filePath);
  });
  // API: Created the ID in order to specify the note accordingly
  app.get("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
  });

  //   POST Request: A new note is received in order to save it on the request body => add it to the db.jsonn => return to client
  app.post("/api/notes", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync(filePath, "utf8"));

    let newNote = req.body;
    let uniqueID = uuidv4();

    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync(filePath, JSON.stringify(savedNotes));
    console.log("Note saved to db.json.");
    res.json(savedNotes);
  });

  //    DELETE Request: Receive param with specified ID => delete note using filter and rewriting currnoteid with new note id
  app.delete("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync(filePath, "utf8"));
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Deleting note with ID ${noteID}`);
    savedNotes = savedNotes.filter((currNote) => {
      return currNote.id != noteID;
    });

    fs.writeFileSync(filePath, JSON.stringify(savedNotes));
    res.json(savedNotes);
  });
};
