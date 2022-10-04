# Chat_App

## Project Description
This is a chat app for mobile devices. The app will provide users with a chat room and options to share images and their location.

## Key Features
- A start page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A chat page displaying the conversation
- The chat page provides an input field to create a messages a button to send them
- The chat provides users with mulitple additional communication features
- The user can take an image and send it
- The user can select an image from their library and send it
- The user can send their location data
- The app can be used offline and online

## User Stories
- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

## How to get the project going

### Project dependencies
First, download this project from github and make sure all files are downloaded and will open in the IDE of your choice.

Secondly, to use this app locally, you must have the following dependencies installed:

- "@expo/webpack-config": "^0.17.2",
- "@react-native-async-storage/async-storage": "~1.17.3",
- "@react-native-community/masked-view": "^0.1.11",
- "@react-native-community/netinfo": "9.3.0",
- "@react-navigation/native": "^6.0.12",
- "@react-navigation/stack": "^6.2.3",
- "cookies": "^0.8.0",
- "expo": "~46.0.9",
- "expo-image-picker": "^13.3.1",
- "expo-permissions": "~13.2.0",
- "expo-status-bar": "~1.4.0",
- "firebase": "^7.9.0",
- "react": "18.0.0",
- "react-dom": "18.0.0",
- "react-native": "0.69.6",
- "react-native-gesture-handler": "~2.5.0",
- "react-native-gifted-chat": "^1.0.4",
- "react-native-reanimated": "~2.9.1",
- "react-native-safe-area-context": "4.3.1",
- "react-native-screens": "~3.15.0",
- "react-native-web": "^0.18.9",
- "react-navigation": "^4.4.4",
- "zlib": "^1.0.5",
- "react-native-maps": "0.31.1",
- "expo-location": "~14.3.0"

Many of these dependencies are install as packages within larger libraries or frameworks.
Make sure you are withing the root folder of the project!

Install React and React Native if you don't already have them:
```
npm install react react-dom react-native
```
Next install expo-cli if you don't already have it:
```
npm install expo-cli --global
```

Next:
```
npm install react-native-gifted-chat --save
```
```
npm install --save firebase@7.9.0
```
```
expo install @react-native-async-storage/async-storage
```
```
expo install @react-native-community/netinfo
```
```
expo install expo-image-picker
```
```
expo install expo-location 
```
```
expo install react-native-maps
```


### Running the app

To begin running the app, open your terminal and run 'expo start' while in the root folder of the project (once downloaded from github). This will start a local server and give you a QR code.

Next, download Expo Go from the app store on your mobile device. Once downloaded, follow the steps to login/create an account and wait for the menu screen to load. Once it does, use the option 'Scan QR code' to scan the code your terminal displays. This will load the app. NOTE: your local machine and your phone must be on the same network to run the app this way.


## API
THis project uses the Google Firestone API.
