const rp = require('request-promise');//<<given a url, returns promise containing html of url
const $ = require('cheerio'); //<< used for parsing through html
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States'; //<< site
const potusParse = require('./potusParse');

rp(url)
    .then(function (html) {
        //success!
        // console.log(html); // << prints raw html of site
        // console.log($('big > a', html).length);  // $ is jquery for document. This line is printing the length of the list of elements that are an 'a' tag nested in 'big' tags
        // console.log($('big > a', html)); //this line prints the list of each big tag with a nested a tag
        const elmts = $('big > a', html);
        let wikiUrls = [];
        for (let i = 0; i < elmts.length; i++) {
            wikiUrls.push(elmts[i].attribs.href);
        };

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