import { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native'
import { Entypo } from '@expo/vector-icons';

import { colors } from '../../constans/Styles'

const Uploading = ({ label = "Yükleniyor", iconType = "location" }) => {
    const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(
                    fadeAnimation,
                    {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                        easing: Easing.ease
                    },
                ),
                Animated.timing(
                    fadeAnimation,
                    {
                        toValue: 0,
                        duration: 600,
                        useNativeDriver: true,
                        easing: Easing.ease
                    },
                )
            ])
        ).start()
    }, [fadeAnimation])

    return (
        <Animated.View style={{ ...styles.screen, opacity: fadeAnimation }}>
            <Text style={styles.text}>{label}</Text>
            <Entypo name={iconType} size={50} color={colors.btnBackground} />
        </Animated.View>
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