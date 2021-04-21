import React, { useState, ChangeEvent } from "react";
import { Ingredient } from "../../../App";

interface FormProps {
  ingredient: Ingredient;
  idx: number;
  onSave(idx: number, ingredient: Ingredient): void;
}

function EditIngredient(props: FormProps) {
  const [ingredientAmount, setIngredientAmount] = useState<string>(
    props.ingredient.amount
  );
  const [ingredientDescription, setIngredientDescription] = useState<string>(
    props.ingredient.name
  );

  const handleChangeIngredientAmount = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setIngredientAmount(event.target.value);
  };

  const handleChangeIngredientsDescription = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setIngredientDescription(event.target.value);
  };

  const handleSaveEditedIngredient = () => {
    let edited: Ingredient = {
      amount: ingredientAmount,
      name: ingredientDescription,
    };
    props.onSave(props.idx, edited);
  };

  return (
    <div>
      <input
        type="textNarrow"
        value={ingredientAmount}
        placeholder={ingredientAmount}
        onChange={handleChangeIngredientAmount}
      />
      <input
        type="textNarrow"
        value={ingredientDescription}
        placeholder={ingredientDescription}
        onChange={handleChangeIngredientsDescription}
      />
      <button className="save" onClick={handleSaveEditedIngredient}></button>
    </div>
  );
}

export default EditIngredient;
