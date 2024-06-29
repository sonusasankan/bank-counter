"use client";
import React from "react";

function Waitlist({ waitlist, handleAddPeople, total }) {
  return (
    <div className="app-counter__table">
      <div className="flex justify-between items-center">
        <h2 className="text-higlight-blue">
          Waitlist: {waitlist.length}
        </h2>
        <button
          className="btn btn--primary rounded p-2"
          onClick={handleAddPeople}
        >
          Next <b>{total + 1}</b>
        </button>
      </div>
    </div>
  );
}

export default Waitlist;
