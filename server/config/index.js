const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  URI: process.env.URI,
  SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN,
  BASE_URL: process.env.BASE_URL,
  HOST: process.env.HOST,
  SERVICE: process.env.SERVICE,
  EMAIL_PORT: process.env.EMAIL_PORT,
  SECURE: process.env.SECURE,
  USER: process.env.USER,
  PASS: process.env.PASS,
};

// process.env.DB_URL

// module.exports = {
//   PORT: 8080,
//   URI: "mongodb://127.0.0.1:27017/userDB",
//   SECRET_ACCESS_TOKEN: "22a1f6b46aff296d3ee431fba0c04a6be958ef7a",
//   BASE_URL: "https://localhost:8080/",
//   HOST: "smtp.gmail.com",
//   SERVICE: "gmail",
//   EMAIL_PORT: 587,
//   SECURE: true,
//   USER: "jarunee.recc2@gmail.com",
//   PASS: "qhmudyxtbzczejwi",
// };
