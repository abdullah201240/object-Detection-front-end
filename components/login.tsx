import { ScrollView, StyleSheet, Text, Image,TextInput,View ,TouchableOpacity, Alert,Pressable} from 'react-native'
import React, { useState } from 'react'
import axios from "axios";

export default function Login(props:any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleLogin = async () => {
        try {
          const response = await axios.post('http://192.168.0.110:8080/login', {
            email: email,
            password: password,
          });
          console.log(response.data)
    
          if (response.status == 200) {
            const { token,id, email, name } = response.data;
            
    
            if (token) {
                props.navigation.navigate('Home', {
                user: {
                  id: id as string,
                  email: email as string,
                  name: name as string,
                },
              });
              console.log('Login successful');
            } else {
              Alert.alert('Login Failed', 'Invalid email or password');
            }
          } else {
            Alert.alert('Login Failed', 'Invalid email or password');
          }
    
        } catch (error) {
          console.error('Error during login:', error);
        }
      };
      
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <Image source={require("../assets/logo.png")} style={styles.logo} />
    <Text style={{ fontSize: 30, color: "green", fontWeight: "bold" }}>
               ObjectSnap       
                    </Text>
            <Text style={{ fontSize: 30, color: "rgb(88, 14, 206)", fontWeight: "bold",textAlign:"center" }}>
                   Login            </Text>
            <View style={styles.inputContainer}>
               

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            <TouchableOpacity style={styles.buttonContainer}  onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Pressable onPress={() => props.navigation.navigate("Signup")}>

        <Text style={{ paddingTop: 10 ,fontSize:20}}>Don't have account? <Text style={{ color: "violet" }}>Signup</Text></Text>



      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop:100,

    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    inputContainer: {
        marginTop: 20,
        width: 300,
    },
    input: {
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 15,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
    buttonContainer: {
        marginTop: 10,
        height: 50,
        width: 200,
        backgroundColor: "rgb(85, 12, 206)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
});
