import React from "react";

import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        const user = JSON.parse(localStorage.getItem("user"));
        return user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

const mapStateToProps = (state, props) => {
  return {
    global: state.global,
    user: state.user,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
