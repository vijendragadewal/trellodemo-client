import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TicketCards } from "./TicketCard";
import { retrieveUsersOperation } from "../../Operations/users";
import { retrieveTicketsOperation } from "../../Operations/tickets";

export const UserTicket = () => {
  const userId = localStorage.getItem("userid");

  const tickets = useSelector((state) => state.tickets);
  const currentUser = useSelector((state) => state.users.filter((user) => user.id === userId));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveUsersOperation());
    dispatch(retrieveTicketsOperation());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTickets = (statusCode) => {
    // eslint-disable-next-line array-callback-return
    const list = tickets.map((tickets, index) => {
      if (tickets.status === statusCode && tickets.assignUsers[0] === currentUser[0].id) {
        return (
          <Link to={"/user/tickets/" + tickets.id} className="tickerDescription">
            <li className={"list-group-item ticket-item "} onClick={() => {}} key={index}>
              <span>{tickets.description}</span>
            </li>
          </Link>
        );
      }
    });
    return list;
  };

  return (
    <div>
      <h2 className="loginheader">User Ticket</h2>
      <div className="list row ">
        <TicketCards header="TODO LIST" list={getTickets("todo")} />
        <TicketCards header="IN PROGRESS" list={getTickets("inprogress")} />
        <TicketCards header="DONE" list={getTickets("done")} />
      </div>
    </div>
  );
};
