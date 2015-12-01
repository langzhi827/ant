var crypto = require('crypto');

exports.sha1 = function (str) {
    return crypto.createHash('sha1').update(str).digest('hex');
}