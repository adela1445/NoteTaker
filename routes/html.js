const path = require("path");

module.exports = function (app) {
  //Basic route that sends the user to the notes page
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(path.join(__dirname, "../public"), "notes.html"));
  });
  // Basic route that sends the user first to the Home Page or if user enters nonexistent url
  app.get("*", (req, res) => {
    res.sendFile(path.join(path.join(__dirname, "../public"), "index.html"));
  });
};
