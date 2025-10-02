const requireAuth = (req, res, next) => {
    if (req.session && req.session.user) {
      return next();
    } else {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
  };
  
  module.exports = {
    requireAuth
  };