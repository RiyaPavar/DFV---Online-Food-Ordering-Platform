module.exports = (req, res, next) => {
  if (req.user.role !== 'master') {
    return res.status(403).json({ msg: 'Access denied. Only master admin allowed.' });
  }
  next();
};
