import React from 'react';
import { connect } from 'react-redux';
import './QuestionBox.css';

class QuestionBox extends React.Component {
  handleOptionClick = (event) => {
    const { questionId } = this.props.qObj;
    const newUserResponse = {
    };
    newUserResponse[questionId] = event.target.value;
    fetch(
      '/saveUserResponse',
      {
        method: 'POST',
        body: JSON.stringify({
          userName: this.props.userName,
          questionId,
          optionNum: event.target.value,
        }),
      },
    )
      .then(res => res.json())
      .then((json) => {
        this.props.updateUserResponses(newUserResponse);
      });
  }

  render() {
    const { options } = this.props.qObj;
    const { userResponses } = this.props;
    const { questionId } = this.props.qObj;
    let previouslySelectedOption = null;
    previouslySelectedOption = userResponses[questionId];

    const optionsPerQuestionArray = Object.keys(options).map((optionKey) => {
      console.log(questionId, options, previouslySelectedOption === optionKey);
      return (
        <div className="option">
          <input
            className="radioButton"
            type="radio"
            name={`${questionId}`}
            value={optionKey}
            checked={optionKey === previouslySelectedOption}
            onClick={this.handleOptionClick}
          />
          <h4>{options[optionKey]}</h4>
        </div>
      );
    });

    return (
      <div className="questionBox">
        <div className="questionHeader">
          <h3>{`question${this.props.qObj.questionId}`}</h3>
        </div>
        <div className="questionContent">
          {this.props.qObj.question}
        </div>
        <div className="optionsArea">
          {optionsPerQuestionArray}
        </div>
      </div>
    );
  }
}

export default QuestionBox;

