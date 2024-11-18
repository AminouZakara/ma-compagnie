import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const MapScreen = () => {

    const route = useRoute()
    console.log(route.params)
    return (
        <View>
            <Text>MapScreen</Text>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({})