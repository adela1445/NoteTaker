// Dependencies
// =============================================================
const express = require("express");

const apiRoutes = require("./routes/api.js");
const htmlRoutes = require("./routes/html.js");

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
apiRoutes(app);
htmlRoutes(app);

// API GET Requests
// Below code handles when users "visit" a page.
// In each of the below cases when a user visits a link
// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
// ---------------------------------------------------------------------------

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log(`Now listening to port ${PORT}.`);
});
