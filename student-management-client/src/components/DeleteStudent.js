import React, { useState } from 'react';

const DeleteStudent = () => {
    const [name, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/students/${name}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(data);
            alert(data.message);
            setName('');
        } catch (error) {
            console.error('There was an error deleting the student!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Delete Student</button>
        </form>
    );
};

export default DeleteStudent;
