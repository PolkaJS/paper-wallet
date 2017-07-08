// @flow
// const QRCode = require("qrcode-svg");
//
// const qrcode = new QRCode({
//   content: "0xcec0fac7e6c55ffef28e6e71298ad388a87a490c",
//   padding: 1,
//   width: 384,
//   height: 384,
//   color: "#000000",
//   background: "#ffffff",
//   ecl: "M"
// });
//
// qrcode.save("sample.svg", function(error) {
//   if (error) throw error;
//   console.log("Done!");
// });

const fs = require('fs');
const pdf = require('html-pdf');

const html = fs.readFileSync('./index.html', 'utf8');
const options = {
  format: 'A4',
  // border: {
  //   "top": "6.35mm",            // default is 0, units: mm, cm, in, px
  //   "right": "6.35mm",
  //   "bottom": "6.35mm",
  //   "left": "6.35mm"
  // },
};

pdf.create(html, options).toFile('./out.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});
