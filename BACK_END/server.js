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


/**
 * Relatia intre modelele: Author si Article
 * 
 * Descriere:
 * Un autor are mai multe articole.
 * Fiecare articol apartine unui singur autor.
 */
Author.hasMany(Article, { foreignKey: "authorId" });
Article.belongsTo(Author, { foreignKey: "authorId" });

/**
 * Relatia intre modelele: Conference si Article
 * 
 * Descriere:
 * O conferinta are mai multe articole.
 * Fiecare articol apartine unei singure conferinte.
 */
Conference.hasMany(Article, { foreignKey: "conferenceId" });
Article.belongsTo(Conference, { foreignKey: "conferenceId" });

/**
 * Relatia intre modelele: Reviewer si Review
 * 
 * Descriere:
 * Un reviewer scrie mai multe review-uri.
 * Fiecare review apartine unui singur reviewer.
 */
Reviewer.hasMany(Review, { foreignKey: "reviewerId" });
Review.belongsTo(Reviewer, { foreignKey: "reviewerId" });

/**
 * Relatia intre modelele: Article si Review
 * 
 * Descriere:
 * Un articol are mai multe review-uri.
 * Fiecare review apartine unui singur articol.
 */
Article.hasMany(Review, { foreignKey: "articleId" });
Review.belongsTo(Article, { foreignKey: "articleId" });

/**
 * Relatia intre modelele: Organiser si Conference
 * 
 * Descriere:
 * Un organizator organizeaza mai multe conferinte.
 * Fiecare conferinta apartine unui singur organizator.
 */
Organiser.hasMany(Conference, { foreignKey: "organiserId" });
Conference.belongsTo(Organiser, { foreignKey: "organiserId"});


app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());


/**
 * GET /create
 * 
 * Descriere:
 * Reseteaza si creeaza baza de date si toate tabelele acesteia.
 */
app.get("/create", async (req, res) => {
    await sequelize.sync({
        force: true
    });
    res.json({ message: "Database created!" });
});


//---------------------------------------------------------------------------
// GET - dupa ID pentru toate modelele
//---------------------------------------------------------------------------

/**
 * GET /authors/:idAuthor
 * 
 * Descriere:
 * Returneaza un autor dupa ID.
 */
app.get("/authors/:idAuthor", async (req, res, next) => {
    try {
        const author = await Author.findByPk(req.params.idAuthor);

        if(!author) {
            res.status(404).json({ message: "Author not found" });
        }
        else {
            res.status(200).json(author);
        }
    } catch (err) {
        next(err);
    }
});

/**
 * GET /reviewers/:idReviewer
 * 
 * Descriere:
 * Returneaza un reviewer dupa ID.
 */
app.get("/reviewers/:idReviewer", async (req, res, next) => {
    try {
        const reviewer = await Reviewer.findByPk(req.params.idReviewer);

        if(!reviewer) {
            res.status(404).json({ message: "Reviewer not found" })
        }
        else {
            res.status(200).json(reviewer);
        } 
    } catch (err) {
        next(err);
    }
});

/**
 * GET /articles/:idArticle
 * 
 * Descriere:
 * Returneaza un articol dupa ID.
 */
app.get("/articles/:idArticle", async (req, res, next) => {
    try {
        const article = await Article.findByPk(req.params.idArticle);

        if(!article) {
            res.status(404).json({ message: "Article not found" }); 
        }
        else {
            res.status(200).json(article);
        }
    } catch (err) {
        next(err);
    }
});

/**
 * GET /conferences/:idConference
 * 
 * Descriere:
 * Returneaza o conferinta dupa ID.
 */
app.get("/conferences/:idConference", async (req, res, next) => {
    try {
        const conference = await Conference.findByPk(req.params.idConference);

        if(!conference) {
            res.status(404).json({ message: "Conference not found" });
        }
        else {
            res.status(200).json(conference);
        }     
    } catch (err) {
        next(err);
    }
});

/**
 * GET /organisers/:idOrganiser
 * 
 * Descriere:
 * Returneaza un organizator dupa ID.
 */
app.get("/organisers/:idOrganiser", async (req, res, next) => {
    try {
        const organiser = await Organiser.findByPk(req.params.idOrganiser);

        if(!organiser) {
            res.status(404).json({ message: "Organiser not found" });
        }
        else {
            res.status(200).json(organiser);
        }
    } catch (err) {
        next(err);
    }
});

/**
 * GET /reviews/:idReview
 * 
 * Descriere:
 * Returneaza un review dupa ID.
 */
app.get("/reviews/:idReview", async (req, res, next) => {
    try {
        const review = await Review.findByPk(req.params.idReview);
        
        if(!review) {
            res.status(404).json({ message: "Review not found" });
        }
        else {
            res.status(200).json(review);
        }
    } catch (err) {
        next(err);
    }
});


//---------------------------------------------------------------------------
// GET - pentru toate modelele
//---------------------------------------------------------------------------

/**
 * GET /authors
 * 
 * Descriere:
 * Returneaza toti autorii.
 */
app.get("/authors", async (req, res, next) => {
    try {
        const authors = await Author.findAll();
        res.status(200).json(authors);
    } catch (err) {
        next(err);
    }
});

/**
 * GET /reviewers
 * 
 * Descriere:
 * Returneaza toti reviewer-ii.
 */
app.get("/reviewers", async (req, res, next) => {
    try {
        const reviewers = await Reviewer.findAll();
        res.status(200).json(reviewers);
    } catch (err) {
        next(err);
    }
});

/**
 * GET /articles
 * 
 * Descriere:
 * Returneaza toate articolele.
 */
app.get("/articles", async (req, res, next) => {
    try {
        const articles = await Article.findAll();
        res.status(200).json(articles);
    } catch (err) {
        next(err);
    }
});

/**
 * GET /conferences
 * 
 * Descriere:
 * Returneaza toate conferintele.
 */
app.get("/conferences", async (req, res, next) => {
    try {
        const conferences = await Conference.findAll();
        res.status(200).json(conferences);
    } catch (err) {
        next(err);
    }
});

/**
 * GET /organisers
 * 
 * Descriere:
 * Returneaza toti organizatorii.
 */
app.get("/organisers", async (req, res, next) => {
    try {
        const organisers = await Organiser.findAll();
        res.status(200).json(organisers);
    } catch (err) {
        next(err);
    }
});

/**
 * GET /reviews
 * 
 * Descriere:
 * Returneaza toate review-rile.
 */
app.get("/reviews", async (req, res, next) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch (err) {
        next(err);
    }
});


//---------------------------------------------------------
//GET - bazat pe logica bazei de date
//      in functie de relatiile dintre tabele
//---------------------------------------------------------

/**
 * GET /authors/:authorId/articles
 * 
 * Descriere:
 * Returneaza articolele unui autor in functie de ID-ul acestuia.
 */
app.get("/authors/:authorId/articles", async (req, res, next) => {
    try {
        const author = await Author.findByPk(req.params.authorId, {
                include: [Article]
            });
        if (!author) {
            res.status(404).json({ message: "Nu exista autor cu acest id" })
        }
        else {
            res.status(202).json(author.articles);
        }

    }
    catch (err) {
        next(err);
    }
});

/**
 * GET /organisers/:organiserId/conferences
 * 
 * Descriere:
 * Returneaza conferintele unui organizator in functie de ID-ul acestuia.
 */
app.get("/organisers/:organiserId/conferences", async (req, res, next) => {

    try {
        const organiser = await Organiser.findByPk(req.params.organiserId, {
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

/**
 * GET /reviewers/:reviewerId/reviews
 * 
 * Descriere:
 * Returneaza review-rile unui reviewer in functie de ID-ul acestuia.
 */
app.get("/reviewers/:reviewerId/reviews", async (req, res, next) => {
    try {
        const reviewer = await Reviewer.findByPk(req.params.reviewerId, {
            include: [Review]
        });
        if (!reviewer) {
            res.status(404).json({ message: "Nu exista reviewer cu acest id" })
        }
        else {
            res.status(202).json(reviewer.reviews);
        }
    }
    catch (err) {
        next(err);
    }
})

/**
 * GET /conferences/:conferenceId/articles
 * 
 * Descriere:
 * Returneaza articolele unei conferinte in functie de ID-ul acesteia.
 */
app.get("/conferences/:conferenceId/articles", async (req, res, next) => {
    try {
        const conference = await Conference.findByPk(req.params.conferenceId, {
            include: [Article]
        });
        if (!conference) {
            res.status(404).json({ message: "Nu exista conferinta cu acest id" })
        }
        else {
            res.status(202).json(conference.articles);
        }
    }
    catch (err) {
        next(err);
    }
})

/**
 * GET /articles/:articleId/reviews
 * 
 * Descriere:
 * Returneaza review-rile unui articol in functie de ID-ul acestuia.
 */
app.get("/articles/:articleId/reviews", async (req, res, next) => {
    try {
        const article = await Article.findByPk(req.params.articleId, {
            include: [Review]
        });
        if (!article) {
            res.status(404).json({ message: "Nu exista articol cu acest id" })
        }
        else {
            res.status(202).json(article.reviews);
        }
    }
    catch (err) {
        next(err);
    }
})


//---------------------------------------------------------------------------
// DELETE pentru toate modelele dupa ID
//---------------------------------------------------------

/**
 * DELETE /authors/:idAuthor
 * 
 * Descriere:
 * Sterge un autor dupa ID.
 */
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

/**
 * DELETE /reviewers/:idReviewer
 * 
 * Descriere:
 * Sterge un reviewer dupa ID.
 */
app.delete("/reviewers/:idReviewer", async (req, res, next) => {
    try {
        const idReviewer = req.params.idReviewer;
        const deletedCount = await Reviewer.destroy({ where: { id: idReviewer } });

        if (deletedCount === 0) {
            res.status(404).json({ message: "Reviewer not found" });
        }
        else {
            res.status(200).json({ message: "Reviewer deleted successfully" });
        }
    } catch (err) {
        next(err);
    }
});

/**
 * DELETE /organisers/:idOrganiser
 * 
 * Descriere:
 * Sterge un organizator dupa ID.
 */
app.delete("/organisers/:idOrganiser", async (req, res, next) => {
    try {
        const idOrganiser = req.params.idOrganiser;
        const deletedCount = await Organiser.destroy({ where: { id: idOrganiser } });

        if (deletedCount === 0) {
            res.status(404).json({ message: "Organiser not found" });
        }
        else {
            res.status(200).json({ message: "Organiser deleted successfully" });
        }
    } catch (err) {
        next(err);
    }
});

/**
 * DELETE /conferences/:idConference
 * 
 * Descriere:
 * Sterge o conferinta dupa ID.
 */
app.delete("/conferences/:idConference", async (req, res, next) => {
    try {
        const idConference = req.params.idConference;
        const deletedCount = await Conference.destroy({ where: { id: idConference } });

        if (deletedCount === 0) {
            res.status(404).json({ message: "Conference not found" });
        }
        else {
            res.status(200).json({ message: "Conference deleted successfully" });
        }
    } catch (err) {
        next(err);
    }
});

/**
 * DELETE /reviews/:idReview
 * 
 * Descriere:
 * Sterge un review dupa ID.
 */
app.delete("/reviews/:idReview", async (req, res, next) => {
    try {
        const idReview = req.params.idReview;
        const deletedCount = await Review.destroy({ where: { id: idReview } });

        if (deletedCount === 0) {
            res.status(404).json({ message: "Review not found" });
        }
        else {
            res.status(200).json({ message: "Review deleted successfully" });
        }
    } catch (err) {
        next(err);
    }
});

/**
 * DELETE /articles/:idArticle
 * 
 * Descriere:
 * Sterge un articol dupa ID.
 */
app.delete("/articles/:idArticle", async (req, res, next) => {
    try {
        const idArticle = req.params.idArticle;
        const deletedCount = await Article.destroy({ where: { id: idArticle } });

        if (deletedCount === 0) {
            res.status(404).json({ message: "Article not found" });
        }
        else {
            res.status(200).json({ message: "Article deleted successfully" });
        }
    } catch (err) {
        next(err);
    }
});



//---------------------------------------------------------------------------
// POST METHODS FOR ALL MODELS
//---------------------------------------------------------------------------

/**
 * POST /reviewer
 * 
 * Descriere:
 * Creeaza un reviewer nou.
 * 
 * Body:
 *  - fullName: STRING
 *  - email: STRING
 *  - role: STRING
 */
app.post("/reviewer", async (req, res, next) => {
    try {
        const reviewer = await Reviewer.create(req.body);
        res.status(201).json({
            message: "Reviewer has been created",
            data: reviewer
        });
    } catch (err) {
        next(err);
    }
});

/**
 * POST /conference
 * 
 * Descriere:
 * Creeaza o conferinta noua.
 * 
 * Body:
 *  - name: STRING
 *  - description: STRING | NULL
 *  - startDate: DATE
 *  - endDate: DATE
 */
app.post("/conference", async (req, res, next) => {
    try {
        const conference = await Conference.create(req.body);
        res.status(201).json({ 
            message: "Conference has been created",
            data: conference
        });
    } catch (err) {
        next(err);
    }
});

/**
 * POST /author
 * 
 * Descriere:
 * Creeaza un autor nou.
 * 
 * Body:
 *  - fullName: STRING
 *  - email: STRING
 *  - role: STRING
 */
app.post("/author", async (req, res, next) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json({
            message: "Author has been created",
            data: author
        });
    } catch (err) {
        next(err);
    }
});

/**
 * POST /article
 * 
 * Descriere:
 * Creeaza un articol nou.
 * 
 * Body:
 *  - title: STRING
 *  - status: ENUM {"SUBMITTED", "UNDER_REVIEW", "ACCEPTED", "REJECTED"}
 *            IMPLICIT: "SUBMITTED"
 *  - version: INT
 *             IMPLICIT: 1
 */
app.post("/article", async (req, res, next) => {
    try {
        const article = await Article.create(req.body);
        res.status(201).json({
            message: "Article has been created",
            data: article
        });
    }
    catch (err) {
        next(err);
    }
});

/**
 * POST /review
 * 
 * Descriere:
 * Creeaza un review nou.
 * 
 * Body:
 *  - decision: ENUM {"PENDING", "ACCEPT", "REJECT", "MODIFICATION_REQUIRED"}
 *              IMPLICIT: PENDING
 *  - comments: STRING | NULL
 *  - grade: FLOAT 
 *           INTERVAL PERMIS: 0 - 5
 */
app.post("/review", async (req, res, next) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json({
            message: "Review has been created",
            data: review
        });

    }
    catch (error) {
        next(error);
    }
});

/**
 * POST /organiser
 * 
 * Descriere:
 * Creeaza un organizator nou.
 * 
 * Body:
 *  - fullName: STRING
 *  - email: STRING
 *  - role: STRING
 */
app.post("/organiser", async (req, res, next) => {
    try {
        const organiser = await Organiser.create(req.body);
        res.status(201).json({
            message: "Organiser has been created",
            data: organiser
        });

    }
    catch (error) {
        next(error);
    }
});


//---------------------------------------------------------------------------
// PUT METHODS FOR ALL MODELS
//---------------------------------------------------------------------------

/**
 * PUT /authors/:idAuthor
 * 
 * Descriere:
 * Actualizeaza datele unui autor existent in functie de ID.
 * 
 * Body:
 *  - fullName: STRING
 *  - email: STRING
 *  - role: STRING
 */
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

/**
 * PUT /reviewers/:idReviewer
 * 
 * Descriere:
 * Actualizeaza datele unui reviewer existent in functie de ID.
 * 
 * Body:
 *  - fullName: STRING
 *  - email: STRING
 *  - role: STRING
 */
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

/**
 * PUT /organisers/:idOrganiser
 * 
 * Descriere:
 * Actualizeaza datele unui organizator existent in functie de ID.
 * 
 * Body:
 *  - fullName: STRING
 *  - email: STRING
 *  - role: STRING
 */
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

/**
 * PUT /articles/:idArticle
 * 
 * Descriere:
 * Actualizeaza datele unui articol existent in functie de ID.
 * 
 * Body:
 *  - title: STRING
 *  - status: ENUM {"SUBMITTED", "UNDER_REVIEW", "ACCEPTED", "REJECTED"}
 *            IMPLICIT: "SUBMITTED"
 *  - version: INT
 *             IMPLICIT: 1
 */
app.put("/articles/:idArticle", async (req, res, next) => {
    try {
        const article = await Article.findByPk(req.params.idArticle);
        if(!article) {
            res.status(404).json({
                message: "Article not found!"
            });
        }
        else {
            await article.update(req.body);
            res.status(201).json({
                message: "Article updated successfully",
                data: article
            });
        }
    } catch(err) {
        next(err);
    }
});


/**
 * PUT /conferences/:idConference
 * 
 * Descriere:
 * Actualizeaza datele unei conferinte existente in functie de ID.
 * 
 * Body:
 *  - name: STRING
 *  - description: STRING | NULL
 *  - startDate: DATE
 *  - endDate: DATE
 */
app.put("/conferences/:idConference", async (req, res, next) => {
    try {
        const conference = await Conference.findByPk(req.params.idConference);
        if(!conference) {
            res.status(404).json({
                message: "Conference not found!"
            });
        }
        else {
            await conference.update(req.body);
            res.status(201).json({
                message: "Conference updated successfully",
                data: conference
            });
        }
    } catch(err) {
        next(err);
    }
});

/**
 * PUT /reviews/:idReview
 * 
 * Descriere:
 * Actualizeaza datele unui review existent in functie de ID.
 * 
 * Body:
 *  - decision: ENUM {"PENDING", "ACCEPT", "REJECT", "MODIFICATION_REQUIRED"}
 *              IMPLICIT: PENDING
 *  - comments: STRING | NULL
 *  - grade: FLOAT 
 *           INTERVAL PERMIS: 0 - 5
 */
app.put("/reviews/:idReview", async (req, res, next) => {
    try {
        const review = await Review.findByPk(req.params.idReview);
        if(!review) {
            res.status(404).json({
                message: "Review not found!"
            });
        }
        else {
            await review.update(req.body);
            res.status(201).json({
                message: "Reviews updated successfully",
                data: review
            });
        }
    } catch(err) {
        next(err);
    }
});

/**
 * Descriere:
 * Metoda care porneste serverul si permite ascultarea cererilor HTTP.
 */
app.listen(port, () => {
    console.log("Server running on http://localhost:" + port);
});

/**
 * Descriere:
 * Metoda care capteaza orice eroare interna a serverului.
 */
app.use((err, req, res, next) => {
    res.status(500).json({ message: "500 - Server Error" });
});