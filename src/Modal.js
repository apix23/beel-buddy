import React from 'react';
import {useHistory} from 'react-router-dom'

const Modal = ({person, show, closeModal, tableData}) => {
  let history = useHistory();
  //Function to disable a user from the modal
  const disableUser = (person) => {
    const url = "http://localhost:9000/disable-user";
    const data = {
      isBuddy: person.im_a_buddy,
      id: person.id
    }
    

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data), 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .catch( error => console.error("Error: ", error))
    .then( response => console.log("Success:", response) )
    
    closeModal();
    history.push("/AdminTable");

    //window.location.reload();
  }

  //Function to calculate the age based on the dateofbirth
  function calculate_age(dateofbirth) { 
    const date = new Date(dateofbirth);
    const diff_ms = Date.now() - date.getTime();
    const age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  // const userPosition = tableData.indexOf(person);
  // const tableWithoutUser = tableData.splice(userPosition, 1);
  // console.log("La tabla sin el user ahora es: >>>", tableWithoutUser);

  const age = calculate_age(person.dateofbirth);
  
  //Determine if the person is a buddy or a patient
  let buddy_patient = ""; 
  person.im_a_buddy === 1 ? buddy_patient = "Buddy" : buddy_patient = "Patient";

  //I for the map of the array 
  let i = 1;
  
  console.log("Table data es: ", tableData);
    
   if (!show) {
     //Don't show the modal if the flag is false
     return null;
   }
    //Show the modal if required
    return (
      <div className="modal-box" id="modal-box">
         <div className="modalcontainer card">
            <h2 className="modal-head">{person.name}</h2>
            <div className="close-btn" onClick={closeModal}> x </div>
            <div className="modal-props">

              <div className="modalp underlined">
                <div className="textrows">
                <p> <b>Leeftijd: </b> </p>
                <p className="border-b">{age}</p>
               </div>
              </div>
              <div className="modalp underlined">
                <div className="textrows">
                  <p> <b>Email:</b></p>
                  <p className="border-b">{person.email}</p>
                </div>
              </div>

              <div className="modalp underlined">
                <div className="textrows">
                  <p> <b>Geboorteplaats:</b> </p> 
                  <p className="border-b">{person.hometown}</p>
                </div>
              </div>

              <div className="modalp underlined">
                <div className="textrows">
                  <p><b>Maatje of patiënt?</b> </p>
                  <p className="border-b"> {buddy_patient}</p> 
                </div>
              </div>

              <div className="hobbiebox underlined">
                <div className="textrows">
                  <p> <b> hobby's en interesses:</b></p> 
                  <p>{person.hobbiesandinterests}</p>
                </div>
              </div>

              <div className="hobbiebox underlined">
                {/*<div className="textrows">
                  <p> <b>Match</b></p> 
                  <select name="selectMatch" defaultValue={'DEFAULT'}>
                    {person.matchname ? <option value='DEFAULT' disabled>{person.matchname}</option> : <option disabled value={0}>Select</option>}
                    
                    {  
                      tableData.map( element => {
                        if(element.im_a_buddy === person.im_a_buddy || (element.id === person.id && element.im_a_buddy === person.im_a_buddy)) {
                          i++;
                          return null;
                        }
                        if (element.matchname) 
                        i++;
                        return <option value={element.id} key={i}>{element.name} ({person.im_a_buddy === 0? "Buddy" : "Patient"})</option>
                      })
                    }
                  </select>
                </div>*/}
              </div>
          </div>
          

          {/*<div className="btn-container">
                <button className="small-button delete" onClick={() => disableUser(person)}> Delete </button>
                <button className="match-btn" > Move to match list</button>
            </div>*/}

         </div>
        <div className="overlay" onClick={closeModal}></div>
      </div>
    )
  };

/*  
------- USE THIS WHEN DELETE + MATCH FUNTIONALITIES ARE IMPLEMENTED ----------
<div className="btn-container"> 
  <button className="small-button delete"> Verwijderen </button>
  <button className="match-btn" > Ga naar de matchlijst </button>
</div> */

  export default Modal;