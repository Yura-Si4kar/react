import React, { useContext } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import MyButton from "../UI/MyButton";
import { Context } from "../../context";
import AudioItem from "../items/AudioItem";

export default function AddAudioToAlbumModal({ show, hide, addAudioToAlbum }) {
  const { player } = useContext(Context);

  return (
    <Modal show={show} onHide={hide}>
      <Modal.Header className="d-flex justify-beetwen">
        <Modal.Title>Виберіть аудіо із списку</Modal.Title>
        <MyButton variant="outline-light" onClick={hide}>
          &#10060;
        </MyButton>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {player.list.map((el) => (
            <AudioItem
              key={el.id}
              show={show}
              audio={el}
              index={player.list.indexOf(el)}
              addAudioToAlbum={addAudioToAlbum}
            />
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}
