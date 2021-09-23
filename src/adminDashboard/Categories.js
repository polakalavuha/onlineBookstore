import React,{useState} from 'react'
import ViewCategory from './ViewCategory'
import AddCategory from './AddCategory'
import EditCategory from './EditCategory';

function Categories(){
    const [show, setShow] = useState(false);
    const [updateIndex, setUpdateIndex] = useState(-1);

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <h3 className="text-primary">Add New Category</h3>
                    <AddCategory/>
                </div>
                <div className="col-md-6">
                    <h3 className="text-primary">View Categories</h3>
                    <ViewCategory setShow={setShow} setUpdateIndex={setUpdateIndex}/>
                </div>
                 {/* Edit Category Modal */}
                 <EditCategory show={show} setShow={setShow} updateIndex={updateIndex} setUpdateIndex={setUpdateIndex} />
            </div>
        </div>
    )
}
export default Categories