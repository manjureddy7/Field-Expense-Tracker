import React from 'react';
import { Redirect } from 'react-router-dom';
import {  Route } from "react-router-dom";
import { useFirebase } from '../../context/FirebaseContext';

const ProtectedRoute = ({component: Component, ...rest}) => {
    const { user } = useFirebase();
    return (
        <Route
          {...rest}
          render={(props) => user
            ? <Component {...props} />
            : <Redirect to={{pathname: '/', state: {from: props.location}}} />
          }
        />
    )
}

export default ProtectedRoute;