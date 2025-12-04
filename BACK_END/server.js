const express = require("express");
const app = express();
const port = 3000;

const sequelize = require("./sequelize");
const Author = require("./models/author");
const Reviewer = require("./models/reviewer");
const Organiser = require("./models/organiser");
const Article = require("./models/article");
const Review = require("./models/review");
const Conference = require("./models/conference");

Author.hasMany(Article, { foreignKey: "authorId" });
Article.belongsTo(Author, { foreignKey: "authorId" });
Conference.hasMany(Article, { foreignKey: "conferenceId" });
Article.belongsTo(Conference, { foreignKey: "conferenceId"} );
Reviewer.hasMany(Review, { foreignKey: "reviewerId" });
Review.belongsTo(Reviewer, { foreignKey: "reviewerId" });
Article.hasMany(Review, { foreignKey: "articleId" });
Review.belongsTo(Article, { foreignKey: "articleId" });

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use((err, req, res, next) => {
    res.status(500).json({ message: "500 - Server Error" });
});

app.get("/create", async(req, res) => {
    await sequelize.sync({
        force: true
    });
    res.json({message: "Database created!"});
});

// POST /authors

app.post("/authors", async (req, res, next) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json(author);
    } catch(err) {
        next(err);
    }
});

// GET /authors

app.get("/authors", async (req, res, next) => {
    try {
        const authors = await Author.findAll();
        res.status(200).json(authors);
    } catch(err) {
        next(err);
    }
});

// DELETE AUTHORS BY ID

app.delete("/authors/:idAuthor", async (req, res, next) => {
    try {
        const idAuthor = req.params.idAuthor;
        const deletedCount = await Author.destroy({ where: {idAuthor} });

        if(deletedCount === 0) {
            res.status(404).json({ message: "Author not found" });
        }
        else {
            res.status(200).json({ message: "Author deleted successfully" });
        }
    } catch(err) {
        next(err);
    }
});

// POST /reviewers

app.post("/reviewers", async (req, res, next) => {
    try {
        const reviewer = await Reviewer.create(req.body);
        res.status(201).json(reviewer);
    } catch(err) {
        next(err);
    }
});

// GET /reviewers

app.get("/reviewers", async (req, res, next) => {
    try {
        const reviewers = await Reviewer.findAll();
        res.status(200).json(reviewers);
    } catch(err) {
        next(err);
    }
});

// POST /conferences

app.post("/conferences", async (req, res, next) => {
    try {
        const conference = await Conference.create(req.body);
        res.status(201).json(conference);
    } catch(err) {
        next(err);
    }
});

// GET /conferences

app.get("/conferences", async (req, res, next) => {
    try {
        const conferences = await Conference.findAll();
        res.status(200).json(conferences);
    } catch(err) {
        next(err);
    }
});

app.listen(port, () => {
    console.log("Server running on http://localhost:" + port);
});
