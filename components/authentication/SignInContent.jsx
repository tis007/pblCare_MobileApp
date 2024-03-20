import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, TextInput,SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "./SignInContentStyle";
import { COLORS, icons, images, SIZES } from "../../constants";
import UserToken from "../../modules/UserToken";

const SignInContent = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if(username === '' || password === ''){
        //Wrong credentials
        alert("Please enter your username and password");

    }else{
        //Send sign in request
        const signIn = await UserToken.signIn(username, password);

        //Check request status
        if(signIn === 'successful'){
            //Successful sign in
            //Redirect to index
            navigation.reset({
                index: 0,
                routes: [{ name: 'index' }],
            });
        }else if(signIn === 'error_inactive_user'){
            //Inactive user
            alert("Your account is no longer active");

        }else if(signIn === 'error_wrong_credentials'){
            //Wrong credentials
            alert("Incorrect username or password");

        }else if(signIn === 'error_empty_input'){
            //Wrong credentials
            alert("Please enter your username and password");

        }else{
            //Error
            alert("Something went wrong");

        }
    }
    
    
    
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <View style={styles.container}>
        <TouchableOpacity style={styles.logoImageContainer}>
            <Image
            source={images.logo}
            style={styles.logoImage}
            resizeMode="contain"
            />
        </TouchableOpacity>

        <Text style={styles.textSignIn}>Sign in</Text>

        <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
        />

        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.buttonSignIn} onPress={handleSignIn}>
            <Text style={styles.buttonSignInText}>Sign in</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default SignInContent;
