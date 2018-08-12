const zlib = require('zlib');
const brotli = require('iltorb').compress;

module.exports = {
    gzip(data, cb) {
        zlib.gzip(data, (err, val) => {
            cb(err, val && val.length);
        });
    },
    deflate(data, cb) {
        zlib.deflate(data, (err, val) => {
            cb(err, val && val.length);
        });
    },
    brotli(data, cb) {
        brotli(data, (err, val) => {
            cb(err, val && val.length);
        });
    },
};
