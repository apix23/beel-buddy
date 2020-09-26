import React from 'react';
import Header from './Header';

const Submit = () => {
    return(
        <div>
            <Header />
            <div className="thank-you-container margin-auto">
                <div className="success-container">
                    <h1>Succes! </h1>
                    <h2>De informatie is verzonden</h2>
                </div>
                <div className="contact-you-container">
                    <p> Wij nemen contact met je op zodra er een match is</p>
                    <a href="." className="big-button margin-auto">Ga terug naar de homepagina</a>
                </div>
            </div>
        </div>
    )}


export default Submit;
