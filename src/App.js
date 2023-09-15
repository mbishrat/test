import React, { useState, useEffect } from 'react';
import './App.css';
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
  {
    question: 'who is best',
    options: ['You','Me', 'other'],
    correctAnswer: 'other'
  },
  {
    question: 'who is not bad for health in large coantity',
    options: ['milk','botel', 'water'],
    correctAnswer: 'water'
  },
];

function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);

  useEffect(() => {
    let timer;
    if (currentQuestion < questions.length) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
        setTimeRemaining(30);
        handleNextQuestion();
      }, 30000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
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

    setTimeRemaining(30); // Reset timer for the next question
  };

  return (
    <div className="quiz-container">
  <h1 className="question-heading">Question {currentQuestion + 1}</h1>
  <h2 className="question-text">{questions[currentQuestion].question}</h2>
  <h3 className="timer">Time Remaining: {timeRemaining} seconds</h3>
  <h3 className="score">Score: {score}</h3>
  {questions[currentQuestion].options.map((option, index) => (
    <div className="option-container" key={index}>
      <input
        className="option-input"
        type="radio"
        value={option}
        checked={selectedOption === option}
        onChange={() => handleOptionSelect(option)}
      />
      <label className="option-label">{option}</label>
    </div>
  ))}
  <button className="next-button" onClick={handleNextQuestion}>Next</button>
</div>

  );
}

export default QuizApp;
