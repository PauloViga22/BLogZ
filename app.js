const express = require('express');
const busboy = require('express-busboy');
const database = require('./util/database');
const router = require('./routes/route');

const app = express();
busboy.extend(app);

app.set('view engine', 'ejs');

app.use(router);

app.use(express.static('./public'));

database.mongoConnect(() => {
    app.listen(3000);
});