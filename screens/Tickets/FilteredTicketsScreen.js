import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { BottomModal, ModalContent, ModalFooter, ModalTitle, SlideAnimation } from 'react-native-modals';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import FilTicketCard from '../../components/FilTicketCard';

const FilteredTicketsScreen = () => {
    const route = useRoute()
    console.log(route.params)
    const navigation = useNavigation()
    const [sortModal, setSortModal] = useState(false)
    const [filteredBuses, setFilteredBuses] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: "Billets",
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
            },
            headerStyle: {
                backgroundColor: "green",
                height: 110,
                borderBottomColor: "transparent",
                shadowColor: "transparent",
            },

        })
    }, [])

    // console.log("ParamsIDDD: ", route.params._id)

    const filters = [
        {
            id: "0",
            filter: "price: Low to High",
        },
        {
            id: "1",
            filter: "price: High to Low",
        },
    ];

    const searchBuses = buses?.filter((item) => item.depPlace === route.params.inputDep && item.destPlace === route.params.inputDest);

    const applyfilter = (filter) => {
        setSortModal(false)
        switch (filter) {
            case "price: Low to High":
                setFilteredBuses(buses.sort((a, b) => a.price - b.price))
                break;
            default:
                setFilteredBuses(buses.sort((a, b) => b.price - a.price));
                break;
        }

    }
    const [isLoading, setIsLoading] = useState(false);
    const [buses, setBuses] = useState([]);

    useEffect(() => {
        if (buses.length > 0) return;

        setIsLoading(true);

        const colRef = collection(db, "buses");
        const unsub = onSnapshot(colRef, (snapshot) => {
            let results = []
            snapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            })
            setBuses(results);
            setIsLoading(false);

        });
        // Cleanup function for unsubscribe when the component is dismounted
        return () => unsub();


    }, [setBuses]);


    return (
        <View style={{ flex: 1 }}>
            <Pressable
                style={{
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    padding: 12,
                    backgroundColor: "white"
                }}
            >
                <Pressable
                    onPress={() => setSortModal(!sortModal)}
                    style={{ flexDirection: "row", alignItems: "center" }} >
                    <Octicons name="arrow-switch" size={18} color="gray" style={{ transform: [{ rotate: '-90deg' }] }} />
                    <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }} >Sort</Text>
                </Pressable>
                <Pressable style={{ flexDirection: "row", alignItems: "center" }} >
                    <Ionicons name="filter-outline" size={20} color="gray" />
                    <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }} >Filter</Text>
                </Pressable>


                <Pressable
                    // _________ Map ____________ 
                    onPress={() => navigation.navigate('Map', {
                        searchResults: searchBuses,
                    })}
                    style={{ flexDirection: "row", alignItems: "center" }} >
                    <FontAwesome5 name="map-marker-alt" size={20} color="gray" />
                    <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }} >Map</Text>
                </Pressable>
            </Pressable>

            <Pressable style={{ flex: 1 }} >

                {/*------------- sort and filter ---------------*/}
                <BottomModal
                    swipeThreshold={0.7}
                    onBackdroPress={(e) => setSortModal(!sortModal)}
                    swipeDirection={['up', 'down']}
                    footer={<ModalFooter>
                        <Pressable style={{ paddingRight: 10, marginLeft: "auto", marginRight: "auto", marginVertical: 10 }} >
                            <Text
                                onPress={() => applyfilter(filteredBuses)}
                                style={{ fontWeight: "400", backgroundColor: "green", color: "white", fontSize: 20, borderRadius: 10, paddingHorizontal: 15, paddingBottom: 4 }}>Apply</Text>
                        </Pressable>
                    </ModalFooter>}

                    modalTitle={<ModalTitle
                        style={{ width: "100%", backgroundColor: "green", flexDirection: "row" }}
                        title={<View >
                            <Text style={{ color: "white", fontSize: 20, }} >Sort and Filter </Text>
                        </View>}

                    />}

                    modalAnimation={
                        new SlideAnimation({
                            slideFrom: 'bottom'
                        })
                    }
                    onHardwareBackPress={() => setSortModal(!sortModal)}
                    visible={sortModal}
                    onTouchOutside={(e) => setSortModal(!sortModal)}
                >
                    <ModalContent style={{ width: "100%", height: 200 }} >
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ marginVertical: 10, flex: 2, height: 185, borderRightWidth: 1, borderColor: "orange" }}>
                                <Text style={{ textAlign: "center" }}>Sort By: </Text>
                            </View>

                            <View style={{ flex: 3, margin: 10 }}>
                                {filters.map((item, index) => {
                                    return (
                                        <Pressable
                                            onPress={() => setFilteredBuses(item.filter)}
                                            key={index}
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginVertical: 10,
                                            }} >
                                            {filteredBuses.includes(item.filter) ? (
                                                <FontAwesome name="circle" size={24} color="green" />

                                            ) : (
                                                <Entypo name="circle" size={18} color="black" />

                                            )}
                                            <Text style={{ fontSize: 16, fontWeight: "500", marginLeft: 6 }} > {item.filter} </Text>
                                        </Pressable>
                                    )
                                })}
                            </View>
                        </View>



                    </ModalContent>

                </BottomModal>

                {isLoading ? (
                    <View style={{ flex: 1, alignItems: "center", marginTop: 100 }} >
                        <Text style={{ padding: 15, backgroundColor: "orange", fontSize: 20, color: "white" }} >Récupérer Tous les Bus</Text>
                        <Text style={{ color: "green", fontSize: 22, marginTop: 50 }} > S'il vous plaît, attendez ... </Text>
                    </View>
                ) : (
                    <ScrollView>
                        {/* Ticket List */}


                        {
                            buses?.filter((bus) => bus.depPlace === route.params.inputDep && bus.destPlace === route.params.inputDest && bus.travelDate === route.params.inputTravelDate).map((bus, index) => (
                                <FilTicketCard
                                    key={index}
                                    inputDep={route.params.inputDep}
                                    inputDest={route.params.inputDest}
                                    inputTravelDate={route.params.inputTravelDate}
                                    companyName={bus.companyName}
                                    seatType={bus.seatType}
                                    price={bus.price}
                                    availableSeats={bus.availableSeats}
                                    travelHour={bus.travelHour}
                                    travelMinute={bus.travelMinute}
                                    durationHour={bus.durationHour}
                                    durationMinute={bus.durationMinute}
                                    depPlace={bus.depPlace}
                                    destPlace={bus.destPlace}
                                    travelDate={bus.travelDate}
                                    row_1={bus.row1}
                                    row_2={bus.row2}
                                    row_3={bus.row3}
                                    By={bus.By}
                                    userID={bus.userID}
                                    TicketUserID={bus.TicketUserID}
                                    _id={bus.id}
                                    r_id={route.params._id}

                                />
                            ))
                        }
                    </ScrollView>
                )}

                {/* const getAllSeats = () => {
        const selectedSeats = [];
        row1.map(item => {

            if (item.selected == true) {
                    selectedSeats.push(item.value);
            }
        });
        row2.map(item => {
            if (item.selected === true) {
                    selectedSeats.push(item.value);
            }
        });

        row3.map(item => {
            if (item.selected === true) {
                    selectedSeats.push(item.value + ", ");
            }
        });
                return selectedSeats.join(", ");
    } */}




            </Pressable>

            {/* _____________ Add  a ticket button ___________________ 
            <Pressable style={styles.addButton}>
                <Text style={{ color: "black" }} >Ajouter un billet</Text>
            </Pressable>
            || item.villeName === route.params.inputDest
            item.dateRetour >= new Date()
item={item} navigation={navigation}
            ____________ Display the list of tickets __________________ 
            <View style={styles.listContainer}>
                <FlatList data={route.params?.tickets ?? []} keyExtractor={(item) => item._id} renderItem={renderTicket} />
                {route.params?.tickets.map((ticket) => (
                    <TicketCard key={ticket._id} ticket={ticket} />
                ))}
            </View>
            </Pressable>
            
            <Pressable>
                <Text>Ajouter un billet</Text>
            </Pressable>
            <TicketList data={route.params?.data} /> 
            
            
             <FlatList
                data={data}
                renderItem={({ item }) => <Product product={item} navigation={navigation} />}
                keyExtractor={(item) => item.id}
                stickyHeaderIndices={[0]}
                contentContainerStyle={{ paddingVertical: 4 }}
                ListFooterComponent={() => <View style={{ height: 60 }}>
                    <ActivityIndicator animating={true} color="#fff" />

                </View>}
            />
            
            
            */}


        </View >
    )
}

export default FilteredTicketsScreen

const styles = StyleSheet.create({})