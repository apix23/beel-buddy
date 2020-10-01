import React from 'react';
import {Route} from 'react-router-dom';
import auth from './Auth'

function ProtectedRoute({component : Component, ...rest}) {
    if (auth.authenticated) {
        return (
            
            <Route {...rest} render={
                (props) =>{
    
            return <Component {...props}/>;
        }}/>
    )
    }
    else{
        return null
    }
}

export default ProtectedRoute;
