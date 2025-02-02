import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AlbumsItem({ album }) {
  return (
    <Link className="text-decoration-none" to={`${album.id}`}>
      <Card
        className="d-flex justify-content-end align-items-center m-1"
        id={album.id}
        style={{
          backgroundImage: `url(${album.img})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: 250,
          height: 250,
        }}
      >
        <h2 className="text-white fs-2">{album.title}</h2>
      </Card>
    </Link>
  );
}
