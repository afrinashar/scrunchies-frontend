import { useMutation, useQueryClient } from 'react-query';
//import { deletePhoto } from '../api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Model } from 'mongoose';
import { deleteItem } from '../Api';
//import { Modal } from 'react-bootstrap';
const Delete = ({}) => {
  const [showModal, setShowModal] = useState(true);
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate= useNavigate
  const mutation = useMutation(() => deleteItem(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('photos');
      console.log('Image created successfully');
      setShowModal(false)
      navigate('/photos');
    },
  });
//console.log(photoId,"iddd");
  const handleDelete = () => {
    mutation.mutate( );
  };
  const handleClose = () => {
    setShowModal(false);
    navigate('/photos');
  };
  return (
    <>
      <h2>Delete Item</h2>
       <Model show={showModal} onHide={handleClose}>
<div className="modal-header">
<h2 className='text- modal-title bg-primary text-white m-3'>DELETE item</h2>
</div>
<div className="modal-body"> <h3>are you sure to delete</h3></div>
<div className="modal-footer">
<button className='btn btn-success'>DELETE</button>
<button className="btn btn-danger" onClick={handleClose}>CLOSE</button>
</div>
       </Model>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default Delete;