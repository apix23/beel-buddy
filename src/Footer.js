import React from 'react';
import migracode from './Images/migracode-sm.png'
import universidad1 from './Images/universidad1.png'

const Footer = () => {
    return(
        <div className="footer">
            <a href="https://www.uu.nl/" className="universidad"> 
                <img src={universidad1}
                alt="Utrecht university logo"/>
            </a>            
            <a href="https://migracode.openculturalcenter.org/" className="migracode">
                <img src={migracode}
                alt="Migracode Barcelona logo"/>
            </a>
        </div>  
    )
}

export default Footer;