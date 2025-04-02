const express = require("express");
// const empRoutes = require('./routes/empRoutes');
const mongoDb = require("./config/dbConnection");
const indexRoutes = require("./indexRoutes");

const app = express();
app.use(express.json());
app.use("/", indexRoutes);
// // Connect to MongoDB and then start the server
mongoDb()
  .then(() => {
    const port = 3005;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error);
  });
