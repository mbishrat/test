import React, { useState, useEffect } from 'react'
const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin"],
      correctAnswer: "Paris"
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5"],
      correctAnswer: "4"
    },
    // Add more questions as needed
  ];

function Index() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
  
    useEffect(() => {
      let timer;
      if (currentQuestion < questions.length) {
        timer = setTimeout(() => {
          handleNextQuestion();
        }, 30000); // Set the timer to 30 seconds
      }
  
      return () => clearTimeout(timer);
    }, [currentQuestion]);
  
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
    };
  
    const handleNextQuestion = () => {
      if (selectedOption === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
  
      setSelectedOption(null);
  
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        alert(`Quiz completed! Your score is ${score}/${questions.length}`);
      }
    };
  return (
    <div>
    <h1>Question {currentQuestion + 1}</h1>
      <h2>{questions[currentQuestion].question}</h2>
      <h3>Score: {score}</h3>
      {questions[currentQuestion].options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={() => handleOptionSelect(option)}
          />
          <label>{option}</label>
        </div>
      ))}
      <button onClick={handleNextQuestion}>Next</button>  
    </div>
  )
}

export default Index
