const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

require('./models/note');
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json()); // Permet de parcourir le contenu des requêtes entrantes et les rend disponibles dans req.body (express ne fait pas ça automatiquement)

require('./routes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
