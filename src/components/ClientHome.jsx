"use client";
import { useState, useEffect, useRef } from "react";
import Settings from "./Settings";
import CounterTable from "./CounterTable";
import Waitlist from "./Waitlist";

export default function ClientHome({ initialData }) {
  const [counters, setCounters] = useState(initialData);
  const [waitlist, setWaitlist] = useState([]);
  const [total, setTotal] = useState(0);
  const isProcessing = useRef(false);

  //Listening to the changes in waitlist and counters
  useEffect(() => {
    if (waitlist.length > 0) {
      const idleCounterIndex = counters.findIndex(
        (counter) => counter.processing === 0
      );
      if (idleCounterIndex !== -1) {
        startProcessing(idleCounterIndex);
      }
    }
  }, [waitlist, counters]);

  //Processing the que
  const startProcessing = (counterIndex) => {
    if (waitlist.length === 0) return;

    const person = waitlist[0];
    setWaitlist((prevWaitlist) => prevWaitlist.slice(1));
    isProcessing.current = true;

    setCounters((prevCounters) => {
      const newCounters = [...prevCounters];
      newCounters[counterIndex].processing = person;
      isProcessing.current = false;
      return newCounters;
    });

    //Complete the processing after timeout
    const processingTime = counters[counterIndex].processingTime;
    setTimeout(() => {
      setCounters((prevCounters) => {
        const newCounters = [...prevCounters];
        newCounters[counterIndex].processing = 0;
        newCounters[counterIndex].processed.push(person);
        return newCounters;
      });
    }, processingTime);
  };

  const handleAddPeople = () => {
    setTotal((prevTotal) => prevTotal + 1);
    setWaitlist((prevWaitlist) => [...prevWaitlist, total + 1]);
  };

  const handleFormSubmit = (newCounters, waitlistValue) => {
    setCounters(newCounters);
    setTotal(waitlistValue);
    setWaitlist(Array.from({ length: waitlistValue }, (_, i) => i + 1));
  };

  return (
    <main className="flex min-h-screen flex-row">
      <aside className="app-sidebar basis-3/12 p-5">
        <h3 className="text-lg mb-4">Set Que</h3>
        <Settings
          counters={counters}
          formSubmit={handleFormSubmit}
        />
      </aside>
      <section className="app-counter-wrapper grow p-8">
        <h2 className="text-2xl my-6">SBC Bank Counter</h2>
        <Waitlist 
          waitlist={waitlist} 
          handleAddPeople={handleAddPeople} 
          total={total} 
        />
        <CounterTable counters={counters} />
      </section>
    </main>
  );
}