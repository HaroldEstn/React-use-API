import React from 'react';
import * as PersonServer from './PersonServer.js';
import { useNavigate } from 'react-router-dom';


const PersonItem = ({ person, listPeople }) => {
  const navigate = useNavigate();

  const handleDelete = async (personId) => {
    await PersonServer.deletePerson(personId);
    listPeople();
  }

  return (
      <tr>
        <td>{ person.id }</td>
        <td>{ person.document_type }</td>
        <td>{ person.document_num }</td>
        <td>{ person.names }</td>
        <td>{ person.lastnames }</td>
        <td>{ person.hobbie }</td>
        <td>
    <button onClick={() => navigate(`/updatePerson/${person.id}`)}className="btn btn-secondary my-2">
            Update
          </button>
        </td>
        <td>
          <button onClick={() => person.id && handleDelete(person.id)} className="btn btn-danger my-2">
            Delete
          </button>
        </td>
      </tr>
  );
};

export default PersonItem;
