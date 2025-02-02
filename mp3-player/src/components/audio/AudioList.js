import React from "react";
import AudioItem from "../items/AudioItem";
import { observer } from "mobx-react-lite";

export default observer(function AudioList({
  list,
  addAudioToCurrentAlbum,
  deleteAudio,
}) {
  return (
    <div className="d-flex flex-wrap">
      {list.map((audio, i) => (
        <AudioItem
          key={audio.id}
          index={i}
          audio={audio}
          addAudioToCurrentAlbum={addAudioToCurrentAlbum}
          deleteAudio={deleteAudio}
        />
      ))}
    </div>
  );
});
