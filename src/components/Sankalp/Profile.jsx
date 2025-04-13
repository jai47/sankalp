import React from 'react';

const Profile = ({ user, club }) => {
    console.log(user);
    return (
        <div>
            {user[0]?.name}
            <p>{user[0]?.clubId?.name}</p>
        </div>
    );
};

export default Profile;
