import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.jsx";
import AdminLayout from "layouts/Admin.jsx";
import DefaultLayout from "layouts/Default";
import Userlayout from "layouts/User";
import RegistrarLayout from "layouts/Registrar";
import { PrivateRoute } from "react-router-with-props";

import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";
import { loggedInUserType, USER_TYPE } from "./helpers/AuthHelper";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/auth" component={AuthLayout} />
      <Route path="/visitor" component={DefaultLayout} />

      <PrivateRoute
        path="/admin"
        authed={loggedInUserType() === USER_TYPE.ADMIN}
        redirectTo="/auth/login"
        component={AdminLayout}
      />

      <PrivateRoute
        path="/registrar"
        authed={loggedInUserType() === USER_TYPE.REGISTRAR}
        redirectTo="/auth/login"
        component={RegistrarLayout}
      />

      <PrivateRoute
        path="/user"
        authed={loggedInUserType() === USER_TYPE.USER}
        redirectTo="/auth/login"
        component={Userlayout}
      />

      <Redirect from="/" to="/visitor/dashboard" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
