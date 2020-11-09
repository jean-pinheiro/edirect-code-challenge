import UserService from './user/UserService'
import {  Route, Redirect } from "react-router-dom";

function SecureRoute({ component: Component, ...rest }) {

    const user = UserService.getCurrentUser();

    return (
      <Route
        {...rest}
        render={props =>
          (user && user.token) ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default SecureRoute;