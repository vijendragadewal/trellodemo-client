const TicketStatus = (props) => {
  return (
    <>
      <select value={props.value} onChange={props.handleStatusChange}>
        <option value="todo">Todo</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </>
  );
};

export default TicketStatus;
