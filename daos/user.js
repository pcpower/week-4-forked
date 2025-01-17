const mongoose = require('mongoose');

const User = require('../models/user');

module.exports = {};
  
  module.exports.getById = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return null;
    }
    return User.findOne({ _id: userId }).lean();
  }
  
  module.exports.getByLogin = async (email) => {
    return User.findOne({email: email});
  }
  
  module.exports.updateById = async (userId, newObj) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return false;
    }
    await User.updateOne({ _id: userId }, newObj);
    return true;
  } 
  
  module.exports.create = async (userData) => {
    try {
      const created = User.create(userData);
      return created;
    } catch (e) {
      throw e;
    }
  }
  
  class BadDataError extends Error {};
  module.exports.BadDataError = BadDataError;