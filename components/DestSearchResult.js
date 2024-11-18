import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DestSearchResult = ({ data, inputDest, setInputDest }) => {
    return (
        <View style={{ marginBottom: 15 }}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    if (item.villeName.toLowerCase().includes(inputDest.toLowerCase())) {
                        if (inputDest === "") {
                            return null;
                        }
                        return (
                            <Pressable onPress={() => {
                                setInputDest(item.villeName);
                            }}>
                                <View style={{ marginVertical: 5 }}>
                                    <Text style={{ color: "green", fontSize: 16, fontWeight: "bold" }}> {item.villeName} </Text>
                                </View>
                            </Pressable>
                        )
                    }
                }}

            />
        </View>
    )
}

export default DestSearchResult

const styles = StyleSheet.create({})