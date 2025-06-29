import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../end/footer';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            const token = localStorage.getItem('admin_token'); 
            if (!token) {
                navigate('/admin');
                return;
            }

            try {
                const res = await fetch('http://localhost:5000/api/admin/customers', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch data. Please log in again.');
                }

                const data = await res.json();
                setCustomers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCustomers();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin');
    };

    // This is a placeholder. You can fetch and display admin-specific data here.
    // For example, a list of all users, transactions, etc.
    return (
        <div className="admin-dashboard-container">
            <nav className="admin-dashboard-nav">
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout} className="admin-logout-btn">Logout</button>
            </nav>
            <main className="admin-dashboard-main">
                <h2>Welcome, Admin!</h2>
                <p>This is where you can manage users, view transactions, and perform other administrative tasks.</p>
                
                {isLoading && <p>Loading customer data...</p>}
                {error && <p className="admin-error-message">{error}</p>}

                {!isLoading && !error && (
                    <div className="customer-list-container">
                        <h3>Customer Accounts</h3>
                        <table className="customer-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Account Number</th>
                                    <th>Balance</th>
                                    <th>Joined On</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map(customer => (
                                    <tr key={customer.id}>
                                        <td>{customer.id}</td>
                                        <td>{customer.full_name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.account_number}</td>
                                        <td>${parseFloat(customer.balance).toFixed(2)}</td>
                                        <td>{new Date(customer.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default AdminDashboard;