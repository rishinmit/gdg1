import { useState } from 'react';
import { createEvent } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
// this page is to creeate any event
function CreateEvent() {
  const [newEvent, setNewEvent] = useState({
    eventName: '',
    image: '',
    eventDate: '',
    eventTime: '',
    location: '',
    description: '',
  });
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      await createEvent(newEvent);
      navigate('/events'); 
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div>
      <h2>Add New Event</h2>
      <input
        type="text"
        placeholder="Event Title"
        value={newEvent.eventName}
        onChange={(e) => setNewEvent({ ...newEvent, eventName: e.target.value })}
      /><br></br>
      <input
        type="text"
        placeholder="Image URL"
        value={newEvent.image}
        onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
      /><br></br>
      <input
        type="date"
        value={newEvent.eventDate}
        onChange={(e) => setNewEvent({ ...newEvent, eventDate: e.target.value })}
      /><br></br><br></br>
      <input
        type="time"
        value={newEvent.eventTime}
        onChange={(e) => setNewEvent({ ...newEvent, eventTime: e.target.value })}
      /><br></br>
      <input
        type="text"
        placeholder="Location"
        value={newEvent.location}
        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
      /><br></br>
      <textarea
        placeholder="Description"
        value={newEvent.description}
        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
      /><br></br>
      <button onClick={handleCreate}>Add Event</button>
      <Link to="/events">
        <button style={{ marginTop: '10px' }}>Back to Events</button>
      </Link>
    </div>
  );
}

export default CreateEvent;
