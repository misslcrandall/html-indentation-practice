'use client';
import styles from './question-carousel.module.scss';
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
      <div className={`${styles.quiz}`}>
        <div className={`${styles.endPage}`}>
          <h2 className="">Exercise Complete</h2>
          <p className="">You have answered all the questions correctly.</p>
          <button
            onClick={handleRestart}
            className="btn-primary"
          >
            Restart Exercise
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.quiz}`}>
      <div className={`flex justify-content ${styles.heading}`}>
          <div>
            <h2 className="">{currentQuestion.instructions}</h2>
            <p>{currentQuestion.help_text}</p>
          </div>
          <div className={`${styles.questionNumber}`}>
            <p>{currentIndex + 1} / {CodeChallengeData.length}</p>
          </div>
      </div>
      
      {/* <p><i>Child status is: <strong>{isSolutionCorrect ? "TRUE" : "FALSE"}</strong></i></p> */}
      
      <CodeEditor challengeSolved={handleStatusChange} codeBlock={currentQuestion.codeBlock}/>

      {/* Navigation Buttons */}
      <div className={`${styles.navigation}`}>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`button__prev ${
            currentIndex === 0
              ? 'btn__disabled'
              : 'btn__active'
          }`}
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!isSolutionCorrect}
          className={`button__next ${
            !isSolutionCorrect
              ? 'btn__disabled'
              : 'btn__active'
          }`}
        >
          {currentIndex === CodeChallengeData.length - 1 ? 'Finish' : 'Next'}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className={`${styles.arrowSVG}`}>
            {/*--!Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.*/}
            <path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}