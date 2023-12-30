import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { auth, db } from "../Components/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";

import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

const { width } = Dimensions.get("window");

const ChangePassword = ({ route, navigation }) => {
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [passwordChange, setPasswordChange] = useState(false);
  const [showPassFields, setShowPassFields] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(false);
  const [passError, setPassError] = useState(false);

  //   const { updatePass } = route.params;

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setCurrentUsername(userData.userName);
          console.log("user", userData.userName);

          setCurrentEmail(userData.email);
          console.log("user", userData.email);
        } else {
          // Handle the case when the document doesn't exist
          setCurrentUsername("No username found");
          setCurrentEmail("No email found");
        }
      }
    };

    fetchUserData();
  }, []);

  const updatePass = async () => {
    const user = auth.currentUser;
    console.log("user", user);

    if (newPassword !== confirmNewPassword) {
      console.log("Password not matched");

      setError(true);
      return;
    }

    if (user) {
      await updatePassword(user, newPassword);

      const userDocRef = doc(db, "users", user.uid);

      await updateDoc(userDocRef, {
        password: newPassword,
      });

      setShowPassFields(false);
      console.log("Password updated  in db!");
    }
  };

  const handleChangePassword = async () => {
    try {
      console.log("updatePass", updatePass);
      const user = auth.currentUser;
      const credentials = EmailAuthProvider.credential(user.email, oldPassword);
      const verify = await reauthenticateWithCredential(user, credentials);
      console.log("verified", verify);

      if (verify) {
        setPasswordChange(false);
        setShowPassFields(true);
        console.log("User verified", verify);
      }
    } catch (error) {
      console.error(error);
      setPassError(true);
      console.log("User not verified");
    }
  };

  // Modify this function to use the updatePass function passed as a prop
  //   const handleUpdatePassword = async () => {
  //     try {
  //       const g = await updatePass(); // Call the updatePass function from the prop
  //       console.log("updation", g);
  //       // Optionally, you can navigate back to the profile screen after updating the password
  //       showAlert("Password updated successfully!", "");
  //       navigation.goBack();

  //       return;
  //     } catch (error) {
  //       console.error(error);
  //       setError(true);
  //       showAlert("Password updation failed!", "");
  //     }
  //   };

  const handleUpdatePassword = async () => {
    try {
      if (updatePass) {
        const g = await updatePass(); // Call the updatePass function from the prop
        console.log("updation", g);

        showAlert("Password updated successfully!", "");
        navigation.goBack();
        return;
      } else {
        // Handle the case where updatePass is undefined
        console.error("updatePass is undefined");
        setError(true);
        showAlert("Password updation failed!", "updatePass is undefined");
      }
    } catch (error) {
      console.error(error);
      setError(true);
      showAlert("Password updation failed!", "");
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: "OK" }]);
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <Text style={styles.title}>Update Password</Text>
        <View style={styles.formContainer}>
          {passwordChange && (
            <>
              <View style={[styles.infoContainer, { marginLeft: 60 }]}>
                <FontAwesome
                  name="lock"
                  size={20}
                  color="#16537e"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.infoText}
                  placeholder="Enter Your Old Password"
                  value={oldPassword}
                  secureTextEntry={true}
                  onChangeText={(text) => setOldPassword(text)}
                />
              </View>
              <View style={styles.infoContainer}>
                <TouchableOpacity
                  onPress={handleChangePassword}
                  style={{
                    backgroundColor: "#16537e",
                    padding: 13,
                    marginTop: 50,
                    marginHorizontal: 89,
                    borderRadius: 4,
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.buttonText}>Verify</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {passError && (
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: "red",
                color: "white",
              }}
            >
              Wrong Password
            </View>
          )}

          {showPassFields && (
            <>
              <View style={styles.infoContainer}>
                <FontAwesome
                  name="lock"
                  size={20}
                  color="#16537e"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.infoText}
                  placeholder="Enter New Password"
                  value={newPassword}
                  secureTextEntry={true}
                  onChangeText={(text) => setNewPassword(text)}
                />
              </View>
              <View style={styles.infoContainer}>
                <FontAwesome
                  name="lock"
                  size={20}
                  color="#16537e"
                  style={styles.icon}
                />
                <TextInput
                  style={{
                    color: "pink",
                    borderWidth: 1,
                    borderColor: "pink",
                    padding: 8,
                    borderRadius: 4,
                  }}
                  placeholder="Confirm Password"
                  value={confirmNewPassword}
                  secureTextEntry={true}
                  onChangeText={(text) => setConfirmNewPassword(text)}
                />
                <TouchableOpacity
                  onPress={handleUpdatePassword}
                  style={{ backgroundColor: "pink" }}
                >
                  <Text> Update </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                Confirm Password and New Password Do not Match
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

// const ChangePassword = ({ navigation }) => {
//   const [oldPassword, setOldPassword] = useState("");
//   const [passwordChange, setPasswordChange] = useState(false);
//   const [passError, setPassError] = useState(false);
//   const [showPassFields, setShowPassFields] = useState(false);
//   const [error, setError] = useState(false);

//   const handleChangePassword = async () => {
//     try {
//       const user = auth.currentUser;
//       const credentials = EmailAuthProvider.credential(user.email, oldPassword);
//       const verify = await reauthenticateWithCredential(user, credentials);

//       if (verify) {
//         setPasswordChange(false);
//         setShowPassFields(true);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <ScrollView>
//       <SafeAreaView>
//         <Text style={styles.title}>Update Password</Text>
//         <View>
//           {passwordChange ? (
//             <>
//               <View style={styles.formContainer}>
//                 <View style={[styles.infoContainer, { marginLeft: 60 }]}>
//                   <FontAwesome
//                     name="lock"
//                     size={20}
//                     color="#16537e"
//                     style={styles.icon}
//                   />
//                   <TextInput
//                     style={styles.infoText}
//                     placeholder="Enter Your Old Password"
//                     value={oldPassword}
//                     secureTextEntry={true}
//                     onChangeText={(text) => setOldPassword(text)}
//                   />
//                 </View>
//                 <View style={styles.infoContainer}>
//                   <TouchableOpacity
//                     onPress={handleChangePassword}
//                     style={{
//                       backgroundColor: "#16537e",
//                       padding: 13,
//                       marginTop: 50,
//                       marginHorizontal: 89,
//                       borderRadius: 4,
//                       alignSelf: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Text style={styles.buttonText}>Verify</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </>
//           ) : (
//             <></>
//           )}
//           {passError ? (
//             <View
//               style={{
//                 width: 100,
//                 height: 100,
//                 backgroundColor: "red",
//                 color: "white",
//               }}
//             >
//               Wrong Password
//             </View>
//           ) : (
//             <></>
//           )}
//           {showPassFields ? (
//             <>
//               <View style={styles.infoContainer}>
//                 <FontAwesome
//                   name="lock"
//                   size={20}
//                   color="#16537e"
//                   style={styles.icon}
//                 />
//                 <TextInput
//                   style={styles.infoText}
//                   placeholder="Enter New Password"
//                   value={newPassword}
//                   secureTextEntry={true}
//                   onChangeText={(text) => setNewPassword(text)}
//                 />
//               </View>
//               <View style={styles.infoContainer}>
//                 <FontAwesome
//                   name="lock"
//                   size={20}
//                   color="#16537e"
//                   style={styles.icon}
//                 />
//                 <TextInput
//                   style={{
//                     color: "pink",
//                     borderWidth: 1,
//                     borderColor: "pink",
//                     padding: 8,
//                     borderRadius: 4,
//                   }}
//                   placeholder="Confirm Password"
//                   value={confirmNewPassword}
//                   secureTextEntry={true}
//                   onChangeText={(text) => setConfirmNewPassword(text)}
//                 />
//                 <TouchableOpacity
//                   onPress={updatePass}
//                   style={{ backgroundColor: "pink" }}
//                 >
//                   <Text> Update </Text>
//                 </TouchableOpacity>
//               </View>
//             </>
//           ) : (
//             <></>
//           )}
//           {error ? (
//             <View style={styles.errorContainer}>
//               <Text style={styles.errorText}>
//                 Confirm Password and New Password Do not Match
//               </Text>
//             </View>
//           ) : (
//             <></>
//           )}
//         </View>
//       </SafeAreaView>
//     </ScrollView>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: Dimensions.get("window").width * 0.08,
    fontWeight: "700",
    color: "#16537e",
    marginLeft: 80,
    marginTop: 70,
    marginBottom: 150,
  },
  iconButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "transparent",
    padding: 8,
  },
  formContainer: {
    flex: 1,
    // padding: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Dimensions.get("window").width * 0.1,
  },
  icon: {
    // marginRight: 10,
    color: "#16537e",
  },
  infoContainer: {
    flexDirection: "row",
    width: "80%",
    // height: 120,
    padding: 10,
  },
  infoText: {
    // height: 40,
    width: "70%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    // marginBottom: width * 0.007,
    paddingHorizontal: 10,
    // backgroundColor: "#fff",
    borderRadius: 0,
    // color: "gray",
    // marginBottom: 8,
    // marginTop: 56,
    // flexDirection: "row",
    // alignItems: "center",
    // height: 40,
    // width: "80%",
    // borderBottomWidth: 1,
    // borderBottomColor: "gray",
    // marginBottom: Dimensions.get("window").width * 0.007,
    // paddingHorizontal: 10,
    // backgroundColor: "#fff",
    // borderRadius: 0,
  },

  editButton: {
    backgroundColor: "#16537e",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 50,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: Dimensions.get("window").width * 0.04,
    fontWeight: "bold",
  },
  errorContainer: {
    width: "80%",
    backgroundColor: "red",
    padding: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  errorText: {
    color: "#fff",
  },
});

export default ChangePassword;
