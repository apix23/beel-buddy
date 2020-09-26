import React from "react";
import Header from "./Header";
import Button from "./Button";
import Footer from "./Footer";

const Homepage = () => {
    return (
        <div className="homepage">
            <Header />
                <div className="jumbotroncontainer">
                        <h1 className="white-text">Welkom op de beelbuddy</h1> 
                        <h2 className="white-text"> Leuk dat je interesse hebt in het worden van een buddy!</h2>
                        <div className="homepage-button-container">
                            <Button route="/BuddiesForm" buttonType="big" text="Ik ben een maatje" />
                            <Button route="/StudentForm" buttonType="big" text="Ik wil een maatje" />
                        </div>
                </div>
                <div className="aboutus">
                    <h2 className="title"> Beelbuddy </h2>
                    <p> Deze site is ontstaan vanuit de gevolgen die het coronavirus heeft op studenten en mensen met een hulpvraag. 
                        Studenten Social work konden door het coronavirus niet meer op bezoek bij hun maatjes en de maatjes mochten geen studenten meer ontvangen en konden vaak ook niet naar hun werk en dagbesteding, een erg vervelende tijd.</p> 

                        <p> Dankzij beeldbellen konden beide groepen toch contact met elkaar houden!
                        En met succes. In april 2020 zijn er 15 studenten social work, vanuit de Hogeschool Utrecht,  gekoppeld aan mensen die behoefte hadden aan een praatje. Dit bleek een groot succes, zowel de studenten als hun maatjes ervaarde dit contact als erg prettig. Sommige hebben nog steeds contact en inmiddels ook in het echt afgesproken. </p>

                        <p> Heb jij nou ook interesse om iemand zijn beeldbuddy te worden en 1-2 keer per week via een telefoon of tablet of computer contact met elkaar te hebben?
                        Vul dan snel het formulier in op de volgende pagina! En wie weet heb jij binnenkort een leuke buddy! 
                    </p>
                </div> 
                <div className="expect">
                    <h3>Wat doet een beeldbuddy?</h3>
                    <p> Als je eenmaal een match hebt met je buddy ga je samen met je maatje afspreken wanneer en hoe vaak jullie contact hebben. Mocht er een match gemaakt zijn dan ontvangen jullie beide een mail met verdere instructies. Voor het contact met je buddy kunnen jullie beide de app ‘’just talk’’ downloaden op je telefoon of tablet. In deze app kun je niet alleen met elkaar videobellen maar ook leuke spelletjes spelen! </p>
                </div>
                <Footer />
        </div>
    );
}

export default Homepage;