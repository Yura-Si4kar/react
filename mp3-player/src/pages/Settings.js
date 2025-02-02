import React from "react";
import { useNavigate } from "react-router";
import { ALBUMS_ROUTE } from "../utils/consts";
import MyButton from "../components/UI/MyButton";
import settings from "../img/settings.svg";
import { observer } from "mobx-react-lite";
import AllSettings from "../components/settings/AllSettings";

export default observer(function Settings() {
  const navigate = useNavigate();

  const backToMainPage = () => {
    navigate(ALBUMS_ROUTE);
  };

  return (
    <section className="settings-section">
      <MyButton
        className="back-button text-white"
        variant="link"
        onClick={backToMainPage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-caret-right-fill me-2 back-icon"
          viewBox="0 0 16 16"
        >
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
        </svg>
        Назад
      </MyButton>
      <h1 className="settings-title d-flex align-items-center mb-3">
        <img
          height={25}
          width={25}
          className="settings-icon me-2"
          src={settings}
          alt="settings"
        />
        Settings
      </h1>
      <AllSettings />
    </section>
  );
});