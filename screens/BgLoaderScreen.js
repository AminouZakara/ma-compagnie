import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';


const BgLoaderScreen = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: "white", }} >

            {/* show the background logo image */}
            <Image source={require('../assets/fLogo.jpg')} style={{
                width: "50%", height: 150,
                resizeMode: "contain",
                marginVertical: 20,
                marginTop: 300
            }}
            />
            <View style={{
                backgroundColor: "white", height: 70,

            }}>
                <DotIndicator color='orange' size={15} count={5} />
            </View>





        </View>
    )
}

export default BgLoaderScreen

const styles = StyleSheet.create({})