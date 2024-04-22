
import React, { useState, useEffect } from 'react';
import LoginNavBar from '../components/LoginNavBar';
import { secureFetch } from '../helper/SecureFetch';
import CardDataStats from '../components/CardDataStats';
import BarChart from '../components/BarChart';



const UserProfile = () => {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    username: '',
    email: '',
    profilePicture: '',
    firstName: '',
    lastName: '',
    mobile: '',
    street: '',
    apt: '',
    zipcode: ''
  });
  const [stats, setStats] = useState({
    number_of_orders: 0,
    total_spend: 0,
    average_cost_per_order: 0,
    delivered: 0,
    pending: 0,
    last_order: '',
  });
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await secureFetch('http://localhost:3000/api/auth/profile', { method: 'GET' });
        const ordersStats = await secureFetch('http://localhost:3000/api/orders/profile');
        const chartResponse = await secureFetch('http://localhost:3000/api/orders/yearly-orders');
     
        if (userProfile.response.ok) setUser(userProfile.data);
        if (ordersStats.response.ok) setStats(ordersStats.data);
        if (chartResponse.response.ok) setChartData(chartResponse.data);
    
      }catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveChanges = async () => {
    try {
      const response = await secureFetch('http://localhost:3000/api/auth/updateprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });
      if (response.ok) {
        alert('Profile updated successfully');
        setEditing(false);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };
  const testdata = [0, 0, 0, 8, 1, 1, 0, 0, 0, 0, 0, 0];

  return (
    <div>
      <LoginNavBar />
      <div className="mt-4 container mx-auto p-20">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#00df9a] mb-6">Profile</h2>
          <div className="flex items-center space-x-4 mb-4">
            <img src={user.profilePicture || 'default-profile-pic-url'} alt="Profile" className="w-20 h-20 rounded-full" />
            <div>
              <p className="text-lg font-bold">{user.username}</p>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div>
              {editing ? (
                <>
                  <input type="text" name="firstName" value={user.firstName} onChange={handleInputChange} className="form-input mb-2" placeholder="First Name" />
                  <input type="text" name="lastName" value={user.lastName} onChange={handleInputChange} className="form-input mb-2" placeholder="Last Name" />
                  <input type="text" name="mobile" value={user.mobile} onChange={handleInputChange} className="form-input" placeholder="Phone Number" />
                </>
              ) : (
                <>
                  <p>First Name     : {user.firstName}</p>
                  <p>Last Name      : {user.lastName}</p>
                  <p>Phone Number   : {user.mobile}</p>
                </>
              )}
            </div>
            {/* Right Column */}
            <div>
              {editing ? (
                <>
                  <input type="text" name="apt" value={user.apt} onChange={handleInputChange} className="form-input mb-2" placeholder="Apartment" />
                  <input type="text" name="street" value={user.street} onChange={handleInputChange} className="form-input mb-2" placeholder="Street" />
                  <input type="text" name="zipcode" value={user.zipcode} onChange={handleInputChange} className="form-input" placeholder="Zip Code" />
                </>
              ) : (
                <>
                  <p>Apartment: {user.apt}</p>
                  <p>Street   : {user.street}</p>
                  <p>Zip Code : {user.zipcode}</p>
                </>
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <button onClick={() => setEditing(!editing)} className="bg-[#00df9a] hover:bg-[#00b882] text-white py-2 px-4 rounded">
              {editing ? 'Cancel' : 'Edit Profile'}
            </button>
            {editing && (
              <button onClick={saveChanges} className="bg-[#00df9a] hover:bg-[#00b882] text-white py-2 px-4 rounded">
                Save Changes
              </button>
            )}
          </div>
        </div>
        {/* Statistics and Chart */}
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <CardDataStats title="Total Orders" total={`${stats.number_of_orders}`} >
              <p className="text-2xl font-bold text-[#00df9a] mb-6">{stats.number_of_orders}</p>
            </CardDataStats>
            <CardDataStats title="Total Spend" total={`$${stats.total_spend}`} >
            <p>{stats.total_spend}</p>
            </CardDataStats>
            <CardDataStats title="Average Cost" total={`$${stats.average_cost_per_order}`} >
            <p className="text-2xl font-bold text-[#00df9a] mb-6">{stats.average_cost_per_order}</p>
            </CardDataStats>
            <CardDataStats title="Delivered Orders" total={`${stats.delivered}`} >
            <p>{stats.delivered}</p>
            </CardDataStats>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-full max-w-2xl">
  <h2 className="text-2xl font-bold mb-4 ">Recent Order </h2>
  {stats.last_order ? (
    <>
      <p><strong>Order ID:</strong> {stats.last_order.id}</p>
      <p><strong>Status:</strong> {stats.last_order.status}</p>
      <p><strong>Price:</strong> {stats.last_order.total}</p>
    </>
  ) : (
    <p>No recent orders to display.</p>
  )}
</div>


          <div className="mt-8">
            <BarChart data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

