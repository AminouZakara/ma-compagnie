import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import DestSearchResult from '../components/DestSearchResult';
import { useNavigation } from '@react-navigation/native';

const DestinationSearchScreen = () => {

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: "Ville d Arrivée",
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "white",

            },
            headerStyle: {
                backgroundColor: "green",
                height: 110,
                borderBottomColor: "transparent",
                shadowColor: "transparent"



            },
            headerRight: () => (
                <Ionicons name="notifications-outline" size={24} color="white" style={{ marginRight: 12 }} />
            )

        })
    }, [])
    const [inputDest, setInputDest] = useState("")


    const data = [
        {
            id: '1',
            villeName: "Agadez"
        },
        {
            id: '2',
            villeName: "Dosso"
        },
        {
            id: '3',
            villeName: "Diffa"
        },
        {
            id: '4',
            villeName: "Maradi"
        },
        {
            id: '5',
            villeName: "Niamey"
        },
        {
            id: '6',
            villeName: "Tahoua"
        },
        {
            id: '7',
            villeName: "Tillaberi"
        },
        {
            id: '8',
            villeName: "Zinder"
        }, {
            id: '9',
            villeName: "Agadez"
        },
        {
            id: '10',
            villeName: "Dosso"
        },
        {
            id: '11',
            villeName: "Diffa"
        },
        {
            id: '12',
            villeName: "Maradi"
        },
        {
            id: '13',
            villeName: "Niamey"
        },
        {
            id: '14',
            villeName: "Tahoua"
        },
        {
            id: '15',
            villeName: "Tillaberi"
        },
        {
            id: '16',
            villeName: "Zinder"
        }


    ]
    return (
        <SafeAreaView style={{ padding: 10 }} >
            <View style={{
                padding: 6,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "orange",
                borderWidth: 2,
                borderRadius: 10,
                marginVertical: 5,
                marginBottom: 5,
            }} >
                <TextInput
                    onChangeText={(text) => setInputDest(text)}
                    placeholder='Choisissez votre ville d arrivée'
                />
                <Feather name="search" size={24} color="black" />
            </View>

            {/* __________________ DestSearchResults ____________________ */}

            <DestSearchResult data={data} inputDest={inputDest} setInputDest={setInputDest} />



            {/* __________________ Depart Villes ____________________ */}
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <Pressable onPress={() => {
                            setInputDest(item.villeName);
                            navigation.navigate('Home', {
                                inputDest: item.villeName
                            })
                        }} key={item.id}>
                            <View style={{ marginVertical: 10 }}>
                                <Text> {item.villeName} </Text>
                            </View>
                        </Pressable>
                    )
                }
                }
            />

        </SafeAreaView>
    )
}

export default DestinationSearchScreen

const styles = StyleSheet.create({})