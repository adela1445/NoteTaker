// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = (app) => {
  // HTML GET Requests

  //Basic route that sends the user to the notes page
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(path.join(__dirname, "../public"), "notes.html"));
  });
  // Basic route that sends the user first to the Home Page or if user enters nonexistent url
  app.get("*", (req, res) => {
    res.sendFile(path.join(path.join(__dirname, "../public"), "index.html"));
  });
};
