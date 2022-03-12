import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import StackNavigator from './StackNavigator';
import MyPlaceScreen from '../screens/User/MyPlaceScreen'
import UserSettings from '../screens/User/UserSettings';
import FavoriteScreen from '../screens/User/FavoriteScreen'
import CustomDrawerContent from './CustomDrawer';
import { colors, icons } from '../../constans/Styles'
import MyComments from '../screens/User/MyComments';
import { useState, useEffect } from 'react';
import { auth } from '../../firebase';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })

        return unsubscribe;
    }, [])

    return (
        <Drawer.Navigator
            initialRouteName="Stack"
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: colors.btnBackground,
                drawerStyle: {
                    width: '50%'
                },
                drawerLabelStyle: {
                    fontFamily: 'montserrat-medium',
                    fontSize: 12
                }
            }}
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            {
                user ? (
                    <>
                        <Drawer.Screen
                            name="Stack"
                            component={StackNavigator}
                            options={{
                                title: "Ana Sayfa",
                                drawerIcon: () => {
                                    return <Ionicons name="home-outline" size={icons.small} color={colors.btnBackground} />
                                }
                            }}
                        />
                        <Drawer.Screen
                            name="User"
                            component={MyPlaceScreen}
                            options={{
                                title: "Yerlerim",
                                drawerIcon: () => {
                                    return <Ionicons name="map-outline" size={icons.small} color={colors.btnBackground} />
                                }
                            }}
                        />
                        <Drawer.Screen
                            name="Favorite"
                            component={FavoriteScreen}
                            options={{
                                title: "Favorilerim",
                                drawerIcon: () => {
                                    return <Ionicons name="bookmarks-outline" size={icons.small} color={colors.btnBackground} />
                                }
                            }}
                        />
                        <Drawer.Screen
                            name="MyComments"
                            component={MyComments}
                            options={{
                                title: "Yorumlarım",
                                drawerIcon: () => {
                                    return <Ionicons name="chatbubble-ellipses-outline" size={icons.small} color={colors.btnBackground} />
                                }
                            }}
                        />
                        <Drawer.Screen
                            name="Settings"
                            component={UserSettings}
                            options={{
                                title: "Ayarlar",
                                drawerIcon: () => {
                                    return <Ionicons name="settings-outline" size={icons.small} color={colors.btnBackground} />
                                }
                            }}
                        />
                    </>
                ) : (
                    <Drawer.Screen
                        name="Stack"
                        component={StackNavigator}
                        options={{
                            title: "Ana Sayfa",
                            drawerIcon: () => {
                                return <Ionicons name="home-outline" size={icons.small} color={colors.btnBackground} />
                            }
                        }}
                    />
                )
            }

        </Drawer.Navigator>
    )
}

export default DrawerNavigation
