const fs = require('fs');
const convertFile = require('../helpers/convert-file');
const siteCheck = require('../helpers/sitecheck');

const statusCodeCheck = async (url) => {
  try {
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
    // const filterlist = filelist.filter((val) => !urlCheckList.includes(val));

    if (urlCheckList.includes(url)) {
      await siteCheck(null);
    } else {
      await siteCheck(url);
    }

    return urlCheckList;

    // const arr = [];
    // arr.push({ id: 1, name: 'john' });
    // localStorage.setItem('urls', JSON.stringify(arr));
  } catch (err) {
    console.log(err);
  }
};

exports.checkSites = async (req, res, next) => {
  try {
    // console.log(req.body.url);

    const arr = await statusCodeCheck(req.body.url);
    // console.log(arr.length);
    res.status(200).json(arr.length);
  } catch (err) {
    next(err);
  }
};

exports.resetCheckSites = async (req, res, next) => {
  try {
    if (fs.existsSync('./check.txt')) {
      fs.truncate('./check.txt', 0, (err) => {
        if (err) throw err;
        console.log('File deleted!');
      });

      res.status(204).json('Delete check file');
    } else {
      res.status(200).json('No file check.txt');
    }
  } catch (err) {
    throw err;
  }
};

exports.errorSites = async (req, res, next) => {
  try {
    let errorlist = [];

    const checklist = convertFile('./check.txt');
    // console.log(checklist);
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
