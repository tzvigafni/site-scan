var express = require('express');
var router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const dbConnection = require('../services/db.service');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Welcome to the scan site' });
});

/* POST home page. */
router.post('/', async (req, res, next) => {

  scan = {
    timestamp: 3333,
    url: '111http://mozilla.com',
    keyword: '22example',
    found: '0',
  };
  await dbConnection.writeScans(scan);

  const scantext = req.body.scantext;
  const scanresults = await dbConnection.readScans(scantext);
  res.render('index', {
    scanresults: scanresults,
    title: `Search result for: ${scantext}`,
  });
});

module.exports = router;
