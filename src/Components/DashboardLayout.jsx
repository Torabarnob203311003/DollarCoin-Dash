import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            <Header />
            <div className="flex flex-1 min-h-0">
                <Sidebar />
                <div className="flex-1 p-6 overflow-y-auto min-h-0">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;