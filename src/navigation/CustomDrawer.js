import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSizes, icons } from '../../constans/Styles';
import { useDispatch } from 'react-redux';
import * as userActions from '../../store/actions/user';
import { auth } from '../../firebase';

const CustomDrawerContent = props => {
    const dispatch = useDispatch()
    const currentUser = auth.currentUser;

    return (
        <DrawerContentScrollView contentContainerStyle={{ flex: 1 }} {...props}>
            <View style={styles.userContainer}>
                <Image source={{ uri: currentUser?.photoURL }} style={styles.image} />
                <Text style={styles.displayNameText}>{currentUser?.displayName}</Text>
            </View>
            <DrawerItemList {...props} />
            <DrawerContentScrollView contentContainerStyle={{ width: '100%', position: 'absolute', bottom: 5 }}>
                <DrawerItem
                    label="Logout"
                    labelStyle={{ padding: 10, fontFamily: 'bitter-regular', color: colors.btnBackground, fontSize: fontSizes.small }}
                    onPress={() => dispatch(userActions.logoutHandler())}
                    icon={() => <Ionicons name="log-out-outline" size={icons.small} color={colors.btnBackground} />}
                />
            </DrawerContentScrollView>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginVertical: 10
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 25
    },
    displayNameText: {
        fontFamily: 'montserrat-medium',
        fontSize: 12,
        paddingLeft: 10
    }
})

export default CustomDrawerContent;