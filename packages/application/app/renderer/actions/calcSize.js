const { remote } = window.require('electron');

const sizer = remote.require('./sizer');

export const ACTION_TYPE = 'CALC_SIZE';

export const AVAILABLE_SIZES = {
    GZIP: 'gzip',
    DEFLATE: 'deflate',
    BROTLI: 'brotli',
};

export default function (data, sizeAlg = AVAILABLE_SIZES.GZIP) {
    return {
        type: ACTION_TYPE,
        payload: new Promise((resolve) => {
            if (sizeAlg === AVAILABLE_SIZES.GZIP) {
                sizer.gzip(data, (err, val) => {
                    resolve(val);
                });
            } else if (sizeAlg === AVAILABLE_SIZES.DEFLATE) {
                sizer.deflate(data, (err, val) => {
                    resolve(val);
                });
            } else if (sizeAlg === AVAILABLE_SIZES.BROTLI) {
                sizer.brotli(data, (err, val) => {
                    resolve(val);
                });
            }
        }),
    };
}
