import React, { Component } from "react";
import DataContext from "../../contexts/DataContext";
import LanguageService from "../../services/language-api-service";
import Button from "../../components/Button/Button";
import { Label, Input } from "../../components/Form/Form";

class LearningRoute extends Component {
  static contextType = DataContext;
  constructor() {
    super();
    this.translateInput = React.createRef();
    this.state = {
      showResults: false,
      totalScore: "",
      results: {},
      isCorrect: null,
      guess: "",
      note: "Hello",
    };
  }

  componentDidMount() {
    LanguageService.getLanguageHead().then((res) =>
      this.context.setNextWord(res)
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const guess = this.translateInput.current.value;
    this.setState({ guess });
    LanguageService.languageGuess(guess, this.context.nextWord).then((res) => {
      this.setState({ results: res, showResults: true });
    });
    this.formRef.reset();
  };

  handleNextWord = (results) => {
    this.context.setNextWord(results);
    this.setState({ showResults: false });
  };

  renderQuestion() {
    const {
      nextWord,
      wordCorrectCount,
      wordIncorrectCount,
      totalScore,
    } = this.context;
    return (
      <section>
        <h3>{nextWord}</h3>
        <p>Total Score: {totalScore}</p>
        <p>Correct: {wordCorrectCount}</p>
        <p>Incorrect: {wordIncorrectCount}</p>
        <form onSubmit={this.handleSubmit} ref={(ref) => (this.formRef = ref)}>
          <Label htmlFor="learn-input">Translate:</Label>
          <Input
            id="learn-input"
            name="learn-input"
            type="text"
            ref={this.translateInput}
            required
          />
          <Button type="submit">Submit</Button>
        </form>
      </section>
    );
  }

  renderResults() {
    const { isCorrect, answer, totalScore } = this.state.results;
    return (
      <React.Fragment>
        <section>
          {isCorrect ? <h2>Correct! ✔️</h2> : <h2>That is not correct! ❌</h2>}
          <p>Total Score: {totalScore}</p>
        </section>
        <section>
          <p>
            The correct translation for <b> {this.context.nextWord} </b> was
            <i> {answer} </i> and you chose <b>{this.state.guess}</b>!
          </p>
          <Button onClick={() => this.handleNextWord(this.state.results)}>
            Next
          </Button>
        </section>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showResults ? this.renderResults() : this.renderQuestion()}
      </React.Fragment>
    );
  }
}

export default LearningRoute;
