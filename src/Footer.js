import React from 'react';
import migracode from './Images/migracode.png'
import universidad1 from './Images/universidad1.png'

const Footer = () => {
    return(
        <div className="footer">

            <a href="https://www.uu.nl/"> 
                <img src={universidad1}
                alt="Utrecht university logo"
                className="universidad"/>
            </a>            
            <a href="https://migracode.openculturalcenter.org/">
                <img src={migracode}
                alt="Migracode Barcelona logo"
                className="migracode"/>
            </a>
                
        </div>  
    )
}

export default Footer;