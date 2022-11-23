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
Please install the following libraries and frameworks.
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

### Database

This app uses Firebase as a database server. The app is set-up to work on a collection created by myself. 
You can set up your own database by following these steps:

1. Create a Firebase account: Firebase
2. Create a project from the main console dashboard and name it something you can remember and associate with this app. As you’re just getting set up, you need to create a database, so click Develop from the menu on the left-hand side and, from the additional menu that appears, select Cloud Firestore (be careful not to click the "Realtime Database" option), then select Create Database.
3. Go with the 'Start in test mode' option for now, which will likely give you the warning message “Anyone with your database reference will be able to read or write to your database.” This is fine for unpublished apps.
4. In the Firestore project in your browser, open up your “Project Settings” (by clicking on the gear icon). Under the General tab, you’ll find a section called Your Apps, which is where you can generate configurations for different platforms. Click the Firestore for Web button (it may be shown as the </> icon).
5. This will open a new screen asking you to register your web application, which will connect to the Cloud Firestore database you just created. For now, only fill in a name for your chat application (e.g., “chat_web_app”), then click Register to generate the configuration code.
6. Copy the contents of the config object (from { apiKey:… to messagingSenderId:…}) in this modal. You’ll be integrating this configuration info into your “App.js” file, which is what will allow your app to connect to Firestore. But before you can simply paste it into your file, you first need to create a constructor in your App class that will initialize the Firestore app. Within that constructor, you can paste the data you copied from the config object.
7. Next up, you’ll need to create a reference to your Firestore collection (the above code connected your database but didn’t reference any specific collection within that database). To do so (in the code of Chat.js), use the following line: this.referenceYourCollection = firebase.firestore().collection('yourcollection'); Just make sure you replace 'yourcollection' with the name of your database collection in firestore!

### Running the app

To begin running the app, open your terminal and run 'expo start' while in the root folder of the project (once downloaded from github). This will start a local server and give you a QR code.

Next, download Expo Go from the app store on your mobile device. Once downloaded, follow the steps to login/create an account and wait for the menu screen to load. Once it does, use the option 'Scan QR code' to scan the code your terminal displays. This will load the app. NOTE: your local machine and your phone must be on the same network to run the app this way.

#### Setting up an emulator

If you do not have an android phone, you can use an emulator to run the app. You can use android studio to create an emulator on your computer.
[Download Android Studio] (https://developer.android.com/studio/?gclid=CjwKCAjwvNaYBhA3EiwACgndgp93rH50vWIpTzBLHPaTkq80z14PNxoZbQ7BASWiywGhQ5bnl7j_sxoCDqoQAvD_BwE&gclsrc=aw.ds&authuser=1)

Once Android studio is downloaded and opened (usually you'll find it in your applications folder):

Generally, you can keep clicking Next through the default settings. However, note the following two exceptions:

If you’re asked to Select Components to Install, make sure “Android Virtual Device” is selected.
You may also need to define the location on your device where you want to install Android Studio. Make sure you add a logical file path before completing the rest of the instructions.
At the end of the installation, you’ll need to accept the license agreement. Then, press the Finish button to start downloading all selected components.

Next, from the welcome screen, you'll see some options and a dropdown menu beneath for 'More Options'. Click this menu and select 'SDK manager'. The SDK Manager allows you to view, install, update, and uninstall packages for the Android SDK.

A modal will open with a list of Android SDK options. By default, you’ll be shown the list of items in the SDK Platforms tab. You’ll need to navigate to the 'SDK Tools' tab right next to it.

NOTE: Check that you have “Android SDK Build-Tools” installed. In order to run the command to build your app later, you’ll need this set of tools. If it’s not installed, check the box next to “Android SDK Build-Tools,” then click Apply at the bottom of the modal (and confirm that you’d like to download the latest version). Windows Users Only:

AMD CPU Users (on Windows) Only: If you have an AMD CPU, you’ll need to enable and install “Android Emulator Hypervisor Driver for AMD processors (installer).” If it’s not already installed, tick its box, then apply it.

Intel CPU Users (on Windows) Only: If you have an Intel CPU, you’ll need to enable and install “Intel x86 Emulator Accelerator (HAXM installer).” If it’s not already installed, tick its box, then apply it.

MacOS Users Only:

Copy the path next to “Android SDK Location”
Check what shell your terminal is using.
Locate and open your “/.bash_profile” or “/.bashrc” file (or “~/.zshrc” if you have zsh terminal instead of bash).
Add the default stored location of ANDROID_SDK on your system by adding the following to your “/.bash_profile” or “/.bashrc” file (or “~/.zshrc” if you have zsh terminal instead of bash):
export ANDROID_SDK=/Users/myuser/Library/Android/sdk. (This path will be different depending on your device, so be sure to edit it accordingly.)

Add the location for the tools you’ll need to interact with the Android device by adding Platform-Tools (which is located as a sub-directory of ANDROID_SDK on your system). To do so, add it to your “/.bash_profile” or “/.bashrc” file (or “~/.zshrc” if you have zsh terminal instead of bash) via the following line of code (edited to correspond with your own device):
export PATH=/Users/myuser/Library/Android/sdk/platform-tools:$PATH

Once you’ve installed these additional components, you can continue with your set up! Close the “SDK Manager” window by pressing OK.

#### Using an Emulator:

From your Android Studio Welcome Screen, click More Actions again, followed by Virtual Device Manager. Then, select Create Virtual Device, along with the device you’d like to create. Pick whichever mobile phone device you want, followed by Next.

This will take you to the System Image interface, where you’ll need to select an operating system and download the system images. Click on the Recommended tab and select a suitable operating system. It might be worth doing a quick Google search to see which OS your chosen device uses. Google Pixel 5, for example, uses the Android 11 OS. You can see Android 11 listed in the Target column, so select this row.

Click the Download link next to whichever OS you want to install, after which, Android Studio will download the corresponding system images.In the next window, give your device a name, then click Finish.

Head back to the Virtual Device Manager and click Play to start your newly created emulator. This will render the selected device on your screen, ready to emulate your code! Once your emulator is rendered to your screen, you can connect with Expo in the browser to run and view your React Native project.

From your CLI, when you start the app, choose the option to run on android (for Mac users, this is as simple as pressing 'a' while the app is running).

## API
THis project uses the Google Firestone API.

## Screenshots

<img src="https://user-images.githubusercontent.com/104713327/203623271-2a2bd05d-d996-4795-83bd-803784f0069b.png" height=50% width=50%>
<img src="https://user-images.githubusercontent.com/104713327/193913529-aec8723f-02fa-4e5a-ac8e-6728549edbed.png "height=50% width=50%>


