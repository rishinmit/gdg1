// i made this to authorize the adminsss
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    return res.status(403).json({ message: 'Access denied. Please log in.' });
};

const isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.isAdmin) {
        return next();
    }
    return res.status(403).json({ message: 'Only admins can perform this action.' });
};

module.exports = { isAuthenticated, isAdmin };
