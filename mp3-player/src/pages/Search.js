import React, { useContext, useEffect, useState } from "react";
import AudioFillter from "../components/audio/AudioFillter";
import AudioList from "../components/audio/AudioList";
import { Col } from "react-bootstrap";
import { Context } from "../context";
import { observer } from "mobx-react-lite";
import { useFilteredAudio } from "../hooks/useFilteredAudio";
import { deleteAudioFile } from "../firebase/filesApi";

export default observer(function Search() {
  const { app, player } = useContext(Context);
  const [filter, setFilter] = useState("");
  const filteredAudiosList = useFilteredAudio(player.list, filter);

  useEffect(() => {
    player.setIsAlbum(false);
  });

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
    <Col style={{ transition: "width 0.3s", padding: "35px 5px 5px" }}>
      <AudioFillter filter={filter} setFilter={setFilter} />
      <AudioList list={filteredAudiosList} deleteAudio={deleteAudioFromStore} />
    </Col>
  );
});
