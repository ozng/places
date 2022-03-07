import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const Comments = props => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={props.onPress}
                style={styles.btn}
            >
                <Text style={styles.label}>
                    Yorumlar
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Comments

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        borderWidth: 3,
        borderColor: 'rgba(255, 193, 7, 1)',
        width: '98%',
        alignSelf: 'center',
    },
    btn: {},
    label: {
        fontSize: 18,
        padding: 15,
        textAlign: 'center',
        color: 'rgba(255, 160, 1, 1)',
        fontFamily: 'bitter-regular'
    },
})
