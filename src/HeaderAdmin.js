import React from 'react'
import Button from './Button';
import propuesta2 from './Images/propuesta2.png'

const  HeaderAdmin = () => {
    return (
        <div>
            <header>
                <div className="header-flex-container">
                    <a href="/" className=" logo"><img src={propuesta2} alt="beelbuddy logo" className="logo"/></a>

                    <div className="small-buttons-container">
                        <Button route="/Login" buttonType="small" text="Logout"/>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default HeaderAdmin;
