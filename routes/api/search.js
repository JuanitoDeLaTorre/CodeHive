const express = require('express');
const router = express.Router();

const searchController = require('../../controllers/api/search');


router.get('/:query', searchController.search);



module.exports = router;