import React, { useState } from 'react';
import { User, Mail, Shield, Lock, RefreshCcwDot, Briefcase, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
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


  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
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
                <FormInput
                  label={field === 'currPass' ? 'Current Password': field === 'newPass' ? 'New Password' : 'Confirm New Password'}
                  type={showPasswords[field] ? 'text' : 'password'}
                  name={field}
                  value={passData[field]}
                  onChange={handlePasswordChange}
                  error={errors[field]}
                  placeholder={
                    field === 'currPass'? 'Enter current password': field === 'newPass' ? 'Enter new password': 'Confirm new password'
                  }
                  required
                  rightElement={
                    <button
                      type="button"
                      onClick={() => PassToggle(field)}
                    >
                      {showPasswords[field] ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      )}
                    </button>
                  }
                />
              </div>
            ))}

            <Button
              type="button"
              onClick={handlePasswordSubmit}
              className="w-full flex items-center justify-center transition-all duration-200 hover:scale-103"
            >
              <RefreshCcwDot className="h-4 w-4 mr-2" />
              Update Password
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;