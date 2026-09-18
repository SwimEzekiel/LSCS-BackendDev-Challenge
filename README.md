# LSCS-BackendDev-Challenge

## Proudly programmed by: Ezekiel S. Alvarez 

To install the dependencies, enter these commands in the terminal:
- ``npm init -y``
- ``npm i express``
- ``npm i sqlite3``
- ``npm i nodeman``
- ``npm i vitest``
- ``npm i vitest supertest``

To run the server:
- ``node src/app.js``

To run the tests:
- ``npm test``

Tech Stacks Used:
- Node.js
- Express
- SQLite3 
- Vitest
- Supertest

Architecture Decision:
- ``tests/testing.test.js`` - the file for testing the program itself
- ``src/routes/api.js`` - organized routing
- ``src/routes/necessary-files - easy access 

Why these tech stacks?:
- Node.js && Express - Required for the project
- SQLite3 - Lightweight and simple to use. Since this is just a small project, it doesn't need complex features that MySQL or PostgreSQL has.
- Vitest - Faster than Jest

Challenges Faced:
- I tried to export functions on different lines like ``modules.export = retrieveProduct; modules.export = getAllProducts`` then imported it with ``const validateCreate = require("./database.js"); const getAllProducts = require("./database.js");``.  I was wondering why when I used a put request on any id number on ``/api/products/:id`` I was receiving a list of all the available products, even when the id didn't exist yet on the database. I tried searching for the problems inside the functions themselves, but then I tried searching on Stack Overflow. I saw how they imported it like ``modules.export = {function1, function2}``. That's when I realized what's wrong with my program. I searched how to export and import functions properly, and things finally worked as expected. 
- The challenge itself. It looked so overwhelming at first as someone who didn't have knowledge with JS or its frameworks. Although I was scared, I was also excited to know how to implement this. I consulted some of my friends who knew web development and they gave me tips on how to do it and how it can seem intimidating at first, but it's actually a simple program. I started searching for crash courses on youtube, for Express and SQLite3. While I was making the project, every feature I finished, I realized that my friends were right. It really was that simple. I still can't believe I learned this much in three days, though, just for this project. 