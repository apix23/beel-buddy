import React, {useState} from 'react';
import Modal from './Modal';
import HeaderAdmin from './HeaderAdmin';

const baseUrl = "http://localhost:9000/";

const AdminTableFetcher = props => {
    const [tableData, setTableData] = React.useState(null);
    const [mainArray, setMainArray] = React.useState(null);

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

    React.useEffect(() => {
        console.log("I'm fetching")
        fetch(`${baseUrl}get-table`)
            .then(response => response.json())
            .then(data => {setTableData(data); setMainArray(data)})
            .catch(rejected => console.log(rejected))
    }, []);

    return (

        !tableData ? 
            (<p>Loading...</p>) 
        : (
            <div className="">
                <HeaderAdmin />

                <div className="container-form">
                    <h1>Table of participants</h1>

                    <form className="table-button-container">
                        <label className="table-button" onClick={seeBuddies}>
                            <input type="radio" name="radio-table"/> 
                            Buddies
                        </label>

                        <label className="table-button" onClick={seePatients}>
                            <input type="radio" name="radio-table"/> 
                            Patients
                        </label>

                        <label className="table-button" onClick={seeAll}>
                            <input type="radio" name="radio-table"/> 
                            All
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

                    <AdminTable data={tableData}/>

                </div>
            </div> 
        )
    )
}



const AdminTable = props => {

    // props.updateData("AdminTable");

    function calculate_age(dateofbirth) { 
        const date = new Date(dateofbirth);
        var diff_ms = Date.now() - date.getTime();
        var age_dt = new Date(diff_ms); 
      
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }

    let itemId = 0;

    const [show, setShow] = useState(false);
    const [person, setPerson] = useState({});

    const showModal = (person, buddy_patient) =>{
        console.log("I'm receiving the modal person >>>>>", person, " buddy >>>>>>>>>", buddy_patient);
        setPerson(person);
        setShow(true);
    }

    const closeModal = () =>{
        setShow(false);
    }

    return (
        <div>
            <Modal show={show} closeModal={closeModal} person={person} tableData={props.data}/>
            
                <table id="tableId">
                    <thead>
                        <tr>
                            <th className="name-column">Name</th>
                            <th className="age-column">Age</th>
                            <th className="email-column">Email</th>
                            <th className="hometown-column">Hometown</th>
                            <th className="hobbies-column">Hobbies/Interest</th>
                            <th className="buddy-column">Buddy or patient?</th>
                            <th className="name-column">Match</th>
                        </tr>
                    </thead>

                    <tbody>
                    {props.data.map( person => {
                        
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
                                <td className="name-column">{matchName}</td>
                            </tr>
                        )
                    }) } 
                    </tbody>
                </table>

        </div>
    );
}

export default AdminTableFetcher;   
