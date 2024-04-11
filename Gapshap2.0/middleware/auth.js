const {getUser} = require('../services/auth');

function restrictToLoggedInUser(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        const {_id, email, name} = getUser(token);
        console.log(_id, email, name);
        return next();
    }
    // Call next middleware
    res.redirect('/login')
}

module.exports = restrictToLoggedInUser;