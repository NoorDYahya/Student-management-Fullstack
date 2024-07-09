import React, { useState } from 'react';
import './StudentForm.css';
const StudentForm = () => {
    const [student, setStudent] = useState({
        name: '',
        age: '',
        email: '',
        average: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });
            const data = await response.json();
            console.log(data);
            alert('Student added successfully!');
            setStudent({
                name: '',
                age: '',
                email: '',
                average: '',
            });
        } catch (error) {
            console.error('There was an error adding the student!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Age:</label>
                <input
                    type="number"
                    name="age"
                    value={student.age}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Average:</label>
                <input
                    type="number"
                    name="average"
                    value={student.average}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Add Student</button>
        </form>
    );
};

export default StudentForm;
