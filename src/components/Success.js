import { Link } from 'react-router-dom';

function Success() {
  return (
    <div>
      <h1>You have registered successfully!</h1>
      <Link to="/events">Back to Events</Link>
    </div>
  );
}

export default Success;
