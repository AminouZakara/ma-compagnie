import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const DepSearchResult = ({ data, inputDep, setInputDep }) => {
    const navigation = useNavigation()
    return (
        <View style={{ marginBottom: 15 }}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    if (item.villeName.toLowerCase().includes(inputDep.toLowerCase())) {
                        if (inputDep === "") {
                            return null;
                        }
                        return (
                            <Pressable onPress={() => {
                                setInputDep(item.villeName);
                                navigation.navigate('Home', {
                                    inputDep: item.villeName
                                })
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

export default DepSearchResult

const styles = StyleSheet.create({})