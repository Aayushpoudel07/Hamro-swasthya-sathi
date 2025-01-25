module.exports = (req, res, next)  => {
    if (req.isAuthenticated()) {
        return next();
    }
    // res.status(401).json({ message: 'You need to login first' });
    return res.redirect('/auth/login');

};
