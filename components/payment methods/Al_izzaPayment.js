import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useConfirmPayment, usePaymentSheet } from '@stripe/stripe-react-native';
import { doc, updateDoc } from 'firebase/firestore';


const Al_izzaPayment = ({ confirmBooking, userData, userId }) => {

    const navigation = useNavigation();

    // -------------------Mobile Number Transactions  -------------------
    const [mobileNumber, setMobileNumber] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');
    const [nom, setNom] = useState('')
    const [nomError, setNomError] = useState('')
    const [prenom, setPrenom] = useState('')
    const [prenomError, setPrenomError] = useState('')


    const { confirmPayment } = useConfirmPayment();
    const { loading, error, success } = usePaymentSheet();
    const onSaveMobileNumber = (number) => {
        setMobileNumber(number);
    };
    const onMobileNumberError = (error) => {
        setMobileNumberError(error);
    };

    const onMobileNumberSubmit = async () => {
        if (mobileNumber.length === 0) {
            setMobileNumberError('Please enter your mobile number');
        } else if (mobileNumber.length < 10) {
            setMobileNumberError('Please enter a valid mobile number');
        } else if (!nom) {
            setNomError('Please enter your name')
            setMobileNumberError('')
        } else if (!prenom) {
            setPrenomError('Please enter your prenom')
            setMobileNumberError('')
            setNomError('')
        } else {
            setMobileNumberError('');
            setNomError('')
            setPrenomError('')
            const result = await confirmPayment(mobileNumber);
            if (result) {
                console.log('Payment confirmed');
                confirmBooking()
                // updateDoc(doc(db, "buses", route.params._id), busItems)
                updateDoc(doc(db, "users", userId), {
                    ...userData,
                    PaymentDetails: {
                        mobileNumber,
                        nom,
                        prenom,
                    }

                })
                Alert.alert(
                    "Felicitation !!!",
                    "Votre réservation a été confirmée avec succès",
                    [
                        {
                            text: 'OK', onPress: () => console.log('OK Pressed')
                        }
                    ],
                );
                // navigation.navigate('PaymentSuccess');
                // navigation.navigate('Main');
            } else {
                console.log('Payment failed');
            }
        }
    };
    const onMobileNumberClear = () => {
        setMobileNumber('');

    };
    return (
        <View>
            <Text style={{ fontSize: 18, fontWeight: "600", textDecorationLine: "underline", color: "black" }}>Alizza</Text>

            <View>
                <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Text style={{ fontSize: 15, marginTop: 5 }}>Numero de Telephone: </Text>
                    <View>
                        <TextInput
                            style={{ marginBottom: 0, height: 40, borderColor: 'gray', backgroundColor: "#F1FFFF", color: "#000000", paddingHorizontal: 12, fontSize: 20, borderRadius: 10 }}
                            onChangeText={text => setMobileNumber(text)}
                            value={mobileNumber}
                            placeholder="00227 96 52 32 48"
                            keyboardType="numeric"
                            maxLength={10}
                        />
                        <Text style={{ color: "red", fontSize: 12, alignSelf: "center" }}>{mobileNumberError}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "", alignItems: "flex-start" }}>
                    <Text style={{ fontSize: 15, marginTop: 5 }}>Nom: </Text>
                    <View>
                        <TextInput
                            style={{ marginLeft: 40, height: 40, borderColor: 'gray', borderWidth: 0.2, color: "#000000", paddingHorizontal: 12, fontSize: 16, borderRadius: 5 }}
                            onChangeText={text => setNom(text)}
                            value={nom}
                            placeholder="Nom de la propriétaire du Tel"
                        />
                        <Text style={{ color: "red", fontSize: 12, alignSelf: "center" }}>{nomError}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Text style={{ fontSize: 15, marginTop: 5 }}>Prenom: </Text>
                    <View>
                        <TextInput
                            style={{ marginRight: 20, height: 40, borderColor: 'gray', borderWidth: 0.2, color: "#000000", paddingHorizontal: 12, fontSize: 16, borderRadius: 5 }}
                            onChangeText={text => setPrenom(text)}
                            value={prenom}
                            placeholder="Prenom de la propriétaire du Tel"
                        />
                        <Text style={{ color: "red", fontSize: 12, alignSelf: "center" }}>{prenomError}</Text>
                    </View>
                </View>



                {/* <CardField
                    postalCodeEnabled={false}
                    placeholders={{
                        number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                        backgroundColor: '#FFFFFF',
                        textColor: '#000000',
                    }}
                    style={{
                        width: '100%',
                        height: 50,
                        marginVertical: 30,
                    }}
                /> */}
                <TouchableOpacity
                    onPress={onMobileNumberSubmit}
                    style={{
                        marginTop: 20, justifyContent: "flex-start", alignItems: "center",
                    }} >
                    <View style={{ width: "40%", backgroundColor: "green", borderRadius: 10, padding: 10 }} >
                        <Text style={{ color: "white", fontSize: 18, textAlign: "center" }} > Confirmer</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Al_izzaPayment

const styles = StyleSheet.create({})