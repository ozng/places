import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors } from '../constans/Styles'

const ButtonOutline = ({ onPress, title, disabled }) => {
    return (
        <View style={styles.btnContainer}>
            <TouchableOpacity
                style={[styles.btn, styles.btnOutline]}
                onPress={onPress}
                disabled={disabled}
            >
                <Text style={[styles.btnOutlineText, {
                    color: disabled
                        ? colors.fadedFont
                        : colors.btnBackground
                }]}>
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonOutline

const styles = StyleSheet.create({
    btnContainer: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    btnOutline: {
        marginTop: 5,
    },
    btnOutlineText: {
        fontSize: 14,
        fontFamily: 'montserrat-medium'
    }
})
