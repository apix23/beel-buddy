import React from 'react';
import Header from './Header';
import auth from './Auth';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    const history = useHistory();

    const handleLoging =(e) => {

        e.preventDefault();
        auth.login(()=>{
            history.push("/AdminTable");
        });
        
        console.log(auth.authenticated)
    }
    
    return (
        <div>
            <Header />

            <div className="container-form">
                <h1>Login</h1>
                <h2>Toegang voor beheerders</h2>

                <form>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" />

                    <label htmlFor="password">Wachtwoord</label>
                    <input type="password" name="password"/>

                    <button type="submit" className="big-button" onClick={handleLoging}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;