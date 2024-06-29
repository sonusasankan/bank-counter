"use client";
import React from "react";

function CounterTable({ counters }) {
  return (
    <table className="border-collapse border border-blue-light w-full my-4">
      <thead>
        <tr>
          <th className="border border-blue-light h-16">Counter</th>
          <th className="border border-blue-light h-16">Processing</th>
          <th className="border border-blue-light h-16">Processed</th>
        </tr>
      </thead>
      <tbody>
        {counters.map((counter) => (
          <tr className="h-12" key={counter.id}>
            <td className="border border-blue-light">{counter.id}</td>
            <td className="border border-blue-light">
              {counter.processing? counter.processing: 'idle'}
            </td>
            <td className="border border-blue-light">
              {counter.processed.map((item, index) => (
                <span key={index}>
                  {index > 0 ? "," : ""}
                  {item}
                </span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CounterTable;
