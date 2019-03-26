const rp = require('request-promise');
const $ = require('cheerio'); //<< for parsing the html recieved from the site
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States'; //<< site

rp(url)
    .then(function (html) {
        //success!
        // console.log(html); // << prints raw html of site
        console.log($('big > a', html).length);  // $ is jquery for document. This line is printing the length of the list of elements that are an 'a' tag nested in 'big' tags
        console.log($('big > a', html)); //this line prints the list of each big tag with a nested a tag
    })
    .catch(function (err) {
        //handle error
    });