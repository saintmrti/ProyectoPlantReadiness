import config from "../config.js";

const dbconfig = {
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  server: config.db.host,
  options: {
    encrypt: true,
  },
};

export default dbconfig;
