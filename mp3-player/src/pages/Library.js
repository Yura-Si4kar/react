import React, { useContext, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import MyButton from "../components/UI/MyButton";
import AudioList from "../components/audio/AudioList";
import { Context } from "../context";
import { observer } from "mobx-react-lite";
import AddAudioModal from "../components/modals/AddAudioModal";
import { deleteAudioFile } from "../firebase/filesApi";

export default observer(function Library() {
  const { app, player } = useContext(Context);
  const [show, setShow] = useState(false);

  useEffect(() => {
    player.setIsAlbum(false);
  });

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const deleteAudioFromStore = (audio) => {
    app.setLoading(true);
    deleteAudioFile(audio.fullPath)
      .then(() => player.deleteAudio(audio.id))
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        app.setLoading(false);
      });
  };

  return (
    <div style={{ transition: "width 0.3s", padding: "35px 5px 5px" }}>
      <ListGroup>
        <AudioList list={player.list} deleteAudio={deleteAudioFromStore} />
        <MyButton variant={"success"} onClick={handleShow}>
          Додати аудіозаписи
        </MyButton>
        <AddAudioModal show={show} hide={handleClose} />
      </ListGroup>
    </div>
  );
});
