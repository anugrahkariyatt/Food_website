const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const mongoDB = require("./config/mongo.config");
const morgan = require('morgan');

const port = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://food-website-1-ck7j.onrender.com",
// "http://192.168.1.3:5173",
];

(async () => {
  await mongoDB();

  app.use(
    cors({
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan('dev'));

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/api/admin", require("./routes/admin.route"));
  app.use("/api", require("./routes/auth.route"));
  app.use("/api/refresh", require("./routes/refreshToken.route"));
  app.use("/api", require("./routes/menuDisplay.route"));
  app.use("/api", require("./routes/orders.route"));

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
