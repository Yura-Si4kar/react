import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import AddAudioToAlbumModal from "../components/modals/AddAudioToAlbumModal";
import MyButton from "../components/UI/MyButton";
import { useLocation, useParams } from "react-router-dom";
import {
  addAudioRefToList,
  deleteAudioFromCurrentAlbum,
  getCurrentAlbumAudioList,
} from "../firebase/audioApi";
import { Context } from "../context";
import AudioItem from "../components/items/AudioItem";
import { ListGroup } from "react-bootstrap";

export default observer(function AlbumPage() {
  const { player } = useContext(Context);
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getCurrentAlbumAudioList(id)
      .then((data) => {
        player.setAlbumAudioList(data);
        player.setIsAlbum(true);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [id, player]);

  const handleShow = () => {
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
  };

  const addAudioToAlbum = (audio) => {
    addAudioRefToList(audio, id).then((data) => {
      player.setAlbumAudioList(data);
    });
  };

  const deleteAudioFromAlbumList = (audio) => {
    if (pathname.includes("albums")) {
      deleteAudioFromCurrentAlbum(id, audio.id).then((data) => {
        player.setAlbumAudioList(data);
      });
    } else {
      console.log("Not albums");
    }
  };

  return (
    <section className="album">
      <ListGroup>
        {player.albumAudioList.map((audio, i) => (
          <AudioItem
            key={audio.id}
            audio={audio}
            index={i}
            deleteAudio={deleteAudioFromAlbumList}
          />
        ))}
      </ListGroup>
      <MyButton
        className="album-setting"
        variant="outline"
        onClick={handleShow}
      >
        &#8942;
      </MyButton>
      <AddAudioToAlbumModal
        show={show}
        hide={onClose}
        addAudioToAlbum={addAudioToAlbum}
      />
    </section>
  );
});
