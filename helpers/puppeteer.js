const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

exports.getBrowser = async () => {
  return await puppeteer.launch({
    args: ['--no-sandbox'],
  });
};
