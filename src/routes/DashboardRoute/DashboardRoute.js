import React, { Component } from "react";
import DataContext from "../../contexts/DataContext";
import Button from "../../components/Button/Button";
import LanguageService from "../../services/language-api-service";
import { Link } from "react-router-dom";

class DashboardRoute extends Component {
  static contextType = DataContext;

  componentDidMount() {
    LanguageService.fetchLanguage().then((res) => {
      const { language, words } = res;
      this.context.setDashboard(language, words);
    });
  }

  render() {
    const { language, words = [] } = this.context;
    return (
      <section className="dashboard">
        <h2>{language.name}</h2>
        <h3>Total Score: {language.total_score}</h3>
        <Link to="/learn">
          <Button className="start-button">Start</Button>
        </Link>
        <div className="stats">
          <ul>
            {words.map((word, index) => (
              <fieldset key={index}>
                <li>
                  <h3>{word.original}</h3>
                  <p>Correct: {this.context.words[index].correct_count}</p>
                  <p>Incorrect: {this.context.words[index].incorrect_count}</p>
                </li>
              </fieldset>
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

export default DashboardRoute;
