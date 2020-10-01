import React from 'react';
import {useHistory} from 'react-router-dom'

const Modal = ({person, show, closeModal, tableData, getMultipleMatchesArray, getMatchesByUser, calculate_age}) => {

  //Determining user to match and current user 
  // const currentUser = {id: person.id, isBuddy: person.im_a_buddy};
  
  let history = useHistory();
  //Function to disable a user from the modal
  const disableUser = (person) => {
    const url = "https://beel-buddy-backend.herokuapp.com/disable-user";

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

  //Function to make the fetch of making a new match 
  const fetchNewMatch = (user1, user2) => {
    console.log("Inside fetchNewMatch receiving user1", user1, "user2", user2);
    const data = {
      isBuddy_u1: user1.isBuddy,
      id_u1: user1.id,
      isBuddy_u2: user2.isBuddy,
      id_u2: user2.id
    }

    const url = "https://beel-buddy-backend.herokuapp.com/create-match";

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data), 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .catch( error => console.error("Error: ", error))
    .then( response => console.log("Success:", response) )
  }

  //Function to make the fetch of disabling an existent match and creating a new one
  const fetchUpdateMatch = (currentUser, matchUser) => {
    const url = "https://beel-buddy-backend.herokuapp.com/update-match";

    const data = {
      current_isBuddy: currentUser.isBuddy,
      current_id: currentUser.id,
      match_isBuddy: matchUser.isBuddy,
      match_id: matchUser.id
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
    
  }

  //Function to match two users
  const matchUsers = () => {
    //Buddy ==1, Patient ==0
    console.log("Matching Users");

    
    const personBuddy = person.im_a_buddy;
    const personId = person.id;

    const currentUser = {
      isBuddy : personBuddy,
      id : personId
    }

    
    const matchUserId = document.getElementsByTagName("select")[0].value === "DEFAULT"? -1: parseInt(document.getElementsByTagName("select")[0].value);
    const matchUserBuddy = !personBuddy;
    
    //-----------------------------
    //If the user selected an option
    //------------------------------
    if(matchUserId != -1) {

      const matchUser = {
        isBuddy : matchUserBuddy,
        id : matchUserId
      }
      
      const currentUser_match = person.matchname;
  
      if(currentUser_match) {
        //The user already has a match 
        //Finish the current match
        //And then create a new match with the new user
  
        console.log("The user already has a match");
        fetchUpdateMatch(currentUser, matchUser);
  
        
      } else if(person.im_a_buddy == 1) {
        //The user is a buddy and has to be matched with a patient
        fetchNewMatch(currentUser, matchUser);
      } else if(person.im_a_buddy == 0) {
        //The user is a patient and has to be matched with a buddy
        fetchNewMatch(currentUser, matchUser);
      }
    } else {
      console.log("The user didn't select an option")
    }

    closeModal();
    window.location.reload();

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

  const 
  matchesArray = getMultipleMatchesArray(tableData);
  console.log("the array of matches is", matchesArray);

  console.log("Table data es: ", tableData);

  const matches = getMatchesByUser(person.id, person.im_a_buddy, matchesArray);

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

              {/* <div className="modalp underlined">
                <div className="textrows">
                  <p><b> Studie: </b></p>
                  <p className="border-b"> 0</p>
                </div>
              </div>

              <div className="modalp underlined">
                <div className="textrows">
                  <p><b> Studiejaar: </b></p>
                  <p className="border-b"> 0</p>
                </div>
              </div> */}

              <div className="hobbiebox underlined">
                <div className="textrows">
                  <p> <b> hobby's en interesses:</b></p> 
                  <p>{person.hobbiesandinterests}</p>
                </div>
              </div>

              {console.log("GetMatchesByUser of ", person.id, "isABuddy", person.im_a_buddy, "with the array being", matchesArray, "is ", getMatchesByUser(person.id, person.im_a_buddy, matchesArray))}

              <div className="hobbiebox underlined">
                <div className="textrows">
                  <p> <b>Match</b></p> 
                  <select name="selectMatch" defaultValue={'DEFAULT'}>
                    {/* If the user has a match, the default value for the select would be the name of the match, otherwise it will be "Select" */}
                    
                    {getMatchesByUser(person.id, person.im_a_buddy, matchesArray) ? <option value='DEFAULT' disabled>{getMatchesByUser(person.id, person.im_a_buddy, matchesArray)} (current) </option> : <option disabled value='DEFAULT'>Select an option</option>}
                    
                    {  
                      tableData.map( element => {
                        if(element.im_a_buddy === person.im_a_buddy || (element.id === person.id && element.im_a_buddy === person.im_a_buddy)) {
                          i++;
                          return null;
                        }
                        
                        i++;
                        return <option value={element.id} key={i}>{element.name} ({person.im_a_buddy === 0? "Buddy" : "Patient"})</option>
                      })
                    }
                  </select>
                </div>
              </div>
          </div>
          

          <div className="btn-container">
            <button className="small-button delete" onClick={() => disableUser(person)}> Delete </button>
            <button className="match-btn" onClick={matchUsers}> Save</button>
          </div>
                

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