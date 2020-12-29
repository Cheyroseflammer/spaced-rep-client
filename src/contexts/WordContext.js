import React, { Component } from "react";

const LanguageContext = React.createContext({
  orig: "",
  trans: "",
  correctCount: 0,
  incorrectCount: 0,
  totalScore: 0,
  mode: null,
  guess: "",
  next: "",
  error: null,
  submitHandler: () => {},
  nextHandler: () => {},
  setError: () => {},
  clearError: () => {},
});

export default LanguageContext;

export class LanguageProvider extends Component {
  constructor(props) {
    super(props);
    const state = { language: {} };
    this.state = state;
  }

  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  render() {
    const value = {
      orig: this.state.orig,
      trans: this.state.trans,
      correctCount: this.state.wordCorrectCount,
      incorrectCount: this.state.wordIncorrectCount,
      totalScore: this.state.totalScore,
      mode: this.state.mode,
      guess: this.state.guess,
      next: this.state.next,
      error: this.state.error,
      submitHandler: this.state.submitHandler,
      nextHandler: this.state.nextHandler,
      setError: this.setError,
      clearError: this.clearError,
    };
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}
