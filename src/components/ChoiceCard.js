import React from 'react'

const DEFAULT_IMG = "http://www.thewateringhole.co.uk/wp-content/uploads/2012/12/play.png"

export default function ChoiceCard(props) {
  let won = props.title === props.previousWinner
  const className = won ? 'winner' : props.previousWinner !== 'Tie' && 'loser'
  let prompt
  if (props.title === props.previousWinner) {
    prompt = 'Won'
  } else if (props.previousWinner === 'Tie') {
    prompt = 'Tie'
  } else {
    prompt = 'Lose'
  }
  
  return (
    <div 
      className={`choice-card ${className}`} 
    >
      <h1>{props.title}</h1>
      <img src={props.imgURL || DEFAULT_IMG} alt={props.title}/>
      <h3>{prompt}</h3>
    </div>
  )
}

