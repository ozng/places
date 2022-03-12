import { StyleSheet, Text } from 'react-native'
import { colors, fontSizes } from '../../../constans/Styles'

const Title = ({ data }) => {
    return (
        <Text style={styles.title}>{data.title}</Text>
    )
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontSize: fontSizes.xlarge,
        paddingVertical: 10,
        textAlign: 'center',
        color: colors.btnBackground,
        fontFamily: 'barlow-medium'
    },
})