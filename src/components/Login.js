import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { login } from '../services/api';

function Login() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      alert('Login successful!');

      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('isAdmin', response.user.isAdmin); 
      
      navigate('/events');
    } catch (error) {
      alert(error.response?.data.message || 'Login failed, Please try again.');
    }
  };

  return (
    <div>
      <h1>Event Management App by Rishi</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <div>
        <p>Don't have an account?</p>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
