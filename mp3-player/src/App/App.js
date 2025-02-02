import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouters from "./AppRouters";
import { observer } from "mobx-react-lite";
import { Context } from "../context";
import NavBar from "../components/NavBar";
import { isLoggedIn } from "../firebase/session";
import { getAlbumsList } from "../firebase/albumsApi";
import { getAudioList } from "../firebase/audioApi";
import { Col } from "react-bootstrap";
import Loading from "../components/Loading";

export default observer(function App() {
  const { app, gallery, player } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isAuthenticated = isLoggedIn() && isLoggedIn().accessToken;
        const userData = isLoggedIn();
        app.setIsAuth(!!isAuthenticated);
        app.setUserData(userData);

        if (!!isAuthenticated) {
          app.setLoading(true);
          const albumsData = await getAlbumsList();
          const currentUserData = albumsData.filter(
            (data) => data.userId === app.userData.user.uid,
          );
          gallery.setAlbums(currentUserData);

          const audioData = await getAudioList();
          player.setAudioList(audioData);
          player.setIsAlbum(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        app.setLoading(false);
      }
    };

    fetchData();
  }, [app, gallery, player, app.isAuth]);

  if (app.loading) {
    return <Loading />;
  }

  return (
    <div className="app">
      <BrowserRouter>
        {app.isAuth && <NavBar />}
        <Col
          xs={app.isOpen ? 0 : 10}
          md={app.isOpen ? 9 : 9}
          className="app-content"
        >
          <AppRouters />
        </Col>
      </BrowserRouter>
    </div>
  );
});
