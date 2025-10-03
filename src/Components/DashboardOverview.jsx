import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FaUsers, FaUserCheck } from 'react-icons/fa';

// Dummy data for cards and chart
const userStats = {
  total: 1200,
  active: 875,
  admins: 12,
};

const chartData = [
  { name: 'Jan', Monthly: 120, Weekly: 30, Yearly: 1200 },
  { name: 'Feb', Monthly: 140, Weekly: 35, Yearly: 1340 },
  { name: 'Mar', Monthly: 160, Weekly: 40, Yearly: 1500 },
  { name: 'Apr', Monthly: 180, Weekly: 45, Yearly: 1680 },
  { name: 'May', Monthly: 200, Weekly: 50, Yearly: 1880 },
  { name: 'Jun', Monthly: 220, Weekly: 55, Yearly: 2100 },
];

export default function DashboardOverview() {
  return (
    <div>
      <Typography variant="h4" color="primary" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3} className="mb-8">
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#1e293b', color: '#fff' }}>
            <CardContent>
              <div className="flex items-center space-x-3">
                <FaUsers size={32} className="text-green-400" />
                <div>
                  <Typography variant="h6">Total Users</Typography>
                  <Typography variant="h5" fontWeight="bold">{userStats.total}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#1e293b', color: '#fff' }}>
            <CardContent>
              <div className="flex items-center space-x-3">
                <FaUserCheck size={32} className="text-blue-400" />
                <div>
                  <Typography variant="h6">Active Users</Typography>
                  <Typography variant="h5" fontWeight="bold">{userStats.active}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#1e293b', color: '#fff' }}>
            <CardContent>
              <div className="flex items-center space-x-3">
                <FaUsers size={32} className="text-yellow-400" />
                <div>
                  <Typography variant="h6">Admins</Typography>
                  <Typography variant="h5" fontWeight="bold">{userStats.admins}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Card sx={{ bgcolor: '#1e293b', color: '#fff', p: 2 }}>
        <Typography variant="h6" gutterBottom>
          User Growth (Monthly, Weekly, Yearly)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Monthly" fill="#10b981" />
            <Bar dataKey="Weekly" fill="#3b82f6" />
            <Bar dataKey="Yearly" fill="#f59e42" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
