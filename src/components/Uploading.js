import { StyleSheet, Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons';

import { colors } from '../../constans/Styles'

const Uploading = ({ label, iconType }) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>{label}</Text>
            <Entypo name={iconType} size={50} color={colors.btnBackground} />
        </View>
    )
}

export default Uploading

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 25,
        color: colors.btnBackground,
        fontFamily: 'montserrat-medium',
        marginBottom: 20
    }
})