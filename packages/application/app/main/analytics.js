const ua = require('universal-analytics');

module.exports = function send(clientId) {
    const visitor = ua('UA-58342187-2', clientId);

    return visitor.pageview('/').send();
};
