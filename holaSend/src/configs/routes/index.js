import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "../../pages";
import Dashboard from "../../pages/Dashboard";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import { ADMIN, STAFF } from "../constants/roles/roleConstant";
import ErrorCommon from "../../pages/Error/ErrorCommon";
import ForgetPassword from "../../pages/Password/ForgetPassword";
import RecoverPassword from "../../pages/Password/RecoverPassword";

const Routes = () => {
  const [token] = useState(localStorage.getItem("token"))
  const [role] = useState(localStorage.getItem("role"))

  return (
    <Router>
      <Switch>
        <Route path="/login" exact render={() => (
          (role == ADMIN || role == STAFF) && token ?
            <Redirect to="/dashboard" /> : <Login />
        )} />

        <Route path="/register" exact render={() => (
          (role == ADMIN || role == STAFF) && token ?
            <Redirect to="/dashboard" /> : <Register />
        )}/>

        <Route path="/dashboard" render={() => (
          (role == ADMIN || role == STAFF) && token ?
            <Dashboard /> : <Redirect to="/login" />
        )} />

        <Route path="/recover-password/:token" component={RecoverPassword} exact />
        <Route path="/forget-password" component={ForgetPassword} exact />
        <Route path="/" component={Home} exact />
        <Route path="*" component={ErrorCommon} exact />
      </Switch>
    </Router>
  );
};

export default Routes;
