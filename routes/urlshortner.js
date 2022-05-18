const express = require('express');

const router = express.Router();

const shortnerController = require("../controllers/urlshortner");

router.post("/api/shorturl", shortnerController.Shortener);

router.get('/api/shorturl/:short_url', shortnerController.shortUrlVisit);

module.exports = router;