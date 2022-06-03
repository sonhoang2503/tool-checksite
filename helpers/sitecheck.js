const fs = require('fs');
const { getBrowser } = require('./puppeteer');

// module.exports = async (url, browser) => {
//   try {
//     if (url === null) {
//       return;
//     } else {
//       const page = await browser.newPage();
//       // console.log(url);
//       const response = await page.goto(url);
//       const status = response.status();

//       let data = `${status}|${url}`;
//       data += '\n';

//       fs.appendFileSync('check.txt', data, 'utf8', (err) => {
//         if (err) throw err;
//       });

//       // const arr = JSON.parse(localStorage.getItem('test') || '[]');
//       // console.log(arr);
//       // arr.push({ url: url, checked: true });
//       // localStorage.setItem('test', JSON.stringify(arr));

//       // if (status !== 200) {
//       //   const doc = await model.create({
//       //     url: url,
//       //     status: status,
//       //   });
//       // }

//       await browser.close();
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

module.exports = async (url) => {
  try {
    if (url === null || url === undefined || url === '') {
      return;
    } else {
      const browser = await getBrowser();
      const page = await browser.newPage();
      // console.log(url);
      const response = await page.goto(url);
      const status = response.status();

      let data = `${status}|${url}`;
      data += '\n';

      fs.appendFileSync('check.txt', data, 'utf8', (err) => {
        if (err) throw err;
      });

      // const arr = JSON.parse(localStorage.getItem('test') || '[]');
      // console.log(arr);
      // arr.push({ url: url, checked: true });
      // localStorage.setItem('test', JSON.stringify(arr));

      // if (status !== 200) {
      //   const doc = await model.create({
      //     url: url,
      //     status: status,
      //   });
      // }

      await browser.close();
    }
  } catch (err) {
    console.log(err);
  }
};
