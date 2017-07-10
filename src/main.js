// @flow

const downloadsFolder = require('downloads-folder');
const PDFDocument     = require('pdfkit');
const fs              = require('fs');
const qr              = require('qr-image');

const FS_ADDRESS = fs.createWriteStream(__dirname + '/ADDRESS.png');
const FS_PRIVATE = fs.createWriteStream(__dirname + '/PRIVATE.png');
const ADDRESS    = '0xcec0fac7e6c55ffef28e6e71298ad388a87a490c';
const PRIVATE    = '8fd60f9404ccdd72868d4593acd2bd100e7d3881740a368';

module.exports.createPDF = function(address: string, privateKey: string, phrase: Array<string>) {
  let qrAddress = qr.image(ADDRESS, {
    ec_level: 'M',
    size: 7,
    margin: 1
  });

  let qrPrivate = qr.image(PRIVATE, {
    ec_level: 'M',
    size: 9,
    margin: 1
  });

  FS_PRIVATE.on('finish', () => {
    const doc         = new PDFDocument({
      margins: {
        top: 18,
        bottom: 18,
        left: 18,
        right: 18
      }
    });
    doc.pipe(fs.createWriteStream(`${downloadsFolder()}/parity_wallet.pdf`)) // write to PDF

    doc.image(__dirname + '/ADDRESS.png', 25, 50, {fit: [100, 100]})
    doc.image(__dirname + '/YOUR_ADDRESS.png', 130, 50, {fit: [100, 100]})
    doc.image(__dirname + '/PRIVATE.png', 410, 25, {fit: [150, 150]})
    doc.image(__dirname + '/YOUR_PRIVATE_KEY.png', 565, 25, {fit: [145, 145]})
    doc.image(__dirname + '/LOGO.png', 215, 25, {fit: [150, 150]})

    doc.rect(25, 185, 560, 65).fillColor('#62688F').fill()
    doc.font(__dirname + '/../assets/Hack-Regular.ttf')
      .fontSize('10')
      .fillColor('white')
      .text(`Your Address: ${ADDRESS}`, 0, 200, {
        width: 570,
        align: 'right'
      })
      .text(`Your Private Key: ${PRIVATE}`, 0, 227, {
        width: 570,
        align: 'right'
      });

    doc.addPage({
      margins: {
        top: 18,
        bottom: 18,
        left: 18,
        right: 18
      }
    });

    doc.image(__dirname + '/PARITY_LOGO.png', 25, 25, {fit: [200, 200]})

    doc.fillColor('black').fontSize('20').text("RESTORE PHRASE", 315, 50);

    let phraseString = phrase.map((word, index) => {
      return `${index + 1}. ${word}, `;
    }).join('');
    doc.fontSize('16').text(phraseString,
      210,
      90,
      {
        height: 150,
        width: 375,
        align: 'center'
    });

    doc.rect(25, 185, 560, 65).fillColor('#62688F').fill()
    doc.font(__dirname + '/../assets/Hack-Regular.ttf')
      .fontSize('8')
      .fillColor('white')
      .text(`THIS PAPER WALLET IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`,
        32.5,
        195,
        {
          width: 550,
          align: 'left'
      })

    doc.end()
  });

  qrAddress.pipe(FS_ADDRESS);
  qrPrivate.pipe(FS_PRIVATE);
}
