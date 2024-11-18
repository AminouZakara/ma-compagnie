import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const CardPayment = ({ confirmBooking, userData, userId }) => {
    const [cardNumber, setCardNumber] = useState("")
    const [cardHolder, setCardHolder] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [cvv, setCvv] = useState("")

    // handle payment with card
    const handlePayment = () => {
        const paymentData = {
            cardNumber,
            cardHolder,
            expiryDate,
            cvv,
            userId
        }
        confirmBooking(paymentData)
    }

    // const paymentIntentClientSecret = 'YOUR_PAYMENT_INTENT_CLIENT_SECRET';
    // const paymentMethod = await confirmPayment({
    //     paymentIntentClientSecret,
    //     confirmParams: {
    //         payment_method_types: ['card'],
    //     },
    // });
    // if (paymentMethod) {
    //     const paymentMethodId = paymentMethod.id;

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 18, fontWeight: "600", textDecorationLine: "underline", color: "#0D0DFF" }}>Carte Bancaire</Text>
            <View style={{ marginTop: 10, flexDirection: "row", marginHorizontal: 5, alignItems: "center" }}>
                <Text style={{ fontSize: 15 }}>Titulaire de la carte</Text>
                <TextInput
                    style={{ marginLeft: 10, marginBottom: 0, height: 40, borderColor: 'gray', backgroundColor: "#F1FFFF", color: "#000000", paddingHorizontal: 8, fontSize: 17, borderRadius: 10 }}
                    value={cardHolder}
                    onChangeText={(text) => setCardHolder(text)}
                    placeholder="Aminou Zakou Moussa"
                />
            </View>
            <View style={{ marginTop: 10, flexDirection: "row", marginHorizontal: 5, alignItems: "center" }}>
                <Text style={{ fontSize: 15 }}>Numéro de carte</Text>
                <TextInput
                    style={{ marginLeft: 30, marginBottom: 0, height: 40, borderColor: 'gray', backgroundColor: "#F1FFFF", color: "#000000", paddingHorizontal: 8, fontSize: 17, borderRadius: 10 }}
                    value={cardNumber}
                    onChangeText={(text) => setCardNumber(text)}
                    placeholder="1234 5678 9012 3456"
                    keyboardType="numeric"
                />
            </View>

            <View style={{ marginTop: 10, flexDirection: "row", marginHorizontal: 5, alignItems: "center" }}>
                <Text style={{ fontSize: 15 }}>Date d'expiration</Text>
                <TextInput
                    style={{ marginLeft: 30, marginBottom: 0, height: 40, borderColor: 'gray', backgroundColor: "#F1FFFF", color: "#000000", paddingHorizontal: 8, fontSize: 17, borderRadius: 10 }}
                    value={expiryDate}
                    onChangeText={(text) => setExpiryDate(text)}
                    placeholder="MM/YY"
                    keyboardType="numeric"
                />
            </View>
            <View style={{ marginTop: 10, flexDirection: "row", marginHorizontal: 5, alignItems: "center" }}>
                <Text style={{ fontSize: 15 }}>CVV</Text>
                <TextInput
                    style={{ marginLeft: 30, marginBottom: 0, height: 40, borderColor: 'gray', backgroundColor: "#F1FFFF", color: "#000000", paddingHorizontal: 8, fontSize: 17, borderRadius: 10 }}
                    value={cvv}
                    onChangeText={(text) => setCvv(text)}
                    placeholder="123"
                    keyboardType="numeric"
                />
            </View>
            <TouchableOpacity
                onPress={handlePayment}
                style={{
                    marginTop: 20, justifyContent: "flex-start", alignItems: "center",
                }} >
                <View style={{ width: "40%", backgroundColor: "green", borderRadius: 10, padding: 10 }} >
                    <Text style={{ color: "white", fontSize: 18, textAlign: "center" }} > Confirmer</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default CardPayment

const styles = StyleSheet.create({})