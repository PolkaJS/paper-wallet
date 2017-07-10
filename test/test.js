const test   = require('tape');
const pdfkit = require('../lib/main');

test('timing test', function (t) {
    t.plan(1);

    t.equal(typeof Date.now, 'function');
});

pdfkit.createPDF('0xcec0fac7e6c55ffef28e6e71298ad388a87a490c',
'8fd60f9404ccdd72868d4593acd2bd100e7d3881740a368',
['bike', 'cross', 'join', 'bicycle', 'pen', 'battery', 'bike', 'cross', 'join', 'bicycle', 'pen', 'battery'])
