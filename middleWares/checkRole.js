const JWT = require('jsonwebtoken');

const { User } = require('../models');

const allowRoles = (...roles) => {
  return async (request, response, next) => {
    try {
      const bearerToken = request.get('Authorization').replace('Bearer', '').trim();
      const payload = await JWT.decode(bearerToken, { json: true });
      const user = await User.findById(payload._id).select('-password').lean();

      if (user && roles.includes(user.role)) return next();

      return response.status(403).json({ message: 'Account does not have permission' });
    } catch (error) {
      response.status(403).json({ message: 'Forbidden' });
    }
  };
};

module.exports = allowRoles;