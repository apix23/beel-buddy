import React from 'react';
import RegisterForm from './RegisterForm.js';
import Header from './Header';
const BuddiesForm = () =>  {
        return(
            <div>
                <Header />
                <div className="container-form">
                    <h1> Ik wil een maatje worden</h1>
                    <h2> Ik ben een student sociale dienst </h2>
                    <RegisterForm value={1}/>
                    
                </div>
            </div>
        );
};

export default BuddiesForm;