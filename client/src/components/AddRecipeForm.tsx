import React, { useState, ChangeEvent } from "react";
import { Ingredient } from "../App";

interface FormProps {
  handleAddRecipe(
    name: string,
    time: string,
    description: string,
    preparationList: Array<string>,
    ingredientsList: Array<Ingredient>
  ): void;
}

function AddRecipeForm(props: FormProps) {
  const [name, setName] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [preparation, setPreparation] = useState<string>("");
  const [preparationList, setPreparationList] = useState<string[]>([]);
  const [ingredientsAmount, setIngredientsAmount] = useState<string>("");
  const [ingredientsUnits, setIngredientsUnits] = useState<string>("");
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleChangeTime = (event: ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleChangePreparation = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPreparation(event.target.value);
  };
  const handleSubmitPreparation = () => {
    if (preparation !== null) {
      setPreparationList((prevItem) => [...prevItem, preparation]);
      setPreparation("");
    }
  };
  const handleChangeIngredientsAmount = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setIngredientsAmount(event.target.value);
  };
  const handleChangeIngredientsUnits = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setIngredientsUnits(event.target.value);
  };

  const handleChangeIngredient = () => {
    if (ingredientsAmount !== null && ingredientsUnits !== null) {
      let newIngredient: Ingredient = {
        amount: ingredientsAmount,
        name: ingredientsUnits,
      };
      setIngredientsList((prevItem) => [...prevItem, newIngredient]);
      setIngredientsAmount("");
      setIngredientsUnits("");
    }
  };

  const handleCreateNewRecipe = () => {
    handleChangeIngredient();
    if (
      name !== null &&
      time !== null &&
      description !== null &&
      ingredientsList !== null
    ) {
      props.handleAddRecipe(
        name,
        time,
        description,
        preparationList,
        ingredientsList
      );
    }
  };

  return (
    <div className="main center">
      <div className="flex-column">
        <h2 className="font-decoration">&bull; Add recipe! &bull;</h2>
        <div className="flex-row">
          <div className="form-section">
            <label>Name:</label>
            <input type="text" onChange={handleChangeName} required />
          </div>
          <div className="form-section">
            <label>Time:</label>
            <input type="text" onChange={handleChangeTime} required />
          </div>
        </div>
        <div className="form-section ">
          <label>Description:</label>
          <textarea onChange={handleChangeDescription}></textarea>
        </div>
        <div className="form-section">
          <table
            className={preparationList.length > 0 ? "list-of-added-value" : ""}
          >
            {preparationList.map((step, idx) => (
              <tr key={idx}>
                <td>
                  {idx + 1}. {step}
                </td>
              </tr>
            ))}
          </table>

          <label>Preparation:</label>
          <textarea
            onChange={handleChangePreparation}
            value={preparation}
          />
          {preparationList.length > 0 ? (
            <p></p>
          ) : (
            <p className="font-small">* Add at leas one</p>
          )}
          <div className="">
            <button
              className="button button-yellow"
              onClick={handleSubmitPreparation}
            >
              add step
            </button>
          </div>
        </div>
        <div className="form-section">
          <table
            className={ingredientsList.length > 0 ? "list-of-added-value" : ""}
          >
            {ingredientsList.map((ingredient, idx) => (
              <tr key={idx}>
                <td>{ingredient.amount}</td>
                <td>{ingredient.name}</td>
              </tr>
            ))}
          </table>
          <label>Ingredients:</label>
          <div className="flex-row">
            <input
              type="textNarrow"
              value={ingredientsAmount}
              placeholder="amount"
              onChange={handleChangeIngredientsAmount}
            />
            <input
              type="textNarrow"
              value={ingredientsUnits}
              placeholder="ingredient"
              onChange={handleChangeIngredientsUnits}
            />
          </div>
          <div>
            <button
              className="button button-yellow"
              onClick={handleChangeIngredient}
            >
              add ingredient
            </button>
          </div>
          {ingredientsList.length > 0 ? (
            <p></p>
          ) : (
            <p className="font-small">* Add at leas one</p>
          )}
        </div>
        <div>
          <div className="center">
            <button className="button" onClick={handleCreateNewRecipe}>
              Add new recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRecipeForm;
