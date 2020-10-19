const crypto = require('crypto');

module.exports = {
    generateHash:   function(something) {
        let shasum = crypto.createHash('sha256'); // sha256, sha512
        shasum.update(something);
        return shasum.digest('base64');
    },

    isLoggedIn:     function(req, res, next) {
        if (!req.session.uid) { // 로그인 된 상태.
            res.redirect('/login');
        } else {
            next();
        }
    }
}
