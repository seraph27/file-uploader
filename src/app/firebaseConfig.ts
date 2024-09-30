import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgIHNIvun9w_63O4fswWjf9O3G_XIrcGM",
  authDomain: "fileuploader-f7b41.firebaseapp.com",
  projectId: "fileuploader-f7b41",
  storageBucket: "fileuploader-f7b41.appspot.com",
  messagingSenderId: "583909096881",
  appId: "1:583909096881:web:4114196b8ccfa8103cd190",
  measurementId: "G-JCMBVS284X"
};

let app, storage;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  storage = getStorage(app);
}

export {storage};