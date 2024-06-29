import React, { useState } from "react";

function Settings({ counters, formSubmit }) {
  const [formState, setFormState] = useState(counters);
  const [waitlistValue, setWaitlistValue] = useState(0);

  //Setting up a new formState as per the form
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const updatedTime = parseInt(value) * 1000;
    
    setFormState((prevState) =>
      prevState.map((counter) =>
        counter.id === parseInt(name)
          ? { ...counter, processingTime: updatedTime }
          : counter
      )
    );
  };

  //setting waitlist
  const handleWaitlistChange = (e) => {
    setWaitlistValue(parseInt(e.target.value));
  };

  //Change/Set initial state
  const handleSubmit = (e) => {
    e.preventDefault();

    //Resetting the processed value
    const newFormState = formState.map((counter) => ({
        ...counter,
        processed: [] 
    }));

    //Resetting waitlist
    setWaitlistValue(0);

    //Submit the form which is executed by parent
    formSubmit(newFormState, waitlistValue);
};

  return (
    <form className="app-counter-settings" onSubmit={handleSubmit}>
      {formState.map((counter) => (
        <div key={counter.id}>
          <h4 className="mb-2">
            <b>Counter {counter.id}</b>
          </h4>
          <div className="app-counter__input-group mb-4 flex flex-col lg:w-1/2">
            <label className="text-sm" htmlFor={`counter${counter.id}Time`}>
              Processing time(seconds)
            </label>
            <input
              onChange={handleOnChange}
              className="bg-transparent outline-none border border-slate-300 rounded-md mt-1 px-1 input-border-color"
              name={counter.id.toString()}
              value={counter.processingTime ? counter.processingTime / 1000: ""}
              id={`counter${counter.id}Time`}
              type="number"
              max="5"
            />
          </div>
        </div>
      ))}
      <div className="app-counter__input-group flex flex-col w-1/2 mt-6">
        <label className="text-sm" htmlFor="conter2Time">
          Add people
        </label>
        <input
          className="bg-transparent outline-none border border-slate-300 rounded-md mt-1 px-1 input-border-color"
          id="conter2Time"
          type="number"
          max="50"
          value={waitlistValue ? waitlistValue: ""}
          onChange={handleWaitlistChange}
        />
      </div>
      <button className="btn btn--primary my-4 px-3 py-1 rounded" type="submit">Set</button>
    </form>
  );
}

export default Settings;
