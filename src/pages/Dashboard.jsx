import React from 'react';
import { Users, Briefcase, TrendingUp, Clock } from 'lucide-react';
import { candidates } from '../data/candidates'; 
import { internships } from '../data/internships'; 


const Dashboard = () => {

  // Define an array of statistics for the dashboard cards
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
      value: internships.filter(i => i.status === 'Open').length, //filter the open internships
      icon: Briefcase, 
      color: 'bg-green-500', 
      change: '+5%', 
      changeType: 'increase' 
    },
    {
      name: 'Pending Applications',
      value: candidates.filter(c => c.status === 'Pending').length, //filter out the pending applications
      icon: Clock, 
      color: 'bg-yellow-500', 
      change: '+8%', 
      changeType: 'increase'
    },
    {
      name: 'Approval Rate',
      value: `${Math.round((candidates.filter(c => c.status === 'Approved').length / candidates.length) * 100)}%`, //approval rate(by seeing the num of accepted candidates)
      icon: TrendingUp, 
      color: 'bg-purple-500', 
      change: '+2%', 
      changeType: 'increase' 
    }
  ];

  //Shows or filters the first 5 candidates
  const recentCandidates = candidates.slice(0, 5);

  return (
    <>
    <div className="space-y-3 px-6 sm:px-0 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-gray-600 mb-6">
          Welcome back! Here's what's happening with your internship program.
        </p>
      </div></div>
    <div className="space-y-6 p-6 sm:p-8 md:p-10 lg:p-0">
        
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn" >
        {stats.map((stat) => {
          const Icon = stat.icon; 

          return (
            // Individual stat card
            <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200 transition-all duration-200 hover:scale-103">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>

                {/* Icons with different bg colors */}
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>

              {/* increase/decrease */}
              <div className="mt-4 flex items-center">
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">

        {/* Recent Candidates List */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200 ">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Candidates</h3>
          <div className="space-y-4 animate-fadeIn">
            {recentCandidates.map((candidate) => (
              // Individual candidate item
              <div key={candidate.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div>
                  <p className="font-medium text-gray-800">{candidate.name}</p>
                  <p className="text-sm text-gray-600">{candidate.appliedInternship}</p>
                </div>

                {/* Candidate status with specific colors */}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  candidate.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  candidate.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>     
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Internships List */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200 ">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Open Internships</h3>
          <div className="space-y-4">
            {internships.filter(i => i.status === 'Open').slice(0, 5).map((internship) => (
              // Individual internship item
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
    </div>
    </>
  );
};

export default Dashboard;
