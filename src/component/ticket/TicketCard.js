export const TicketCards = (props) => {
  return (
    <div key={props.header} className="card cardlist p-3 col">
      <h4 className="card-header card-title listtitle">{props.header} </h4>
      <ul className="list-group mt-2"> {props.list}</ul>
    </div>
  );
};
