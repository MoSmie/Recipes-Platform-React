import React, { useState, ChangeEvent } from "react";
import EditStep from "./EditStep";

interface StepsProps {
  listOfSteps: string[];
}

function Steps(props: StepsProps) {
  const [idxOfStep, setIdxOfStep] = useState<number | boolean>(false);
  const [newStep, setNewStep] = useState<string>("");

  const handleChangeIdxOfStep = (id: number) => {
    setIdxOfStep(id);
  };

  const handleSaveChangeInStep = (idx: number, newText: string) => {
    for (let i = 0; i < props.listOfSteps.length; i++) {
      if (i === idx) {
        props.listOfSteps[i] = newText;
      }
    }
    setIdxOfStep(false);
  };

  const handleChangeNewStep = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewStep(event.target.value);
  };

  const handleAddStep = () => {
    if (newStep !== null) {
      props.listOfSteps.push(newStep);
      setNewStep("");
    }
  };

  return (
    <div className="form-section">
      <div className="list-items-to-edit">
        {props.listOfSteps.map((step, idx) => (
          <div key={idx}>
            {idxOfStep !== idx ? (
              <div className="flex-row">
                <span className="bold">{idx + 1}</span>. {step}
                <div>
                  <button
                    className="edit"
                    onClick={() => handleChangeIdxOfStep(idx)}
                  ></button>
                </div>
              </div>
            ) : (
              <EditStep step={step} idx={idx} onSave={handleSaveChangeInStep} />
            )}
          </div>
        ))}
      </div>
      <h4>Add Step:</h4>
      <textarea
        onChange={handleChangeNewStep}
        value={newStep}
        rows={2}
      ></textarea>
      <div>
        <button className="button button-yellow" onClick={handleAddStep}>
          add step
        </button>
      </div>
    </div>
  );
}

export default Steps;
