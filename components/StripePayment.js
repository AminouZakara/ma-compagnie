import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import firebase from 'firebase/app';
import 'firebase/functions';
import { auth, db } from '../firebase';

const StripePayment = ({ confirmBooking, userData, userId }) => {
    const [cardDetails, setCardDetails] = useState();
    const { confirmPayment } = useStripe();

    const handlePayPress = async () => {


        if (!cardDetails?.complete) {
            alert('Please enter complete card details');
            return;
        }
        const paymentIntent = await firebase.functions().httpsCallable('paymentIntent')({
            amount: 1099, // Example amount in cents
            currency: 'usd',
        });

        const { clientSecret, error } = paymentIntent.data;

        if (error) {
            alert(error);
            return;
        }

        const { error: confirmError, paymentIntent: confirmedPaymentIntent } = await confirmPayment(clientSecret, {
            paymentMethodType: 'Card',
            paymentMethodData: {
                billingDetails: {
                    name: 'Test User',
                },
            },
        });

        if (confirmError) {
            alert(`Payment Confirmation Error: ${confirmError.message}`);
            console.log("Payment Confirmation Error: ${confirmError.message}`")
            return;

        } else if (confirmedPaymentIntent) {
            confirmBooking()
            // updateDoc(doc(db, "buses", route.params._id), busItems)
            setDoc(doc(db, "users", userId), {
                ...userData,
                PaymentDetails: {
                    mobileNumber,
                    nom,
                    prenom,
                }
            })
            alert('Payment Successful!');
        }
    };
    return (
        <View>
            <CardField
                postalCodeEnabled={false}
                placeholders={{ number: '4242 4242 4242 4242' }}
                cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                }}
                style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                    setCardDetails(cardDetails);
                }}
            />
            <TouchableOpacity
                onPress={handlePayPress}
                style={{
                    justifyContent: "center", alignItems: "center",
                }} >
                <View style={{ width: "40%", backgroundColor: "green", borderRadius: 10, padding: 10 }} >
                    <Text style={{ color: "white", fontSize: 18, textAlign: "center" }} > Confirmer</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default StripePayment

const styles = StyleSheet.create({})