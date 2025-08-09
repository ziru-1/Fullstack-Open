import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const isNoFeedback = total === 0;
  const average = isNoFeedback ? 0 : (good - bad) / total;
  const positive = isNoFeedback ? 0 : (good / total) * 100;

  return (
    <>
      <p>
        <b>statistics</b>
      </p>
      {isNoFeedback ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" statistic={good} />
            <StatisticLine text="neutral" statistic={neutral} />
            <StatisticLine text="bad" statistic={bad} />
            <StatisticLine text="all" statistic={total} />
            <StatisticLine text="average" statistic={average} />
            <StatisticLine text="positive" statistic={positive} />
          </tbody>
        </table>
      )}
    </>
  );
};

const StatisticLine = ({ text, statistic }) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td> {statistic}{text === "positive" && "%"}</td>
    </tr>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <p>
        <b>give feedback</b>
      </p>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
