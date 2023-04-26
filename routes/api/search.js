const express = require('express');
const router = express.Router();

const searchController = require('../../controllers/api/search');


router.get('/search', searchController.search);



module.exports = router;