import React, { useEffect, useState, useCallback } from 'react'
import { useHistory } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import {Button} from "react-bootstrap";
import Dash from './Dash';
import swal from 'sweetalert';



function ItemData() {
    let history = useHistory();
    const [list, setList] = useState([]);
    const [nameToBeUpdate, setNameToUpdate] = useState('');
    const [id, setId] = useState(null);
    const [disable, setDisable] = React.useState(false);
    const [loginuserid, setLoginuserid] = useState('');
    const [userRecord, setUserRecord] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [note, setNote] = useState('');
    const Record = [];



    
    useEffect(() => {

        const data = JSON.parse(localStorage.getItem('data'));
        const userId = JSON.parse(localStorage.getItem('userid'));
        if (!userId) {
            history.push('./')
        }
        setList(JSON.parse(localStorage.getItem('data')));
        if (data) {

            const listsArray = data.filter(list => (list.userid === userId));
            console.log('listsArray', listsArray);
            setUserRecord(listsArray);
        }
        setLoginuserid(userId);

    }, []);

    const handleNoteChange = useCallback((newValue) => {
        console.log('input')
        setNote(newValue);
    }, [])

    function logoutClick() {
        localStorage.removeItem('userid');
        history.push("/");
    }

    function openFromParent() {
        setIsOpen(true);
    }

    var subtitle;

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        console.log('close')
        setIsOpen(false);
    }

    function handleAdd(note) {
        console.log('Handle Add');
        let data = JSON.parse(localStorage.getItem('data')) || [];
        let noteData = {};
        noteData['id'] = Math.random();
        noteData['name'] = note;
        noteData['userid'] = loginuserid;

        data.push(noteData)

        localStorage.setItem('data', JSON.stringify(data));
        let dataArray = userRecord;
        dataArray.push(noteData);
        setUserRecord(dataArray);
        setIsOpen(false);
        swal('Note Added')
    }

    const handleDelete = (id) => {
        let list = JSON.parse(localStorage.getItem('data')) || [];
        const updatedList = list.filter((list) => list.id !== id);
        const updatedRecords = userRecord.filter((record) => record.id !== id);
        setUserRecord(updatedRecords);
        localStorage.setItem('data', JSON.stringify(updatedList));
    }

    const handleUpdate = (item, id) => {
        setNameToUpdate(item.name);
        setId(id);
        setDisable(false)
    }

    const handleSave = (id) => {
        let prevData = JSON.parse(localStorage.getItem('data'));
        let objectToBeUpdate = prevData[id];
        objectToBeUpdate['name'] = nameToBeUpdate;
        prevData.splice(id, 1, objectToBeUpdate);
        setUserRecord(prevData);
        localStorage.setItem('data', JSON.stringify(prevData));
        setDisable(true);
    }

    return (
        <>
            <div>

                <Button variant="primary" size="sm" className="col-md-2 mt-4 float-right" onClick={openFromParent}>
                    Add Note
                </Button>

                <div className="card mt-4">
                    {userRecord ?
                        (<>
                            <div className="card-body">
                                {(userRecord.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            {!disable ? (<>
                                                <input hidden={id !== index} type="text" defaultValue={nameToBeUpdate} onChange={(e) => setNameToUpdate(e.target.value)}></input>
                                                <Button variant="primary" size="sm" disabled={disable} hidden={id !== index} onClick={() => handleSave(index)}>Save</Button>
                                            </>) : null}
                                            <li>{item.name}
                                                <span style={{ padding: 20 }}>
                                                    <Button variant="primary" size="sm" onClick={() => handleDelete(item.id)}>
                                                        Delete
                                                    </Button>
                                                </span>
                                                <span style={{ padding: 20 }}>
                                                    <Button variant="primary" size="sm" onClick={() => handleUpdate(item, index)}>
                                                        Update
                                                    </Button>
                                                </span>
                                            </li>
                                        </div>
                                    )
                                }))}
                            </div>
                        </>) : (<>
                        </>)}
                        
                </div>

                <Button variant="primary" size="lg" onClick={logoutClick}>
                    Logout
                </Button>

            </div>

            <Dash note={note} handleNoteChange={handleNoteChange} handleAdd={handleAdd} modalIsOpen={modalIsOpen} afterOpenModal={afterOpenModal} closeModal={closeModal} />
        </>
    )
}

export default ItemData























// import React, { useEffect, useState } from 'react'
// import SearchItem from './SearchItem';

// function ItemList() {
//     let [list, setList] = useState([]);
//     const [nameToBeUpdate, setNameToUpdate] = useState('');
//     const [id, setId] = useState(null);
//     const [showData, setShowData] = useState(false);

//     useEffect(() => {
//         setList(JSON.parse(localStorage.getItem('data')));
//     }, [list, showData]);

//     const handleDelete = (id) => {
//         setList(list.splice(id, 1));
//         localStorage.setItem('data', JSON.stringify(list));
//         // let dataList = JSON.parse(localStorage.getItem('data'));
//         // dataList.splice(id, 1); 
//         // localStorage.setItem('data', JSON.stringify(dataList));
//     }

//     const handleUpdate = (item, id) => {
//         setNameToUpdate(item.name);
//         setId(id); 
//     }

 // setUserRecord(userRecord.splice(id, 1));
        // localStorage.setItem('data', JSON.stringify(userRecord));
        // console.log(userRecord, 'delteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
        // console.log(data);
        // data.push(userRecord);

//     const handleSave = (id) => {
//         let prevData = JSON.parse(localStorage.getItem('data'));
//         let objectToBeUpdate = prevData[id];
//         objectToBeUpdate['name'] = nameToBeUpdate;
//         prevData.splice(id, 1, objectToBeUpdate);
//         localStorage.setItem('data', JSON.stringify(prevData));
//     } 

// const incrementViews = useCallback(() => {
//     setList(JSON.parse(localStorage.getItem('data')));
//     setLoginuserid(JSON.parse(localStorage.getItem('userid')));
//     // console.log(list, 'data', loginuserid, 'userid')
//     if (list) {

//         for (let i = 0; i < list.length; i++) {
//             if (list[i].userid === loginuserid) {
//                 Record.push(list[i])
//                 setUserRecord(Record)
//                 // console.log('id match', userRecord, 'userRecord')
//             }
//         }
//     }
// }, [list, userRecord]);

//     return (
//         <div>
//             <button onClick={() => setShowData(showData => !showData)}>{showData ? 'Hide data' : 'Show data'}</button>
//             {showData ? (list.map((item, index) => {
//                 return (
//                     <div key={index}>
//                         <input hidden={id !== index} type="text" defaultValue={nameToBeUpdate} onChange={(e) => setNameToUpdate(e.target.value)}></input>
//                         <button disabled={!nameToBeUpdate} hidden={id !== index} onClick={() => handleSave(index)}>Save</button>
//                         <li>{item.name} is {item.age} years old.
//                             <button onClick={() => handleDelete(index)} style={{marginLeft: '10px'}}>Delete</button>
//                             <button onClick={() => handleUpdate(item, index)} style={{marginLeft: '5px'}}>Edit</button>
//                         </li>
//                     </div>
//                 )
//             })) : ''}
//             <SearchItem />
//         </div>
//     )
// }

// export default ItemList
