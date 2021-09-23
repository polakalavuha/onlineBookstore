import React from 'react'
import AddBooks from './AddBooks';
import { Modal } from 'react-bootstrap';
function EditBook({ show, setShow, updateIndex, setUpdateIndex }){
    
    return(
        <Modal show={show} onHide={() => setShow(false)} backdrop="static"
        keyboard={false}
        centered>
        <Modal.Header closeButton>
        <Modal.Title>Edit category</Modal.Title>
        </Modal.Header>
        <Modal.Body > <AddBooks updateIndex={updateIndex} setUpdateIndex={setUpdateIndex} setShow={setShow} /></Modal.Body>
        
      </Modal>
    )
}
export default EditBook