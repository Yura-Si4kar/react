import { getMetadata, listAll, ref } from "firebase/storage";
import { storage } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAlbumsCollectionRef } from "./albumsApi";

export const getAudioList = async () => {
  try {
    const folderRef = ref(storage, "music/");
    const fileList = await listAll(folderRef);

    const files = [];

    await Promise.all(
      fileList.items.map(async (itemRef) => {
        const metadata = await getMetadata(itemRef);

        files.push({
          name: metadata.name,
          fullPath: metadata.fullPath,
          size: metadata.size,
          contentType: metadata.contentType,
        });
      }),
    );

    return files;
  } catch (error) {
    console.error("Помилка отримання файлів з папки:", error);
    throw error;
  }
};

export const addAudioRefToList = async (audio, id) => {
  try {
    const albumsCollection = await getAlbumsCollectionRef();
    const albumDocRef = doc(albumsCollection, id);
    const albumDocSnapshot = await getDoc(albumDocRef);

    if (albumDocSnapshot.exists()) {
      const albumData = albumDocSnapshot.data();
      const currentList = albumData.list || [];
      currentList.push(audio);

      await updateDoc(albumDocRef, { list: currentList });

      return albumData.list;
    } else {
      console.error("Альбом не знайдено");
      return null;
    }
  } catch (error) {
    console.error("Помилка при отриманні альбому за ID: ", error);
    throw error;
  }
};

export const getCurrentAlbumAudioList = async (id) => {
  try {
    const albumsCollection = await getAlbumsCollectionRef();
    const albumDocRef = doc(albumsCollection, id);
    const albumDocSnapshot = await getDoc(albumDocRef);

    if (albumDocSnapshot.exists()) {
      const albumData = albumDocSnapshot.data();
      return albumData.list;
    } else {
      console.error("Альбом не знайдено");
      return null;
    }
  } catch (error) {
    console.error("Помилка завантаження списку аудіозаписів");
    throw error;
  }
};

export const deleteAudioFromCurrentAlbum = async (id, audioId) => {
  try {
    const albumsCollection = await getAlbumsCollectionRef();
    const albumDocRef = doc(albumsCollection, id);
    const albumDocSnapshot = await getDoc(albumDocRef);

    if (albumDocSnapshot.exists()) {
      const albumData = albumDocSnapshot.data();
      const updatedList = albumData.list.filter((el) => el.id !== audioId);

      await updateDoc(albumDocRef, { list: updatedList });

      return updatedList;
    } else {
      console.error("Аудіозапис не знайдено");
      return null;
    }
  } catch (error) {
    console.error("Помилка завантаження списку аудіозаписів");
    throw error;
  }
};
