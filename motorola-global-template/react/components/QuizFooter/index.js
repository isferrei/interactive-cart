import "./quizFooter.global.css";

const QuizFooter = props => {
  return (
    <div
      className="quiz-footer"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="qf-logo-container">
        <img src="https://motorolaimgrepo.vtexassets.com/arquivos/logo.svg" alt="Motorola Logo" />
      </div>
      <div className="qf-text-wrapper">
        <div className="qf-first-paragraph">{props.firstParagraph}</div>
        <div className="qf-second-paragraph">{props.secondParagraph}</div>
      </div>
    </div>
  );
};

QuizFooter.schema = {
  title: "Quiz Footer",
  description: "Configuration for Quiz footer",
  type: "object",
  properties: {
    backgroundColor: {
      description: "Enter the background color for footer(in #000A13 format)",
      title: "Background color",
      type: "string",
      default: "#000A13"
    },
    firstParagraph: {
      description: "Enter the text for first paragraph",
      title: "First paragraph",
      type: "string",
      default: ""
    },
    secondParagraph: {
      description: "Enter the text for second paragraph",
      title: "Second paragraph",
      type: "string",
      default: ""
    }
  }
};

export default QuizFooter;
