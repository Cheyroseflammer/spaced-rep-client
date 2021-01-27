import React from "react";
import DataContext from "../../contexts/DataContext";
import Button from "../../components/Button/Button";

export default class Learn extends React.Component {
  static contextType = DataContext;

  render() {
    const {
      orig,
      trans,
      guess,
      correctCount,
      incorrectCount,
      totalScore,
      mode,
      submitHandler,
      nextHandler,
    } = this.context;
    const correctResult = mode === true ? correctCount + 1 : correctCount;
    const incorrectResult =
      mode === false ? incorrectCount + 1 : incorrectCount;
    const mytotalScore = mode === true ? totalScore + 1 : totalScore;

    return (
      <div>
        {mode === null && (
          <div>
            <h2>Translate the word: {orig}</h2>
            <h3>{orig}</h3>
            <form className="formguess" onSubmit={submitHandler}>
              <label htmlFor="guess-input">
                What is the correct translation for this word?
              </label>
              <input id="guess-input" name="guess" type="text" required />
              <Button type="submit" className="btn">
                Submit
              </Button>
            </form>
          </div>
        )}
        {mode === true && <h2 className="correct">Correct!</h2>}
        {mode === false && <h2 className="incorrect">Incorrect!</h2>}

        {mode !== null && (
          <div className="displayfeedback">
            <p>
              The correct translation for {orig} is {trans}. You chose {guess}
            </p>
            <Button onClick={nextHandler} className="btn">
              Try again
            </Button>
          </div>
        )}
        <section className="displayscore">
          {mode === true ? (
            <>
              <p className="totalscore">Total Score: {mytotalScore}</p>
              <p>You have answered this word correctly {correctResult} times</p>
            </>
          ) : (
            <>
              <p className="totalscore">Total Score: {mytotalScore}</p>
              <p>You have answered this word correctly {correctResult} times</p>
            </>
          )}
          {mode === false ? (
            <p>
              You have answered this word incorrectly {incorrectResult} times
            </p>
          ) : (
            <p>
              You have answered this word incorrectly {incorrectResult} times
            </p>
          )}
        </section>
      </div>
    );
  }
}
