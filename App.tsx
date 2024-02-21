// import { StyleSheet, Button, View, Image ,Text, TouchableOpacity} from "react-native";
// import * as DocumentPicker from "expo-document-picker";
// import axios from "axios";
// import React, { useState ,useRef } from 'react';

// import { Camera, CameraType } from 'expo-camera';

// export default function App() {
//   const apiUrl = "http://192.168.0.110:8080/upload";
//   const [image, setImage] = useState('');

//   const [type, setType] = useState(CameraType.back);
//   const [permission, requestPermission] = Camera.useCameraPermissions();

//   function toggleCameraType() {
//     setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
//   }


//   const pickSomething = async () => {
//     try {
//       const docRes = await DocumentPicker.getDocumentAsync({
//         type: "image/*",
//       });

//       const formData = new FormData();
//       const assets = docRes.assets;

//       if (!assets) return;

//       const file = assets[0];

//       const imageFile = {
//         name: file.name.split(".")[0],
//         uri: file.uri,
//         type: file.mimeType,
//         size: file.size,
//       };

//       formData.append("image", imageFile as any);

//       const axiosConfig = {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "multipart/form-data",
//         },
//       };

//       const response = await axios.post(apiUrl, formData, axiosConfig);

//       setImage(response.data.image);

//     } catch (error) {
//       console.error("Error while selecting file: ", error);
//     }
//   };
  

//   return (
//     <View style={styles.container}>
//     <Camera  type={type}>
//         <View >
//           <TouchableOpacity  onPress={toggleCameraType}>
//             <Text >Flip Camera</Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//       <Button title="Pick something" onPress={pickSomething} />
//       {image && <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={{ width: 200, height: 200 }} />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, Button, View, Image, Text, TouchableOpacity } from 'react-native';
// import { Camera as ExpoCamera } from 'expo-camera';
// import * as DocumentPicker from 'expo-document-picker';
// import axios from 'axios';

// export default function App() {
//   const apiUrl = 'http://192.168.0.110:8080/upload';
//   const [image, setImage] = useState('');
//   const [type, setType] = useState('back' as 'back' | 'front');
//   const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
//   const [isCameraReady, setCameraReady] = useState(false);

//   const cameraRef = useRef<any>(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await ExpoCamera.requestCameraPermissionsAsync();
//       setHasCameraPermission(status === 'granted');
//     })();
//   }, []);

//   if (hasCameraPermission === null) {
//     return <Text>Requesting camera permission...</Text>;
//   }

//   if (hasCameraPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   const pickSomething = async () => {
//     try {
//       const docRes = await DocumentPicker.getDocumentAsync({
//         type: 'image/*',
//       });

//       const formData = new FormData();
//       const assets = docRes.assets;

//       if (!assets) return;

//       const file = assets[0];

//       const imageFile = {
//         name: file.name.split('.')[0],
//         uri: file.uri,
//         type: file.mimeType,
//         size: file.size,
//       };

//       formData.append('image', imageFile as any);

//       const axiosConfig = {
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//         },
//       };

//       const response = await axios.post(apiUrl, formData, axiosConfig);

//       setImage(response.data.image);
//     } catch (error) {
//       console.error('Error while selecting file: ', error);
//     }
//   };

//   const handleCameraCapture = async () => {
//     if (!cameraRef.current || !isCameraReady) {
//       console.warn('Camera is not ready yet. Wait for onCameraReady callback.');
//       return;
//     }

//     try {
//       const photo = await (cameraRef.current as any).takePictureAsync({ base64: true });
//       const formData = new FormData();
//       const imageFile = {
//         name: 'photo.jpg',
//         type: 'image/jpeg',
//         uri: photo.uri,
//       };

//       formData.append('image', imageFile as any);

//       const axiosConfig = {
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//         },
//       };

//       const response = await axios.post(apiUrl, formData, axiosConfig);
//       setImage(response.data.image);
//     } catch (error) {
//       console.error('Error while taking photo: ', error);
//     }
//   };

//   const toggleCameraType = () => {
//     setType((current: "back" | "front") =>
//       current === "back" ? "front" : "back"
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <ExpoCamera
//         style={styles.camera}
//         type={type as any}

//         onCameraReady={() => setCameraReady(true)}
//         ref={(ref) => (cameraRef.current = ref!)}
//         >
//         <View style={styles.cameraContainer}>
//           <TouchableOpacity style={styles.flipCameraButton} onPress={toggleCameraType}>
//             <Text style={styles.flipCameraButtonText}>Flip Camera</Text>
//           </TouchableOpacity>
//         </View>
//       </ExpoCamera>

//       <View style={styles.buttonContainer}>
//         <Button title="Pick something" onPress={pickSomething} />
//         <Button title="Take Photo" onPress={handleCameraCapture} />
//       </View>
//       {image && <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={styles.image} />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   camera: {
//     flex: 1,
//     width: '100%',
//   },
//   cameraContainer: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     margin: 20,
//   },
//   flipCameraButton: {
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//     padding: 15,
//   },
//   flipCameraButtonText: {
//     color: '#fff',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 20,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginTop: 20,
//   },
// });

import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import Signup from './components/signup'
import Login from './components/login'

import Home from './components/home'
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}

export default App



