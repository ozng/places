import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { colors } from '../constans/Styles'

const Inputs = ({ title, value, onChangeText, placeholder, multiline, onTouchEnd, editable }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                multiline={true}
                onTouchEnd={onTouchEnd}
                editable={editable}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: '2%'
    },
    text: {
        fontSize: 16,
        color: colors.inputText,
        paddingTop: 5,
        paddingLeft: 5,
        fontFamily: 'barlow-medium'
    },
    input: {
        backgroundColor: colors.inputBackground,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        borderColor: colors.inputText,
        borderWidth: 1.5,
        fontFamily: 'barlow-regular'
    }
})

export default Inputs
