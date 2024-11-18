/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')('your-stripe-secret-key');

admin.initializeApp();


exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
    const { amount, currency, description, email } = data;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            description,
            payment_method_types: ["card"],
            receipt_email: email,
        });

        return {
            clientSecret: paymentIntent.client_secret,
        };
    } catch (error) {
        return { error: error.message };
    }

});



// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
