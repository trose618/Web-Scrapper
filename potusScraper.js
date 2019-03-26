const rp = require('request-promise');
const $ = require('cheerio'); //<< for parsing the html recieved from the site
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States'; //<< site
const potusParse = require('./potusParse');

rp(url)
    .then(function (html) {
        //success!
        // console.log(html); // << prints raw html of site
        // console.log($('big > a', html).length);  // $ is jquery for document. This line is printing the length of the list of elements that are an 'a' tag nested in 'big' tags
        // console.log($('big > a', html)); //this line prints the list of each big tag with a nested a tag
        const wikiUrls = []; // array for storing the urls to each president's wiki page

        for (let i = 0; i < 45; i++) { // for loop going through length of array.
            wikiUrls.push($('big > a', html)[i].attribs.href); // body accesses attribute list of current index element to get href link and push into wikiUrls array
        }

        return Promise.all(
            wikiUrls.map(function (url) {
                return potusParse(`http://en.wikipedia.org${url}`)
            })
        )
    })
    .then(function (presidents) {
        console.log(presidents)

    })
    .catch(function (err) {
        //handle error
        console.log(err)
    });