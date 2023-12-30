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
  Button,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { auth, db } from "../Components/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import ChangePassword from "./ChangePassword";

const { width } = Dimensions.get("window");

const EditProfile = ({ navigation }) => {
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [passwordChange, setPasswordChange] = useState(false);
  const [showPassFields, setShowPassFields] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(false);
  const [passError, setPassError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setCurrentUsername(userData.userName);
          setCurrentEmail(userData.email);
        } else {
          setCurrentUsername("No username found");
          setCurrentEmail("No email found");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: "OK" }]);
  };

  const handleUpdateUsername = async () => {
    const user = auth.currentUser.uid;

    if (user) {
      const userDocRef = doc(db, "users", user);

      await updateDoc(userDocRef, {
        user: currentUsername,
        email: currentEmail,
      });

      setIsEditMode(false);
      showAlert("Profile updated successfully!", "");
    }
  };

  const handleChangePassword = async () => {
    try {
      const user = auth.currentUser;
      const credentials = EmailAuthProvider.credential(user.email, oldPassword);
      const verify = await reauthenticateWithCredential(user, credentials);

      if (verify) {
        setPasswordChange(false);
        setShowPassFields(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updatePass = async () => {
    const user = auth.currentUser;

    if (newPassword !== confirmNewPassword) {
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
    }
  };

  const handlePasswordChange = () => {
    setPasswordChange(true);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.formContainer}>
          {!isEditMode ? (
            <>
              {/* edit icon */}
              <View style={styles.infoContainer}>
                <TouchableOpacity
                  onPress={handleEditClick}
                  style={styles.iconButton}
                >
                  <View>
                    <FontAwesome name="edit" size={20} style={styles.icon} />
                  </View>
                </TouchableOpacity>
              </View>
              {/* display username */}
              <View style={{ marginTop: 10 }}>
                <View style={styles.infoContainer}>
                  <FontAwesome name="user" size={20} style={styles.icon} />
                  <Text style={styles.infoText}>{currentUsername}</Text>
                </View>

                {/* display email */}
                <View style={styles.infoContainer}>
                  <FontAwesome name="envelope" size={20} style={styles.icon} />
                  <Text style={styles.infoText}>{currentEmail}</Text>
                </View>
              </View>
              {/* change password button */}
              {/* <View style={styles.infoContainer}>
                <TouchableOpacity
                  //   onPress={() => setPasswordChange(true)}
                  //   onPress={handlePasswordChange}
                  onPress={
                    () => navigation.navigate("ChangePassword")

                    // navigation.navigate("ChangePassword", {
                    //   updatePass: updatePass,
                    // })
                  }
                  style={{
                    backgroundColor: "#16537e",
                    padding: 8,
                    marginTop: -100,
                    marginHorizontal: 39,
                    borderRadius: 4,
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
              </View> */}
            </>
          ) : (
            <>
              <View style={[styles.infoContainer, { marginTop: 130 }]}>
                <FontAwesome name="user" size={20} style={styles.icon} />
                <TextInput
                  style={styles.infoText}
                  placeholder="Enter username"
                  value={currentUsername}
                  onChangeText={(text) => setCurrentUsername(text)}
                />
              </View>
              <View style={styles.infoContainer}>
                <FontAwesome name="envelope" size={20} style={styles.icon} />
                <TextInput
                  style={styles.infoText}
                  placeholder="Enter email"
                  value={currentEmail}
                  onChangeText={(text) => setCurrentEmail(text)}
                />
              </View>
              <View style={styles.infoContainer}>
                <TouchableOpacity
                  onPress={handleUpdateUsername}
                  style={{
                    backgroundColor: "#16537e",
                    padding: 13,
                    marginTop: -100,
                    marginHorizontal: 49,
                    borderRadius: 4,
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.buttonText}>Update Profile</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: Dimensions.get("window").width * 0.1,
    fontWeight: "700",
    color: "#16537e",
    marginLeft: 120,
    marginTop: 50,
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
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Dimensions.get("window").width * 0.1,
  },
  icon: {
    marginRight: 10,
    color: "#16537e",
  },
  infoContainer: {
    flexDirection: "row",
    width: "80%",
    height: 120,
    // padding: 10,
  },
  infoText: {
    height: 30,
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    // marginBottom: width * 0.007,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
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

export default EditProfile;
