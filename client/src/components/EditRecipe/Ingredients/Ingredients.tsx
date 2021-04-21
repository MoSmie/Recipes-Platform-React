import React, { useState, ChangeEvent } from "react";
import EditIngredient from "./EditIngredient";
import { Ingredient } from "../../../App";

interface IngredientsProps {
  listOfIngredients: Ingredient[];
}

function Ingredients(props: IngredientsProps) {
  const [idxOfIngredient, setIdxOfIngredient] = useState<number | boolean>(
    false
  );
  const [newIngredientAmount, setNewIngredientAmount] = useState<string>("");
  const [
    newIngredientDescription,
    setNewIngredientsDescription,
  ] = useState<string>("");

  const handleChangeIdxOfIngredient = (id: number) => {
    setIdxOfIngredient(id);
  };

  const handleChangeNewIngredientAmount = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setNewIngredientAmount(event.target.value);
  };

  const handleChangeNewIngredientDescription = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setNewIngredientsDescription(event.target.value);
  };

  const handleAddNewIngredient = () => {
    if (newIngredientAmount !== null && newIngredientDescription !== null) {
      let newIngredient: Ingredient = {
        amount: newIngredientAmount,
        name: newIngredientDescription,
      };
      props.listOfIngredients.push(newIngredient);
      setNewIngredientAmount("");
      setNewIngredientsDescription("");
    }
  };

  const handleSaveIngredient = (
    idxOfngredient: number,
    editIngredient: Ingredient
  ) => {
    for (let i = 0; i < props.listOfIngredients.length; i++) {
      if (i === idxOfngredient) {
        props.listOfIngredients[i].amount = editIngredient.amount;
        props.listOfIngredients[i].name = editIngredient.name;
      }
      setIdxOfIngredient(false);
    }
  };

  return (
    <div className="form-section">
      <div>
        {props.listOfIngredients.map((ingredient, idx) => (
          <tr key={idx}>
            {idxOfIngredient !== idx ? (
              <div className="flex-row">
                <div>{ingredient.amount}</div>
                <div className="flex-grow"> &nbsp;{ingredient.name}</div>
                <div>
                  <button
                    className="edit"
                    onClick={() => handleChangeIdxOfIngredient(idx)}
                  ></button>
                </div>
              </div>
            ) : (
              <EditIngredient
                ingredient={ingredient}
                idx={idx}
                onSave={handleSaveIngredient}
              />
            )}
          </tr>
        ))}
      </div>
      <h4>Add Ingredients:</h4>
      <input
        type="textNarrow"
        value={newIngredientAmount}
        placeholder="amount"
        onChange={handleChangeNewIngredientAmount}
      />
      <input
        type="textNarrow"
        value={newIngredientDescription}
        placeholder="ingredient"
        onChange={handleChangeNewIngredientDescription}
      />
      <button className="button button-yellow" onClick={handleAddNewIngredient}>
        Add ingredient
      </button>
    </div>
  );
}

export default Ingredients;
