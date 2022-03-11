import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { colors } from '../../../constans/Styles'

const Button = ({ onPress, title, disabled, style }) => {
    return (
        <TouchableOpacity
            style={[styles.btnContainer, { backgroundColor: disabled ? '#ccc' : colors.btnBackground }]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.btnText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 5
    },
    btnText: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'montserrat-medium',
        paddingVertical: 10,
        paddingHorizontal: 40
    }
})
