import React from 'react';
import error404 from './Images/error404.png';
import Header from './Header';

const BrokenLink = () =>{
    return(
        <div>
            <Header />
            <div className="errorcontainer">
                <h1> Er is iets misgegaan, we kunnen deze pagina niet weergeven</h1>
                <img className="error404" src={error404} alt="beelbuddies logo broken displaying 404 number below it" />
            </div>
            
        </div>
    )

}

export default BrokenLink;
