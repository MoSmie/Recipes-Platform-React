import React, { useState } from "react";
import { Recipe } from "../App";
import EditRecipeForm from "./EditRecipe/Form";

interface RecipeProps {
  recipe: Recipe;
  onDelete(recipe: Recipe): void;
  onEditRecipe(recipe: Recipe): void;
}

function RecipeView(props: RecipeProps) {
  const [editIsOpen, setEditIsOpen] = useState(false);

  const handleDeletRecipe = () => {
    props.onDelete(props.recipe);
  };

  const handleOpenFormToEditRecipe = () => {
    setEditIsOpen(true);
  };

  const handleEditRecipe = (editRecipe: Recipe) => {
    props.onEditRecipe(editRecipe);
    setEditIsOpen(false);
  };

  const backgroundImage = {
    backgroundImage: `url(${props.recipe.imgUrl})`,
  };

  return (
    <div className="main">
      {!editIsOpen && (
        <div className="article-and-aside">
          <div className="article">
            <div className="header-img shadow" style={backgroundImage}>
              <div className="align-flex-end">
                <span>{props.recipe.time}</span>
                <h2>{props.recipe.name}</h2>
              </div>
            </div>
            <p>{props.recipe.description}</p>
            <h2 className="font-decoration">&bull; Preparing &bull;</h2>
            <ol>
              {props.recipe.steps.map((step, idx) => (
                <li>{step}</li>
              ))}
            </ol>
          </div>
          <div className="aside">
            <div className="flex-row">
                <div>
                  <button
                    className="button button-yellow"
                    onClick={handleOpenFormToEditRecipe}
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <button
                    className="button button-yellow"
                    onClick={handleDeletRecipe}
                  >
                    Delet
                  </button>
                </div>
            </div>

            <h2 className="font-decoration"> &bull; Ingredients &bull; </h2>
            <table>
              {props.recipe.ingredients.map((ingredient, idx) => (
                <tr key={idx}>
                  <td>{ingredient.amount}</td>
                  <td>{ingredient.name}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}
      {editIsOpen && (
        <EditRecipeForm
          recipe={props.recipe}
          onEditRecipe={handleEditRecipe}
        />
      )}
    </div>
  );
}
export default RecipeView;
