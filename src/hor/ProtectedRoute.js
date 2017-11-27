import React from 'react';
import {Redirect, Route} from "react-router-dom";

/**
 * This component should return
 * a <Redirect /> if the user isnt authenticated
 *
 * https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Redirect.md
 *
 * (redirecting to /access-denied)
 *
 * or a <Route /> with the component we give it
 *
 * The route your return  should keep its props like path, exact, ..
 */

export const ProtectedRoute = ({loggedIn}) =>
  <div>I think there's something wrong with this higher order ....</div>;