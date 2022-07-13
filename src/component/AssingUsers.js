const AssignUsers = (props) => {
  return (
    <span>
      {props.index > 0 ? "," : null}
      {props.userName}
    </span>
  );
};
export default AssignUsers;
