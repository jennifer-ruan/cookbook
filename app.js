var express = require("express");
var app = express();
var users = require("./temp_db/users.json");
var recipes = require("./temp_db/recipes.json");

app.get("/users", (req, res, next) => {
  res.json(users);
});

app.get("/recipes", (req, res, next) => {
  res.json(recipes);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
