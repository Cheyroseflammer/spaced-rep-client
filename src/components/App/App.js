import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PublicOnlyRoute from "../PublicOnlyRoute/PublicOnlyRoute";
import RegistrationRoute from "../../routes/RegistrationRoute/RegistrationRoute";
import LoginRoute from "../../routes/LoginRoute/LoginRoute";
import DashboardRoute from "../../routes/DashboardRoute/DashboardRoute";
import LearningRoute from "../../routes/LearningRoute/LearningRoute";
import NotFoundRoute from "../../routes/NotFoundRoute/NotFoundRoute";
import DataContext, { LanguageProvider } from "../../contexts/DataContext";
import "./App.css";

export default class App extends Component {
  state = { hasError: false };

  static conextType = DataContext;

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    const contextValue = {
      hasError: this.state.hasError,
    };
    return (
      <LanguageProvider>
        <div className="App">
          <Header />
          <main>
            {contextValue.hasError === true ? (
              <p>There was an error! Oh no!</p>
            ) : null}
            <Switch>
              <PrivateRoute exact path={"/"} component={DashboardRoute} />
              <PrivateRoute path={"/learn"} component={LearningRoute} />
              <PublicOnlyRoute
                path={"/register"}
                component={RegistrationRoute}
              />
              <PublicOnlyRoute path={"/login"} component={LoginRoute} />
              <Route component={NotFoundRoute} />
            </Switch>
          </main>
        </div>
      </LanguageProvider>
    );
  }
}
