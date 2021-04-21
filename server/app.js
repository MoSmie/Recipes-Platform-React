const fs = require("fs");
const express = require("express");
const app = express();
const port = 3001;
const { validate: uuidValidate } = require("uuid");
const recipes = require("./data.js");

app.use(express.static("../client/build"));
app.use(express.json());

app.get("/api/recipes", (req, res) => {
  res.json(recipes);
});

app.put("/api/recipe/*", function (req, res) {
  const r = new RegExp("/api/recipe/(.+)");
  const result = r.exec(req.url);
  const recipeId = result[1];
  console.log("put recipe *");
  saveOrEditRecipe(req, res, recipeId);
});

app.delete("/api/recipe/*", function (req, res) {
  const r = new RegExp("/api/recipe/(.+)");
  const result = r.exec(req.url);
  const recipeId = result[1];

  deleteRecipe(req, res, recipeId);
});

app.get("/img/*", function (req, res) {
  const r = new RegExp("/img/(.+)");
  const result = r.exec(req.url);
  const imgUrl = result[1];
  console.log("get img *");

  fs.readFile("img/" + imgUrl, function (error, data) {
    if (error) {
      res.status(404);
    } else {
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(data);
    }
  });
});

function saveOrEditRecipe(req, res, recipeId) {
  const newRecipe = req.body;

  if (newRecipe.id === undefined || !uuidValidate(newRecipe.id)) {
    res.status(500).json({
      error: `Given ID of note is not valid: ${newRecipe.id}`,
    });
    return;
  }

  let recipeIdFound = false;
  for (let recipe of recipes) {
    if (recipe.id === newRecipe.id) {
      recipeIdFound = true;

      recipe.name = newRecipe.name;
      recipes.time = newRecipe.time;
      recipes.description = newRecipe.description;
      recipes.ingredients = newRecipe.ingredients;
      recipes.steps = newRecipe.steps;
    }
  }
  if (recipeIdFound === false) {
    recipes.push(newRecipe);
  }
  res.status(200).end();
}

function deleteRecipe(req, res, recipeId) {
  if (recipeId === undefined || !uuidValidate(recipeId)) {
    res.status(500).json({
      error: "Given ID of note to be deleted is not valid",
    });
    return;
  } else if (recipeId) {
    recipes.splice(
      recipes.findIndex(function (i) {
        return i.id === recipeId;
      }),
      1
    );
    res.send("ok");
  }
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// shut down server
function shutdown() {
  server.close(function onServerClosed(err) {
    if (err) {
      console.error(err);
      process.exitCode = 1;
    }
    process.exit();
  });
}
// quit on ctrl-c when running docker in terminal
process.on("SIGINT", function onSigint() {
  console.log("Got SIGINT (aka ctrl-c in docker). Graceful shutdown");
  shutdown();
});
// quit properly on docker stop
process.on("SIGTERM", function onSigterm() {
  console.log("Got SIGTERM (docker container stop). Graceful shutdown");
  shutdown();
});
