import { useState,useEffect } from 'react';
import { correct, wrong, congrats } from './assets/images/index'
import {capitalAndFlagQuestions} from './service/api'
import { render } from '@testing-library/react';
function App() {

  const [showScore, setShowScore] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
  async function main() {
   console.log(capitalAndFlagQuestions)
  }
  useEffect(() => {
    main()
  }, [])

  const handleAnswerOptionClick = (isCorrect) =>{
    if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < capitalAndFlagQuestions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
  }
  const handlePlayAgain =()=>{
    window.location.reload()
  }
  if(capitalAndFlagQuestions.length < 0){
    render (
      <div className='loading-section'>
        <h1>Loading</h1>
      </div>
    )
  }
  return (
    <div className='bg'>
      {showScore ? (
        <div className='score-section'>
          <img src={congrats} className='congrats-img' />
          <h3 className='congrats-title'>Congrats! You completed the quiz.</h3>
          <p className='congrats-score'>You answer {score}/{capitalAndFlagQuestions.length} correctly. </p>
          <button className='btn-play-again' onClick={()=> handlePlayAgain()}>Play again</button>
        </div>
      ):(
        <>
        <div className='container'>
        <div className='header'>
          <p className='title'>Country Quiz</p>
          <div className='section-count' >
            {capitalAndFlagQuestions.map((num,index) => (
              <button key={index} className={`count-circle ${index === currentQuestion ? 'active' : ''}`}>{index +1}</button>
              
            ))}
          </div>
        </div>
        <p className='section-questions'>{capitalAndFlagQuestions[currentQuestion].questionText}</p>
        <div className='section-answers'>
          {capitalAndFlagQuestions[currentQuestion].answerOptions.map((answerOption, index) => (
            <div className='answer-card' key={index} onClick={()=>handleAnswerOptionClick(answerOption.isCorrect)}>
              {answerOption.answerText}
            </div>
          ))}
        </div>
      </div></>
      )}
    </div>
  );
}

export default App;
