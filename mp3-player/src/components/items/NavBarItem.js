import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context";

export default function NavBarItem({ children, path, src }) {
  const { app } = useContext(Context);
  const { pathname } = useLocation();

  return (
    <ListGroup.Item
      active={pathname.includes(path)}
      className={`navbar-item ${app.isOpen ? "open" : ""}`}
    >
      <Link
        to={path}
        className="d-flex align-items-center"
        onClick={() => app.setIsOpen(false)}
      >
        <img className="mx-2" src={src} alt="house" />
        <span className="navbar-item-text">{children}</span>
      </Link>
    </ListGroup.Item>
  );
}
