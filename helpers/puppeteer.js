const puppeteer = require('puppeteer');

exports.getBrowser = async () => {
  return await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
};
