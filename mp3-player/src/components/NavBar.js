import React, { useContext, useEffect, useState } from "react";
import { Col, Image, ListGroup, Navbar, Row } from "react-bootstrap";
import house from "../img/house.svg";
import disc from "../img/disc.svg";
import loupe from "../img/loupe.svg";
import exit from "../img/exit.svg";
import { observer } from "mobx-react-lite";
import { NavLink, useNavigate } from "react-router-dom";
import Player from "./UI/Player";
import MyButton from "./UI/MyButton";
import { Context } from "../context";
import {
  ALBUMS_ROUTE,
  LIBRARY_ROUTE,
  LOGIN_ROUTE,
  SEARCH_ROUTE,
} from "../utils/consts";
import { endSession } from "../firebase/session";
import NavBarItem from "./items/NavBarItem";

export default observer(function NavBar() {
  const { app, gallery, player } = useContext(Context);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logOut = () => {
    app.setUserData({});
    app.setIsAuth(false);
    player.reset();
    gallery.setAlbums([]);
    navigate(LOGIN_ROUTE);
    endSession();
  };

  return (
    <Col
      xs={app.isOpen ? 12 : 2}
      md={app.isOpen ? 3 : 3}
      className={`nav-column ${app.isOpen ? "open" : ""}`}
    >
      <Navbar className="nav-bar" variant="dark">
        <ListGroup className={`nav-list ${app.isOpen ? "open" : ""}`}>
          <NavBarItem path={ALBUMS_ROUTE} src={house}>
            Home
          </NavBarItem>
          <NavBarItem path={SEARCH_ROUTE} src={loupe}>
            Search
          </NavBarItem>
          <NavBarItem path={LIBRARY_ROUTE} src={disc}>
            Library
          </NavBarItem>
        </ListGroup>
        {(app.isOpen || windowWidth > 631) && <Player />}
        <Row className={`user-section ${app.isOpen ? "open" : ""}`}>
          <Col
            xs={app.isOpen ? 6 : 12}
            className={`user-section-icon ${app.isOpen ? "open" : ""}`}
            sm={6}
          >
            <NavLink to={'/settings'} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Image height={40} width={40} src={app.userData.user.photoURL} roundedCircle />
              <p className='text'>{ app.userData.user.displayName }</p>
            </NavLink>
          </Col>
          <Col xs={app.isOpen ? 6 : 12} sm={6} className="logout-box">
            <MyButton variant="link" className="logout-button" onClick={logOut}>
              <img src={exit} alt="exit" />
            </MyButton>
          </Col>
        </Row>
      </Navbar>
      <MyButton
        variant="outline"
        className={`toggle-button ${app.isOpen ? "open" : ""}`}
        onClick={() => app.setIsOpen(!app.isOpen)}
      >
        &#8963;
      </MyButton>
    </Col>
  );
});
