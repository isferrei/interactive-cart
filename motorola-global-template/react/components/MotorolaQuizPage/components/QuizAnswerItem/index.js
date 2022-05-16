import "./quizAnswerItem.global.css";

const QuizAnswerItem = props => {
  return (
    <div className="qq-answer-choice-container">
      <input
        type="radio"
        id={props.id}
        name={props.name}
        className="qq-input-hidden"
        value={props.data.choiceValue}
      />
      <div className="qq-answer-choice">
        <label htmlFor={props.id} onClick={()=>{props.clicked(props.data.choiceValue)}}>
          <img src={props.data.answerImage} alt={props.data.answerLabel} />
          <div className="qq-answer-label">{props.data.answerLabel}</div>
        </label>
      </div>
    </div>
  );
};

export default QuizAnswerItem;
