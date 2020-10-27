  
const crypto = require('crypto');

module.exports = {
    generateHash:   function(pwd) {
        // SHA: Secure Hash Algorithm
        let shasum = crypto.createHash('sha256');   // sha256, sha512
        shasum.update(pwd);
        return shasum.digest('base64');  // hex, base64
    },

    isLoggedIn:     function(req, res, next) {
        
        if (!req.session.uid) {    
            res.redirect('/login');
        } else {
            next();
        }
    },
    getDisplayTime:     function(dt) {
        let today = moment().format('YYYY-MM-DD');
        let dbtime = moment(dt).format('YYYY-MM-DD HH:mm:ss');
        return (dbtime.indexOf(today) == 0) ?
            dbtime.substring(11) : dbtime.substring(0,10);
    }
}