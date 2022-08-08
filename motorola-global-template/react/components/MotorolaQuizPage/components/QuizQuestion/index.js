import QuizAnswerItem from "../QuizAnswerItem/index";
// import { useState, useEffect } from "react";
import "./quizQuestion.global.css";

const QuizQuestion = props => {
  const answerClick = answer => {
    props.fetch(answer, props.index);
  };
  
  return (
    <div className="quiz-question">
      <div className={props.error ? "qq-question error" : "qq-question"}>
        {props.data.question}
      </div>
      <div className="qq-answer-container">
        {props.data.answers.map((answer, index) => {
          return (
            <QuizAnswerItem
              name={`qq-answer${props.index}`}
              id={`qq-answer-choice${props.index}${index}`}
              data={answer}
              key={index}
              clicked={answerClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion;
