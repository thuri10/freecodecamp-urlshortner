require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

const shortRoutes = require('./routes/urlshortner');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//parse application json
app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(shortRoutes);


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
