import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetch('/api/notifications')
            .then((response) => response.json())
            .then((data) => setNotifications(data));
    }, []);

    return (
        <div className="container my-4">
            <h2>Notifications</h2>
            <ul className="list-group">
                {notifications.map((notification) => (
                    <li key={notification.id} className="list-group-item">
                        {notification.message}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Notifications;
