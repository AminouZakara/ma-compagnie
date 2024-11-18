import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import 'expo-dev-client'
import { auth, db } from '../firebase';
import Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const GoogleSingIn = () => {
    //'YOUR_GOOGLE_CLIENT_ID' To be Checked in case there is an error
    // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    //     clientId: '954218532580-igmq7nn8kntfgl86q3vnv4hvoh8hhvjl.apps.googleusercontent.com',
    // });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            auth.signInWithCredential(credential)
                .then((result) => {
                    const user = result.user;
                    console.log(user);
                    // Save user info to Firestore if new user
                    getDoc(doc(db, "users", `${user.uid}`)).then((docSnap) =>
                        !docSnap.exists() ? setDoc(doc(db, "users", `${user.uid}`), {
                            name: user.displayName,
                            surname: '',
                            email: user.email,
                            dateOfBirth: '',
                            userID: user.uid,
                        }) : null
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [response]);


    return (
        <View style={{
            marginTop: 200,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'

        }}>
            <Button
                title="Sign In with Google"
                disabled={!request}
                onPress={() => {
                    promptAsync();
                }}
            />
        </View>

    )
}

export default GoogleSingIn

const styles = StyleSheet.create({})


