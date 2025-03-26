module.exports = (req, res, next)  => {
    if (res.locals.user && res.locals.user.role === 'admin') {
        return next();
    }
    // res.status(401).json({ message: 'You need to login first' });
    return res.redirect('/auth/login');

};
