import { useEffect, useState } from 'react';
import { fetchEvents, deleteEvent, updateEvent } from '../services/api';
import { Link } from 'react-router-dom';
//,update,delete from here
function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [updatedEventData, setUpdatedEventData] = useState({
    eventName: '',
    location: '',
    description: '',
    image: '',
    eventDate: '',
    eventTime: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true'; 
    setIsAdmin(adminStatus);

    const getEvents = async () => {
      try {
        const response = await fetchEvents();
        if (Array.isArray(response)) {
          setEvents(response);
        } else {
          console.error('bekar hai', response);
          setEvents([]);
        }
      } catch (error) {
        console.error('kuch toh gadbad hai', error);
      }
    };

    getEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents((prevEvents) => prevEvents.filter(event => event._id !== eventId)); 
    } catch (error) {
      console.error('delete nhi hua', error);
    }
  };

  const handleUpdateClick = (event) => {
    setEditingEvent(event._id);
    setUpdatedEventData({
      eventName: event.eventName,
      location: event.location,
      description: event.description,
      image: event.image,
      eventDate: event.eventDate,
      eventTime: event.eventTime
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEventData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdateSubmit = async (eventId) => {
    try {
      const response = await updateEvent(eventId, updatedEventData);
      if (response && response.data) {
        setEvents((prevEvents) =>
          prevEvents.map(event => (event._id === eventId ? response.data : event))
        );
        setEditingEvent(null);
        setUpdatedEventData({
          eventName: '',
          location: '',
          description: '',
          image: '',
          eventDate: '',
          eventTime: ''
        });
      }
    } catch (error) {
      console.error('update nhi ho raha', error);
    }
  };

  const filteredEvents = events.filter(event =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Events</h1>
      <input
        type="text"
        placeholder="Search by event name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isAdmin && (
        <Link to="/create-event">
          <button>+ Add Event</button>
        </Link>
      )}
      <div>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link><br></br>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
      <ul>
        {filteredEvents.length === 0 ? (
          <p>No events available</p>
        ) : (
          filteredEvents.map(event => (
            <li key={event._id}>
              <h2>{event.eventName}</h2>
              <img src={event.image} alt={event.eventName} style={{ width: '200px', height: 'auto' }} />
              <p>{event.location}</p>
              <p>{event.eventDate}</p>
              <p>{event.eventTime}</p>
              <p>{event.description}</p>
              {isAdmin && (
                <>
                  {editingEvent === event._id ? (
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdateSubmit(event._id); }}>
                      <input
                        type="text"
                        name="eventName"
                        value={updatedEventData.eventName}
                        onChange={handleInputChange}
                        placeholder="Event Name"
                      />
                      <input
                        type="text"
                        name="location"
                        value={updatedEventData.location}
                        onChange={handleInputChange}
                        placeholder="Location"
                      />
                      <input
                        type="text"
                        name="eventDate"
                        value={updatedEventData.eventDate}
                        onChange={handleInputChange}
                        placeholder="Event Date"
                      />
                      <input
                        type="text"
                        name="eventTime"
                        value={updatedEventData.eventTime}
                        onChange={handleInputChange}
                        placeholder="Event Time"
                      />
                      <input
                        type="text"
                        name="description"
                        value={updatedEventData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                      />
                      <input
                        type="text"
                        name="image"
                        value={updatedEventData.image}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                      />
                      <button type="submit">Save</button>
                      <button type="button" onClick={() => setEditingEvent(null)}>Cancel</button>
                    </form>
                  ) : (
                    <>
                      <button onClick={() => handleUpdateClick(event)}>Update</button>
                      <button onClick={() => handleDelete(event._id)}>Delete</button>
                    </>
                  )}
                </>
              )}
              <Link to="/success">
                <button>Register</button>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default EventsPage;
