import React from 'react';
import { StyleSheet, View, Text, Button, TouchableHighlightBase, Platform, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';


export class CustomAction extends React.Component {
  constructor(props) {
    super(props);
  }

  // get location
  getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      let result = await Location.getCurrentPositionAsync({});

      if (result) {
        this.props.onSend({
          location: {
            longitude: result.coords.longitude,
            latitude: result.coords.latitude,
          }
        })
      }
    }
  }

  // pick a photo from the device's gallery
  pickImage = async () => {
    // expo permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    try {
      if (status === "granted") {
        // pick image
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images, // only images are allowed
        }).catch((error) => console.log(error));
        // canceled process
        if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // take a photo with the device
  takePhoto = async () => {
    // expo permission
    let { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL,
    );
    // 
    try {
      if (status === 'granted') {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images, // only images are allowed
        }).catch(error => console.log(error));
        if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    }
    catch (error) {
      console.log(error.message);
    }

  }

  // store images in firebase storage
  uploadImageFetch = async (uri) => {
    // get blob data from the image
    // async function, we wait for the promise to settle
    const blob = await new Promise((resolve, reject) => {
      // initializes an XMLHttpRequest
      // you can retrieve data from a URL or URI
      const xhr = new XMLHttpRequest();
      // onload function is fired, when the data is successfully retrieved
      xhr.onload = function () {
        // returns data of the retrieval
        resolve(xhr.response);
      };
      // onerror function is fired, when the data could not be retrieved
      xhr.onerror = function (e) {
        // logs error
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      // specifies the type of the respone
      xhr.responseType = 'blob';
      // initializes the request, here get the passed uri
      // http method, string of the uri, true to perform the operation asynchronously
      xhr.open('GET', uri, true);
      // sending the request, get method needs no body
      xhr.send(null);
    });
    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    // create reference for the image file
    const ref = firebase.storage().ref().child(`images/${imageName}`);
    // put the data to the reference in firestore
    // async so await is needed
    const snapshot = await ref.put(blob);
    // I guess close the connection to firestore
    blob.close();

    // return the url of the image now stored in firebase
    return await snapshot.ref.getDownloadURL();
  }

  onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log("user wants to pick an image");
            return this.pickImage();
          case 1:
            console.log("user wants to take a photo");
            return this.takePhoto();
          case 2:
            console.log("user wants to get their location");
            return this.getLocation();
        }
      }
    );
  };


  render() {
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="More options"
        accessibilityHint="Let’s you choose to send an image or your geolocation."
        style={[styles.container]}
        onPress={this.onActionPress}>
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
})

CustomAction.contextTypes = {
  actionSheet: PropTypes.func,
};

const CustomActions = connectActionSheet(CustomAction);

export default CustomActions;