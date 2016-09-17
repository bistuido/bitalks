var verify = {
    ADMIN: function (req, res, next) {
        if (req.decoded._doc.admin == true) {
            next();
        } else {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
    }
}

module.exports = verify;