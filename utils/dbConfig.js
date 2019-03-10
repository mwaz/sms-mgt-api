import config from "../config";

export default {
  database: config.default["DATABASE"],
  port: config.default["PORT"],
  secret: config.default["SECRET"]
};
