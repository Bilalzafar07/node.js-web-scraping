const request = require("request");
const cheerio = require("cheerio");
const fs = require('fs')
const writeStream = fs.createWriteStream('post.csv');

// Write headers
writeStream.write(`Title, Link, Date \n`);

request("https://www.helpscout.com/blog/", (err, res, html) => {
  if (!err && res.statusCode == 200) {
    const $ = cheerio.load(html);
    $(".post-preview").each((i, el) => {
      const title = $(el).find(".post-title").text().replace(/\s\s+/g, "");
      const link = $(el).find('a').attr('.href');
      const date = $(el).find('.post-date').text().replace(/,/, '');

      // Write Row to CSV
      writeStream.write(`${title}, ${link}, ${date} \n`);
    });
    console.log('Scraping Done...')
  }
});
