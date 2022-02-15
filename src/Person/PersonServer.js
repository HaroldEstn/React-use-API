const API_URL = 'http://127.0.0.1:8000/api/people/';

export const listPeople = async () => {
  return await fetch(API_URL);
};

export const getPerson = async (personId) => {
  return await fetch(`${API_URL}${personId}`);
}

export const registerPerson = async (newPerson) => {
  return await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      "document_type":String(newPerson.document_type).trim(),
      "document_num":parseInt(newPerson.document_num),
      "names":String(newPerson.names).trim(),
      "lastnames":String(newPerson.lastnames).trim(),
      "hobbie":String(newPerson.hobbie).trim(),
    })
  });
};


export const updatePerson = async (personId, updatedPerson) => {
    return await fetch(`${API_URL}${personId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "document_type": String(updatedPerson.document_type).trim(),
            "document_num": String(updatedPerson.document_num),
            "names": String(updatedPerson.names).trim(),
            "lastnames": String(updatedPerson.lastnames).trim(),
            "hobbie": String(updatedPerson.hobbie).trim(),
        }),
    });
};


export const deletePerson = async (personId) => {
  return await fetch(`${API_URL}${personId}`, {
    method: 'DELETE',
  });
};
