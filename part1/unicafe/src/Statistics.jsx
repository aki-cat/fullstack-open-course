export default function Statistics({ good, neutral, bad }) {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given.</p>
      </div>
    );
  }

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
}
