import { firebase } from '@react-native-firebase/auth';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ModalPortal } from 'react-native-modals';
import { Provider } from 'react-redux';
import BgLoaderScreen from './screens/BgLoaderScreen';
import StackNavigator from './StackNavigator';
import store from './store';

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)

    }, 3000)
    firebase.auth().onAuthStateChanged(user => {

    });

    return () => clearTimeout(timer);

  }, []);

  if (isLoading) {
    return <BgLoaderScreen />;
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        console.log("keyboard dismissed")
      }} >
        <Provider store={store}>
          <StripeProvider publishableKey="pk_test_51PGPFY03DRU38FLcs3PWpl6hCxtVAZghufhLsFGXRw0aS0aYOLOHboPpuAOoYBd649f78lFosHOVKNPHXaFUpSKn00sXPgfzMe" >
            <StackNavigator style={styles.container} />
            <ModalPortal />
          </StripeProvider>
        </Provider>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
