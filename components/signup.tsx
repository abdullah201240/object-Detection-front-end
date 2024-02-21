import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, Image, View, TextInput, TouchableOpacity, Alert,Pressable} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from "axios";

const Signup = (props:any) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSignup = async () => {
        try {
            if (!name || !email || !password) {
                Alert.alert("Validation Error", "Please fill in all fields");
                return;
            }
    
            const apiEndpoint = "http://192.168.0.110:8080/signup";
    
            const response = await axios.post(apiEndpoint, {
                name: name,
                email: email,
                password: password,
            });
    
            console.log("API Response:", response.data);
    
            Alert.alert("Success", "User created successfully");
        } catch (error:any) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.error || "";
                if (errorMessage.includes("User with this email already exists")) {
                    Alert.alert("Error", "User with this email already exists. Please use a different email.");
                } else {
                    Alert.alert("Error", errorMessage || "Failed to create user");
                }
            } else {
                Alert.alert("Error", "Failed to create user");
            }
        } finally {
            setLoading(false);
        }
    };
    
    
   


    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            
            <Text style={{ fontSize: 30, color: "green", fontWeight: "bold" }}>
               ObjectSnap       
                    </Text>
            <Text style={{ fontSize: 30, color: "rgb(88, 14, 206)", fontWeight: "bold" }}>
                Create Account
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

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
            <TouchableOpacity style={styles.buttonContainer} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          <Pressable onPress={() => props.navigation.navigate("Login")}>

        <Text style={{ paddingTop: 10 ,fontSize:18}}>Have an account? <Text style={{ color: "violet",fontSize:18 }}>Sign In</Text></Text> 



      </Pressable> 

            <StatusBar style="auto" />
        </ScrollView>
    );
};

export default Signup;

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop:50,

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
