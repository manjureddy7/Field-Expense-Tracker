import React from 'react';
import { Redirect } from 'react-router-dom';
import {  Route } from "react-router-dom";
import { useFirebase } from '../../context/FirebaseContext';

const ProtectedRoute = ({component: Component, ...rest}) => {
    const { authState } = useFirebase();
    return (
        <Route
          {...rest}
          render={(props) => authState
            ? <Component {...props} />
            : <Redirect to={{pathname: '/', state: {from: props.location}}} />
          }
        />
    )
}

export default ProtectedRoute;