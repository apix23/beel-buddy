import React from 'react'
import Button from './Button';
import propuesta2 from './Images/propuesta2.png'
import {Redirect} from 'react-router-dom'

const  HeaderAdmin = () => {

    let redirect = false;


    const handleFunction = () =>{

        console.log("estoy dentro del logout button",localStorage.getItem("token"));
        localStorage.removeItem("token");
        
    }
    if (redirect) {
        return <Redirect to="/Login"/>
    }

    return (
        <div>
            <header>
                <div className="header-flex-container">
                    <a href="/" className=" logo"><img src={propuesta2} alt="beelbuddy logo" className="logo"/></a>

                    <div className="small-buttons-container">
                        
                        <a href="." onClick={handleFunction} className="small-button">Logout</a>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default HeaderAdmin;
