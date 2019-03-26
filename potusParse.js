//this file contains function that takes president's url and returnt heir name and birthday

const rp = require('request-promise');
const $ = require('cheerio');

const potusParse = function (url) {
    return rp(url)
        .then(function (html) {
            console.log($('.firstHeading', html).text()); //<< accessing text inside element holding president's name
            console.log($('.bday', html).text()); // << accessing text inside element holding president's birthday
        })
        .catch(function (err) {
            //handle error
        });
}

module.exports = potusParse;