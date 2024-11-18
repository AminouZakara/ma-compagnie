import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
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

const Loader = ({ visible = false }) => {
    const { height, width } = useWindowDimensions();
    return (
        visible && (
            <View style={[styles.container, { width, height }]}>
                <View style={styles.loader}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <BarIndicator count={5} color='orange' />

                    </View>
                </View>
            </View>

        )

    )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,.5)",
        justifyContent: "center"
    },
    loader: {
        height: 90,
        marginHorizontal: 80,
        borderRadius: 10,
        paddingHorizontal: 20,

    }

})