import React, { Component } from "react";

const DataContext = React.createContext({
  lagnuage: {},
  words: [],
  nextWord: "",
  wordCorrectCount: 0,
  wordIncorrectCount: 0,
  totalScore: 0,
  setDashboard: () => {},
  setNextWord: () => {},
});

export default DataContext;

export class LanguageProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lagnuage: {},
      words: [],
      nextWord: "",
      wordCorrectCount: 0,
      wordIncorrectCount: 0,
      totalScore: 0,
    };
  }
  setDashboard = (language, words) => {
    this.setState({ language, words });
  };
  setNextWord = (res) => {
    this.setState({
      nextWord: res.nextWord,
      wordCorrectCount: res.wordCorrectCount,
      wordIncorrectCount: res.wordIncorrectCount,
      totalScore: res.totalScore,
    });
  };
  render() {
    const value = {
      language: this.state.language,
      words: this.state.words,
      nextWord: this.state.nextWord,
      wordCorrectCount: this.state.wordCorrectCount,
      wordIncorrectCount: this.state.wordIncorrectCount,
      totalScore: this.state.totalScore,
      setDashboard: this.setDashboard,
      setNextWord: this.setNextWord,
    };
    return (
      <DataContext.Provider value={value}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
