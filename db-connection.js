// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  child,
  push,
  update,
  remove,
  get,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDBZjN_K6bvKaUCiEzKzX7aiROk35g9GzI",
    authDomain: "antivirus-world-d3586.firebaseapp.com",
    projectId: "antivirus-world-d3586",
    storageBucket: "antivirus-world-d3586.appspot.com",
    messagingSenderId: "215615694682",
    appId: "1:215615694682:web:43c423f2ae6172c2b7f563"
  };

const app = initializeApp(firebaseConfig);

const dbRef = getDatabase();

const commentsRef = ref(dbRef, "comments");
export function uploadComment(author, comment, email) {
  const newPostRef = push(commentsRef);
  set(newPostRef, {
    author,
    comment,
    email,
  })
    .then((res) => {
      alert("Comment posted successfully");
      console.log(author + " said " + comment);
    })
    .catch((e) => {
      console.log("unseccessful, errror: " + e);
    });
}

export function getAllComments() {
  return get(ref(dbRef, "comments"));
}
