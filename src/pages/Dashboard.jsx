import React from 'react';
import { Users, Briefcase, TrendingUp, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { candidates } from '../data/candidates';
import { internships } from '../data/internships';

const Dashboard = () => {

  const stats = [
    {
      name: 'Total Candidates',
      value: candidates.length,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'Active Internships',
      value: internships.filter(i => i.status === 'Open').length,
      icon: Briefcase,
      color: 'bg-indigo-500',
      change: '+5%',
      changeType: 'increase'
    },
    {
      name: 'Pending Applications',
      value: candidates.filter(c => c.status === 'Pending').length,
      icon: Clock,
      color: 'bg-yellow-500',
      change: '+8%',
      changeType: 'increase'
    },
    {
      name: 'Approval Rate',
      value: `${Math.round((candidates.filter(c => c.status === 'Approved').length / candidates.length) * 100)}%`,
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '-2%',
      changeType: 'decrease'
    }
  ];

  const recentCandidates = candidates.slice(0, 5);

  const applicantsData = internships.map(internship => ({
    name: internship.title,
    applicants: internship.applicants
  }));

  const statusCounts = candidates.reduce((acc, candidate) => {
    acc[candidate.status] = (acc[candidate.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status]
  }));

  const colors = {
    'Approved': '#5CB338',
    'Pending': '#FFE400',
    'Rejected': '#FF1700'
  };

  return (
    <>
      <div className="space-y-3 px-6 sm:px-0 animate-fadeIn">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-2 text-sm text-gray-600 mb-6">
            Welcome back! Here's what's happening with your internship program.
          </p>
        </div>
      </div>
      <div className="space-y-6 p-6 sm:p-8 md:p-10 lg:p-0">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn" >
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200 transition-all duration-200 hover:scale-103">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  </div>

                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon size={24} className="text-white" />
                  </div>
                </div>

                <div className="mt-4 flex items-center">
                  <span className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-2">from last month</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200 ">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Candidates</h3>
            <div className="space-y-4 animate-fadeIn">
              {recentCandidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div>
                    <p className="font-medium text-gray-800">{candidate.name}</p>
                    <p className="text-sm text-gray-600">{candidate.appliedInternship}</p>
                  </div>

                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    candidate.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    candidate.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {candidate.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200 ">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Open Internships</h3>
            <div className="space-y-4">
              {internships.filter(i => i.status === 'Open').slice(0, 5).map((internship) => (
                <div key={internship.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div>
                    <p className="font-medium text-gray-800">{internship.title}</p>
                    <p className="text-sm text-gray-600">{internship.department} • {internship.duration} weeks</p>
                  </div>
                  <span className="text-sm font-medium text-gray-600">Rs {internship.stipend}/month</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 duration-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Applicants per Internship</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={applicantsData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <XAxis
                  dataKey="name"
                  angle={-45} 
                  textAnchor="end" 
                  interval={0} 
                  height={100} 
                  tick={{ fontSize: 11 }}
                 
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applicants" fill="#8884d8" name="Applicants" radius={[10, 10, 0, 0]} />
                
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Candidate Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {
                    statusData.map((status, index) => (
                      <Cell key={`cell-${index}`} fill={colors[status.name]} />
                    ))
                  }
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;