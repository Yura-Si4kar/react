import { useContext, useState } from "react";
import { Context } from "../../context";
import { Form, FormGroup } from "react-bootstrap";
import MyInput from "../UI/MyInput";
import MyButton from "../UI/MyButton";
import MyTabs from "../UI/MyTabs";
import { uploadPhoto } from "../../firebase/filesApi";
import { addAlbumToStore } from "../../firebase/albumsApi";
import { observer } from "mobx-react-lite";
import { getAuthUserId } from "../../firebase/userApi";

export default observer(function AllSettings() {
  const { app, gallery } = useContext(Context);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addAlbum = async () => {
    try {
      app.setLoading(true);
      const photoURL = await uploadPhoto(file);
      const userId = await getAuthUserId().uid;
      const newAlbum = {
        title: name,
        img: photoURL,
        list: [],
        userId,
      };

      const response = await addAlbumToStore(newAlbum);
      gallery.setAlbums(response);
      setName("");
      setFile(null);
    } catch (error) {
      alert("Помилка додавання альбому:", error);
    } finally {
      app.setLoading(false);
    }
  };

  return (
    <>
      <Form className="albums-settings-form p-1">
        <FormGroup className="album-add-group mb-3">
          <Form.Label>Додати альбом:</Form.Label>
          <FormGroup className="album-cover-input">
            <MyInput
              type="file"
              className="file-input me-2"
              onChange={handleFileInputChange}
            />
            <Form.Label className="cover-label">Додайте обкладинку</Form.Label>
          </FormGroup>
          <div className="album-info-inputs mt-3">
            <MyInput
              value={name}
              className="album-name-input me-3 mb-2"
              type="text"
              placeholder="Назва альбому"
              onChange={handleInputChange}
            />
            <MyButton onClick={addAlbum}>Додати альбом</MyButton>
          </div>
        </FormGroup>
      </Form>
      <MyTabs />
    </>
  );
});
