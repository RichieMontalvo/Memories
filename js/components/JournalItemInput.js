import React, { Component } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  Alert,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import TouchableItem from "./TouchableItem";

import Store from "../Store";

export default class JournalItemInput extends Component {
  state = { photo: null };

  _deleteItems() {
    Alert.alert(
      "Delete entries",
      "Are you sure you want to delete all entries?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            await Store.deleteItems();
            this.props.refresh();
          },
        },
      ]
    );
  }

  _hasCameraPermissions = async () => {
    let permission = await Permissions.askAsync(Permissions.CAMERA);
    if (permission.status !== "granted") {
      console.log("Permission to camera was denied");
      return false;
    }
    permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      console.log("Permission to camera roll was denied");
      return false;
    }
    return true;
  };

  _launchCamera = async () => {
    if (this._hasCameraPermissions()) {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        this.setState({ photo: result.uri });
        this.textInput.focus();
      }
    }
  };

  _submit(text) {
    this.textInput.clear();
    this.props.onSubmit(text, this.state.photo);
    this.setState({ photo: null });
  }

  render() {
    const photoIcon = this.state.photo ? (
      <Image style={styles.imagePreview} source={{ uri: this.state.photo }} />
    ) : (
      <SimpleLineIcons name="camera" size={24} color="aqua" />
    );
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <View style={styles.photoIcon}>
              <TouchableItem onPress={() => this._launchCamera()}>
                {photoIcon}
              </TouchableItem>
            </View>
            <TextInput
              style={styles.input}
              ref={(input) => (this.textInput = input)}
              placeholder="Create new entry"
              returnKeyType="done"
              underlineColorAndroid="transparent"
              onSubmitEditing={(event) => this._submit(event.nativeEvent.text)}
            />
          </View>
          <TouchableItem onPress={() => this._deleteItems()}>
            <View style={styles.deleteIcon}>
              <SimpleLineIcons name="trash" size={24} color="aqua" />
            </View>
          </TouchableItem>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    margin: 5,
    paddingHorizontal: 5,
    color: "white",
  },
  input: {
    flex: 1,
    height: 40,
    color: "lightgray",
  },
  photoIcon: {
    alignSelf: "center",
    marginLeft: 5,
    marginRight: 15,
    color: "aquamarine",
  },
  deleteIcon: {
    alignSelf: "center",
    color: "aquamarine",
    marginLeft: 10,
  },
  imagePreview: {
    width: 24,
    height: 24,
  },
});
