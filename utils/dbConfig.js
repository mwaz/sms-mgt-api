config = require("../config");

module.exports = {
  database: config.default["DATABASE"],
  port: config.default["PORT"],
  secret: config.default["SECRET"]
};