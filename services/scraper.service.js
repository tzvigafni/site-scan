const axios = require('axios');
// npm i axios

const scraper = async (target) => { 
    const result = await axios.get(target, {}); 
    return result.data; 
  }; 
   
  module.exports = scraper;