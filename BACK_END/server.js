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



// GET METHOD prin mecanism findAll() pentru toate clasese
//---------------------------------------------------------------------------
app.get("/authors", async (req, res, next) => {
    try {
        const authors = await Author.findAll();
        res.status(200).json(authors);
    } catch(err) {
        next(err);
    }
});

app.get("/reviewers", async (req, res, next) => {
    try {
        const reviewers = await Reviewer.findAll();
        res.status(200).json(reviewers);
    } catch(err) {
        next(err);
    }
});

app.get("/articles", async (req, res, next) => {
    try {
        const articles= await Article.findAll();
        res.status(200).json(articles);
    } catch(err) {
        next(err);
    }
});

app.get("/conferences", async (req, res, next) => {
    try {
        const conf= await Conference.findAll();
        res.status(200).json(conf);
    } catch(err) {
        next(err);
    }
});

app.get("/organisers", async (req, res, next) => {
    try {
        const org= await Organiser.findAll();
        res.status(200).json(org);
    } catch(err) {
        next(err);
    }
});


app.get("/reviews", async (req, res, next) => {
    try {
        const rev= await Review.findAll();
        res.status(200).json(rev);
    } catch(err) {
        next(err);
    }
});
//---------------------------------------------------------



//---------------------------------------------------------
//GET bazat pe logica bazei de date
//Article has an Author
//Conference has a Organiser
//Review has a reviewer

app.get("/authors/:authorId/articles",async(req,res,next)=>{
    try{
        const author=Author.findByPk(req.params.authorId,
            {include: [Article]})
        if(!author){
            res.status(404).json({message:"Nu am gasit autorul"})
        }
        else
        res.status(202).json(author.articles);
    }
    catch(err){
        next(err);
    }
});

app.get("organisers/:orgId/conferences",async(req,res,next)=>{

    try{
        const org=Organiser.findByPk(req.params.orgId,{
            include:[Conference]
        })
        if(!org){
            res.status(404).json({message:"Nu exista organizator cu acest id"})
        }
        else{
            res.status(202).json(org.conferences)
        }
    }
    catch(err){
        next(err);
    }
});

//---------------------------------------------------------
app.get("/reviewers/:revId/reviews",async(req,res,next)=>{
    try{
        const rev=Review.findByPk(req.params.revId);
        if(!rec){
            res.status(404).json({message:"Nu am gasit reviewer"})
        }
        else{
            res.status(202).json(rev.reviews);
        }
    }
    catch(err){
        next(err);
    }
})







// DELETE METHOD FOR ALL CLASSES BY ID
//---------------------------------------------------------
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

app.delete("/reviewers/:idR", async (req, res, next) => {
    try {
        const idAuthor = req.params.idAuthor;
        const deletedCount = await Reviewer.destroy({ where: {idR} });

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

app.delete("/organisers/:idO", async (req, res, next) => {
    try {
        const idAuthor = req.params.idAuthor;
        const deletedCount = await Organiser.destroy({ where: {idO} });

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

app.delete("/conferences/:idC", async (req, res, next) => {
    try {
        const idAuthor = req.params.idAuthor;
        const deletedCount = await Reviewer.destroy({ where: {idC} });

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

app.delete("/reviews/:idR", async (req, res, next) => {
    try {
        const idAuthor = req.params.idAuthor;
        const deletedCount = await Review.destroy({ where: {idR} });

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


app.delete("/articles/:idA", async (req, res, next) => {
    try {
        const idAuthor = req.params.idAuthor;
        const deletedCount = await Article.destroy({ where: {idA} });

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
//---------------------------------------------------------------------------




// POST METHOD pentru creare clase
//---------------------------------------------------------------------------
app.post("/reviewer", async (req, res, next) => {
    try {
        const reviewer = await Reviewer.create(req.body);
        res.status(201).json(reviewer);
    } catch(err) {
        next(err);
    }
});


app.post("/conference", async (req, res, next) => {
    try {
        const conference = await Conference.create(req.body);
        res.status(201).json(conference);
    } catch(err) {
        next(err);
    }
});



app.post("/author", async (req, res, next) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json(author);
    } catch(err) {
        next(err);
    }
});

app.post("/article",async(req,res,next)=>{
    try{
        const article=await Article.create(req.body);
        res.status(201).json(article);
        res.status(201).json({
            message:"Articol creat",
            
        });
    }
    catch(err){
        next(err);
    }
})

app.post("/review",async(req,res,next)=>{
    try{
        const review=await Review.create(req.body);
        res.status(201).json({
            message:"Review creat",
            
        });

    }
    catch(error){
        next(error);
    }
})

app.post("/organiser",async(req,res,next)=>{
    try{
        const org=await Organiser.create(req.body);
        res.status(201).json({
            message:"Organiser creat",
            data:org
        });

    }
    catch(error){
        next(error);
    }
})
//---------------------------------------------------------------------------





app.listen(port, () => {
    console.log("Server running on http://localhost:" + port);
});
