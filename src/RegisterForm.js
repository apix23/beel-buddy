import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Hands from './Images/Hands.jpg';

const RegisterForm = (props) => {

  const history = useHistory();
  const [state, setState] = useState({
    name: "",
    birthDate: "",
    email: "",
    hobbies: "",
    hometown: "",
    im_a_buddy:0,
  });
  console.log(props);

  //getting the values

  const onChange = (e) => {
    let data = {...state, im_a_buddy:props.value};
    data[e.target.name] = e.target.value;
    setState(data);
  };
  const storeDataInDatabase = (data) => {
    localStorage.setItem('form_data', JSON.stringify(data));
    const myObjStr =  JSON.parse(localStorage.getItem('form_data'));
    console.log(myObjStr);
    history.push('/ThankYou');
  }

  const onSubmit = (e) => {
    e.preventDefault();
    storeDataInDatabase(state);
    const sendmethod = {
      method: 'POST', 
      body: JSON.stringify(state),
      headers:{
        'Content-Type': 'application/json'
      }
    }
    fetch("http://localhost:9000/create-user",sendmethod)
  }

  //form function


  return (
    <div>
    <img className="formwrapper" src={Hands} alt="arms reaching for grasping eachother"/>
        <form onSubmit={onSubmit} >
          <div className="fadein1">
            <label htmlFor="name">Voornaam en achternaam</label>
            <input
            name="name"
            placeholder="Voornaam en achternaam"
            value={state.name}
            onChange={onChange}
            required/>
        </div>
        <div className="formitself">
        <div className="fadein2">
          <label htmlFor="birthDate"> Geboortedatum </label>
          <input
            type="date"
            name="birthDate"
            placeholder=""
            value={state.birthDate}
            onChange={onChange}
            required/>
          </div>
          <div className="fadein3">
            <label htmlFor="email">e-mailadres of het e-mailadres van je begeleider</label>
            <input
            type="email"
            name= "email"
            placeholder="e-mailadres"
            value={state.email}
            onChange={onChange}
            required/>
          </div>

          <div className="fadein4">
            <label htmlFor="hometown">  Geboorteplaats </label>
            <input
            name= "hometown"
            placeholder="Geboorteplaats"
            value={state.hometown}
            onChange={onChange}
            required/>
          </div>

          <div className="fadein5">
            <label htmlFor="hobbies">Hobby's en interesses</label>
            <textarea
            name= "hobbies"
            placeholder="Hobby's en interesses"
            value={state.hobbies}
            onChange={onChange}
            required/>
          </div>
        <input type="number" 
        className="im_a_buddy"
        name="im_a_buddy" 
        id="im_a_buddy" 
        value={props.value}
        onChange={onChange}
        />
        </div>
          <button type="submit" className="big-button">Verzenden</button>
        </form>
      
    </div>
  )
}



export default RegisterForm;


