import React from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import DeleteStudent from './components/DeleteStudent';

function App() {
    return (
        <div className="App">
            <h1>Student Management System</h1>
            <h3> Welcome student! Please fill the next details.</h3>
            <StudentForm />
            <h2>Delete Student</h2>
            <DeleteStudent />
        </div>
    );
}

export default App;
