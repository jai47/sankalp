import { getUser } from '@/actions/users/getUser';
import React, { useEffect } from 'react';

const Users = () => {
    const [users, setUsers] = React.useState([]);

    async function fetchUsers() {
        const users = await getUser();
        setUsers(users);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    // user :
    // [
    //     {
    //         "_id": "67e112aa481e14e8fef2181f",
    //         "name": "22CSE055 JAI",
    //         "email": "22cse055jai@eitfaridabad.co.in",
    //         "image": "https://lh3.googleusercontent.com/a/ACg8ocJe0aTMPh2_hQabaISRiHGdIK9T_qc_ozPMmqCRzOw09MhE2w=s96-c",
    //         "role": "admin",
    //         "clubId": {
    //             "id": "hello",
    //             "name": "Sankalp"
    //         },
    //         "activity": {
    //             "blogs": [],
    //             "likes": [],
    //             "bookmarks": [],
    //             "comments": []
    //         },
    //         "events": [
    //             "67e114c1481e14e8fef21842",
    //             "67e1bfff546c7c43207eaf4c",
    //             "67e830c2d29448e9b448a320"
    //         ],
    //         "certificate": [],
    //         "attendance": [],
    //         "__v": 0
    //     }, {}, {}, {}
    // ]

    return (
        <div>
            Users
            {users.map((item) => (
                <div
                    key={item._id}
                    className="bg-white shadow-md rounded-lg p-4 m-4"
                >
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p>{item.email}</p>
                    <img src={item.image} />
                    <p>Role: {item.role}</p>
                    <p>Club: {item.clubId.name}</p>
                    <p>Events: {item.events.length}</p>
                    <p>
                        Created At:{' '}
                        {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Users;
