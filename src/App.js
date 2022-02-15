import './App.css';
import PersonList from './Person/PersonList.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PersonForm from './Person/PersonForm.js';


function App() {
  return (
    <BrowserRouter>
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<PersonList/>} />
          <Route path="/personForm" element={<PersonForm/>} />
          <Route path="/updatePerson/:id" element={<PersonForm/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
