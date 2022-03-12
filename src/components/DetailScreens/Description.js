import { StyleSheet, Text, View } from 'react-native'
import { fontSizes } from '../../../constans/Styles'

const Description = ({ data }) => {
    return (
        <View style={styles.descriptionCntnr}>
            <Text style={styles.description}>{data.description}</Text>
        </View>
    )
}

export default Description

const styles = StyleSheet.create({
    descriptionCntnr: {
        borderRadius: 20,
        margin: 5,
    },
    description: {
        paddingHorizontal: 10,
        marginVertical: 20,
        lineHeight: 25,
        textAlign: 'left',
        fontSize: fontSizes.small,
        color: 'black',
        fontFamily: 'barlow-regular'
    },
})