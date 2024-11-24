import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import SavedScreen from './screens/SavedScreen';
import BookingScreen from './screens/BookingScreen';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import DepartureSearchScreen from './screens/DepartureSearchScreen';
import DestinationSearchScreen from './screens/DestinationSearchScreen';
import TicketsScreen from './screens/Tickets/TicketsScreen';
import MapScreen from './screens/MapScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import UserScreen from './screens/UserScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MyProfileScreen from './screens/profileScreens/MyProfileScreen';
import CreateScreen from './screens/Tickets/createScreens/CreateScreen';
import FilteredTicketsScreen from './screens/Tickets/FilteredTicketsScreen';
import AuthorScreen from './screens/Tickets/roleScreens/AuthorScreen';
import EditorScreen from './screens/Tickets/roleScreens/EditorScreen';
import AdminScreen from './screens/Tickets/roleScreens/AdminScreen';
import ManageAdminsandEditors from './screens/Tickets/roleScreens/manageScreen/ManageAdminsandEditors';
import ManageUsers from './screens/Tickets/roleScreens/manageScreen/ManageUsers';
// import ManageAdmins from './screens/Tickets/roleScreens/manageScreen/ManageAdmins';
// import ManageEditors from './screens/Tickets/roleScreens/manageScreen/ManageEditors';
// import EditEditor from './screens/Tickets/roleScreens/manageScreen/EditEditor';
// import EditAdmin from './screens/Tickets/roleScreens/manageScreen/EditAdmin';
import ManageTheRoles from './screens/Tickets/roleScreens/manageScreen/ManageTheRoles';
import PersonnelleInformation from './screens/profileScreens/PersonnelleInformation';
import MotDePasse from './screens/profileScreens/MotDePasse';
import ManageBusStations from './screens/Tickets/roleScreens/manageScreen/ManageBusStations';
import AddStation from './screens/Tickets/busStationScreens/AddStation';
import RemoveOrUpdateStation from './screens/Tickets/busStationScreens/RemoveOrUpdateStation';
import GetStationToUpDel from './screens/Tickets/busStationScreens/GetStationToUpDel';
import PaymentSuccess from './screens/payment/PaymentSuccess';
import BookedTickets from './screens/Tickets/BookedTickets';
import CancelBilletScreen from './screens/Tickets/CancelBilletScreen';
import BgLoaderScreen from './screens/BgLoaderScreen';
// import GoogleSingIn from './screens/GoogleSingIn';

const StackNavigator = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    function BottomTabs() {

        return (
            <Tab.Navigator >

                <Tab.Screen
                    name='Home'
                    component={HomeScreen}

                    options={{
                        tabBarLabel: "Accueil", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
                            <Entypo name="home" size={24} color="green" />
                        ) : (
                            <AntDesign name="home" size={24} color="black" />
                        )
                    }} />

                {/* <Tab.Screen
                    name='Saved'
                    component={SavedScreen}
                    options={{
                        tabBarLabel: "Saved", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
                            <AntDesign name="heart" size={24} color="green" />
                        ) : (
                            <AntDesign name="hearto" size={24} color="black" />
                        )
                    }} /> */}

                <Tab.Screen
                    name='Bookings'
                    component={BookingScreen}
                    options={{
                        tabBarLabel: "Réservations", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="notifications" size={24} color="green" />
                        ) : (
                            <Ionicons name="notifications-outline" size={24} color="black" />
                        )
                    }} />

                <Tab.Screen
                    name='Profile'
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Profil", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="person" size={24} color="green" />
                        ) : (
                            <Ionicons name="person-outline" size={24} color="black" />
                        )
                    }} />
            </Tab.Navigator>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name='Departure' component={DepartureSearchScreen} options={{ 'title': 'Ville de Depart' }} />

                <Stack.Screen name='BgLoaderScreen' component={BgLoaderScreen} options={{ headerShown: false }} />

                {/* <Stack.Screen name='GoogleSignIn' component={GoogleSingIn} options={{ headerShown: false }} /> */}


                <Stack.Screen name='Destination' component={DestinationSearchScreen} options={{ 'title': 'Ville d Arrivée' }} />
                <Stack.Screen name='Tickets' component={FilteredTicketsScreen} />
                <Stack.Screen name='Map' component={MapScreen} options={{ headerShown: false }} />
                <Stack.Screen name='User' component={UserScreen} />
                <Stack.Screen name='confirmation' component={ConfirmationScreen} />
                <Stack.Screen name='AllTickets' component={TicketsScreen} />
                <Stack.Screen name='Create' component={CreateScreen} />
                <Stack.Screen name='BookedTickets' component={BookedTickets} />
                <Stack.Screen name='CancelBilletScreen' component={CancelBilletScreen} />

                {/* Role Screens */}
                <Stack.Screen name='Auteur' component={AuthorScreen} options={{ title: 'Welcome to Author Dashboard' }} />
                <Stack.Screen name='Admin' component={AdminScreen} options={{ title: 'Welcome to Admin Panel' }} />
                <Stack.Screen name='Editeur' component={EditorScreen} options={{ title: 'Welcome to Editor View' }} />
                {/* Manage Screens */}
                <Stack.Screen name='ManageAdminsandEditors' component={ManageAdminsandEditors} />
                <Stack.Screen name='ManageTheRoles' component={ManageTheRoles} />
                <Stack.Screen name='ManageUsers' component={ManageUsers} />

                <Stack.Screen name='ManageBusStations' component={ManageBusStations} />
                <Stack.Screen name='AddStation' component={AddStation} />
                <Stack.Screen name='GetStationToUpDel' component={GetStationToUpDel} />
                <Stack.Screen name='RemoveOrUpdateStation' component={RemoveOrUpdateStation} />


                <Stack.Screen name='MyProfile' component={MyProfileScreen} />
                <Stack.Screen name='PersonnelleInformation' component={PersonnelleInformation} />
                <Stack.Screen name='MotDePasse' component={MotDePasse} />

                <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})