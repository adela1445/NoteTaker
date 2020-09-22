const path = require("path");
const fs = require("fs"); // ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  //The user gets sent to the api notes in JSON data
  app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });
  // API: Created the ID in order to specify the note accordingly
  app.get("/api/notes/:id", function (req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
  });

  //   POST Request: A new note is received in order to save it on the request body => add it to the db.jsonn => return to client
  app.post("/api/notes", function (req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = savedNotes.length.toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("../db/db.json", JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(savedNotes);
  });

  //    DELETE Request: Receive param with specified ID => delete note using filter and rewriting currnoteid with new note id
  app.delete("/api/notes/:id", function (req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
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

    fs.writeFileSync("../db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
  });
};
