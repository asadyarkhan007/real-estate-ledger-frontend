import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.jsx";
import RtlLayout from "layouts/RTL.jsx";
import AdminLayout from "layouts/Admin.jsx";
import DefaultLayout from "layouts/Default";
import { PropsRoute, PublicRoute, PrivateRoute } from "react-router-with-props";

import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";
import { checkUserLogin } from "./helpers/AuthHelper";


const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/auth" component={AuthLayout} />
      <Route path="/non-user" component={DefaultLayout} />
      <PrivateRoute
        path="/admin"
        authed={localStorage.getItem("isLoggedIn")}
        redirectTo="/login"
        component={AdminLayout}
      />
      <Redirect from="/" to="/auth/login-page" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
