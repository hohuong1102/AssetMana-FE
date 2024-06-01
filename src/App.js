import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/departments')
      .then(response => {
        setDepartments(response.data);
      });
  }, []);

  const handleAddDepartment = () => {
    axios.post('http://localhost:8000/departments', { name })
      .then(response => {
        setDepartments([...departments, response.data]);
        setName('');
      });
  };

  return (
    <div>
      <h1>Departments</h1>
      <ul>
        {departments.map(department => (
          <li key={department.id}>{department.name}</li>
        ))}
      </ul>
      <input 
        type="text" 
        value={name} 
        onChange={e => setName(e.target.value)} 
        placeholder="New Department"
      />
      <button onClick={handleAddDepartment}>Add</button>
    </div>
  );
}

export default App;
