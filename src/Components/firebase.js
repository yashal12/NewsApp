// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  orderBy,
  getDocs,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9i4_Pt_9N-fIReX899ScjxyshtcTxcN4",
  authDomain: "dailydose-9e7f2.firebaseapp.com",
  projectId: "dailydose-9e7f2",
  storageBucket: "dailydose-9e7f2.appspot.com",
  messagingSenderId: "801222924748",
  appId: "1:801222924748:web:41afc93a3d3fc5f930a569",
  measurementId: "G-ZT1B8X9SNB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Move this line up

const analytics = getAnalytics(app); // Corrected order

const auth = getAuth(app);

const db = getFirestore();

// const addBookmark = async (title, url) => {
//   try {
//     // Check if title and url are valid before adding the document
//     if (title && url) {
//       console.log("title, url: ", title, url);
//       await addDoc(collection(db, "bookmarks"), {
//         title,
//         url,
//         timestamp: serverTimestamp(),
//       });
//       console.log("Bookmark added successfully");
//     } else {
//       console.error("Invalid title or url provided");
//     }
//   } catch (error) {
//     console.error("Error adding bookmark:", error);
//   }
// };
// const addBookmark = async (userId, title, url) => {
//   try {
//     if (userId && title && url) {
//       const userRef = doc(db, "users", userId);
//       const bookmarksRef = collection(userRef, "bookmarks");

//       await addDoc(bookmarksRef, {
//         title,
//         url,
//         timestamp: serverTimestamp(),
//       });

//       console.log("Bookmark added successfully");
//     } else {
//       console.error("Invalid userId, title, or url provided");
//     }
//   } catch (error) {
//     console.error("Error adding bookmark:", error);
//   }
// };

// const getBookmarks = async () => {
//   try {
//     const snapshot = await getDocs(
//       orderBy(collection(db, "bookmarks"), "timestamp", "desc")
//     );
//     return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   } catch (error) {
//     console.error("Error getting bookmarks:", error);
//     return [];
//   }
// };

export { auth, db, analytics };
