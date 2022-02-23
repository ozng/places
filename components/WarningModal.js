import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { colors } from '../constans/Styles';
import Button from './Button';

const WarningModal = ({ label, visible, onPress }) => {
    return (
        <View>
            <Modal
                visible={visible}
                animationType='fade'
                transparent={true}
                style={styles.modal}
            >
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>UYARI</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>{label}</Text>
                    </View>
                    <View style={styles.btn}>
                        <Button
                            title="Tamam"
                            onPress={onPress}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        marginHorizontal: 50,
        borderRadius: 20,
        marginTop: '50%',
        elevation: 10
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        color: colors.btnBackground,
        fontFamily: 'montserrat-medium'
    },
    label: {
        paddingVertical: 20,
        textAlign: 'center',
        fontSize: 12,
        fontFamily: 'barlow-regular'
    },
    btn: {
        alignSelf: 'center'
    }
})

export default WarningModal;
