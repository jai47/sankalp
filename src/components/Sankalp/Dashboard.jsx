import React from 'react';
import { toast } from 'react-toastify';

const Dashboard = () => {
    return (
        <div>
            <button
                onClick={() => {
                    toast.success('Wow so easy !', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                }}
            >
                Click me
            </button>
        </div>
    );
};

export default Dashboard;
