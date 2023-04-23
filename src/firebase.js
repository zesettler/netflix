import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAn736dl99k7HS5uJLOQ2ZWxm8RncMLkao",
  authDomain: "netflix-clone-325a5.firebaseapp.com",
  projectId: "netflix-clone-325a5",
  storageBucket: "netflix-clone-325a5.appspot.com",
  messagingSenderId: "997309903617",
  appId: "1:997309903617:web:4f478e8c5f13c1de302100"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;