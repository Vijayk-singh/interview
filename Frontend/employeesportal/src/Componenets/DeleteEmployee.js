import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const DeleteButton = ({ id, onDeleteSuccess, onDeleteError }) => {
  const handleDelete = async () => {
    try {
      // Make a DELETE request to delete the entity with the specified ID
      const response = await axios.delete(`http://localhost:3000/api/deleteEmployee/${id}`, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNklqWTJNR1V5WldVek9XTTNaamMyT0dGalpUVm1PRFUwTVNJc0ltbGhkQ0k2TVRjeE1qZ3dPVGsxTkN3aVpYaHdJam94TnpFMU5EQXhPVFUwZlEuM2RTUE1uMjZVTEpEZ1FDNFpNcVVxQkduMkRFbVBpYS1TWFBNdnRhYVVkSSJ9.eQfbT4izPVXQETwz_eW_tHXry7Qf2NHu3nI6xs3fz0519tl4DTJtBEAyTIU1p76i'

        }
      });
      // Call onDeleteSuccess callback if provided
      if (onDeleteSuccess) {
        onDeleteSuccess(response.data);
        alert(`Deleted: ${id}`) // Pass the response data to the callback
        window.location.reload()
      }
    } catch (error) {
      // Call onDeleteError callback if provided
      if (onDeleteError) {
        onDeleteError(error); // Pass the error object to the callback
      }
    }
  };

  return (
    <Button onClick={handleDelete} variant='danger'>
      Delete
    </Button>
    
  );
};

export default DeleteButton;
