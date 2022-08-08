import React from 'react';
import IconMinus from '../../../../utils/IconMinus';
import IconPlus from '../../../../utils/IconPlus';
import { FormattedMessage } from "react-intl";
import Collapsible from 'react-collapsible';
import "./FAQ.global.css";

class FAQ extends React.Component {
  state = {
    questionsOpen: {}
  }

  componentDidMount() {
    let questions = {}
    if (!this.props.data.faq_questions_and_answers || (this.props.data.faq_questions_and_answers && this.props.data.faq_questions_and_answers.length == 0)) return
    this.props.data.faq_questions_and_answers.map((questions, key) => (
      questions[key] = false
    ))
   this.setState({questionsOpen: questions})
   }

  toggleQuestion = (questionKey) => {
    let questions = {}
    this.props.data.faq_questions_and_answers.map((questions, key) => {
      if (key !== questionKey) {
        questions[key] = false
      }
    })
    questions[questionKey] = !this.state.questionsOpen[questionKey]
    this.setState({ questionsOpen: questions })
  }

    render() {
      const {
        title,
        faq_questions_and_answers
      } = this.props.data;
      const {
        question,
        answer
      } = this.props.data.faq_questions_and_answers;
      return (
        <div className="pdp-faq-container">
         <div className="container">
        <div className="pdp-faq-title">
          <h1>{this.props.data.title}</h1>
        </div>
         <div className="pdp-faq">
          {this.props.data.faq_questions_and_answers.map((question, key) => (
            <div key={key} className="pdp-faq-question-container">
              <Collapsible handleTriggerClick={() => this.toggleQuestion(key)} open={this.state.questionsOpen[key]} transitionTime={300} trigger={
                <div className="pdp-faq-question-title">
                  <div className="pdp-faq-question" dangerouslySetInnerHTML={{ __html: question.question }}></div>
                  <div className="pdp-faq-question-icon">
                    {!this.state.questionsOpen[key] ? <IconPlus className="pdp-faq-question-icon-svg" type={2} /> : <IconMinus className="pdp-faq-question-icon-svg" type={2} />}
                  </div>
                </div>
              }>
                <div className="pdp-faq-answer" dangerouslySetInnerHTML={{ __html: question.answer }}></div>
              </Collapsible>
            </div>
          ))}
        </div> 
        </div>
        </div>
      )
    }
  }

export default FAQ