import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from "react";
import * as PersonServer from './PersonServer.js';
import { useNavigate, useParams } from 'react-router-dom';

const PersonForm = () => {
  const navigate=useNavigate();
  const params = useParams();
  const initialState={id:0, document_type:"", document_num:0, names:"", lastnames:"", hobbie:""}
  const [person, setPerson] = useState(initialState);

  const handleInputChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if(!params.id) {
        res = await  PersonServer.registerPerson(person);
        const data = await res.json();
        if(data.message === "Success") {
          setPerson(initialState);
        }
      } else {
        await PersonServer.updatePerson(params.id, person);
      }
      navigate("/");
    }catch(error) {
      console.log(error);
    }
  };

  const getPerson = async(personId) => {
    try {
      const res = await PersonServer.getPerson(personId);
      const data = await res.json();
      const { document_type, document_num, names, lastnames, hobbie } = data.people;
      setPerson({ document_type, document_num, names, lastnames, hobbie });
    }catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPerson(params.id);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
     <Form.Group className="mb-3" controlId="document_type">
      <Form.Label>Document Type</Form.Label>
      <Form.Select name="document_type" value={person.document_type} onChange={handleInputChange}>
        <option>Seleccione una opción</option>
        <option>CC</option>
        <option>TI</option>
        <option>TP</option>
        <option>CE</option>
      </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3" controlId="document_num">
      <Form.Label>Document Number</Form.Label>
      <Form.Control name="document_num" type="number" placeholder="Enter your document number." pattern="[0-9]+" 
        value={person.document_num} onChange={handleInputChange}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="names">
      <Form.Label>Name(s)</Form.Label>
      <Form.Control name="names" type="text" placeholder="Enter your Name(s)" value={person.names} onChange={handleInputChange}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="lastnames">
      <Form.Label>Lastname(s)</Form.Label>
      <Form.Control name="lastnames" type="text" placeholder="Enter your Lastname(s)" value={person.lastnames} onChange={handleInputChange}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="hobbie">
      <Form.Label>Hobbie</Form.Label>
      <Form.Control name="hobbie" type="text" placeholder="Enter your Hobbie" value={person.hobbie} onChange={handleInputChange}/>
    </Form.Group>
    {
      params.id?(
 <Button 
      variant="info" type="submit">
      Update Person
    </Button>
      ):(
 <Button 
      variant="primary" type="submit">
      Add Person
    </Button>
      )
    }
  </Form>
  )
};

export default PersonForm;
