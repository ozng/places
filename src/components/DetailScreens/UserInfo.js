import { StyleSheet, Text, View, Image } from 'react-native'

const UserInfo = ({ userInfo }) => {
    return (
        <View style={styles.userContainer}>
            <Image
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                }}
                source={{
                    uri: userInfo.photoURL
                }}
            />
            <View style={styles.userTextContainer}>
                <Text style={styles.userDNText}>{userInfo.displayName} <Text style={{ fontFamily: 'barlow-regular', color: 'grey' }}>tarafından</Text></Text>
            </View>
        </View>
    )
}

export default UserInfo

const styles = StyleSheet.create({
    userContainer: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center'
    },
    userTextContainer: {
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    userDNText: {
        fontSize: 12,
        fontFamily: 'barlow-medium'
    }
})