import React from "react";
import { Recipe } from "../App";

interface RecipeProps {
  recipe: Recipe;
  selectRecipe(recipe: Recipe): void;
}

function CardForLandingPage(props: RecipeProps) {
  const backgroundImage = {
    backgroundImage: `url(${props.recipe.imgUrl})`,
  };

  return (
    <div
      className="flex-card shadow"
      style={backgroundImage}
      onClick={() => props.selectRecipe(props.recipe)}
    >
      <div className="align-flex-end">
        <span>{props.recipe.time}</span>
        <h2>{props.recipe.name}</h2>
      </div>
    </div>
  );
}

export default CardForLandingPage;
