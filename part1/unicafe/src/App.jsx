import { useState } from "react";
import Button from "./Button";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function calculateTotal() {
    return good - bad;
  }

  function calculateAverage() {
    return (good - bad) / (good + neutral + bad);
  }

  function calculatePositive() {
    return `${(good / (good + neutral + bad)) * 100}%`;
  }

  return (
    <div>
      <h1>UniCafé</h1>
      <h2>Give feedback</h2>
      <div>
        <Button text='Good' onClick={() => setGood(good + 1)} />
        <Button text='Neutral' onClick={() => setNeutral(neutral + 1)} />
        <Button text='Bad' onClick={() => setBad(bad + 1)} />
      </div>

      <h2>Statistics</h2>

      <div>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
      </div>
      ---
      <div>
        <p>All: {calculateTotal()}</p>
        <p>Average: {calculateAverage()}</p>
        <p>Positive: {calculatePositive()}</p>
      </div>
    </div>
  );
};

export default App;
