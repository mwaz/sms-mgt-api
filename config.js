require("dotenv").config();

const env = process.env.NODE_ENV;

const development = {
  SECRET: process.env.DEV_SECRET,
  DATABASE: process.env.DEV_DATABASE,
  PORT: process.env.DEV_PORT
};
const testing = {
  SECRET: process.env.TEST_SECRET,
  DATABASE: process.env.TEST_DATABASE,
  PORT: process.env.TEST_PORT
};

const staging = {
  SECRET: process.env.STAGING_SECRET,
  DATABASE: process.env.STAGING_DATABASE,
  PORT: process.env.STAGING_PORT
};
const production = {
  SECRET: process.env.PRODUCTION_SECRET,
  DATABASE: process.env.PRODUCTION_DATABSE,
  PORT: process.env.PRODUCTION_PORT
};

const config = {
  testing,
  development,
  staging,
  production
};

exports.default = config[env];