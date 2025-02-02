import React from "react";
import AlbumsItem from "../items/AlbumsItem";

export default function AlbumsList({ albums }) {
  return (
    <div className="d-flex justify-content-center flex-wrap">
      {albums.length > 0
        ? albums.map((album) => <AlbumsItem key={album.id} album={album} />)
        : "Додайте альбом"}
    </div>
  );
}
