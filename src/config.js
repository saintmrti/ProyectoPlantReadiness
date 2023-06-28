import { config } from "dotenv";

config();

export default {
  port: process.env.PORT || 3001,
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "localhost",
  },
};
