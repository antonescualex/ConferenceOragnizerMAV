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
Article.belongsTo(Conference, { foreignKey: "conferenceId" });
Reviewer.hasMany(Review, { foreignKey: "reviewerId" });
Review.belongsTo(Reviewer, { foreignKey: "reviewerId" });
Article.hasMany(Review, { foreignKey: "articleId" });
Review.belongsTo(Article, { foreignKey: "articleId" });

Organiser.hasMany(Conference, { foreignKey: "oragniserId" });


app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.get("/create", async (req, res) => {
    await sequelize.sync({
        force: true
    });
    res.json({ message: "Database created!" });
});


//---------------------------------------------------------------------------
// GET METHOD WITH findAll() FOR ALL MODELS
//---------------------------------------------------------------------------
app.get("/authors", async (req, res, next) => {
    try {
        const authors = await Author.findAll();
        res.status(200).json(authors);
    } catch (err) {
        next(err);
    }
});

app.get("/reviewers", async (req, res, next) => {
    try {
        const reviewers = await Reviewer.findAll();
        res.status(200).json(reviewers);
    } catch (err) {
        next(err);
    }
});

app.get("/articles", async (req, res, next) => {
    try {
        const articles = await Article.findAll();
        res.status(200).json(articles);
    } catch (err) {
        next(err);
    }
});

app.get("/conferences", async (req, res, next) => {
    try {
        const conf = await Conference.findAll();
        res.status(200).json(conf);
    } catch (err) {
        next(err);
    }
});

app.get("/organisers", async (req, res, next) => {
    try {
        const org = await Organiser.findAll();
        res.status(200).json(org);
    } catch (err) {
        next(err);
    }
});

app.get("/reviews", async (req, res, next) => {
    try {
        const rev = await Review.findAll();
        res.status(200).json(rev);
    } catch (err) {
        next(err);
    }
});


//---------------------------------------------------------
//GET bazat pe logica bazei de date
//Article has an Author
//Conference has a Organiser
//Review has a reviewer
//---------------------------------------------------------
app.get("/authors/:authorId/articles", async (req, res, next) => {
    try {
        const author = await Author.findByPk(req.params.authorId,
            {
                include: [Article]

            });
        if (!author) {
            res.status(404).json({ message: "Nu am gasit autorul" })
        }
        else {
            //const articles=author.articles;
            res.status(202).json(author.articles);
        }

    }
    catch (err) {
        next(err);
    }
});

app.get("/organisers/:organiserId/conferences", async (req, res, next) => {

    try {
        const organiser = await Organiser.findByPk(req.params.orgId, {
            include: [Conference]
        });
        if (!organiser) {
            res.status(404).json({ message: "Nu exista organizator cu acest id" })
        }
        else {
            res.status(202).json(organiser.conferences)
        }
    }
    catch (err) {
        next(err);
    }
});

app.get("/reviewers/:reviewerId/reviews", async (req, res, next) => {
    try {
        const reviewer = await Reviewer.findByPk(req.params.reviewerId);
        if (!rec) {
            res.status(404).json({ message: "Nu am gasit reviewer" })
        }
        else {
            res.status(202).json(reviewer.reviews);
        }
    }
    catch (err) {
        next(err);
    }
})


//---------------------------------------------------------------------------
// DELETE METHOD FOR ALL MODELS BY ID
//---------------------------------------------------------
app.delete("/authors/:idAuthor", async (req, res, next) => {
    try {
        const idAuthor = req.params.idAuthor;
        const deletedCount = await Author.destroy({ where: { id: idAuthor } });

        if (deletedCount === 0) {
            res.status(404).json({ message: "Author not found" });
        }
        else {
            res.status(200).json({ message: "Author deleted successfully" });
        }
    } catch (err) {
        next(err);
    }
});

app.delete("/reviewers/:idR", async (req, res, next) => {
    try {
        const idAuthor = req.params.idAuthor;
        const deletedCount = await Reviewer.destroy({ where: { id: idR } });

        if (deletedCount === 0) {
            res.status(404).json({ message: "Author not found" });
        }
        else {
            res.status(200).json({ message: "Author deleted successfully" });
        }
    } catch (err) {
        next(err);
    }
});

app.delete("/organisers/:idO", async (req, res, next) => {
    try {
        const idAuthor = req.params.idAuthor;
        const deletedCount = await Organiser.destroy({ where: { id: idO } });

        if (deletedCount === 0) {
            res.status(404).json({ message: "Author not found" });
        }
        else {
            res.status(200).json({ message: "Author deleted successfully" });
        }
    } catch (err) {
        next(err);
    }
});

app.delete("/conferences/:idC", async (req, res, next) => {
    try {
        const idAuthor = req.params.idAuthor;
        const deletedCount = await Reviewer.destroy({ where: { id: idC } });

        if (deletedCount === 0) {
            res.status(404).json({ message: "Author not found" });
        }
        else {
            res.status(200).json({ message: "Author deleted successfully" });
        }
    } catch (err) {
        next(err);
    }
});

app.delete("/reviews/:idR", async (req, res, next) => {
    try {
        const idAuthor = req.params.idAuthor;
        const deletedCount = await Review.destroy({ where: { id: idR } });

        if (deletedCount === 0) {
            res.status(404).json({ message: "Author not found" });
        }
        else {
            res.status(200).json({ message: "Author deleted successfully" });
        }
    } catch (err) {
        next(err);
    }
});

app.delete("/articles/:idA", async (req, res, next) => {
    try {
        const idAuthor = req.params.idAuthor;
        const deletedCount = await Article.destroy({ where: { id: idA } });

        if (deletedCount === 0) {
            res.status(404).json({ message: "Author not found" });
        }
        else {
            res.status(200).json({ message: "Author deleted successfully" });
        }
    } catch (err) {
        next(err);
    }
});



//---------------------------------------------------------------------------
// POST METHODS FOR ALL MODELS
//---------------------------------------------------------------------------
app.post("/reviewer", async (req, res, next) => {
    try {
        const reviewer = await Reviewer.create(req.body);
        res.status(201).json(reviewer);
    } catch (err) {
        next(err);
    }
});


app.post("/conference", async (req, res, next) => {
    try {
        const conference = await Conference.create(req.body);
        res.status(201).json(conference);
    } catch (err) {
        next(err);
    }
});



app.post("/author", async (req, res, next) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json(author);
    } catch (err) {
        next(err);
    }
});

app.post("/article", async (req, res, next) => {
    try {
        const article = await Article.create(req.body);
        res.status(201).json({
            message: "Articol creat",
            data: article
        });
    }
    catch (err) {
        next(err);
    }
})

app.post("/review", async (req, res, next) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json({
            message: "Review creat",
            data: review
        });

    }
    catch (error) {
        next(error);
    }
})

app.post("/organiser", async (req, res, next) => {
    try {
        const org = await Organiser.create(req.body);
        res.status(201).json({
            message: "Organiser creat",
            data: org
        });

    }
    catch (error) {
        next(error);
    }
})


//---------------------------------------------------------------------------
// PUT METHODS FOR ALL MODELS
//---------------------------------------------------------------------------

app.put("/authors/:idAuthor", async (req, res, next) => {
    try {
        const author = await Author.findByPk(req.params.idAuthor);
        if(!author) {
            res.status(404).json({
                message: "Author not found!"
            });
        }
        else {
            await author.update(req.body);
            res.status(201).json({
                message: "Author updated successfully",
                data: author
            });
        }
    } catch(err) {
        next(err);
    }
});

app.put("/reviewers/:idReviewer", async (req, res, next) => {
    try {
        const reviewer = await Reviewer.findByPk(req.params.idReviewer);
        if(!reviewer) {
            res.status(404).json({
                message: "Reviewer not found!"
            });
        }
        else {
            await reviewer.update(req.body);
            res.status(201).json({
                message: "Reviewer updated successfully",
                data: reviewer
            });
        }
    } catch(err) {
        next(err);
    }
});

app.put("/organisers/:idOrganiser", async (req, res, next) => {
    try {
        const organiser = await Organiser.findByPk(req.params.idOrganiser);
        if(!organiser) {
            res.status(404).json({
                message: "Organiser not found!"
            });
        }
        else {
            await organiser.update(req.body);
            res.status(201).json({
                message: "Organiser updated successfully",
                data: organiser
            });
        }
    } catch(err) {
        next(err);
    }
});

app.put("/articles/:idArticle", async (req, res, next) => {
    try {
        const article = await Article.findByPk(req.params.idArticle);
        if(!article) {
            res.status(404).json({
                message: "Organiser not found!"
            });
        }
        else {
            await article.update(req.body);
            res.status(201).json({
                message: "Organiser updated successfully",
                data: article
            });
        }
    } catch(err) {
        next(err);
    }
});

app.put("/conferences/:idConference", async (req, res, next) => {
    try {
        const conference = await Conference.findByPk(req.params.idConference);
        if(!conference) {
            res.status(404).json({
                message: "Organiser not found!"
            });
        }
        else {
            await conference.update(req.body);
            res.status(201).json({
                message: "Organiser updated successfully",
                data: conference
            });
        }
    } catch(err) {
        next(err);
    }
});

app.put("/reviews/:idReview", async (req, res, next) => {
    try {
        const review = await Review.findByPk(req.params.idReview);
        if(!review) {
            res.status(404).json({
                message: "Organiser not found!"
            });
        }
        else {
            await review.update(req.body);
            res.status(201).json({
                message: "Organiser updated successfully",
                data: review
            });
        }
    } catch(err) {
        next(err);
    }
});

//---------------------------------------------------------------------------
// METODA DE PORNIRE A SERVERULUI SI ASCULTAREA CERERILOR HTTP
//---------------------------------------------------------------------------
app.listen(port, () => {
    console.log("Server running on http://localhost:" + port);
});


app.use((err, req, res, next) => {
    res.status(500).json({ message: "500 - Server Error" });
});