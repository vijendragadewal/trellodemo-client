export const UserDropMenu = (props) => {
  return (
    <select value={props.value} onChange={props.handleUserSelect}>
      {props.users.map((user) => (
        <option value={user.id}>{user.userName}</option>
      ))}
    </select>
  );
};
