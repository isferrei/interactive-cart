import React from 'react';
import './FAQ.global.css';
import IconMinus from '../../utils/IconMinus';
import IconPlus from '../../utils/IconPlus';
import { FormattedMessage } from "react-intl";
import Collapsible from 'react-collapsible';

class FAQ extends React.Component {
  state = {
    questionsOpen: {}
  }

  componentDidMount() {
    let questions = {}
    if (!this.props.faq || (this.props.faq && this.props.faq.length == 0)) return
    this.props.faq.map((question, key) => (
      questions[key] = false
    ))
    this.setState({questionsOpen: questions})
  }

  toggleQuestion = (questionKey) => {
    let questions = {}
    this.props.faq.map((question, key) => {
      if (key !== questionKey) {
        questions[key] = false
      }
    })
    questions[questionKey] = !this.state.questionsOpen[questionKey]
    this.setState({ questionsOpen: questions })
  }

  static schema = {
    title: 'FAQ',
    description: 'FAQ',
    type: 'object',
    properties: {
      showFAQ: {
        type: "boolean",
        title: "Show FAQ",
        default: true
      },
      faq: {
        items: {
          title: 'FAQ',
          type: 'object',
          properties: {
            question: {
              default: '',
              title: 'Question',
              type: 'string',
            },
            answer: {
              default: '',
              title: 'Answer',
              type: 'string',
            },
          },
        },
        minItems: 1,
        title: 'List items',
        type: 'array',
        default: [],
      }
    },
  };

  render() {
    if(!this.props.showFAQ) {
      return null;
   }

    if (!this.props.faq || this.props.faq && this.props.faq.length == 0) {
      return (
        <div></div>
      )
    }

    return (
      <div className="pdp-faq-container">
      <div className="container">
        <div className="pdp-faq-title">
          <h1><FormattedMessage id="store/faq.title"/></h1>
        </div>
        <div className="pdp-faq">
          {this.props.faq.map((question, key) => (
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



export default FAQ;