import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { colors } from '../constans/Styles';
import Button from './Button';
import ButtonOutline from './ButtonOutline'


const DeleteModal = ({ title, visible, label, onConfirm, onCancel }) => {
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
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>{label}</Text>
                    </View>
                    <View style={styles.btn}>
                        <Button
                            title="Tamam"
                            onPress={onConfirm}
                        />
                        <ButtonOutline
                            title="Vazgeç"
                            onPress={onCancel}
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
        marginHorizontal: 15,
        borderRadius: 20,
        marginTop: '60%',
        elevation: 10
    },
    title: {
        textAlign: 'center',
        padding: 10,
        fontSize: 18,
        color: colors.btnBackground,
        fontFamily: 'montserrat-medium'
    },
    label: {
        padding: 20,
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'barlow-regular'
    },
    btn: {
        alignSelf: 'center',
        flexDirection: 'row',
        paddingVertical: 20
    }
})

export default DeleteModal;
