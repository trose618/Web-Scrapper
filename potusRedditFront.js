// const rp = require('request-promise');
const puppeteer = require('puppeteer');
const url = 'https://www.reddit.com';
const $ = require('cheerio');

puppeteer
    .launch()
    .then(function (browser) {
        return browser.newPage();
    })
    .then(function (page) {
        return page.goto(url).then(function () {
            return page.content();
        });
    })
    .then(function (html) {
        $('h2', html).each(function () { // $('h2', html) returns a cheerio object that containing each element fitting selector params. Must use its each method as apposed to forEach.
            console.log($(this).text())
        })

    })
    .catch(function (err) {
        //handle error
    });
