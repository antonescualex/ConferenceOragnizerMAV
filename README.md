# README - Plan de proiect - Aplicatie web pentru oragnizarea conferintelor
---

## Obiectiv general

Realizarea unei aplicatii web de tip Single Page Application care sa permita organizarea conferintelor, permitand trimiterea, aprobarea si evaluarea articolelor trimise intr-un mod eficient.
---

## Arhitectra si tehnologii utilizare

### Front-End
Front-end-ul va fi realizat in React.js si va fi de tipul Single page Application.
### Back-End
Back-end-ul va fi realizat in Node.js si va avea o interfata de tip REST.
### Baza de date
Stocarea datelor va fi realizata intr-o baza de date relationala PostgreSQL.
---

## Functionalitati

- Aplicația are trei tipuri de utilizatori, organizatori, revieweri și autori.
- Un organizator poate crea o conferință și aloca o serie de revieweri.
- Un autor se poate înregistra la o conferință și poate face o propunere de articol.
- La primirea articolului, se alocă automat 2 revieweri pentru articol.
- Reviewer-i pot aproba articolul sau pot da feed-back autorului pentru modificarea lui.
- Autorul poate încărca o nouă versiune a unui articol pe baza feed-back-ului primit.
- Organizatorul poate monitoriza starea articolelor trimise.
- Dark mode / Light mode, cu salvarea preferintelor utilizatorului.
- Sitem de autentificare
- Trimiterea automata de email-uri pentru notificare atunci cand un articol este aprobat/respins etc.
- Dashboard care permite vizualizarea numarului de aticole in fiecare stadiu.
- Afisarea versiunilor unui articol.
---

## Sitlul codului

- Codul va fi scris folosind camelCase si PascalCase pentru componente.
- Vor fi adaugate comentarii pentru fiecare clasa, functie etc. pentru documentarea acestora.
---
