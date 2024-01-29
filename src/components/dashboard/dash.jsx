import React from 'react';
import { useState, useEffect } from 'react';
import './dashCard.css';
import { useNavigate } from 'react-router-dom';

function Dash() {
    const nav = useNavigate();

    const [users, setUser] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((data) => data.json())
            .then((data) => setUser(data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    return (
        <div className='user-card-container'>
            {users.map(user =>
                <div key={user.id} className="card">
                    <h2 className="user-name">{user.name}</h2>
                    <p className="user-email">Email: {user.email}</p>
                    <p className="user-phone">Phone: {user.phone}</p>
                    <p className='website'>Website: <a href={`http://${user.website}`}>{user.website}</a></p>
                    <button className="btn btn-primary" onClick={()=>nav("/details", {state: user.id})}>View</button>
                </div>
            )}
        </div>
    )
}

export default Dash
