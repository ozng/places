import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors } from '../../../constans/Styles'
import { FontAwesome } from '@expo/vector-icons';

const Comments = props => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.container}
        >
            <Text style={styles.label}>
                Yorumlar
            </Text>
            <FontAwesome name="commenting-o" size={24} color={colors.btnBackground} />
        </TouchableOpacity>
    )
}

export default Comments

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    btn: {},
    label: {
        fontSize: 18,
        padding: 15,
        textAlign: 'center',
        color: colors.btnBackground,
        fontFamily: 'barlow-medium'
    },
})
