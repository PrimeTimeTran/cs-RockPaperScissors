import React, { useState } from "react";
import "./App.css";

import ChoiceCard from "./components/ChoiceCard";
import ChoiceButtons from "./components/ChoiceButtons";

const CHOICES = {
  scissors: {
    name: "scissors",
    url: "http://www.pngmart.com/files/1/Scissors-PNG-Pic.png"
  },
  paper: {
    name: "paper",
    url: "http://pngimagesfree.com/Paper/Thumb/blank-note-paper-free-clipa.png"
  },
  rock: {
    name: "rock",
    url:
      "https://opengameart.org/sites/default/files/forum-attachments/very%20simple%20rock_0.png"
  }
};

const getRandomChoice = () => {
  var keys = Object.keys(CHOICES);
  return CHOICES[keys[(keys.length * Math.random()) << 0]];
};

const getRoundOutcome = userChoice => {
  const computerChoice = getRandomChoice().name;
  let result;

  if (userChoice === "rock") {
    result = computerChoice === "scissors" ? "Victory!" : "Defeat!";
  }
  if (userChoice === "paper") {
    result = computerChoice === "rock" ? "Victory!" : "Defeat!";
  }
  if (userChoice === "scissors") {
    result = computerChoice === "paper" ? "Victory!" : "Defeat!";
  }

  if (userChoice === computerChoice) result = "Tie game!";
  return [result, computerChoice];
};

function App() {
  const [computerChoice, setComputerChoice] = useState(getRandomChoice());
  const [playerChoice, setPlayerChoice] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [prompt, setGamePrompt] = useState(null);
  const [previousWinner, setPreviousWinner] = useState(null);

  const onPlayerChoose = playerChoice => {
    const [result, compChoice] = getRoundOutcome(playerChoice);
    const newUserChoice = CHOICES[playerChoice];
    const newComputerChoice = CHOICES[compChoice];
    setGamePrompt(result);
    gameHistory.push(result);
    setGameHistory(gameHistory);
    setPlayerChoice(newUserChoice);
    setComputerChoice(newComputerChoice);
    if (result === "Victory!") {
      setPreviousWinner("You");
    } else if (result === "Defeat!") {
      setPreviousWinner("Computer");
    } else {
      setPreviousWinner("Tie");
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-8 themed-grid-col">
            <ChoiceCard
              title="Computer"
              imgURL={computerChoice.url}
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
