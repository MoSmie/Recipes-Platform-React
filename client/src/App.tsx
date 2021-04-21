import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CardForLandingPage from "./components/Card";
import RecipeView from "./components/RecipeView";
import NavBar from "./components/NavBar";
import AddRecipeForm from "./components/AddRecipeForm";

function checkStatus(response: Response): Response {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw Error("failed to execute request");
  }
}

export interface Ingredient {
  amount: string;
  name: string;
}

export interface Recipe {
  id: string;
  imgUrl: string;
  name: string;
  time: string;
  description: string;
  ingredients: Array<Ingredient>;
  steps: Array<string>;
}

function App() {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<null | Recipe>(null);
  const [addRecipeFormIsOpen, setAddRecipeFormIsOpen] = useState<boolean>(
    false
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/recipes`)
      .then(checkStatus)
      .then((response: Response) => response.json())
      .then((data: Array<Recipe>) => {
        setAllRecipes(data);
      })
      .catch((err: Error) => {
        setError("Error! Could not load recipes");
      });
  }, []);

  const saveRecipeInBackend = (recipe: Recipe) => {
    let requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    };

    fetch(`/api/recipe/${recipe.id}`, requestOptions).catch((err) => {
      setError("Could not save your recipe. Please try agin.");
    });
  };

  const deleteRecipeFromBackend = (recipe: Recipe) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`/api/recipe/${recipe.id}`, requestOptions).catch((err) => {
      setError("We could not delete recipe. Please try agin.");
    });
  };

  const handleSelectRecipe = (recipe: Recipe | null): void => {
    setSelectedRecipe(recipe);
  };

  const handleOpenFromToAddRecipe = (): void => {
    setAddRecipeFormIsOpen(true);
    setSelectedRecipe(null);
  };

  const handleOpenLandingPage = (): void => {
    setAddRecipeFormIsOpen(false);
    setSelectedRecipe(null);
  };

  const handleEditRecipe = (recipe: Recipe): void => {
    handleSelectRecipe(recipe);
    for (let el of allRecipes) {
      if (el.id === recipe.id) {
        el.name = recipe.name;
        el.time = recipe.time;
        el.description = recipe.description;
        el.ingredients = recipe.ingredients;
        el.steps = recipe.steps;
      }
    }
    saveRecipeInBackend(recipe);
  };

  const handleDeleteRecipe = (recipe: Recipe): void => {
    allRecipes.splice(
      allRecipes.findIndex(function (i) {
        return i.id === recipe.id;
      }),
      1
    );
    deleteRecipeFromBackend(recipe);
    setSelectedRecipe(null);
  };

  const handleAddRecipe = (
    name: string,
    time: string,
    description: string,
    preparationList: Array<string>,
    ingredient: Array<Ingredient>
  ): void => {
    const id = uuidv4();
    const newRecipe: Recipe = {
      id: id,
      imgUrl: `/img/481b1bc1-20a0-4990-947b-e7ff72bcc374.jpg`,
      name: name,
      time: time,
      description: description,
      ingredients: ingredient,
      steps: preparationList,
    };
    setAllRecipes((prevItem) => [...prevItem, newRecipe]);
    saveRecipeInBackend(newRecipe);
    setAddRecipeFormIsOpen(false);
  };

  return (
    <div>
      <NavBar
        openAddRecipeFrom={handleOpenFromToAddRecipe}
        openLandingPage={handleOpenLandingPage}
      />
      {error !== null && (
        <div className="main">
          <h2>{error}</h2>
        </div>
      )}

      {selectedRecipe === null &&
        addRecipeFormIsOpen === false &&
        error === null && (
          <div className="main">
            <h2 className="font-decoration">&bull; Latest recipes&bull;</h2>
            <div className="gallery-wrapper">
              {allRecipes.map((recipe) => (
                <CardForLandingPage
                  recipe={recipe}
                  selectRecipe={handleSelectRecipe}
                />
              ))}
            </div>
          </div>
        )}

      {selectedRecipe !== null && (
        <RecipeView
          recipe={selectedRecipe}
          onDelete={handleDeleteRecipe}
          onEditRecipe={handleEditRecipe}
        />
      )}

      {addRecipeFormIsOpen && (
        <AddRecipeForm handleAddRecipe={handleAddRecipe} />
      )}
    </div>
  );
}

export default App;
