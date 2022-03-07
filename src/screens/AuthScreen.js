import { useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { auth } from '../../firebase';

const AuthScreen = ({ navigation }) => {

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user && !user.displayName && !user.photoURL) {
                navigation.replace('Settings')
            } else if (user) {
                navigation.replace('Home')
            } else {
                navigation.replace('Login')
            }
        })

        return unsubscribe;
    }, [navigation])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color="darkgreen" />
        </View>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
