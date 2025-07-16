import React, { useState } from 'react';
import { User, Mail, Shield, Lock, RefreshCcwDot, Briefcase,Eye,EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import pic from '../assets/user.jpg';

const ProfilePage = () => {

    //creating essentials for password changing
  const { user } = useAuth();
  const [passData, setpassData] = useState({
    currPass: '',
    newPass: '',
    confirmPass: ''
  });

    const [showPasswords, setShowPasswords] = useState({
    currPass: false,
    newPass: false,
    confirmPass: false
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  //validation of form logic
  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passData.currPass) {
      newErrors.currPass = 'Current password is required';
    }

    if (!passData.newPass) {
      newErrors.newPass = 'New password is required';
    } else if (passData.newPass.length < 6) {
      newErrors.newPass = 'Password must be at least 6 characters';
    }

    if (passData.newPass !== passData.confirmPass) {
      newErrors.confirmPass = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //logic for submission of password
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    setSuccessMessage('Password updated successfully!');
    setpassData({ currPass: '', newPass: '', confirmPass: '' });
    setErrors({});

    setTimeout(() => setSuccessMessage(''), 2000);
  };


 //changing the password logic
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setpassData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    };

    //toggle between showing and hiding password
    const PassToggle = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  const NotifSettings = [
    {
      title: 'Email Notifications',
      desc: 'Receive email updates about applications',
      checked: true
    },
    {
      title: 'SMS Notifications',
      desc: 'Get text alerts for urgent updates',
      checked: false
    },
    {
      title: 'Weekly Reports',
      desc: 'Receive weekly analytics summaries',
      checked: true
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/*Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <img
            src={pic}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-gray-600">{user?.role}</p>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <User size={20} className="text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">Name</p>
                <p className="text-gray-600">{user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Mail size={20} className="text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Shield size={20} className="text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">Role</p>
                <p className="text-gray-600">{user?.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Briefcase size={20} className="text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">Department</p>
                <p className="text-gray-600">{user?.department}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Password Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Lock size={20} className="text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-800">Change Password</h3>
          </div>
          
          {/*pop up of success message if true*/}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          <div className="space-y-4">
            {['currPass', 'newPass', 'confirmPass'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field === 'currPass' ? 'Current Password': field === 'newPass' ? 'New Password' : 'Confirm New Password'}
                </label>
                <div className="relative">
                  <input
                    type={showPasswords[field] ? 'text' : 'password'}
                    name={field}
                    value={passData[field]}
                    onChange={handlePasswordChange}
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors[field] ? 'border-red-400' : 'border-gray-300'
                    }`}
                    placeholder={
                      field === 'currPass'? 'Enter current password': field === 'newPass' ? 'Enter new password': 'Confirm new password'
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => PassToggle(field)}
                  >
                    {showPasswords[field] ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    )}
                  </button>
                </div>
                {errors[field] && (
                  <p className="text-sm text-red-600 mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handlePasswordSubmit}
              className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              <RefreshCcwDot className="h-4 w-4 mr-2" />
              Update Password
            </button>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h3>
  <div className="space-y-4">
    {NotifSettings.map(({ title, desc, checked }) => (
      <div
        key={title}
        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
      >
        <div>
          <p className="font-medium text-gray-800">{title}</p>
          <p className="text-sm text-gray-600">{desc}</p>
        </div>
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-indigo-600"
          defaultChecked={checked}
        />
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default ProfilePage;
