import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userid");
    navigate("/", true);
  };
  useEffect(() => {
    navigate("/user/tickets", true);
    const jwt = localStorage.getItem("accessToken");
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/user/profile"} className="nav-link">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/user/tickets"} className="nav-link">
              Tickets
            </Link>
          </li>
        </div>
        <Link to="/" onClick={handlelogout} name="logout">
          Logout
        </Link>
      </nav>
      <h2>Welcome to user Dashboard</h2>
      <Outlet />
    </div>
  );
};

export default UserDashboard;
