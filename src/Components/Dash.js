import React, { useState, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { Form, Button} from "react-bootstrap";
import swal from 'sweetalert';
import ItemData from './ItemData';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};


function Dash({handleNoteChange,note, handleAdd, modalIsOpen, closeModal, afterOpenModal }) {

  let history = useHistory();

  useEffect(()=>{
    const userId = JSON.parse(localStorage.getItem('userid'));
    if(userId){
      history.push('./itemdata')
    }
  },[])



  return (
    <>
      <div className="text">

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >


          <Button variant="primary" size="sm" onClick={closeModal}>
            close
          </Button>

          <form>
            <input type="text" value={note} onChange={(e)=>handleNoteChange(e.target.value)} />
            {/* <input type="text" name="note" value={note} onChange={(e) => handleNoteChange(e.target.value)} /> */}
            <Button variant="primary" size="sm" onClick={() => handleAdd(note)}>
              Add
            </Button>
          </form>
        </Modal>
      </div>

    </>
  );
}

export default Dash














  // const handleChange = useCallback(event => {
  //   setUser({
  //     ...user,
  //     [event.target.name]: event.target.value,
  //   });
  // }, []);


  // const handleChange = event => {
  //   // use spread operator
  //   setUser({
  //     ...user,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // const handleAdd = () => {
  //   console.log('handling add');
  //   let items = [];
  //   let itemsData = JSON.parse(localStorage.getItem('data'));
  //   let userId = JSON.parse(localStorage.getItem('userid'));
  //   if (itemsData === null) {
  //     let obj = {};
  //     obj['id'] = Math.random();
  //     obj['name'] = note;
  //     // obj['age'] = user.age;
  //     obj['userid'] = userId;
  //     // if (obj['age'] === undefined) {
  //     //   swal('Please enter age');
  //     //   return;
  //     // }
  //     items.push(obj);
  //     localStorage.setItem('data', JSON.stringify(items));
  //     console.log(items,'check itemssssssssssssss')
  //     setIsOpen(false)
  //   }
  //   else {
  //     // let names = itemsData.map(item => item.name.toLowerCase());
  //     // if (names.indexOf(user.userName.toLowerCase()) >= 0) {
  //     //   swal('Name already exist!!');
  //     //   return;  
  //     // }
  //     let obj = {};  
  //     obj['id'] = Math.random();
  //     obj['name'] = note;
  //     // obj['age'] = user.age;
  //     obj['userid'] = userId;
  //     // if (obj['age'] === undefined) {
  //     //   alert('Please enter age');
  //     //   return;
  //     // }
  //     itemsData.push(obj);
  //     localStorage.setItem('data', JSON.stringify(itemsData));
  //     console.log(itemsData,'itemsDataaaaaaaaaaaaaaa')
  //     swal('Data added successfully')
  //     setIsOpen(false);
  //   }


  // }