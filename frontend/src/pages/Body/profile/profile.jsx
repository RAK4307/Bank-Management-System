import React from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const {
    first_name = 'N/A',
    last_name = '',
    gender = 'N/A',
    phone = 'N/A',
    email = 'N/A',
    address = 'N/A'
  } = user;
  const name = `${first_name} ${last_name}`.trim();

  return (
    <div className="profile-info">
      <h2>Profile Information</h2>
      <div><strong>Full Name: </strong> { name || 'N/A'}</div>
      <div><strong>Account Number: </strong> { user.account_number || 'N/A'}</div>
      <div><strong>Gender: </strong> { gender || 'N/A'}</div>
      <div><strong>Phone: </strong> { phone || 'N/A'}</div>
      <div><strong>Email: </strong> { email || 'N/A'}</div>
      <div><strong>Address: </strong> { address || 'N/A'}</div>
    </div>
  );
};

export default Profile;