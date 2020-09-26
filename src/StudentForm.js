import React from 'react';
import RegisterForm from './RegisterForm.js';
import Header from './Header';
import Footer from './Footer';

const StudentForm = () => {
    return(
        <div>
            <Header />
                <div className="container-form">
                <h1> Ik wil een maatje</h1>
                <h2> Ik wil een studentenmaatje van de sociale dienst</h2>
                <RegisterForm value={0}/>
                <Footer />
            </div>
        </div>
    )
};

export default StudentForm;