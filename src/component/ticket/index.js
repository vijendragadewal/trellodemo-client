import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveTicketsOperation } from "../../Operations/tickets";
import { TicketCards } from "./TicketCard";

class TicketBoards extends Component {
  constructor(props) {
    super(props);
    this.getTickets = this.getTickets.bind(this);
  }

  componentDidMount() {
    this.props.getAllTicket();
  }

  getTickets = (statusCode) => {
    const { tickets } = this.props;
    // if (!tickets) {
    //   return <p>Loading...</p>;
    // }
    // eslint-disable-next-line array-callback-return
    const list = tickets.map((tickets, index) => {
      if (tickets.status === statusCode) {
        return (
          <Link to={"/isAdmin/tickets/" + tickets.id} key={index} className="tickerDescription">
            <li className={"list-group-item ticket-item "} onClick={() => {}}>
              <span>{tickets.description}</span>
            </li>
          </Link>
        );
      }
    });
    return list;
  };
  render() {
    return (
      <div>
        <h2 className="loginheader">Dashboard</h2>
        <div className="list row ">
          <TicketCards header="TODO" list={this.getTickets("todo")} />
          <TicketCards header="IN PROGRESS" list={this.getTickets("inprogress")} />
          <TicketCards header="DONE" list={this.getTickets("done")} />
        </div>
      </div>
    );
  }
}
const mapToState = (state) => ({
  tickets: state.tickets,
});
const mapToDispatchProps = (dispatch) => ({
  getAllTicket: () => dispatch(retrieveTicketsOperation()),
});
export default connect(mapToState, mapToDispatchProps)(TicketBoards);
