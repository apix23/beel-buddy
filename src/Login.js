import React , {useState} from 'react';
import Header from './Header';
import {Redirect} from 'react-router-dom'


const Login = (props) => {
    
    const [alertError , SetAlertError] = useState({
        value:false,
        messagge:""
    })
    const [loginCredentials, setLoginCredentials] = useState({
        email : "",
        password: "",
        loggedIn : false
    })

    const handleFunction  =(e)=>{
        setLoginCredentials({...loginCredentials , [e.target.name] : e.target.value})
        
    }

    const submitForm = (e) =>{
        e.preventDefault();
        
        const sendmethod = {
            method: 'POST', 
            body: JSON.stringify(loginCredentials),
            headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        }
        fetch("http://localhost:9000/get-login-info",sendmethod)
        .then(res => res.json())
        .then(data => {
                if (data.email==="wrong") {
                    SetAlertError({value:true, messagge:"email"})
                }
                else if(data.password === "wrong"){
                    SetAlertError({value:true, messagge:"password"})
                }
                
                if(data.email ==="right" && data.password==="right"){
                    console.log("el problema está aquí")
                    localStorage.setItem("token","145tgh663823");
                    setLoginCredentials({...loginCredentials , loggedIn : true});
                }
        })
        

    }
    if (loginCredentials.loggedIn) {
        
        return <Redirect to="/AdminTable" />
    }
    else{

        return (
            <div>
            <Header />
            <div className="container-form">
                <h1>Login</h1>
                <h2>Toegang voor beheerders</h2>


                <form onSubmit ={submitForm} > 
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={loginCredentials.email} onChange={handleFunction}/>

                    <label htmlFor="password">Wachtwoord</label>
                    <input type="password" name="password" value={loginCredentials.password} onChange={handleFunction}/>
                    {alertError.value? <h1> {alertError.messagge} incorrect</h1> : null }
                    <button type="submit" className="big-button">Login</button>
                </form>
            </div>
        </div>
    );
}
}

export default Login;