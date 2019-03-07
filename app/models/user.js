const moongoose = require("mongoose");
const bycrypt = require("bcryptjs");

const UserSchema = moongoose.Schema(
  {
    username: {
      type: String,
      min: [4, "Username too short"],
      max: 12,
      required: [true, "Kindly provide a username"],
      unique: true
    },
    password: {
      type: String,
      min: [6, "Password too short"],
      max: 50,
      required: [true, "Kindly provide a valid password"]
    },
    email: {
      type: String,
      min: [3, "Email too short"],
      max: 50,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      required: [false, "Kindly provide a valid email"],
      unique: false
    }
  },
  {
    timestamps: true
  }
);

const User = (module.exports = moongoose.model("User", UserSchema));

module.exports.addUser = function(newUser, callback) {
  bycrypt.genSalt(10, (err, salt) => {
    bycrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        throw err;
      }
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback) {
  const query = { username: username };
  User.findOne(query, callback);
};

module.exports.comparePasswords = function(candidatePassword, hash, callback) {
  bycrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};