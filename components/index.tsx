import { StyleSheet, Text, View, ScrollView, Image ,TouchableOpacity} from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Index(props:any) {
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={{ fontSize: 30, color: "green", fontWeight: "bold" , paddingBottom:30, paddingTop:20 }}>
                ObjectSnap
            </Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate("Login")}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate("Signup")}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={{fontSize:20,fontWeight:"bold",color:"olive",paddingTop:10}}>Can you check this picture and tell me what's in it and what those things are called?</Text>
            <View style={{ flexDirection: 'row'  }}>
         <Image source={require("../assets/istockphoto-1364917563-612x612.jpg")} style={{width: 200,height: 240}} />
         <FontAwesomeIcon icon={faArrowRight} size={32} color="black" style={{paddingTop:240}} />

         <Image source={require("../assets/annotated_20240221023010_temp_image.jpg")} style={{width: 200,height: 240}} />
    </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 80,

    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
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
