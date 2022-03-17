import { StyleSheet, Text, View, TextInput } from 'react-native'

import { colors } from '../../../constans/Styles'

const Inputs = ({ title, style, ...props }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <TextInput
                style={[styles.input, style]}
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    text: {
        fontSize: 14,
        color: colors.inputText,
        paddingLeft: 5,
        fontFamily: 'barlow-medium',
    },
    input: {
        backgroundColor: colors.inputBackground,
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginTop: 5,
        fontFamily: 'barlow-regular',
        borderRadius: 15,
        fontSize: 12,
        color: 'black',
        elevation: 2.3,
    }
})

export default Inputs
