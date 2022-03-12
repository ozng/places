import { StyleSheet, Text, View } from 'react-native'
import { colors, fontSizes } from '../../../constans/Styles'

const Address = ({ data }) => {
    return (
        <View style={styles.addressConteiner}>
            <Text style={styles.addressText}>{data.city} - {data.district}</Text>
            <Text style={styles.addressText}>{data.address}</Text>
        </View>
    )
}

export default Address

const styles = StyleSheet.create({
    addressConteiner: {
        alignItems: 'center',
        marginVertical: 10
    },
    addressText: {
        fontSize: fontSizes.small,
        paddingTop: 4,
        color: colors.fadedFont,
        fontStyle: 'italic',
    }
})