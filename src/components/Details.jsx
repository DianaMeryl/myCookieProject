// import React, { useState, useEffect } from 'react';
// import Button from "react-bootstrap/Button";
// import Modal from 'react-bootstrap/Modal';
// import { useNavigate } from 'react-router-dom';

export default function Details() {
return(

  <>
  <p> HeLLO world</p>
  </>
)
 

  // const history = useNavigate();

  // const [show, setShow] = useState(false);

  // const[logindata, setLoginData] = useState([]);

  // let todayDate = new Date().toISOString().slice(0,10);
  
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const Birthday = () => {
  //   const getuser = localStorage.getItem("user_login");

  //   if(getuser && getuser.length){
  //     const user = JSON.parse(getuser);
  //     setLoginData(user);

  //     const userbirth = logindata.map( el => {
  //       return el.date === todayDate
  //     });
  //     if(userbirth){
  //       setTimeout(() => {
  //         handleShow();
  //       })
  //     }
  //   }
  // }

// const userlogout = () => {
//   localStorage.removeItem("user_login");
//   history("/");
// }

// useEffect (() => {
//   Birthday();}, []);
  
  return (
    <>
   Hello
    </>
  )
}



// return (
//   <>
//     {
//       logindata.length === 0 ? "error": <>
//       <h1>details page</h1>
//       <h2>{logindata[0].name}</h2>

//       {/* <Button onClick={userlogout}>LogOut</Button> */}

//       {
//         logindata[0].date === todayDate ?   
        
//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>{logindata[0].name}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>Happy Birthday!</Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={handleClose}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal> : ""
//       }
//       </>
//     }
//   </>
// )
// }
