const express = require("express");
const app = express();
const port = 3000;

const sequelize = require("./sequelize");
const Author = require("./models/author");
const Reviewer = require("./models/reviewer");
const Organiser = require("./models/organiser");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/create", async(req, res) => {
    await sequelize.sync({
        force: true
    });
    res.json({message: "Database created!"});
});

app.listen(port, () => {
    console.log("Server running on http://localhost:" + port);
});

