import { Route, Routes } from "react-router-dom";
import Signin from "./component/Signin";
import SignUp from "./component/Signup";
import Dashboard from "./component/Dashboard";
import UserDashboard from "./component/UserDashboard";
import AddNewUser from "./component/user/Create";
import UserDetail from "./component/user/EditDetail";
import UserList from "./component/user";
import Profile from "./component/user/Profile";
import ProjectList from "./component/project";
import AddProject from "./component/project/Create";
import ProjectDetail from "./component/project/EditAndDelete";
import TicketBoards from "./component/ticket";
import { Ticket } from "./component/ticket/viewOrEditTicket";
import AddTicket from "./component/ticket/Create";
import { UserTicket } from "./component/ticket/UserWise";
import { ProjectTicket } from "./component/ticket/ProjectWise";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./list.css";

function App() {
  return (
    <div className="mainpage">
      <div>
        <Routes>
          <Route exact path="/" element={<Signin />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/admin" element={<Dashboard />}>
            <Route exact path="/admin/projects/:projectId" element={<ProjectDetail />} />
            <Route exact path="/admin/projects" element={<ProjectList />} />
            <Route exact path="/admin/addproject" element={<AddProject />} />
            <Route exact path="/admin/users/:userId" element={<UserDetail />} />
            <Route exact path="/admin/adduser" element={<AddNewUser />} />
            <Route exact path="/admin/users" element={<UserList />} />
            <Route exact path="/admin/tickets/:ticketId" element={<Ticket />} />
            <Route exact path="/admin/createticket/:id" element={<AddTicket />} />
            <Route exact path="/admin/projectTicket/:projectId" element={<ProjectTicket />} />
            <Route index path="/admin/tickets" element={<TicketBoards />} />
          </Route>
          <Route exact path="/user" element={<UserDashboard />}>
            <Route exact path="/user/tickets/:ticketId" element={<Ticket />} />
            <Route exact path="/user/tickets" element={<UserTicket />} />
            <Route exact path="/user/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
