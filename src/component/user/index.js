import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveUsersOperation } from "../../Operations/users";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentIndex: -1,
    };
    this.setActiveUser = this.setActiveUser.bind(this);
  }
  componentDidMount() {
    this.props.getAllUsers();
  }
  setActiveUser(user, index) {
    this.setState({ currentUser: user, currentIndex: index });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="list row mt-5 ">
        <div className="col-md-6">
          <h4>Users List</h4>
          <ul className="list-group">
            {this.props.users &&
              this.props.users.map((user, index) => (
                <li
                  className={
                    "list-group-item " + (index === this.state.currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user.userName}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6 ">
          {currentUser ? (
            <div>
              <h4>User</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentUser.userName}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentUser.email}
              </div>
              <div>
                <label>
                  <strong>Roll:</strong>
                </label>{" "}
                {currentUser.isAdmin ? "Admin" : "User"}
              </div>
              <Link to={"/admin/users/" + currentUser.id} className="badge bg-warning">
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a User...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapState = (state) => ({
  users: state.users,
});
const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(retrieveUsersOperation()),
});
export default connect(mapState, mapDispatchToProps)(UserList);
