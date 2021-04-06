const request = require('request');
const cheerio = require("cheerio");

async function main(filter) {
  if (filter) {
    request('https://codequiz.azurewebsites.net/',
      {headers: {'Cookie': 'hasCookie=true'}},
      (error, response, body) => {
        const $ = cheerio.load(body);

        const results = [];
        $("body > table > tbody > tr > td").each((index, element) => {
          results.push($(element).text().trim());
        });
        const filterIndex = results.findIndex(value => value === filter);
        console.log(filterIndex === -1 ? 'Not fround fund.' : results[filterIndex + 1]);
      }
    );
  } else {
    console.log('Please fill up fund.');
  }
}

main(process.argv[2]);

