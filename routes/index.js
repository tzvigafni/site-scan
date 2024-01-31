var express = require('express');
var router = express.Router();

const dbConnection = require('../services/db.service');
const finder = require('../services/finder.service');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Welcome to the scan site' });
});

/* POST home page. */
router.post('/', async (req, res, next) => {

  // scan = {
  //   timestamp: 3333,
  //   url: '111http://mozilla.com',
  //   keyword: '22example',
  //   found: '0',
  // };
  // await dbConnection.writeScans(scan);

  const { scantext } = req.body;

  // const scanresults = await dbConnection.readScans(scantext);

  const sites = ['https://example.com', 'https://internet-israel.com'];
  const scansPromises = sites.map((site) => finder(site, scantext));
  const scans = await Promise.all(scansPromises);
  const dbConnectionPromises = scans.map((scan) =>
    dbConnection.writeScans(scan));
  await Promise.all(dbConnectionPromises);

  const scanresults = await dbConnection.readScans(scantext);

  res.render('index', {
    scanresults,
    title: `Search result for: ${scantext}`,
  });
});

module.exports = router;
