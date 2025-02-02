import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Alert, Card, Form, Row } from "react-bootstrap";
import MyInput from "../components/UI/MyInput";
import { useLocation, useNavigate } from "react-router";
import { Context } from "../context";
import {
  ALBUMS_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  USERS_SETTINGS,
} from "../utils/consts";
import MyButton from "../components/UI/MyButton";
import { Link } from "react-router-dom";
import { createUser, signInUser } from "../firebase/userApi";
import { startSession } from "../firebase/session";

export default observer(function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { app } = useContext(Context);
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (isLogin) {
      app.setLoading(true);
      signInUser(email, password)
        .then((data) => {
          startSession(data.user);
          app.setUserData(data.user);
          app.setIsAuth(true);
          navigate(ALBUMS_ROUTE);
        })
        .catch((e) => {
          alert(e.response.data.message);
          console.error(e.message);
          setError(e.message);
        })
        .finally(() => {
          app.setLoading(false);
        });
    } else {
      if (!email || !password || !repeatPassword) {
        setError("Please fill out all the fields.");
        return;
      }

      if (password !== repeatPassword) {
        setError("Passwords do not match");
        return;
      }

      app.setLoading(true);
      createUser(email, password)
        .then((data) => {
          startSession(data.user);
          app.setUserData(data.user);
          app.setIsAuth(true);
          navigate(USERS_SETTINGS);
        })
        .catch((e) => {
          alert(e.response.data.message);
          console.error(e.message);
          app.setIsAuth(false);
          setError(e.message);
        })
        .finally(() => {
          app.setLoading(false);
        });
    }
  };

  return (
    <section className="auth">
      <Card className="auth__card">
        {error && <Alert variant={"danger"}>{error}</Alert>}
        <h2 className="auth__card-title">
          {isLogin ? "Авторизація" : "Реєстрація"}
        </h2>
        <Form className="d-flex flex-column">
          <MyInput
            className="auth__card-input"
            placeholder="Введіть ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MyInput
            className="auth__card-input"
            placeholder="Введіть ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {!isLogin ? (
            <MyInput
              className="auth__card-input"
              placeholder="Повторіть ваш пароль"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              type="password"
            />
          ) : null}
        </Form>
        <Row className="auth__card-box">
          {isLogin ? (
            <Form.Text className="auth__card-text">
              Немає аккаунта? <Link to={REGISTRATION_ROUTE}>Зареєструйся!</Link>
            </Form.Text>
          ) : (
            <Form.Text className="auth__card-text">
              Уже зареєстровані? <Link to={LOGIN_ROUTE}>Увійдіть!</Link>
            </Form.Text>
          )}
          <MyButton
            variant="outline-success"
            className="auth__card-submit"
            type="submit"
            onClick={submit}
          >
            {isLogin ? "Увійти" : "Реєстрація"}
          </MyButton>
        </Row>
      </Card>
    </section>
  );
});
