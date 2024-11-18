import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AddButton = ({ btnText, btnonPress }) => {

    //UPdate
    // By: reservedBus.By,
    //     userID: reservedBus.TicketUserID,
    //         TicketUserID: reservedBus.TicketUserID,
    //             depPlace: reservedBus.depPlace,
    //                 destPlace: reservedBus.destPlace,
    //                     travelDate: reservedBus.travelDate,
    //                         companyName: reservedBus.companyName,
    //                             travelHour: reservedBus.travelHour,
    //                                 travelMinute: reservedBus.travelMinute,
    //                                     price: reservedBus.price,
    //                                         seatType: reservedBus.seatType,
    //                                             durationHour: reservedBus.durationHour,
    //                                                 durationMinute: reservedBus.durationMinute,

    return (
        <TouchableOpacity onPress={btnonPress}>
            <View style={styles.btnonPress}>
                <View style={styles.btnContainer}>
                    <Text style={styles.btnText}>{btnText}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default AddButton

const styles = StyleSheet.create({
    btnonPress: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    btnContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'green',
        borderRadius: 10,
        width: '25%',
        height: '75%',
    },
    btnText: {
        color: "white",
        fontSize: 14,
        fontWeight: 'bold',
    },

})