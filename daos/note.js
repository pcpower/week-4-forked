const mongoose = require('mongoose');

const Note = require('../models/note');

module.exports = {};

module.exports.getById = (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return null;
    }
    return User.findOne({ _id: userId }).lean();
  }
  
  module.exports.getByLogin = (email) => {
    return User.findOne({email: email});
  }
  
  module.exports.getByIdAndEmail = (userId, email) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return null;
    }
    return User.findOne({ _id: userId, email: email }).lean();
  }

  module.exports.updateById = async (userId, newObj) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return false;
    }
    await User.updateOne({ _id: userId }, newObj);
    return true;
  } 
  
  module.exports.create = async (noteData) => {
    try {
      const created = await Note.create(noteData);
      return created;
    } catch (e) {
      if (e.message.includes('validation failed') || e.message.includes('duplicate key')) {
        throw new BadDataError(e.message);
      }
      throw e;
    }
  }


class BadDataError extends Error {};
  module.exports.BadDataError = BadDataError;