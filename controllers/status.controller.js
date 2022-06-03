// const Status = require('../models/status.model');
const fs = require('fs');
const { getBrowser } = require('../helpers/puppeteer');
const convertFile = require('../helpers/convert-file');
const siteCheck = require('../helpers/sitecheck');

const statusCodeCheck = async (filepath) => {
  try {
    const browser = await getBrowser();
    const filelist = convertFile(filepath);
    let urlCheckList = [];
    if (fs.existsSync('./check.txt')) {
      const statusList = convertFile('./check.txt');

      for (const site of statusList) {
        urlCheckList.push(site.split('|')[1]);
      }
    } else {
      fs.openSync('./check.txt', 'w');
    }
    // console.log(urlCheckList);
    const filterlist = filelist.filter((val) => !urlCheckList.includes(val));

    // const arr = [];
    // arr.push({ id: 1, name: 'john' });
    // localStorage.setItem('urls', JSON.stringify(arr));

    for (const site of filterlist) {
      await siteCheck(site, browser);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.checkSites = async (req, res, next) => {
  try {
    // console.log(req.file);
    const { path: filepath } = req.file;

    await statusCodeCheck(filepath);
    // console.log(JSON.parse(localStorage.getItem('urls')));

    res.redirect('/error-sites');
  } catch (err) {
    next(err);
  }
};

exports.errorSites = async (req, res, next) => {
  try {
    const checklist = convertFile('./check.txt');
    // console.log(checklist);
    const errorlist = [];
    for (const site of checklist) {
      // if (site.split('|')[0] !== '200') {
      //   errorlist.push(site.split('|')[1]);
      // }
      errorlist.push(site.split('|')[1]);
    }
    // console.log(errorlist);

    res.status(200).json(errorlist);
  } catch (err) {
    next(err);
  }
};
