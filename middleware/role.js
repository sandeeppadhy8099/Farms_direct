<<<<<<< HEAD
module.exports = (requiredRole) => {
    return (req, res, next) => {
      if (!req.user || req.user.role !== requiredRole) {
        return res.status(403).json({ msg: "Access denied" });
      }
      next();
    };
  };
=======
module.exports = (requiredRole) => {
    return (req, res, next) => {
      if (!req.user || req.user.role !== requiredRole) {
        return res.status(403).json({ msg: "Access denied" });
      }
      next();
    };
  };
>>>>>>> 657421e798694f48d230a82f254c87e45b6588ce
  