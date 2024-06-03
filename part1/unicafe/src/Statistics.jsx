import StatisticLine from "./StatisticLine";

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
        <StatisticLine text='Good' value={good} />
        <StatisticLine text='Neutral' value={neutral} />
        <StatisticLine text='Bad' value={bad} />
      </div>
      ---
      <div>
        <StatisticLine text='All' value={calculateTotal()} />
        <StatisticLine text='Average' value={calculateAverage()} />
        <StatisticLine text='Positive' value={calculatePositive()} />
      </div>
    </div>
  );
}
