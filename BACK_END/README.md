# CONFERENCE ORGANISER BACK-END - REST API

## Descriere

Acest proiect reprezinta back-end-ul de tip REST pentru gestionarea unei aplicatii
de organizare a conferintelor. Acesta permite administrarea organizatorilor, autorilor si
revieweri-lor, dar si a articolelor, review-urilor si conferintelor.
Serverul foloseste Express, iar datele sunt gestionate prin Sequelize ORM 
si stocate intr-o baza de date SQLite.

## Structura proiectului

- /models
    - article.js
    - author.js
    - conference.js
    - organiser.js
    - review.js
    - reviewer.js
- sequelize.js
- server.js

## Initializare

**Instalare si rulare**
```bash
npm install
node server.js
```

**Serverul porneste implicit la adresa:**
`http://localhost:3000`

**Pentru a creea baza de date si tabelele aferente:**
`GET /create`

## Modele existente

* Author - poate scrie si trimite articole la o conferinta.
* Article - apartine unui autor si unei conferinte si poate primii review-uri.
* Organiser - poate organiza conferinte.
* Conference - este o conferinta creeata de un organizator.
* Reviewer - poate scrie review-uri pentru articole.
* Review - este scris de un reviewer si apartine unui articol.

## RUTE API

### GET all

```bash
GET /authors
GET /articles
GET /organisers
GET /conferences
GET /reviewers
GET /reviews
```

### GET by ID

```bash
GET /authors/:idAuthor
GET /articles/:idArticle
GET /organisers/:idOrganiser
GET /conferences/:idConference
GET /reviewers/:idReviewer
GET /reviews/:idReview
```

### POST

```bash
POST /author
POST /article
POST /organiser
POST /conference
POST /reviewer
POST /review
```

### PUT

```bash
PUT /authors/:idAuthor
PUT /articles/:idArticle
PUT /organisers/:idOrganiser
PUT /conferences/:idConference
PUT /reviewers/:idReviewer
PUT /reviews/:idReview
```

### DELETE

```bash
DELETE /authors/:idAuthor
DELETE /articles/:idArticle
DELETE /organisers/:idOrganiser
DELETE /conferences/:idConference
DELETE /reviewers/:idReviewer
DELETE /reviews/:idReview
```

## Exemplu request

## POST /author

```json
{
    "fullName": "Alex Matei Vlad",
    "email": "alex.matei.vlad@gmail.com",
    "role": "Author"
}
```
