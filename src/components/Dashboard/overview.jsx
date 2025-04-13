import { useEffect, useState } from 'react';
import Certificates from './certificates';
import Chat from './chat';
import Club from './club';
import Events from './events';
import Profile from './profile';
import { fetchClubEvents } from '@/actions/events/fetchEvents';
import { getClubs } from '@/actions/clubs/getClubs';

const Overview = ({ section, user }) => {
    const userData = user[0];
    const clubId = userData?.clubId?.id;

    const [club, setClub] = useState(null);
    const [clubEvents, setClubEvents] = useState([]);

    useEffect(() => {
        if (!clubId) return;

        const fetchData = async () => {
            try {
                const [clubData, events] = await Promise.all([
                    getClubs(clubId),
                    fetchClubEvents(clubId),
                ]);

                setClub(clubData?.[0] || null);
                setClubEvents(events || []);
            } catch (error) {
                console.error('Error fetching club data or events:', error);
            }
        };

        fetchData();
    }, [clubId]);

    switch (section) {
        case 'Profile':
            return <Profile user={user} />;
        case 'Events':
            return <Events user={user} clubEvents={clubEvents} />;
        case 'Club':
            return <Club user={user} club={club} />;
        case 'Certificates':
            return <Certificates user={user} />;
        case 'chat':
            return <Chat />;
        default:
            return null;
    }
};

export default Overview;
