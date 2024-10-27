//no comments to be made
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/Signup';
import Login from './components/Login';
import Events from './components/EventsPage';
import CreateEvent from './components/CreateEvent'; 
import Success from './components/Success';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/create-event" element={<CreateEvent />} /> 
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
