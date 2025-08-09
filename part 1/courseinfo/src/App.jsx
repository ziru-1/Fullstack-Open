import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    console.log(good)
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    console.log(good)
  };
  
  const handleBadClick = () => {
    setBad(bad + 1);
    console.log(good)
  };

  return (
    <div>
      <p><b>give feedback</b></p>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <p><b>statistics</b></p>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

export default App;
