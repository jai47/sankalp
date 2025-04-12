import Certificates from './certificates';
import Chat from './chat';
import Club from './club';
import Events from './events';
import Profile from './profile';

const Overview = ({ section, user }) => {
    switch (section) {
        case 'Profile':
            return <Profile user={user} />;
        case 'Events':
            return <Events user={user} />;
        case 'Club':
            return <Club user={user} />;
        case 'Certificates':
            return <Certificates user={user} />;
        case 'chat':
            return <Chat />;
    }
};
export default Overview;
