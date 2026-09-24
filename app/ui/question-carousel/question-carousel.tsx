'use client';
import { useState } from 'react';
import CodeChallenges from '@/data/CodeChallenges.json';
import CodeEditor from '@/app/ui/code-editor/code-editor';


export default function QuestionCarousel() {
  const CodeChallengeData = CodeChallenges.codeChallenges;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = CodeChallengeData[currentIndex];
  
  const [isFinished, setIsFinished] = useState(false);

  // Check if the current answer is correct
  const handleStatusChange = (booleanValue) => {
    setIsSolutionCorrect(booleanValue);
  };
  
  const [isSolutionCorrect, setIsSolutionCorrect] = useState(false);

  // Move to next question or end page
  const handleNext = () => {
    if (currentIndex < CodeChallengeData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Move back to previous question
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Reset Quiz
  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFinished(false);
  };

  // Final Page
  if (isFinished) {
    return (
      <div className="">
        <h2 className="">Quiz Completed! 🎉</h2>
        <p className="">You successfully answered all the questions correctly.</p>
        <button
          onClick={handleRestart}
          className="button__primary"
        >
          Restart Exercise
        </button>
      </div>
    );
  }

  return (
    <div className="">

      <div className="">
          <h3 className="text-lg font-medium text-gray-800 mb-4">{currentQuestion.instructions}</h3>
          <p>Question {currentIndex + 1} of {CodeChallengeData.length}</p>
      </div>

      <p><i>Child status is: <strong>{isSolutionCorrect ? "TRUE" : "FALSE"}</strong></i></p>
      

      <CodeEditor challengeSolved={handleStatusChange} codeBlock={currentQuestion.codeBlock}/>

      {/* Navigation Buttons */}
      <div className="carousel__navigation">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`button__prev ${
            currentIndex === 0
              ? 'bt_disabled'
              : 'bt__active'
          }`}
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!isSolutionCorrect}
          className={`button__next ${
            !isSolutionCorrect
              ? 'bt_disabled'
              : 'bt__active'
          }`}
        >
          {currentIndex === CodeChallengeData.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}