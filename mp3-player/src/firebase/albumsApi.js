import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "./firebase";
import { ALBUMS_COLLECTION_NAME } from "../utils/consts";

const db = getFirestore(app);

export const albumsCollection = collection(db, ALBUMS_COLLECTION_NAME);

export async function getAlbumsCollectionRef() {
  const albumsCollectionRef = collection(db, ALBUMS_COLLECTION_NAME);
  return albumsCollectionRef;
}

export const getAlbumsList = async () => {
  try {
    const albumsCollectionRef = albumsCollection;
    const querySnapshot = await getDocs(albumsCollectionRef);
    const albums = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return albums;
  } catch (error) {
    console.error("Error getting albums: ", error);
    throw error;
  }
};

export const addAlbumToStore = async (album) => {
  try {
    const albumsCollectionRef = albumsCollection;
    const docRef = await addDoc(albumsCollectionRef, album);
    console.log("Album written with ID:", docRef.id);
    const querySnapshot = await getDocs(albumsCollection);
    const albums = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return albums;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
