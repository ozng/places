import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { colors } from '../../../constans/Styles'

const Button = ({ onPress, title, disabled, style }) => {
    return (
        <View style={[styles.btnContainer, style]}>
            <TouchableOpacity
                style={[styles.btn, { backgroundColor: disabled ? '#ccc' : colors.btnBackground }]}
                onPress={onPress}
                disabled={disabled}
            >
                <Text style={styles.btnText}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
    btnContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'montserrat-medium'
    }
})
