import { Text, View, Image, StyleSheet } from 'react-native'
import { DrawerContentScrollView, DrawerItemList, } from '@react-navigation/drawer';
import { auth } from '../../firebase';
import { colors } from '../../constans/Styles';

const CustomDrawerContent = props => {
    const currentUser = auth.currentUser;

    return (
        <DrawerContentScrollView contentContainerStyle={{ flex: 1 }} {...props}>
            <View style={styles.userContainer}>
                <Image source={{ uri: currentUser?.photoURL }} style={styles.image} />
                <View>
                    <Text style={styles.displayNameText}>{currentUser?.displayName}</Text>
                    <Text numberOfLines={1} style={styles.emailText}>{currentUser?.email}</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        width: '100%'
    },
    image: {
        marginHorizontal: 10,
        marginVertical: 5,
        width: 35,
        height: 35,
        borderRadius: 25
    },
    displayNameText: {
        fontFamily: 'montserrat-medium',
        fontSize: 12,
        color: '#353237'
    },
    emailText: {
        fontFamily: 'montserrat-medium',
        fontSize: 9,
        color: 'grey'
    }
})

export default CustomDrawerContent;