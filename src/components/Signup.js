import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { signup } from '../services/api';

const Signup = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        isAdmin: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(formData);
            console.log('User registered:', response);
            navigate('/login'); 
        } catch (error) {
            console.error('Signup Error:', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h1>Event Management App by Rishi</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <label>
                    Admin User
                    <input
                        type="checkbox"
                        name="isAdmin"
                        checked={formData.isAdmin}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
            <div>
                <p>Already have an account?</p>
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </div>
        </div>
    );
};

export default Signup;
