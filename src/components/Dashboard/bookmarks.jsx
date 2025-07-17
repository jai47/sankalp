import { fetchRegisteredEvents } from '@/actions/events/fetchEvents';
import React, { useEffect, useState } from 'react';

const Bookmarks = () => {
    const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
    useEffect(() => {
        // fetchRegisteredEvents
        const getCookie = (name) => {
            const cookies = document.cookie.split('; ');
            const cookie = cookies.find((row) => row.startsWith(`${name}=`));
            return cookie
                ? JSON.parse(decodeURIComponent(cookie.split('=')[1]))
                : [];
        };
        const cookies = getCookie('events');
        const fetchData = async () => {
            const events = await fetchRegisteredEvents(cookies);
            setBookmarkedEvents(events);
        };
        fetchData();
    }, []);

    return bookmarkedEvents.map((event) => (
        <div key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
        </div>
    ));
};

export default Bookmarks;
