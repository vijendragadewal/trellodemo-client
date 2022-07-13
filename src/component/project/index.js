import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { retrieveProjectsOperation } from "../../Operations/projects";
import { retrieveUsersOperation } from "../../Operations/users";

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProject: null,
      currentIndex: -1,
    };
    this.setActiveProject = this.setActiveProject.bind(this);
  }

  componentDidMount() {
    this.props.getAllProjects();
    this.props.getAllUsers();
  }

  setActiveProject = (project, index) => {
    this.setState({ currentProject: project, currentIndex: index });
  };

  render() {
    const { currentProject, currentIndex } = this.state;
    const { projects, users } = this.props;
    return (
      <div className="list row mt-5">
        <div className="col-md-6">
          <h4>Projects List</h4>
          <ul className="list-group">
            {projects &&
              projects.map((project, index) => (
                <li
                  className={"list-group-item " + (index === currentIndex ? "active" : "")}
                  onClick={() => this.setActiveProject(project, index)}
                  key={index}
                >
                  {project.projectName}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentProject ? (
            <div>
              <h4>Project</h4>
              <div>
                <label>
                  <strong>Project Name:</strong>
                </label>{" "}
                {currentProject.projectName}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentProject.description}
              </div>
              <div>
                <label>
                  <strong>Assign Users:</strong>
                </label>{" "}
                {users &&
                  // eslint-disable-next-line array-callback-return
                  users.map((user, index) => {
                    if (currentProject.assignUsers.indexOf(user.id) !== -1) {
                      return user.userName.toUpperCase();
                    }
                  })}
              </div>
              <Link to={"/admin/projects/" + currentProject.id} className="badge bg-warning">
                Edit
              </Link>
              <Link to={"/admin/createticket/" + currentProject.id} className="badge bg-success">
                Create Ticket
              </Link>
              <Link to={"/admin/projectTicket/" + currentProject.id} className="badge bg-secondary">
                List of Tickets
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Project for Detail...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapState = (state) => ({
  projects: state.projects,
  users: state.users,
});
const mapDispatchToProps = (dispatch) => ({
  getAllProjects: () => dispatch(retrieveProjectsOperation()),
  getAllUsers: () => dispatch(retrieveUsersOperation()),
});

export default connect(mapState, mapDispatchToProps)(ProjectList);
