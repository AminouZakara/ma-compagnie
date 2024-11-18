import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';


GoogleSignin.configure({
    webClientId: '954218532580-igmq7nn8kntfgl86q3vnv4hvoh8hhvjl.apps.googleusercontent.com',
});

const GoogleSignIn = () => {
    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const userCredential = await auth().signInWithCredential(googleCredential);

            const user = userCredential.user;
            await saveUserInfoToFirestore(user);
            navigation.navigate('Home');
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // User cancelled the login flow
                console.log("User cancelled the login flow");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("Operation (e.g. sign in) is in progress already");
                // Operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("Play services not available or outdated");
                // Play services not available or outdated
            } else {
                // Some other error happened
                console.log("Some other error happened");
            }
        }
    };
    const saveUserInfoToFirestore = async (user) => {
        try {
            await firestore().collection('users').doc(user.uid).set({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            });
        } catch (error) {
            console.error('Error saving user info to Firestore: ', error);
        }
    };
    return (
        <View >
            <Button title="Google Sign In" onPress={signInWithGoogle} />
        </View>
    )
}

export default GoogleSignIn

const styles = StyleSheet.create({})