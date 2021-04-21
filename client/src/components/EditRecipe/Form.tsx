import React, { useState, ChangeEvent } from "react";
import { Ingredient, Recipe } from "../../App";
import Steps from "./Steps/Steps";
import Ingredients from "./Ingredients/Ingredients";

interface FormProps {
  recipe: Recipe;
  onEditRecipe(editRecipe: Recipe): void;
}

function EditRecipeForm(props: FormProps) {
  const [name, setName] = useState<string>(props.recipe.name);
  const [time, setTime] = useState<string>(props.recipe.time);
  const [description, setDescription] = useState<string>(
    props.recipe.description
  );

  const listOfSteps: Array<string> = props.recipe.steps;
  const listOfIngredients: Array<Ingredient> = props.recipe.ingredients;

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChangeTime = (event: ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleEditRecipe = () => {
    if (
      name !== null &&
      time !== null &&
      description !== null &&
      listOfIngredients !== null
    ) {
      const editRecipe: Recipe = {
        id: props.recipe.id,
        imgUrl: props.recipe.imgUrl,
        name: name,
        time: time,
        description: description,
        ingredients: listOfIngredients,
        steps: listOfSteps,
      };

      props.onEditRecipe(editRecipe);
    }
  };

  return (
    <div className="center">
      <div className="flex-column">
        <h2 className="font-decoration">&bull;Edit recipe! &bull;</h2>
        <div className="flex-row">
          <div className="form-section ">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={handleChangeName}
              required
            />
          </div>
          <div className="form-section">
            <label>Time:</label>
            <input
              type="text"
              value={time}
              onChange={handleChangeTime}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={handleChangeDescription}
            rows={4}
            cols={23}
          ></textarea>
        </div>
        <h4>Preparation Steps:</h4>
        <Steps listOfSteps={listOfSteps} />

        <label>Ingredients:</label>
        <Ingredients listOfIngredients={listOfIngredients} />

        <div className="center">
          <button className="button" onClick={handleEditRecipe}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditRecipeForm;
