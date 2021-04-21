import React, { useState, ChangeEvent } from "react";

interface FormProps {
  step: string;
  idx: number;
  onSave(idx: number, step: string): void;
}

function EditStep(props: FormProps) {
  const [text, setText] = useState<string>(props.step);

  const handleChangeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="flex-row">
      <span className="bold">{props.idx + 1}</span>
      <textarea
        value={text}
        className="textarea-narrow"
        onChange={handleChangeText}
      ></textarea>
      <button className="button" onClick={() => props.onSave(props.idx, text)}>
        save
      </button>
    </div>
  );
}

export default EditStep;
