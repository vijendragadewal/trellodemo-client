import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { TicketCards } from "./TicketCard";
import { retrieveProjectsOperation } from "../../Operations/projects";
import { retrieveTicketsOperation } from "../../Operations/tickets";
import { retrieveUsersOperation } from "../../Operations/users";

export const ProjectTicket = () => {
  const { projectId } = useParams();

  const tickets = useSelector((state) => state.tickets);
  const currentProject = useSelector((state) =>
    state.projects.filter((project) => project.id === projectId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveProjectsOperation());
    dispatch(retrieveTicketsOperation());
    dispatch(retrieveUsersOperation());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTickets = (statusCode) => {
    // eslint-disable-next-line array-callback-return
    const list = tickets.map((tickets, index) => {
      if (tickets.status === statusCode && tickets.projectId === currentProject[0].id) {
        return (
          <Link to={"/project/tickets/" + tickets.id} className="tickerDescription">
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
      <h2 className="loginheader">Project Ticket</h2>
      <div className="list row ">
        <TicketCards header="TODO" list={getTickets("todo")} />
        <TicketCards header="IN PROGRESS" list={getTickets("inprogress")} />
        <TicketCards header="DONE" list={getTickets("done")} />
      </div>
    </div>
  );
};
