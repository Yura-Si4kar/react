import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../context";
import { uploadAudio } from "../../firebase/filesApi";
import { Form, FormGroup, Modal } from "react-bootstrap";
import MyInput from "../UI/MyInput";
import MyButton from "../UI/MyButton";

export default observer(function AddAudioModals({ show, hide }) {
  const [file, setFile] = useState(null);
  const { app, player } = useContext(Context);

  const uploadFile = async () => {
    try {
      app.setLoading(true);
      const audioUrl = await uploadAudio(file);
      console.log(file);
      player.setAudio({
        name: file.name,
        size: file.size,
        contentType: file.type,
        fullPath: audioUrl,
      });
      setFile(null);
    } catch (error) {
      console.log("Помилка завантаження аудіозапису", error);
    } finally {
      app.setLoading(false);
      hide();
    }
  };

  return (
    <Modal show={show} onHide={hide}>
      <Modal.Header>
        <Modal.Title>Заповніть форму</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup>
            <Form.Label>Додайте файл</Form.Label>
            <MyInput type="file" onChange={(e) => setFile(e.target.files[0])} />
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <MyButton onClick={uploadFile}>Завантажити</MyButton>
        <MyButton onClick={hide}>Відхилити</MyButton>
      </Modal.Footer>
    </Modal>
  );
});
