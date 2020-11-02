import React, {useState, useEffect} from 'react';
import Modal from './Modal';
import HeaderAdmin from './HeaderAdmin';
import { Redirect } from 'react-router-dom';

const baseUrl = "https://beel-buddy-backend.herokuapp.com/";

const AdminTableFetcher = props => {
    const [tableData, setTableData] = React.useState(null);
    const [mainArray, setMainArray] = React.useState(null);

    const token = localStorage.getItem("token");
    console.log(token);

    const  [loggedIn, setLoggedIn] = useState(true);
    
        useEffect(() => {
            if (token === null) {
                
                setLoggedIn(false)
                }
        }, [token])

    const seeBuddies = () => {
        const filteredData = mainArray.filter( element => element.im_a_buddy === 1);
        setTableData(filteredData);
    }

    const seePatients = () => {
        const filteredData = mainArray.filter( element => element.im_a_buddy !== 1);
        setTableData(filteredData);
    }

    const seeMatched = () => {
        const filteredData = mainArray.filter( element => element.matchname !== null);
        setTableData(filteredData);
    }

    const seeUnmatched = () => {
        const filteredData = mainArray.filter( element => element.matchname === null);
        setTableData(filteredData);
    }

    const seeAll = () => {
        setTableData(mainArray);
    }

    const removeDuplicatesFromArr = arr => {
        if(arr) {

            //Array with the number of occurrences for each person
            const arrWithoutDuplicates = [];
        
            arr.map( element => {
              //If the element does not exist in the array, result will be undefined
              const result = arrWithoutDuplicates.find( el => el.id === element.id && el.im_a_buddy === element.im_a_buddy );
              
              if(result) {
                //The element has been already counted before, so we do nothing
        
              } else {
                //The element has not been counted, so we add it to the array
                arrWithoutDuplicates.push(element);
              }
            })
            
            return arrWithoutDuplicates;

        }
      }

      
      React.useEffect(() => {
          console.log("I'm fetching")
          fetch(`${baseUrl}get-table`)
          .then(response => response.json())
          .then(data => {setTableData(data); setMainArray(data)})
          .catch(rejected => console.log(rejected))
        }, []);
    
    const filteredArr = removeDuplicatesFromArr(tableData);
        
    
    if (loggedIn === false) {
        
        return <Redirect to="404"/>
    }

    else{

        return (
            
            !tableData ? 
              (<p>Loading...</p>) 
            : (
                <div className="">
                <HeaderAdmin />

                <div className="container-form">
                    <h1>Tafel met deelnemers</h1>

                    <form className="table-button-container">
                        <label className="table-button" onClick={seeBuddies}>
                            <input type="radio" name="radio-table"/> 
                            Buddies
                        </label>

                        <label className="table-button" onClick={seePatients}>
                            <input type="radio" name="radio-table"/> 
                            Patiënten
                        </label>

                        <label className="table-button" onClick={seeAll}>
                            <input type="radio" name="radio-table"/> 
                            Alle
                        </label>

                        <label className="table-button" onClick={seeMatched}>
                            <input type="radio" name="radio-table"/> 
                            Matched
                        </label>

                        <label className="table-button" onClick={seeUnmatched}>
                            <input type="radio" name="radio-table"/> 
                            Un-matched
                        </label>

                    </form>
                    <AdminTable filtData={filteredArr} data={tableData}/>

                </div>
            </div> 
        )
        )
    }
}



const AdminTable = props => {

    //This function returns an array with the matchnames for each person
    const getMultipleMatchesArray = (tableData) => {
        console.log("entering in getmultiplematchesarray with tabledata", tableData);
        if(tableData) {
            //Array with the number of occurrences for each person
        const occurrenceNumArr = [];
    
        tableData.map( element => {
          //If the element does not exist in the array, result will be undefined
          const result = occurrenceNumArr.find( el => el.id === element.id && el.isBuddy === element.im_a_buddy );
          
          if(result) {
            //The element has been already counted before, so we increase the counter and add the name to the matchName array
            
            result.numberOfRepeats++;
            result.matchName.push(element.matchname);
    
          } else {
            //The element has not been counted, so we add it to the array
            occurrenceNumArr.push({
              isBuddy: element.im_a_buddy,
              id: element.id,
              numberOfRepeats: 1,
              matchName: [element.matchname]
            })
          }
        })
    
        //Creates an array with the id of the user and a string with all the matches
        const matchesArray = occurrenceNumArr.map(element => {
          return {
            isBuddy: element.isBuddy,
            id: element.id,
            matches: element.matchName.join(', ')
          };
        });
    
        return matchesArray;
        }

        
    }

    //This function returns all the matches for an user
    const getMatchesByUser = (id, isBuddy, arr) => {
    console.log("im receiving the following values. id", id, "isBuddy", isBuddy, "arr", arr);
    if(id != undefined && isBuddy != undefined && arr != undefined){
        const matches = arr.find(element => element.id === id && element.isBuddy == isBuddy).matches; 
        console.log(`The matches for the id ${id} and isBuddy ${isBuddy} are: ${matches}`);
        
        return matches;
    }
    }

    //Function to calculate the age
    function calculate_age(dateofbirth) { 
        const date = new Date(dateofbirth);
        var diff_ms = Date.now() - date.getTime();
        var age_dt = new Date(diff_ms); 
    
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }

    let itemId = 0;

    const [show, setShow] = useState(false);
    const [person, setPerson] = useState({});

    const showModal = (person, matches) =>{
        setPerson({...person, match: matches});
        setShow(true);
    }

    const closeModal = () =>{
        setShow(false);
    }

    const matchesArray = getMultipleMatchesArray(props.data);

    return (
        <div>
            <Modal 
                show={show} 
                closeModal={closeModal} 
                person={person} 
                tableData={props.data} 
                filtData={props.filtData} 
                getMultipleMatchesArray={getMultipleMatchesArray} 
                getMatchesByUser={getMatchesByUser}
                calculate_age={calculate_age}
            />
            
                <table id="tableId">
                    <thead>
                        <tr>
                            <th className="name-column">Naam</th>
                            <th className="age-column">Leeftijd</th>
                            <th className="email-column">Email</th>
                            <th className="hometown-column">Woonplaats</th>
                            <th className="hobbies-column">Hobby's / interesse</th>
                            <th className="buddy-column">Buddy of patiënt?</th>
                            <th className="match-column">Match</th>
                            {/* <th className="name-column">Match</th> */}
                        </tr>
                    </thead>

                    <tbody>
                    {props.filtData.map( person => {
                        
                        itemId++;
                        
                        let buddy_patient = "patient";
                        if(person.im_a_buddy === 1)  buddy_patient = "buddy";

                        let matchName = "-";
                        if(person.matchname) matchName = person.matchname;

                        const age = calculate_age(person.dateofbirth);


                        return ( 
                            <tr key={itemId} className={buddy_patient} onClick={()=>showModal(person)}>
                                <td className="name-column">{person.name}</td>
                                <td className="age-column">{age}</td>
                                <td className="email-column">{person.email}</td>
                                <td className="hometown-column">{person.hometown}</td>
                                <td className="hobbies-column">{person.hobbiesandinterests}</td>
                                <td className="buddy-column">{buddy_patient}</td>
                                <td className="name-column">{getMatchesByUser(person.id, person.im_a_buddy, matchesArray)}</td>
                            </tr>
                        )
                    }) } 
                    </tbody>
                </table>

        </div>
    );
}

export default AdminTableFetcher;   
