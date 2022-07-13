import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveUsersOperation } from "../../Operations/users";

const Profile = () => {
  const userid = localStorage.getItem("userid");
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.users.filter((user) => user.id === userid));

  useEffect(() => {
    dispatch(retrieveUsersOperation());
  }, [dispatch]);

  return (
    <div className="profileCard card ">
      <h3>USER PROFILE </h3>
      <table className="profileTable">
        <tbody>
          <tr>
            <td>
              <span>
                <strong>User Name </strong>
              </span>
            </td>
            <td>
              <span>{currentUser[0].userName}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <strong>Email </strong>
              </span>
            </td>
            <td>
              <span>{currentUser[0].email}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <strong>Role </strong>
              </span>
            </td>
            <td>
              <span>{currentUser[0].isAdmin ? "Admin" : "User"}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Profile;
