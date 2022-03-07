import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { colors, fontSizes, icons } from '../../../constans/Styles'

const Header = ({ headerTitle, onPress, createPlace, goBack }) => {
    return (
        <View style={styles.screen}>
            {
                onPress && (
                    <Ionicons
                        onPress={onPress}
                        name="menu"
                        size={icons.medium}
                        color={colors.btnBackground}
                        style={styles.menuIcon}
                    />
                )
            }
            {
                goBack && (
                    <Ionicons
                        onPress={goBack}
                        name="arrow-back"
                        size={icons.medium}
                        color={colors.btnBackground}
                        style={styles.menuIcon}
                    />
                )
            }
            <Text style={styles.title}>{headerTitle}</Text>
            {
                createPlace && (
                    <Ionicons
                        name="add"
                        size={icons.medium}
                        color={colors.btnBackground}
                        onPress={createPlace}
                        style={styles.addIcon}
                    />
                )
            }
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '10%',
        marginBottom: 20
    },
    title: {
        fontSize: fontSizes.medium,
        textAlign: 'center',
        flex: 1,
        marginRight: 50,
        color: colors.btnBackground,
        fontFamily: 'montserrat-medium',
    },
    menuIcon: {
        marginLeft: 15
    },
    addIcon: {
        paddingRight: 15
    }
})
