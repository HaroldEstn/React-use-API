import React, { useState, useEffect } from 'react';
import * as PersonServer from './PersonServer.js';
import PersonItem from './PersonItem.js';
import Table from 'react-bootstrap/Table';

const PersonList = () => {

  const [people, setPeople] = useState([]);

  
  const listPeople = async() => {
    try{
      const res = await PersonServer.listPeople();
      const data = await res.json();
      setPeople(data.people);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    listPeople(); 
  }, []);
  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Type Document</th>
            <th>Document</th>
            <th>Name(s)</th>
            <th>Lastname(s)</th>
            <th>Hobbie</th>
            <th colSpan="2">Manage</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <PersonItem key = {person.id} person = {person} listPeople={listPeople}/>
          ))}
        </tbody>
      </Table>
    </div>
  )

};

export default PersonList;
