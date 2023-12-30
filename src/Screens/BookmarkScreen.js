import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  where,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../Components/firebase";
import Icon from "react-native-vector-icons/FontAwesome";
import { Swipeable } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const BookmarkScreen = ({ route }) => {
  const { title, url } = route.params;
  const [bookmarks, setBookmarks] = useState([]);
  const user = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        if (user) {
          const bookmarksCollection = collection(db, "bookmarks");
          const userBookmarksQuery = query(
            bookmarksCollection,
            where("userId", "==", user.uid)
          );

          const bookmarksSnapshot = await getDocs(userBookmarksQuery);
          const bookmarksData = bookmarksSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setBookmarks(bookmarksData);
          // Check for duplicates in the fetched data
          const uniqueBookmarksData = Array.from(
            new Set(bookmarksData.map((bookmark) => bookmark.url.trim()))
          ).map((url) =>
            bookmarksData.find((bookmark) => bookmark.url.trim() === url)
          );

          setBookmarks(uniqueBookmarksData);

          const existingBookmark = uniqueBookmarksData.find(
            (bookmark) => bookmark.url.trim() === url.trim()
          );

          if (!existingBookmark) {
            await addDoc(bookmarksCollection, {
              userId: user.uid,
              title,
              url,
              timestamp: serverTimestamp(),
            });
            console.log("Bookmark added successfully", title);
          } else {
            // If the URL is already bookmarked, show an alert
            Alert.alert("Bookmark Exists", "This page is already bookmarked!");
          }
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, [user, title, url]);

  const handleBookmarkPress = (itemUrl) => {
    navigation.navigate("WebView", { url: itemUrl });
  };

  // const addBookmark = async () => {
  //   try {
  //     const bookmarksCollection = collection(db, "bookmarks");

  //     // Check if the bookmark for the current URL already exists
  //     const existingBookmark = bookmarks.find(
  //       (bookmark) => bookmark.url.trim() === url.trim()
  //     );

  //     if (!existingBookmark) {
  //       const newDocRef = await addDoc(bookmarksCollection, {
  //         userId: user.uid,
  //         title,
  //         url,
  //         timestamp: serverTimestamp(),
  //       });
  //       console.log("Bookmark added successfully");
  //       setBookmarks((prevBookmarks) => [
  //         ...prevBookmarks,
  //         { id: newDocRef.id, title, url, timestamp: serverTimestamp() },
  //       ]);
  //     } else {
  //       // If the URL is already bookmarked, show an alert
  //       Alert.alert("Bookmark Exists", "This page is already bookmarked!");
  //     }
  //   } catch (error) {
  //     console.error("Error adding bookmark:", error);
  //   }
  // };

  const deleteBookmark = async (bookmarkId) => {
    try {
      const bookmarksCollection = collection(db, "bookmarks");
      await deleteDoc(doc(bookmarksCollection, bookmarkId));
      setBookmarks((prevBookmarks) =>
        prevBookmarks.filter((bookmark) => bookmark.id !== bookmarkId)
      );
      console.log("Bookmark deleted successfully");
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  const renderBookmarkItem = ({ item }) => {
    const rightSwipeActions = (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: "clamp",
      });

      return (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteBookmark(item.id)}
        >
          <Icon name="trash" size={24} color="#fff" />
        </TouchableOpacity>
      );
    };

    return (
      <Swipeable renderRightActions={rightSwipeActions}>
        <View style={styles.bookmarkItem}>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleBookmarkPress(item.url)}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.url}>{item.url}</Text>
            </View>
            <View style={styles.separator} />
            <Icon name="bookmark" size={14} color="#16537e" />
          </TouchableOpacity>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bookmarks</Text>
      {bookmarks.length > 0 ? (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id}
          renderItem={renderBookmarkItem}
        />
      ) : (
        <Text style={styles.emptyText}>No bookmarks available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 16,
    marginTop: width * 0.1,
    color: "#16537e",
    textAlign: "center",
  },
  bookmarkItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  separator: {
    height: "100%",
    width: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  url: {
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
});

export default BookmarkScreen;

// -------------------------
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Dimensions,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { Swipeable } from "react-native-gesture-handler";
// import {
//   getDocs,
//   collection,
//   addDoc,
//   serverTimestamp,
//   where,
//   query,
//   onSnapshot,
// } from "firebase/firestore";
// import { db, auth } from "../Components/firebase";
// import { doc, deleteDoc } from "firebase/firestore";

// const { width } = Dimensions.get("window");

// const BookmarkScreen = ({ route }) => {
//   const { title, url } = route.params;
//   const [bookmarks, setBookmarks] = useState([]);
//   const user = auth.currentUser;
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchBookmarks = async () => {
//       try {
//         if (user) {
//           const bookmarksCollection = collection(db, "bookmarks");
//           const userBookmarksQuery = query(
//             bookmarksCollection,
//             where("userId", "==", user.uid)
//           );

//           const bookmarksSnapshot = await getDocs(userBookmarksQuery);
//           const bookmarksData = bookmarksSnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));

//           // Check for duplicates in the fetched data
//           const uniqueBookmarksData = Array.from(
//             new Set(bookmarksData.map((bookmark) => bookmark.url.trim()))
//           ).map((url) =>
//             bookmarksData.find((bookmark) => bookmark.url.trim() === url)
//           );

//           setBookmarks(uniqueBookmarksData);

//           const existingBookmark = uniqueBookmarksData.find(
//             (bookmark) => bookmark.url.trim() === url.trim()
//           );

//           if (!existingBookmark) {
//             await addDoc(bookmarksCollection, {
//               userId: user.uid,
//               title,
//               url,
//               timestamp: serverTimestamp(),
//             });
//             console.log("Bookmark added successfully");
//           } else {
//             // If the URL is already bookmarked, show an alert
//             Alert.alert("Bookmark Exists", "This page is already bookmarked!");
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching or adding bookmarks:", error);
//       }
//     };

//     fetchBookmarks();

//     if (user) {
//       const bookmarksCollection = collection(db, "bookmarks");
//       const userBookmarksQuery = query(
//         bookmarksCollection,
//         where("userId", "==", user.uid)
//       );

//       const unsubscribe = onSnapshot(userBookmarksQuery, (snapshot) => {
//         const bookmarksData = snapshot.docs.map((doc) => doc.data());
//         setBookmarks(bookmarksData);
//       });

//       return () => {
//         unsubscribe();
//       };
//     }
//   }, [user, title, url]);

//   // ...

//   const handleBookmarkPress = (itemUrl) => {
//     navigation.navigate("WebView", { url: itemUrl });
//   };

//   const deleteBookmark = async (bookmarkId) => {
//     try {
//       console.log("bookmarkId", bookmarkId);
//       if (!bookmarkId) {
//         console.error("Invalid bookmarkId:", bookmarkId);
//         return;
//       }

//       const bookmarksCollection = collection(db, "bookmarks");
//       const bookmarkDoc = doc(bookmarksCollection, bookmarkId);

//       await deleteDoc(bookmarkDoc);

//       setBookmarks((prevBookmarks) =>
//         prevBookmarks.filter((bookmark) => bookmark.id !== bookmarkId)
//       );
//       console.log("Bookmark deleted successfully");
//     } catch (error) {
//       console.error("Error deleting bookmark:", error);
//     }
//   };

//   const renderBookmarkItem = ({ item }) => {
//     const rightSwipeActions = (progress, dragX) => {
//       const scale = dragX.interpolate({
//         inputRange: [-100, 0],
//         outputRange: [1, 0],
//         extrapolate: "clamp",
//       });

//       return (
//         <TouchableOpacity
//           style={styles.deleteButton}
//           onPress={() => deleteBookmark(item.id)}
//         >
//           <Icon name="trash" size={24} color="#fff" />
//         </TouchableOpacity>
//       );
//     };

//     return (
//       <Swipeable renderRightActions={rightSwipeActions}>
//         <View style={styles.bookmarkItem}>
//           <TouchableOpacity
//             style={styles.itemContainer}
//             onPress={() => handleBookmarkPress(item.url)}
//           >
//             <View style={styles.textContainer}>
//               <Text style={styles.title}>{item.title}</Text>
//               <Text style={styles.url}>{item.url}</Text>
//             </View>
//             <View style={styles.separator} />
//             <Icon name="bookmark" size={14} color="#16537e" />
//           </TouchableOpacity>
//         </View>
//       </Swipeable>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Bookmarks</Text>
//       {bookmarks.length > 0 ? (
//         <FlatList
//           data={bookmarks}
//           // keyExtractor={(item, index) => index.toString()}
//           keyExtractor={(item) => item.id}
//           renderItem={renderBookmarkItem}
//         />
//       ) : (
//         <Text style={styles.emptyText}>No bookmarks available</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   deleteButton: {
//     backgroundColor: "red",
//     justifyContent: "center",
//     alignItems: "center",
//     width: 100,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "800",
//     marginBottom: 16,
//     marginTop: width * 0.1,
//     color: "#16537e",
//     textAlign: "center",
//   },
//   bookmarkItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   itemContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   textContainer: {
//     flex: 1,
//   },
//   emptyText: {
//     textAlign: "center",
//     marginTop: 20,
//     fontSize: 16,
//   },
//   separator: {
//     height: "100%",
//     width: 1,
//     backgroundColor: "#ccc",
//     marginHorizontal: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 4,
//   },
//   url: {
//     color: "#333",
//   },
// });

// export default BookmarkScreen;

// ---------------------
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Bookmarks</Text>

//       {bookmarks.length > 0 ? (
//         <FlatList
//           data={bookmarks}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.bookmarkItem}>
//               <TouchableOpacity
//                 style={styles.itemContainer}
//                 onPress={() => handleBookmarkPress(item.url)}
//               >
//                 <View style={styles.textContainer}>
//                   <Text style={styles.title}>{item.title}</Text>
//                   <Text style={styles.url}>{item.url}</Text>
//                 </View>
//                 <View style={styles.separator} />
//                 <Icon name="bookmark" size={14} color="#16537e" />
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//       ) : (
//         <Text style={styles.emptyText}>No bookmarks available</Text>
//       )}
//     </View>
//   );
// };

//  useEffect(() => {
//    const fetchBookmarks = async () => {
//      try {
//        if (user) {
//          const bookmarksCollection = collection(db, "bookmarks");
//          const userBookmarksQuery = query(
//            bookmarksCollection,
//            where("userId", "==", user.uid)
//          );

//          const bookmarksSnapshot = await getDocs(userBookmarksQuery);
//          const bookmarksData = bookmarksSnapshot.docs.map((doc) => ({
//            id: doc.id,
//            ...doc.data(),
//          }));
//          setBookmarks(bookmarksData);
//          // Check for duplicates in the fetched data
//          const uniqueBookmarksData = Array.from(
//            new Set(bookmarksData.map((bookmark) => bookmark.url.trim()))
//          ).map((url) =>
//            bookmarksData.find((bookmark) => bookmark.url.trim() === url)
//          );

//          setBookmarks(uniqueBookmarksData);

//          const existingBookmark = uniqueBookmarksData.find(
//            (bookmark) => bookmark.url.trim() === url.trim()
//          );

//          if (!existingBookmark) {
//            await addDoc(bookmarksCollection, {
//              userId: user.uid,
//              title,
//              url,
//              timestamp: serverTimestamp(),
//            });
//            console.log("Bookmark added successfully");
//          } else {
//            // If the URL is already bookmarked, show an alert
//            Alert.alert("Bookmark Exists", "This page is already bookmarked!");
//          }
//        }
//      } catch (error) {
//        console.error("Error fetching or adding bookmarks:", error);
//      }
//    };

//    fetchBookmarks();

//    if (user) {
//      const bookmarksCollection = collection(db, "bookmarks");
//      const userBookmarksQuery = query(
//        bookmarksCollection,
//        where("userId", "==", user.uid)
//      );

//      const unsubscribe = onSnapshot(userBookmarksQuery, (snapshot) => {
//        const bookmarksData = snapshot.docs.map((doc) => doc.data());
//        setBookmarks(bookmarksData);
//      });

//      return () => {
//        unsubscribe();
//      };
//    }
//  }, [user, title, url]);
