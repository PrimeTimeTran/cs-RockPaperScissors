import React, { useState } from "react";
import "./App.css";

import ChoiceCard from "./components/ChoiceCard";
import ChoiceButtons from "./components/ChoiceButtons";

import { CHOICES, getRoundOutcome } from "./utils";

function App() {
  const [prompt, setGamePrompt] = useState("1, 2, 3, SHOOT!");
  const [gameHistory, setGameHistory] = useState([]);
  const [previousWinner, setPreviousWinner] = useState(null);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);

  const onPlayerChoose = playerChoice => {
    const [result, compChoice] = getRoundOutcome(playerChoice);

    const newUserChoice = CHOICES[playerChoice];
    const newComputerChoice = CHOICES[compChoice];

    setGamePrompt(result);
    gameHistory.push(result);
    setGameHistory(gameHistory);
    setPlayerChoice(newUserChoice);
    setComputerChoice(newComputerChoice);

    if (result === "Victory!") setPreviousWinner("You");
    else if (result === "Defeat!") setPreviousWinner("Computer");
    else setPreviousWinner("Tie");
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-8 themed-grid-col">
            <ChoiceCard
              title="Computer"
              imgURL={computerChoice && computerChoice.url}
              previousWinner={previousWinner}
            />
            <h1>{prompt}</h1>
            <ChoiceButtons onPlayerChoose={onPlayerChoose} />
            <ChoiceCard
              title="You"
              previousWinner={previousWinner}
              imgURL={playerChoice && playerChoice.url}
            />
          </div>
          <div className="col-md-4 themed-grid-col">
            <h3>History</h3>
            <ul>
              {gameHistory.map(result => {
                return <li>{result}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
