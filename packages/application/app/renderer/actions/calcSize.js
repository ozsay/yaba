const { remote } = window.require('electron');

export const ACTION_TYPE = 'CALC_SIZE';

export const AVAILABLE_SIZES = {
    GZIP: 'gzip',
    DEFLATE: 'deflate',
    BROTLI: 'brotli',
};

function brotli(data, opts, cb) {
    setTimeout(() => {
        const compress = remote.require('brotli/compress');

        const callback = cb || opts;

        callback(compress(data, opts));
    });
}

export default function (data, sizer = AVAILABLE_SIZES.GZIP) {
    return {
        type: ACTION_TYPE,
        payload: new Promise((resolve) => {
            if (sizer === AVAILABLE_SIZES.GZIP) {
                const zlib = remote.require('zlib');

                zlib.gzip(data, (err, val) => {
                    resolve(val.length);
                });
            } else if (sizer === AVAILABLE_SIZES.DEFLATE) {
                const zlib = remote.require('zlib');

                zlib.deflate(data, (err, val) => {
                    resolve(val.length);
                });
            } else if (sizer === AVAILABLE_SIZES.BROTLI) {
                brotli(data, (compressed) => {
                    resolve(compressed.length);
                });
            }
        }),
    };
}
