import React from 'react';
import {  Routes, Route, Navigate} from 'react-router-dom';
import ListEmployeeComponent from './component/employee/ListEmployeeComponent';
import AddUpdateEmployeeComponent from './component/employee/AddUpdateEmployeeComponent';

function App() {
  return (
    <div>
     
     
          <Routes>
            <Route path="/" element={< ListEmployeeComponent />} />
            <Route path="/employees" element={<ListEmployeeComponent />} />
            <Route path="/add-employee" element={<AddUpdateEmployeeComponent />} />
            <Route path="/edit-employee/:id" element={<AddUpdateEmployeeComponent />} />
          </Routes>
      
    </div >
  );
}

export default App;