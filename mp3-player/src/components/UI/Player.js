import React, { useContext } from "react";
import { ButtonGroup, ProgressBar } from "react-bootstrap";
import MyButton from "./MyButton";
import { Context } from "../../context";
import { observer } from "mobx-react-lite";

export default observer(function Player() {
  const { player } = useContext(Context);

  const handlePlayPauseClick = () => {
    player.play(+player.currentAudioIndex);
  };

  const handleNextElementClick = () => {
    player.nextAudioElement();
  };

  const handlePreviousElementClick = () => {
    player.previousAudioElement();
  };

  return (
    <div className="w-100 text-center p-2">
      <div className="player-info">
        <h3 className="player-name">{player.isPlaying ? player.song().name : "Paused"}</h3>
      </div>
      <ProgressBar
        animated
        now={player.progress}
        onClick={(e) => player.handleProgressClick(e)}
        className="w-100"
        style={{ cursor: "pointer" }}
      />
      <ButtonGroup className="mt-2">
        <MyButton
          variant="link"
          className="player__prew-button"
          onClick={handlePreviousElementClick}
        >
          <svg
            width="28"
            height="34"
            className="image-response"
            viewBox="0 0 28 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.66665 15.6104L25.9646 1.41246C26.1214 1.30807 26.3037 1.24819 26.4919 1.23919C26.6801 1.23018 26.8672 1.2724 27.0333 1.36133C27.1994 1.45027 27.3383 1.58259 27.4352 1.74421C27.532 1.90583 27.5832 2.0907 27.5833 2.27912L27.5833 31.7208C27.5832 31.9092 27.532 32.0941 27.4352 32.2557C27.3383 32.4173 27.1994 32.5497 27.0333 32.6386C26.8672 32.7275 26.6801 32.7697 26.4919 32.7607C26.3037 32.7517 26.1214 32.6918 25.9646 32.5875L4.66665 18.3895L4.66665 31.5833C4.66665 32.1358 4.44715 32.6657 4.05645 33.0564C3.66575 33.4471 3.13585 33.6666 2.58331 33.6666C2.03078 33.6666 1.50087 33.4471 1.11017 33.0564C0.719473 32.6657 0.499981 32.1358 0.499981 31.5833L0.499981 2.41662C0.499981 1.86409 0.719473 1.33418 1.11017 0.943481C1.50087 0.55278 2.03078 0.33329 2.58331 0.33329C3.13585 0.33329 3.66575 0.55278 4.05645 0.943481C4.44715 1.33418 4.66665 1.86409 4.66665 2.41662V15.6104ZM23.4166 25.8812L23.4166 8.11871L10.0958 17L23.4166 25.8812Z"
              fill="white"
            />
          </svg>
        </MyButton>
        <MyButton
          variant="link"
          className="player__play-button"
          onClick={handlePlayPauseClick}
        >
          {player.isPlaying ? (
            <svg
              width="62"
              height="62"
              className="image-response"
              viewBox="0 0 63 63"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.25 62.5C13.9906 62.5 0 48.5094 0 31.25C0 13.9906 13.9906 0 31.25 0C48.5094 0 62.5 13.9906 62.5 31.25C62.5 48.5094 48.5094 62.5 31.25 62.5ZM31.25 56.25C37.8804 56.25 44.2393 53.6161 48.9277 48.9277C53.6161 44.2393 56.25 37.8804 56.25 31.25C56.25 24.6196 53.6161 18.2607 48.9277 13.5723C44.2393 8.88392 37.8804 6.25 31.25 6.25C24.6196 6.25 18.2607 8.88392 13.5723 13.5723C8.88392 18.2607 6.25 24.6196 6.25 31.25C6.25 37.8804 8.88392 44.2393 13.5723 48.9277C18.2607 53.6161 24.6196 56.25 31.25 56.25ZM21.875 21.875H28.125V40.625H21.875V21.875ZM34.375 21.875H40.625V40.625H34.375V21.875Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="62"
              height="62"
              className="image-response"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z"
                fill="#fff"
              />
              <path d="M16 12L10 16.3301V7.66987L16 12Z" fill="#fff" />
            </svg>
          )}
        </MyButton>
        <MyButton
          variant="link"
          className="player__next-button"
          onClick={handleNextElementClick}
        >
          <svg
            width="28"
            height="34"
            className="image-response"
            viewBox="0 0 28 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.3334 18.3896L2.03544 32.5875C1.87857 32.6919 1.69633 32.7518 1.50813 32.7608C1.31992 32.7698 1.1328 32.7276 0.966686 32.6387C0.800574 32.5497 0.661696 32.4174 0.564841 32.2558C0.467987 32.0942 0.416784 31.9093 0.416687 31.7209V2.27921C0.416784 2.09079 0.467987 1.90592 0.564841 1.7443C0.661696 1.58268 0.800574 1.45035 0.966686 1.36141C1.1328 1.27248 1.31992 1.23027 1.50813 1.23927C1.69633 1.24827 1.87857 1.30816 2.03544 1.41254L23.3334 15.6105V2.41671C23.3334 1.86417 23.5528 1.33427 23.9435 0.943569C24.3342 0.552868 24.8642 0.333374 25.4167 0.333374C25.9692 0.333374 26.4991 0.552868 26.8898 0.943569C27.2805 1.33427 27.5 1.86417 27.5 2.41671V31.5834C27.5 32.1359 27.2805 32.6658 26.8898 33.0565C26.4991 33.4472 25.9692 33.6667 25.4167 33.6667C24.8642 33.6667 24.3342 33.4472 23.9435 33.0565C23.5528 32.6658 23.3334 32.1359 23.3334 31.5834V18.3896ZM4.58335 8.11879V25.8813L17.9042 17L4.58335 8.11879Z"
              fill="white"
            />
          </svg>
        </MyButton>
      </ButtonGroup>
    </div>
  );
});
