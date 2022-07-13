import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const userid = localStorage.getItem("userid");
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.users.filter((user) => user.id === userid));

  const handlelogout = () => {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("userid", "");
    navigate("/", true);
  };

  useEffect(() => {
    navigate("/admin/tickets", true);
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/admin/tickets"} className="nav-link">
              Tickets
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/admin/projects"} className="nav-link">
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/admin/addproject"} className="nav-link">
              Add Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/admin/users"} className="nav-link">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/admin/adduser"} className="nav-link">
              Add User
            </Link>
          </li>
          <li className="nav-item">{currentUser.userName}</li>
        </div>
        <Link className="nav-link " to={"/"} onClick={handlelogout} name="logout">
          Logout
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Dashboard;
