import React from 'react'
import AddCategory from './AddCategory';
import { Modal } from 'react-bootstrap';
function EditCategory({ show, setShow, updateIndex, setUpdateIndex }){
    
    return(
        <Modal show={show} onHide={() => setShow(false)} backdrop="static"
        keyboard={false}
        centered>
        <Modal.Header closeButton>
        <Modal.Title>Edit category</Modal.Title>
        </Modal.Header>
        <Modal.Body > <AddCategory updateIndex={updateIndex} setUpdateIndex={setUpdateIndex} setShow={setShow} /></Modal.Body>
        
      </Modal>
    )
}
export default EditCategory