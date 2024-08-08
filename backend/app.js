/* eslint-disable no-undef */
var fs = require("fs");
var http = require("http");
var https = require("https");
var cors = require("cors");
cookieParser = require("cookie-parser");

var privateKey = fs.readFileSync("D:\\ssl\\api.unicode.dev.key", "utf8");
var certificate = fs.readFileSync("D:\\ssl\\api.unicode.dev.crt", "utf8");

var credentials = { key: privateKey, cert: certificate };

var corsOptions = {
  origin: "https://unicode.dev:60140",
  credentials: true,
};

var express = require("express");
var app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (email !== "admin@gmail.com" || password !== "123456") {
    return res.status(401).json({ message: "Unathenticated" });
  }
  const tokens = {
    access_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjc0NDk0MDI4fQ.kCak9sLJr74frSRVQp0_27BY4iBCgQSmoT3vQVWKzJg",
    refresh_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjcyODAyMDI4fQ.P1_rB3hJ5afwiG4TWXLq6jOAcVJkvQZ2Z-ZZOnQ1dZw",
  };
  res.cookie("token", tokens.access_token, {
    httpOnly: true,
    secure: true,
    domain: "unicode.dev",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json(tokens);
});

app.get("/auth/profile", (req, res) => {
  const token = req.cookies.token;
  if (
    token ===
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjc0NDk0MDI4fQ.kCak9sLJr74frSRVQp0_27BY4iBCgQSmoT3vQVWKzJg`
  ) {
    return res.json({ name: "Hoàng An", email: "admin@gmail.com" });
  }
  res.status(401).json({ message: "Unauthorized" });
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);
