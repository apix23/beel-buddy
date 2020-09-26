import React from 'react';
import Button from './Button'
import propuesta2 from './Images/propuesta2.png'

const Header = () => {
    return(
        <header>
            <div className="header-flex-container">
                <a href="/" className=" logo"><img src={propuesta2} alt="beelbuddy logo" className="logo"/></a>

                <div className="small-buttons-container">
                <a className="button link" href="/">Home</a>
                <Button route="/Login" buttonType="small" text="Login"/>
                </div>
            </div>

        </header>
    )
}

export default Header;